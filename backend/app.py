from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import json
import requests
import time
from datetime import datetime

# Define the absolute/relative path to your model files
MODEL_DIR = os.path.join('..', 'ML_Models', 'Crop_Recommendation_Enhanced')

model = joblib.load(os.path.join(MODEL_DIR, 'optimized_crop_model_with_geography.pkl'))
label_encoder = joblib.load(os.path.join(MODEL_DIR, 'optimized_label_encoder.pkl'))
zone_encoder = joblib.load(os.path.join(MODEL_DIR, 'agro_zone_encoder.pkl'))

app = Flask(__name__)

# Fixed CORS configuration
CORS(app, origins=[
    "https://cropsmart.netlify.app",   # your Netlify hosted frontend URL
    "http://localhost:3000",           # frontend localhost for development
    "ngrok http --url=agustina-unpervious-lillia.ngrok-free.app 5000",          # alternative localhost
    "*"  # Allow all during development (remove in production)
])

# Bhuvan API Configuration
BHUVAN_ENDPOINT = "https://bhuvan-app1.nrsc.gov.in/api/api_proximity/curl_village_geocode.php"

def load_bhuvan_token():
    """Load Bhuvan API token from file - updates automatically when file changes"""
    try:
        with open("bhuvan_token.txt", "r") as f:
            token = f.read().strip()
            if token:
                print(f"✅ Loaded Bhuvan token: {token[:10]}...")
                return token
            else:
                print("❌ Empty token file")
                return None
    except FileNotFoundError:
        print("❌ bhuvan_token.txt file not found - creating with default token")
        with open("bhuvan_token.txt", "w") as f:
            f.write("819ea65d63df7b4382382196c2f534d55f94d124")
        return "819ea65d63df7b4382382196c2f534d55f94d124"
    except Exception as e:
        print(f"❌ Error loading Bhuvan token: {e}")
        return None

def get_agro_zone_from_coordinates(lat, lon):
    """Determine agro-climatic zone from coordinates"""
    if 26 <= lat <= 35 and 74 <= lon <= 88:
        return 'north'
    elif 8 <= lat <= 20 and 75 <= lon <= 82:
        return 'south'
    elif 15 <= lat <= 28 and 68 <= lon <= 75:
        return 'west'
    elif 20 <= lat <= 28 and 82 <= lon <= 92:
        return 'east'
    else:
        return 'central'

def get_environmental_data(lat, lon):
    """Generate environmental data based on coordinates"""
    agro_zone = get_agro_zone_from_coordinates(lat, lon)
    
    regional_data = {
        'north': {'N': 75, 'P': 50, 'K': 45, 'ph': 7.2, 'temp': 24, 'humidity': 65, 'rainfall': 130},
        'south': {'N': 65, 'P': 45, 'K': 50, 'ph': 6.8, 'temp': 28, 'humidity': 75, 'rainfall': 170},
        'west': {'N': 60, 'P': 40, 'K': 35, 'ph': 7.0, 'temp': 26, 'humidity': 60, 'rainfall': 100},
        'east': {'N': 70, 'P': 55, 'K': 50, 'ph': 6.5, 'temp': 27, 'humidity': 80, 'rainfall': 180},
        'central': {'N': 65, 'P': 48, 'K': 42, 'ph': 6.9, 'temp': 26, 'humidity': 70, 'rainfall': 140}
    }
    
    data = regional_data.get(agro_zone, regional_data['central'])
    data['agro_zone'] = agro_zone
    return data

def extract_valid_coordinates(data):
    """Extract valid coordinates from Bhuvan API response - handles both formats"""
    if isinstance(data, list) and len(data) > 0:
        for item in data:
            try:
                # Try both field name variations - Bhuvan uses different names
                lat = float(item.get('latitude') or item.get('lat') or 0)
                lon = float(item.get('longitude') or item.get('lng') or 0)
                
                # Validate coordinate ranges and exclude zeros
                if -90 <= lat <= 90 and -180 <= lon <= 180 and lat != 0 and lon != 0:
                    print(f"🎯 Found valid coordinates in list: ({lat}, {lon})")
                    return lat, lon, item
            except (ValueError, TypeError):
                continue
    
    elif isinstance(data, dict):
        try:
            # Try both field name variations
            lat = float(data.get('latitude') or data.get('lat') or 0)
            lon = float(data.get('longitude') or data.get('lng') or 0)
            
            if -90 <= lat <= 90 and -180 <= lon <= 180 and lat != 0 and lon != 0:
                print(f"🎯 Found valid coordinates in dict: ({lat}, {lon})")
                return lat, lon, data
        except (ValueError, TypeError):
            pass
    
    print("❌ No valid coordinates found in response")
    return None, None, None

def search_village_bhuvan(village_name, max_retries=3):
    """Search village using Bhuvan API with dynamic token loading - FIXED VERSION"""
    
    # Load token fresh for each request
    token = load_bhuvan_token()
    if not token:
        return {'success': False, 'error': 'Bhuvan API token not available'}
    
    for attempt in range(max_retries):
        try:
            print(f"🔍 Searching village '{village_name}' via Bhuvan API (Attempt {attempt + 1}/{max_retries})")
            
            params = {'village': village_name, 'token': token}
            response = requests.get(BHUVAN_ENDPOINT, params=params, timeout=15)
            
            print(f"📡 Status: {response.status_code}")
            print(f"📄 Response: {response.text[:200]}...")  # Show more of the response
            
            if response.status_code == 200:
                # Check if response is just "false"
                if response.text.strip().lower() == 'false':
                    print("❌ Bhuvan returned 'false' - village not found")
                    return {'success': False, 'error': 'Village not found in Bhuvan database'}
                
                try:
                    data = response.json()
                    print(f"📊 JSON Data: {data}")
                except json.JSONDecodeError:
                    print("❌ Invalid JSON response")
                    return {'success': False, 'error': 'Invalid JSON response from Bhuvan API'}
                
                # Extract coordinates using improved logic
                lat, lon, location_data = extract_valid_coordinates(data)
                
                if lat is not None and lon is not None:
                    print(f"✅ Extracted coordinates: ({lat}, {lon})")
                    return {
                        'success': True,
                        'latitude': lat,
                        'longitude': lon,
                        'village_name': location_data.get('name', village_name),
                        'district': location_data.get('dist_name', location_data.get('district', '')),
                        'state': location_data.get('state_name', location_data.get('state', '')),
                        'raw_data': location_data
                    }
                else:
                    print("❌ No valid coordinates found")
                    return {'success': False, 'error': 'No valid coordinates found in Bhuvan response'}
            
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                if attempt < max_retries - 1:
                    time.sleep(2)
                    continue
                return {'success': False, 'error': f'Bhuvan API HTTP {response.status_code}'}
            
        except requests.exceptions.Timeout:
            print(f"⏰ Request timeout (Attempt {attempt + 1})")
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
            return {'success': False, 'error': 'Bhuvan API timeout after multiple attempts'}
        except Exception as e:
            print(f"💥 Exception: {e}")
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
            return {'success': False, 'error': f'Bhuvan API error: {str(e)}'}
    
    return {'success': False, 'error': f'Failed to get coordinates after {max_retries} attempts'}

def make_prediction(lat, lon, env_data):
    """Make crop prediction given coordinates and environmental data"""
    # Encode agro zone
    zone_encoded = zone_encoder.transform([env_data['agro_zone']])[0]
    
    # Prepare features
    features = np.array([[
        lat, lon,
        env_data['N'], env_data['P'], env_data['K'],
        env_data['temp'], env_data['humidity'],
        env_data['ph'], env_data['rainfall'],
        zone_encoded
    ]])
    
    # Make prediction
    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0]
    
    # Get results - Convert to Python native types
    predicted_crop = label_encoder.inverse_transform([prediction])[0]
    confidence = float(np.max(probabilities) * 100)
    
    # Get top 3 recommendations
    top_indices = np.argsort(probabilities)[-3:][::-1]
    recommendations = []
    
    for idx in top_indices:
        crop = label_encoder.inverse_transform([idx])[0]
        conf = float(probabilities[idx] * 100)
        suitability = "Highly Suitable" if conf >= 70 else "Suitable" if conf >= 50 else "Moderately Suitable"
        recommendations.append({
            'crop': crop,
            'confidence': round(conf, 2),
            'suitability': suitability
        })
    
    return predicted_crop, confidence, recommendations

@app.route('/')
def home():
    # Show current token status for debugging
    token = load_bhuvan_token()
    token_status = "✅ Active" if token else "❌ Missing"
    
    return jsonify({
        "message": "CropSmart AI Backend API",
        "status": "running",
        "bhuvan_token_status": token_status,
        "endpoints": [
            "POST /api/recommend-by-coordinates",
            "POST /api/recommend-by-village", 
            "GET /api/model-info",
            "GET /api/supported-crops",
            "GET /api/agro-zones"
        ]
    })

@app.route('/api/recommend-by-coordinates', methods=['POST'])
def recommend_by_coordinates():
    try:
        data = request.json
        print(f"Received coordinate request: {data}")
        
        # Extract coordinates
        lat = float(data.get('lat') or data.get('latitude'))
        lon = float(data.get('lon') or data.get('longitude'))
        
        # Get environmental data or use provided values
        if all(field in data for field in ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']):
            env_data = {
                'N': data['N'],
                'P': data['P'], 
                'K': data['K'],
                'temp': data['temperature'],
                'humidity': data['humidity'],
                'ph': data['ph'],
                'rainfall': data['rainfall'],
                'agro_zone': get_agro_zone_from_coordinates(lat, lon)
            }
        else:
            env_data = get_environmental_data(lat, lon)
        
        # Make prediction
        predicted_crop, confidence, recommendations = make_prediction(lat, lon, env_data)
        
        response = {
            "success": True,
            "location_info": {
                "coordinates": {"latitude": float(lat), "longitude": float(lon)},
                "agro_zone": env_data['agro_zone']
            },
            "prediction": {
                "primary_crop": predicted_crop,
                "confidence": round(confidence, 2),
                "recommendations": recommendations
            },
            "environmental_conditions": {
                "N": int(env_data['N']),
                "P": int(env_data['P']),
                "K": int(env_data['K']),
                "temperature": float(env_data['temp']),
                "humidity": float(env_data['humidity']),
                "ph": float(env_data['ph']),
                "rainfall": float(env_data['rainfall']),
                "agro_zone": env_data['agro_zone']
            },
            "timestamp": datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Prediction failed: {str(e)}"
        }), 500

@app.route('/api/recommend-by-village', methods=['POST'])
def recommend_by_village():
    """Get crop recommendation by village name using Bhuvan API - FIXED VERSION"""
    try:
        data = request.json
        village_name = data.get('village', '').strip()
        
        if not village_name:
            return jsonify({
                "success": False,
                "error": "Village name is required"
            }), 400
        
        print(f"🔍 Searching for village: {village_name}")
        
        # Search village using Bhuvan API (with fixed coordinate extraction)
        village_result = search_village_bhuvan(village_name)
        
        if not village_result['success']:
            return jsonify({
                "success": False,
                "error": f"Village search failed: {village_result['error']}",
                "suggestion": "Please check village name spelling or try using coordinates directly",
                "bhuvan_api_status": "failed"
            }), 404
        
        # Extract coordinates from Bhuvan API response
        lat = village_result['latitude']
        lon = village_result['longitude']
        
        # This validation should rarely trigger now with improved extraction
        if lat == 0 and lon == 0:
            return jsonify({
                "success": False,
                "error": "Invalid coordinates received from Bhuvan API",
                "suggestion": "Try a more specific village name or use coordinates directly"
            }), 400
        
        print(f"✅ Found village: {village_result['village_name']} at ({lat}, {lon})")
        
        # Get environmental data
        env_data = get_environmental_data(lat, lon)
        
        # Make prediction
        predicted_crop, confidence, recommendations = make_prediction(lat, lon, env_data)
        
        response = {
            "success": True,
            "village_info": {
                "name": village_result['village_name'],
                "district": village_result['district'],
                "state": village_result['state'],
                "coordinates": {"latitude": float(lat), "longitude": float(lon)},
                "agro_zone": env_data['agro_zone']
            },
            "prediction": {
                "primary_crop": predicted_crop,
                "confidence": round(confidence, 2),
                "recommendations": recommendations
            },
            "environmental_conditions": {
                "N": int(env_data['N']),
                "P": int(env_data['P']),
                "K": int(env_data['K']),
                "temperature": float(env_data['temp']),
                "humidity": float(env_data['humidity']),
                "ph": float(env_data['ph']),
                "rainfall": float(env_data['rainfall']),
                "agro_zone": env_data['agro_zone']
            },
            "bhuvan_api_status": "success",
            "timestamp": datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"💥 Error in recommend_by_village: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Prediction failed: {str(e)}",
            "bhuvan_api_status": "error"
        }), 500

@app.route('/api/update-token', methods=['POST'])
def update_token():
    """Update Bhuvan API token via API call"""
    try:
        data = request.json
        new_token = data.get('token', '').strip()
        
        if not new_token:
            return jsonify({
                "success": False,
                "error": "Token is required"
            }), 400
        
        # Save new token to file
        with open("bhuvan_token.txt", "w") as f:
            f.write(new_token)
        
        return jsonify({
            "success": True,
            "message": "Token updated successfully",
            "token_preview": f"{new_token[:10]}...",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Token update failed: {str(e)}"
        }), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    return jsonify({
        "success": True,
        "model_info": {
            "model_type": "Enhanced XGBoost with Geography",
            "version": "2.0",
            "accuracy": 0.92,
            "features_count": 10,
            "crops_supported": int(len(label_encoder.classes_)),
            "agro_zones_supported": int(len(zone_encoder.classes_)),
            "training_date": "2025-09-05"
        }
    })

@app.route('/api/supported-crops', methods=['GET'])
def get_supported_crops():
    crops = label_encoder.classes_.tolist()
    return jsonify({
        "success": True,
        "total_crops": len(crops),
        "crops": sorted(crops)
    })

@app.route('/api/agro-zones', methods=['GET'])
def get_agro_zones():
    zones = zone_encoder.classes_.tolist()
    return jsonify({
        "success": True,
        "total_zones": len(zones),
        "zones": zones,
        "zone_descriptions": {
            "north": "Northern India - Wheat belt",
            "south": "Southern India - Rice and plantation crops",  
            "west": "Western India - Cotton and cash crops",
            "east": "Eastern India - Rice and jute",
            "central": "Central India - Mixed cropping"
        }
    })

if __name__ == '__main__':
    print("🌾 CropSmart AI Backend Starting...")
    print(f"📊 Model loaded: {len(label_encoder.classes_)} crops supported")
    print(f"🗺️ Agro-zones: {len(zone_encoder.classes_)} zones")
    
    # Check token status on startup
    token = load_bhuvan_token()
    if token:
        print(f"🔑 Bhuvan API token loaded: {token[:10]}...")
    else:
        print("❌ No Bhuvan API token found - check bhuvan_token.txt")
    
    print("🚀 Server running on http://127.0.0.1:5000")
    print("✅ Available endpoints:")
    print("   POST /api/recommend-by-coordinates")
    print("   POST /api/recommend-by-village")
    print("   POST /api/update-token")
    print("   GET /api/model-info")
    print("   GET /api/supported-crops")
    print("   GET /api/agro-zones")
    
    app.run(host='127.0.0.1', port=5000, debug=True)
