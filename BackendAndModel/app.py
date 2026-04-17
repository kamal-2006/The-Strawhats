# ================================
# PARAMETRIC INSURANCE API
# Two-Stage Pipeline: Disruption Detection → Claim Amount Calculation
# WITH AUTOMATIC CLAIMS PROCESSING & MONGODB INTEGRATION
# ================================

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import json
import uuid
from datetime import datetime
from auto_claims_processor import get_processor


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# Initialize auto claims processor (lazy - will connect on first use)
try:
    processor = get_processor()
    print("[OK] Auto Claims Processor initialized (MongoDB connection deferred)")
    processor_ready = True
except Exception as e:
    print(f"[ERROR] Auto Claims Processor error: {e}")
    processor_ready = False

# ================================
# MODEL LOADING
# ================================

print("\n" + "="*80)
print("Loading Parametric Insurance Models...")
print("="*80)

try:
    # Load disruption detection model
    with open('disruption_detection_model.pkl', 'rb') as f:
        disruption_model = pickle.load(f)
    print("✓ Disruption detection model loaded")
    
    # Load claim amount model
    with open('claim_amount_model.pkl', 'rb') as f:
        claim_model = pickle.load(f)
    print("✓ Claim amount model loaded")
    
    # Load label encoders
    with open('label_encoders_disruption.pkl', 'rb') as f:
        label_encoders_disruption = pickle.load(f)
    print("✓ Disruption encoders loaded")
    
    with open('label_encoders_claim.pkl', 'rb') as f:
        label_encoders_claim = pickle.load(f)
    print("✓ Claim encoders loaded")
    
    # Load feature mapping
    with open('model_features.json', 'r') as f:
        model_config = json.load(f)
    print("✓ Feature mapping loaded")
    
    models_loaded = True
    
except FileNotFoundError as e:
    print(f"⚠ Warning: {str(e)}")
    print("⚠ Models not found. Please run train_parametric_models.py first.")
    models_loaded = False

print("="*80 + "\n")

# ================================
# STARTUP MESSAGES
# ================================

print("Starting Parametric Insurance API...")
print("\n📌 MANUAL PROCESSING ENDPOINTS:")
print("  GET  /health                    - Health check")
print("  POST /detect-disruption         - Stage 1: Disruption Detection")
print("  POST /calculate-claim           - Stage 2: Claim Amount Calculation")
print("  POST /process-claim             - Complete pipeline (Stage 1 + 2)")
print("  POST /process-claims-batch      - Batch processing")
print("  GET  /model-info                - Model information")
print("\n[AUTO] AUTOMATIC PROCESSING ENDPOINTS (No manual input required):")
print("  POST /auto-process-claim        - Auto-process single claim")
print("  POST /auto-process-batch        - Auto-process multiple claims")
print("  POST /auto-process-csv          - Auto-process claims from CSV file")
print("  GET  /auto-stats                - Get processing statistics")
print("\n[DB] MONGODB INTEGRATION:")
print("  - All auto-processed claims stored in MongoDB")
print("  - Automatic validation, approval, and payout calculation")
print("  - Statistics and audit logs available via /auto-stats")
print("="*80)
print("✅ API READY TO SERVE REQUESTS")
print("="*80 + "\n")

# ================================
# HEALTH CHECK
# ================================

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for monitoring.
    """
    return jsonify({
        'status': 'healthy',
        'models_loaded': models_loaded,
        'timestamp': datetime.now().isoformat()
    }), 200


# ================================
# STAGE 1: DISRUPTION DETECTION
# ================================

@app.route('/detect-disruption', methods=['POST'])
def detect_disruption():
    """
    Stage 1: Detect if a disruption has occurred and worker is eligible for claim.
    
    Input format:
    {
        "disruption_type": "Heavy Rain",
        "disruption_intensity": "High",
        "weather_condition": "Rainy",
        "pollution_index": "Low",
        "platform": "Zomato",
        "city": "Bangalore",
        "delivery_type": "Food Delivery",
        "zone_safety_score": 65,
        "gps_accuracy_percent": 98.5
    }
    
    Output:
    {
        "eligible": true/false,
        "eligibility_score": 0.85,
        "processed_at": "2026-04-17T10:30:00",
        "status": "success"
    }
    """
    try:
        if not models_loaded:
            return jsonify({'error': 'Models not loaded'}), 500
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Prepare input dataframe
        input_df = pd.DataFrame([data])
        
        # Validate required features
        required_features = model_config['disruption_features']
        missing_features = [f for f in required_features if f not in input_df.columns]
        
        if missing_features:
            return jsonify({
                'error': f'Missing features: {missing_features}',
                'required': required_features
            }), 400
        
        # Select only required features in correct order
        input_df = input_df[required_features]
        
        # Encode categorical columns
        for col in model_config['disruption_categorical']:
            if col in label_encoders_disruption:
                try:
                    input_df[col] = label_encoders_disruption[col].transform(input_df[col].astype(str))
                except ValueError:
                    # Handle unseen categories
                    input_df[col] = 0
        
        # Make prediction
        disruption_pred = disruption_model.predict(input_df)[0]
        disruption_proba = disruption_model.predict_proba(input_df)[0]
        
        eligibility_score = float(disruption_proba[1])  # Probability of eligible class
        
        return jsonify({
            'eligible': bool(disruption_pred),
            'eligibility_score': round(eligibility_score, 4),
            'confidence': {
                'not_eligible': round(float(disruption_proba[0]), 4),
                'eligible': round(float(disruption_proba[1]), 4)
            },
            'processed_at': datetime.now().isoformat(),
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ================================
# STAGE 2: CALCULATE CLAIM AMOUNT
# ================================

@app.route('/calculate-claim', methods=['POST'])
def calculate_claim():
    """
    Stage 2: Calculate the parametric payout amount for eligible claims.
    
    Input format:
    {
        "eligible": true,  // From stage 1
        "income_loss_percentage": 35,
        "days_worked_weekly": 5,
        "avg_delivery_distance_km": 3.2,
        "customer_rating": 4.7,
        "weekly_avg_earnings": 8500,
        "experience_months": 24,
        "age_group": "25-35",
        "claim_fraud_indicator": false
    }
    
    Output:
    {
        "eligible": true,
        "estimated_payout": 2975.00,
        "calculation_breakdown": {...},
        "status": "success"
    }
    """
    try:
        if not models_loaded:
            return jsonify({'error': 'Models not loaded'}), 500
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Check eligibility
        if not data.get('eligible', False):
            return jsonify({
                'eligible': False,
                'estimated_payout': 0.00,
                'reason': 'Not eligible for parametric payout',
                'status': 'ineligible'
            }), 200
        
        # Prepare input dataframe
        input_df = pd.DataFrame([data])
        
        # Validate required features
        required_features = model_config['claim_features']
        missing_features = [f for f in required_features if f not in input_df.columns]
        
        if missing_features:
            return jsonify({
                'error': f'Missing features: {missing_features}',
                'required': required_features
            }), 400
        
        # Select only required features in correct order
        input_df = input_df[required_features]
        
        # Encode categorical columns
        for col in model_config['claim_categorical']:
            if col in label_encoders_claim:
                try:
                    input_df[col] = label_encoders_claim[col].transform(input_df[col].astype(str))
                except ValueError:
                    input_df[col] = 0
        
        # Make prediction
        claim_amount = float(claim_model.predict(input_df)[0])
        
        # Ensure payout is reasonable (min ₹0, linked to income loss)
        income_loss_percentage = data.get('income_loss_percentage', 0)
        weekly_earnings = data.get('weekly_avg_earnings', 0)
        
        # Maximum payout: 100% of the loss percentage
        max_payout = (income_loss_percentage / 100) * weekly_earnings
        
        # Apply safety bounds
        final_payout = max(0, min(claim_amount, max_payout))
        
        return jsonify({
            'eligible': True,
            'estimated_payout': round(final_payout, 2),
            'calculation_breakdown': {
                'model_prediction': round(claim_amount, 2),
                'income_loss_percentage': income_loss_percentage,
                'weekly_earnings': weekly_earnings,
                'max_theoretical_payout': round(max_payout, 2),
                'final_payout': round(final_payout, 2)
            },
            'processed_at': datetime.now().isoformat(),
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ================================
# END-TO-END: CLAIM PROCESSING
# ================================

@app.route('/process-claim', methods=['POST'])
def process_claim():
    """
    Complete claim processing pipeline (Stage 1 + Stage 2).
    
    Single endpoint that combines disruption detection and claim calculation.
    
    Input format:
    {
        "worker_id": "W0001",
        "disruption_type": "Heavy Rain",
        "disruption_intensity": "High",
        "weather_condition": "Rainy",
        "pollution_index": "Low",
        "platform": "Zomato",
        "city": "Bangalore",
        "delivery_type": "Food Delivery",
        "zone_safety_score": 65,
        "gps_accuracy_percent": 98.5,
        "income_loss_percentage": 35,
        "days_worked_weekly": 5,
        "avg_delivery_distance_km": 3.2,
        "customer_rating": 4.7,
        "weekly_avg_earnings": 8500,
        "experience_months": 24,
        "age_group": "25-35",
        "claim_fraud_indicator": false
    }
    """
    try:
        if not models_loaded:
            return jsonify({'error': 'Models not loaded'}), 500
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        worker_id = data.get('worker_id', 'UNKNOWN')
        
        # ========== STAGE 1: DISRUPTION DETECTION ==========
        disruption_input = {
            'disruption_type': data.get('disruption_type'),
            'disruption_intensity': data.get('disruption_intensity'),
            'weather_condition': data.get('weather_condition'),
            'pollution_index': data.get('pollution_index'),
            'platform': data.get('platform'),
            'city': data.get('city'),
            'delivery_type': data.get('delivery_type'),
            'zone_safety_score': data.get('zone_safety_score'),
            'gps_accuracy_percent': data.get('gps_accuracy_percent')
        }
        
        disruption_df = pd.DataFrame([disruption_input])
        
        # Validate disruption features
        disruption_required = model_config['disruption_features']
        if not all(f in disruption_df.columns for f in disruption_required):
            return jsonify({'error': 'Missing disruption detection features'}), 400
        
        disruption_df = disruption_df[disruption_required]
        
        # Encode disruption features
        for col in model_config['disruption_categorical']:
            if col in label_encoders_disruption:
                try:
                    disruption_df[col] = label_encoders_disruption[col].transform(disruption_df[col].astype(str))
                except ValueError:
                    disruption_df[col] = 0
        
        disruption_pred = disruption_model.predict(disruption_df)[0]
        disruption_proba = disruption_model.predict_proba(disruption_df)[0]
        is_eligible = bool(disruption_pred)
        
        # ========== EARLY RETURN IF NOT ELIGIBLE ==========
        if not is_eligible:
            return jsonify({
                'worker_id': worker_id,
                'claim_eligible': False,
                'disruption_result': {
                    'eligible': False,
                    'eligibility_score': round(float(disruption_proba[1]), 4)
                },
                'claim_result': {
                    'status': 'rejected',
                    'reason': 'No eligible disruption detected',
                    'payout': 0.00
                },
                'processed_at': datetime.now().isoformat(),
                'status': 'success'
            }), 200
        
        # ========== STAGE 2: CLAIM AMOUNT CALCULATION ==========
        claim_input = {
            'income_loss_percentage': data.get('income_loss_percentage'),
            'days_worked_weekly': data.get('days_worked_weekly'),
            'avg_delivery_distance_km': data.get('avg_delivery_distance_km'),
            'customer_rating': data.get('customer_rating'),
            'weekly_avg_earnings': data.get('weekly_avg_earnings'),
            'experience_months': data.get('experience_months'),
            'age_group': data.get('age_group'),
            'claim_fraud_indicator': data.get('claim_fraud_indicator')
        }
        
        claim_df = pd.DataFrame([claim_input])
        
        # Validate claim features
        claim_required = model_config['claim_features']
        if not all(f in claim_df.columns for f in claim_required):
            return jsonify({'error': 'Missing claim calculation features'}), 400
        
        claim_df = claim_df[claim_required]
        
        # Encode claim features
        for col in model_config['claim_categorical']:
            if col in label_encoders_claim:
                try:
                    claim_df[col] = label_encoders_claim[col].transform(claim_df[col].astype(str))
                except ValueError:
                    claim_df[col] = 0
        
        claim_amount = float(claim_model.predict(claim_df)[0])
        
        # Apply safety bounds
        income_loss_percentage = data.get('income_loss_percentage', 0)
        weekly_earnings = data.get('weekly_avg_earnings', 0)
        max_payout = (income_loss_percentage / 100) * weekly_earnings
        final_payout = max(0, min(claim_amount, max_payout))
        
        # ========== RETURN COMPLETE RESULT ==========
        return jsonify({
            'worker_id': worker_id,
            'claim_eligible': True,
            'disruption_result': {
                'type': data.get('disruption_type'),
                'intensity': data.get('disruption_intensity'),
                'eligible': True,
                'eligibility_score': round(float(disruption_proba[1]), 4)
            },
            'claim_result': {
                'status': 'approved',
                'estimated_payout': round(final_payout, 2),
                'calculation': {
                    'model_prediction': round(claim_amount, 2),
                    'income_loss_percentage': income_loss_percentage,
                    'weekly_earnings': weekly_earnings,
                    'max_possible_payout': round(max_payout, 2),
                    'final_payout': round(final_payout, 2)
                }
            },
            'processed_at': datetime.now().isoformat(),
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


# ================================
# BATCH PROCESSING
# ================================

@app.route('/process-claims-batch', methods=['POST'])
def process_claims_batch():
    """
    Batch process multiple claims simultaneously.
    
    Input format:
    {
        "workers": [
            {...claim data 1...},
            {...claim data 2...}
        ]
    }
    """
    try:
        if not models_loaded:
            return jsonify({'error': 'Models not loaded'}), 500
        
        data = request.get_json()
        if not data or 'workers' not in data:
            return jsonify({'error': 'No workers provided'}), 400
        
        workers_data = data['workers']
        results = []
        
        for worker_data in workers_data:
            # Create inline request and process
            with app.test_request_context(
                json=worker_data,
                method='POST'
            ):
                result = process_claim()
                if result[1] == 200:
                    results.append(json.loads(result[0].get_data(as_text=True)))
        
        return jsonify({
            'total_processed': len(results),
            'results': results,
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ================================
# MODEL INFO ENDPOINT
# ================================

@app.route('/model-info', methods=['GET'])
def model_info():
    """
    Get information about the trained models.
    """
    try:
        with open('model_metrics.json', 'r') as f:
            metrics = json.load(f)
        
        return jsonify({
            'models': {
                'disruption_detection': {
                    'type': 'RandomForestClassifier',
                    'n_estimators': 150,
                    'features': model_config['disruption_features'],
                    'categorical_features': model_config['disruption_categorical']
                },
                'claim_calculator': {
                    'type': 'RandomForestRegressor',
                    'n_estimators': 150,
                    'features': model_config['claim_features'],
                    'categorical_features': model_config['claim_categorical']
                }
            },
            'performance_metrics': metrics,
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ================================
# ERROR HANDLERS
# ================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


# ================================
# AUTOMATIC CLAIMS PROCESSING
# ================================

@app.route('/auto-process-claim', methods=['POST'])
def auto_process_claim():
    """
    Automatically process a single claim with auto-validation and approval.
    No manual intervention required.
    
    Input format:
    {
        "worker_id": "W0001",
        "platform": "Zomato",
        "city": "Bangalore",
        "weekly_avg_earnings": 8500,
        "disruption_type": "Heavy Rain",
        "disruption_intensity": "High",
        "income_loss_percentage": 40,
        ...other fields...
    }
    """
    try:
        if not models_loaded or not processor_ready:
            return jsonify({'error': 'Service not ready'}), 503
        
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Step 1: Create claim record in MongoDB
        claim_record = processor.create_claim(data, auto_validate=True)
        if not claim_record:
            return jsonify({
                'error': 'Claim validation failed',
                'status': 'validation_failed'
            }), 400
        
        # Step 2: Process through ML pipeline
        disruption_input = {
            'disruption_type': data.get('disruption_type'),
            'disruption_intensity': data.get('disruption_intensity'),
            'weather_condition': data.get('weather_condition', 'Unknown'),
            'pollution_index': data.get('pollution_index', 'Normal'),
            'platform': data.get('platform'),
            'city': data.get('city'),
            'delivery_type': data.get('delivery_type', 'Other'),
            'zone_safety_score': data.get('zone_safety_score', 70),
            'gps_accuracy_percent': data.get('gps_accuracy_percent', 95)
        }
        
        disruption_df = pd.DataFrame([disruption_input])
        disruption_required = model_config['disruption_features']
        disruption_df = disruption_df[disruption_required]
        
        for col in model_config['disruption_categorical']:
            if col in label_encoders_disruption:
                try:
                    disruption_df[col] = label_encoders_disruption[col].transform(
                        disruption_df[col].astype(str)
                    )
                except ValueError:
                    disruption_df[col] = 0
        
        disruption_pred = disruption_model.predict(disruption_df)[0]
        disruption_proba = disruption_model.predict_proba(disruption_df)[0]
        disruption_score = float(disruption_proba[1])
        
        if not disruption_pred:
            # Auto-reject
            approval = processor.auto_approve_claim(
                claim_record,
                disruption_score,
                0.0,
                approval_threshold=0.6
            )
            
            return jsonify({
                'claim_id': claim_record['claim_id'],
                'worker_id': claim_record['worker_id'],
                'auto_processed': True,
                'status': 'rejected',
                'disruption_score': disruption_score,
                'payout_approved': 0.0,
                'reason': 'No eligible disruption detected - auto-rejected',
                'approval_id': approval['approval_id'],
                'timestamp': datetime.utcnow().isoformat()
            }), 200
        
        # Step 3: Calculate payout
        claim_input = {
            'income_loss_percentage': data.get('income_loss_percentage', 0),
            'days_worked_weekly': data.get('days_worked_weekly', 6),
            'avg_delivery_distance_km': data.get('avg_delivery_distance_km', 3),
            'customer_rating': data.get('customer_rating', 4.5),
            'weekly_avg_earnings': data.get('weekly_avg_earnings', 0),
            'experience_months': data.get('experience_months', 0),
            'age_group': data.get('age_group', 'Unknown'),
            'claim_fraud_indicator': data.get('claim_fraud_indicator', False)
        }
        
        claim_df = pd.DataFrame([claim_input])
        claim_required = model_config['claim_features']
        claim_df = claim_df[claim_required]
        
        for col in model_config['claim_categorical']:
            if col in label_encoders_claim:
                try:
                    claim_df[col] = label_encoders_claim[col].transform(
                        claim_df[col].astype(str)
                    )
                except ValueError:
                    claim_df[col] = 0
        
        claim_amount = float(claim_model.predict(claim_df)[0])
        income_loss_percentage = data.get('income_loss_percentage', 0)
        weekly_earnings = data.get('weekly_avg_earnings', 0)
        max_payout = (income_loss_percentage / 100) * weekly_earnings
        final_payout = max(0, min(claim_amount, max_payout))
        
        # Step 4: Auto-approve based on criteria
        approval = processor.auto_approve_claim(
            claim_record,
            disruption_score,
            final_payout,
            approval_threshold=0.60
        )
        
        return jsonify({
            'claim_id': claim_record['claim_id'],
            'worker_id': claim_record['worker_id'],
            'auto_processed': True,
            'status': 'approved' if approval['approved'] else 'rejected',
            'disruption_score': round(disruption_score, 4),
            'payout_approved': round(approval['payout_approved'], 2),
            'disruption_details': {
                'type': data.get('disruption_type'),
                'intensity': data.get('disruption_intensity'),
                'score': round(disruption_score, 4)
            },
            'payout_calculation': {
                'model_prediction': round(claim_amount, 2),
                'max_theoretical': round(max_payout, 2),
                'final_approved': round(approval['payout_approved'], 2)
            },
            'approval_reason': approval['approval_reason'],
            'approval_id': approval['approval_id'],
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/auto-process-batch', methods=['POST'])
def auto_process_batch():
    """
    Automatically process multiple claims in batch.
    All claims validated, processed, and approved without manual intervention.
    
    Input format:
    {
        "claims": [
            {...claim 1...},
            {...claim 2...},
            ...
        ]
    }
    """
    try:
        if not models_loaded or not processor_ready:
            return jsonify({'error': 'Service not ready'}), 503
        
        data = request.get_json()
        if not data or 'claims' not in data:
            return jsonify({'error': 'No claims provided'}), 400
        
        claims_data = data['claims']
        claims_list = []
        disruption_scores = []
        payout_amounts = []
        
        print(f"\n[BATCH] AUTO BATCH PROCESSING: {len(claims_data)} claims")
        
        # Process each claim through ML pipeline
        for i, claim_data in enumerate(claims_data):
            try:
                # Create claim record
                claim_record = processor.create_claim(claim_data, auto_validate=True)
                if not claim_record:
                    print(f"  ❌ Claim {i+1}: Validation failed")
                    continue
                
                claims_list.append(claim_record)
                
                # Disruption detection
                disruption_input = {
                    'disruption_type': claim_data.get('disruption_type'),
                    'disruption_intensity': claim_data.get('disruption_intensity'),
                    'weather_condition': claim_data.get('weather_condition', 'Unknown'),
                    'pollution_index': claim_data.get('pollution_index', 'Normal'),
                    'platform': claim_data.get('platform'),
                    'city': claim_data.get('city'),
                    'delivery_type': claim_data.get('delivery_type', 'Other'),
                    'zone_safety_score': claim_data.get('zone_safety_score', 70),
                    'gps_accuracy_percent': claim_data.get('gps_accuracy_percent', 95)
                }
                
                disruption_df = pd.DataFrame([disruption_input])
                disruption_required = model_config['disruption_features']
                disruption_df = disruption_df[disruption_required]
                
                for col in model_config['disruption_categorical']:
                    if col in label_encoders_disruption:
                        try:
                            disruption_df[col] = label_encoders_disruption[col].transform(
                                disruption_df[col].astype(str)
                            )
                        except ValueError:
                            disruption_df[col] = 0
                
                disruption_proba = disruption_model.predict_proba(disruption_df)[0]
                disruption_score = float(disruption_proba[1])
                disruption_scores.append(disruption_score)
                
                # Claim amount calculation
                claim_input = {
                    'income_loss_percentage': claim_data.get('income_loss_percentage', 0),
                    'days_worked_weekly': claim_data.get('days_worked_weekly', 6),
                    'avg_delivery_distance_km': claim_data.get('avg_delivery_distance_km', 3),
                    'customer_rating': claim_data.get('customer_rating', 4.5),
                    'weekly_avg_earnings': claim_data.get('weekly_avg_earnings', 0),
                    'experience_months': claim_data.get('experience_months', 0),
                    'age_group': claim_data.get('age_group', 'Unknown'),
                    'claim_fraud_indicator': claim_data.get('claim_fraud_indicator', False)
                }
                
                claim_df = pd.DataFrame([claim_input])
                claim_required = model_config['claim_features']
                claim_df = claim_df[claim_required]
                
                for col in model_config['claim_categorical']:
                    if col in label_encoders_claim:
                        try:
                            claim_df[col] = label_encoders_claim[col].transform(
                                claim_df[col].astype(str)
                            )
                        except ValueError:
                            claim_df[col] = 0
                
                claim_amount = float(claim_model.predict(claim_df)[0])
                income_loss_percentage = claim_data.get('income_loss_percentage', 0)
                weekly_earnings = claim_data.get('weekly_avg_earnings', 0)
                max_payout = (income_loss_percentage / 100) * weekly_earnings
                final_payout = max(0, min(claim_amount, max_payout))
                payout_amounts.append(final_payout)
                
                print(f"  ✓ Claim {i+1}: Processed (Score: {disruption_score:.2f}, Payout: ₹{final_payout:.2f})")
                
            except Exception as e:
                print(f"  ❌ Claim {i+1}: Error - {str(e)}")
                continue
        
        # Batch approval
        batch_result = processor.process_batch_claims(
            claims_list,
            disruption_scores,
            payout_amounts
        )
        
        print(f"\n[STATS] BATCH PROCESSING COMPLETE:")
        print(f"  Total: {batch_result['total_claims']}")
        print(f"  Approved: {batch_result['approved_claims']}")
        print(f"  Rejected: {batch_result['rejected_claims']}")
        print(f"  Total Payout: ₹{batch_result['total_payout']:.2f}\n")
        
        return jsonify({
            'batch_id': str(uuid.uuid4()),
            'auto_processed': True,
            'total_claims': batch_result['total_claims'],
            'processed_claims': batch_result['processed_claims'],
            'approved_claims': batch_result['approved_claims'],
            'rejected_claims': batch_result['rejected_claims'],
            'total_payout': round(batch_result['total_payout'], 2),
            'summary': batch_result['summary'],
            'claims_result': batch_result['claims'],
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/auto-stats', methods=['GET'])
def auto_stats():
    """
    Get statistics on auto-processed claims (from MongoDB).
    """
    try:
        if not processor_ready:
            return jsonify({
                'status': 'MongoDB not connected',
                'message': 'Statistics only available with MongoDB'
            }), 503
        
        stats = processor.get_processing_stats()
        
        return jsonify({
            'status': 'success',
            'statistics': stats,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/auto-process-csv', methods=['POST'])
def auto_process_csv():
    """
    Process claims from CSV file automatically.
    Upload CSV file with claims data and all will be auto-processed.
    
    Request format:
    - Upload file as 'file' parameter
    """
    try:
        if not models_loaded or not processor_ready:
            return jsonify({'error': 'Service not ready'}), 503
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'File must be CSV format'}), 400
        
        # Read CSV
        df = pd.read_csv(file)
        claims_data = df.to_dict('records')
        
        print(f"\n[CSV] PROCESSING CSV: {len(claims_data)} claims from {file.filename}")
        
        # Create batch request
        batch_request = {'claims': claims_data}
        
        # Process through batch endpoint
        with app.test_request_context(
            json=batch_request,
            method='POST'
        ):
            result = auto_process_batch()
            return result
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


# ================================
# MAIN
# ================================

# ==========================
# ======
# MAIN
# ================================
# App is served by Gunicorn in production
# Startup messages printed at module level above

