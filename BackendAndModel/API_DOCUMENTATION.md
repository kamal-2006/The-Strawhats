# GigShield Parametric Insurance API Documentation

## Overview

This is a **parametric insurance API** that processes gig worker claims in a two-stage pipeline:

1. **Stage 1: Disruption Detection** - Identify if an external disruption occurred
2. **Stage 2: Claim Amount Calculation** - Calculate automatic payout based on income loss

---

## Architecture

### Traditional Insurance vs. Parametric Insurance

| Aspect | Traditional | Parametric |
|--------|-----------|-----------|
| **Trigger** | Worker submits manual claim with proof | External data source (weather, pollution) |
| **Verification** | Manual review required | Automated data verification |
| **Processing** | Days/weeks | Seconds/minutes |
| **Payout** | Variable, requires assessment | **Fixed/automatic** based on disruption severity |

---

## Models

### Model 1: Disruption Detection (Classification)
- **Type**: RandomForestClassifier
- **Target**: Is worker eligible for claim?
- **Input Features**: 9 disruption-related features
- **Output**: Eligible (Yes/No) + Confidence Score

### Model 2: Claim Amount Calculator (Regression)
- **Type**: RandomForestRegressor  
- **Target**: What amount should worker receive?
- **Input Features**: 8 worker/disruption impact features
- **Output**: Payout amount (₹)

---

## API Endpoints

### 1. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "models_loaded": true,
  "timestamp": "2026-04-17T10:30:00.123456"
}
```

---

### 2. Disruption Detection (Stage 1)
```
POST /detect-disruption
```

**Request:**
```json
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
```

**Response (Eligible):**
```json
{
  "eligible": true,
  "eligibility_score": 0.8734,
  "confidence": {
    "not_eligible": 0.1266,
    "eligible": 0.8734
  },
  "processed_at": "2026-04-17T10:30:00.123456",
  "status": "success"
}
```

**Response (Not Eligible):**
```json
{
  "eligible": false,
  "eligibility_score": 0.3421,
  "confidence": {
    "not_eligible": 0.6579,
    "eligible": 0.3421
  },
  "processed_at": "2026-04-17T10:30:00.123456",
  "status": "success"
}
```

---

### 3. Claim Amount Calculation (Stage 2)
```
POST /calculate-claim
```

**Request:**
```json
{
  "eligible": true,
  "income_loss_percentage": 35,
  "days_worked_weekly": 5,
  "avg_delivery_distance_km": 3.2,
  "customer_rating": 4.7,
  "weekly_avg_earnings": 8500,
  "experience_months": 24,
  "age_group": "25-35",
  "claim_fraud_indicator": false
}
```

**Response (Approved):**
```json
{
  "eligible": true,
  "estimated_payout": 2847.50,
  "calculation_breakdown": {
    "model_prediction": 3100.00,
    "income_loss_percentage": 35,
    "weekly_earnings": 8500,
    "max_theoretical_payout": 2975.00,
    "final_payout": 2847.50
  },
  "processed_at": "2026-04-17T10:30:00.123456",
  "status": "success"
}
```

**Response (Not Eligible):**
```json
{
  "eligible": false,
  "estimated_payout": 0.00,
  "reason": "Not eligible for parametric payout",
  "status": "ineligible"
}
```

---

### 4. Complete Claim Processing Pipeline (Stage 1 + 2)
```
POST /process-claim
```

**Request (Combined all features):**
```json
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
```

**Response (Approved):**
```json
{
  "worker_id": "W0001",
  "claim_eligible": true,
  "disruption_result": {
    "type": "Heavy Rain",
    "intensity": "High",
    "eligible": true,
    "eligibility_score": 0.8734
  },
  "claim_result": {
    "status": "approved",
    "estimated_payout": 2847.50,
    "calculation": {
      "model_prediction": 3100.00,
      "income_loss_percentage": 35,
      "weekly_earnings": 8500,
      "max_possible_payout": 2975.00,
      "final_payout": 2847.50
    }
  },
  "processed_at": "2026-04-17T10:30:00.123456",
  "status": "success"
}
```

**Response (Rejected):**
```json
{
  "worker_id": "W0001",
  "claim_eligible": false,
  "disruption_result": {
    "eligible": false,
    "eligibility_score": 0.3421
  },
  "claim_result": {
    "status": "rejected",
    "reason": "No eligible disruption detected",
    "payout": 0.00
  },
  "processed_at": "2026-04-17T10:30:00.123456",
  "status": "success"
}
```

---

### 5. Batch Claim Processing
```
POST /process-claims-batch
```

**Request:**
```json
{
  "workers": [
    {
      "worker_id": "W0001",
      "disruption_type": "Heavy Rain",
      ...
    },
    {
      "worker_id": "W0002", 
      "disruption_type": "Pollution Spike",
      ...
    }
  ]
}
```

**Response:**
```json
{
  "total_processed": 2,
  "results": [
    {...claim result 1...},
    {...claim result 2...}
  ],
  "status": "success"
}
```

---

### 6. Model Information
```
GET /model-info
```

**Response:**
```json
{
  "models": {
    "disruption_detection": {
      "type": "RandomForestClassifier",
      "n_estimators": 150,
      "features": [
        "disruption_type",
        "disruption_intensity",
        "weather_condition",
        "pollution_index",
        "platform",
        "city",
        "delivery_type",
        "zone_safety_score",
        "gps_accuracy_percent"
      ],
      "categorical_features": [
        "disruption_type",
        "disruption_intensity",
        "weather_condition",
        "pollution_index",
        "platform",
        "city",
        "delivery_type"
      ]
    },
    "claim_calculator": {
      "type": "RandomForestRegressor",
      "n_estimators": 150,
      "features": [
        "income_loss_percentage",
        "days_worked_weekly",
        "avg_delivery_distance_km",
        "customer_rating",
        "weekly_avg_earnings",
        "experience_months",
        "age_group",
        "claim_fraud_indicator"
      ],
      "categorical_features": [
        "age_group",
        "claim_fraud_indicator"
      ]
    }
  },
  "performance_metrics": {
    "disruption_model": {
      "accuracy": 0.8456,
      "eligible_precision": 0.8234
    },
    "claim_model": {
      "mae": 245.50,
      "r2_score": 0.7821,
      "training_samples": 4000
    }
  },
  "status": "success"
}
```

---

## Eligible Disruption Types

```
✓ Extreme Conditions
✓ Flooding
✓ Heat Wave
✓ Extreme Heat
✓ Extreme Heat Wave
✓ Zone Lockdown
✓ Extreme Rain
✓ Flash Flood
✓ Heavy Pollution
✓ Pollution Spike
✓ Street Closure
✓ Heavy Rain
✓ Curfew Lockdown
✓ App Crash
✓ Internet Outage
✓ Strike
```

---

## Valid Values

### Age Groups
- 20-25
- 25-35
- 35-45
- 45-55
- 55-65

### Platforms
- Zomato
- Swiggy
- Zepto
- Amazon
- Flipkart

### Cities
- Bangalore, Mumbai, Delhi, Chennai, Pune, Hyderabad, Kolkata, Ahmedabad, etc.

### Weather Conditions
- Clear, Cloudy, Rainy, Very Hot, Hazy, Very Hazy

### Pollution Index
- Low, Medium, High, Very High, Severe

### Disruption Intensity
- Low, Medium, High, Very High

### Claim Fraud Indicator
- true (1)
- false (0)

---

## Error Handling

### Missing Models
```json
{
  "error": "Models not loaded",
  "status": "error"
}
```
**Solution:** Run `python train_parametric_models.py` first

### Missing Features
```json
{
  "error": "Missing features: ['disruption_type', 'weather_condition']",
  "required": ["disruption_type", "disruption_intensity", ...]
}
```
**Solution:** Ensure all required fields are provided in request

### Invalid Input
```json
{
  "error": "No input data provided"
}
```
**Solution:** Send valid JSON in request body

---

## Setup & Installation

### 1. Train Models
```bash
cd RecommendationSystemBackend
python train_parametric_models.py
```

This generates:
- `disruption_detection_model.pkl`
- `claim_amount_model.pkl`
- `label_encoders_disruption.pkl`
- `label_encoders_claim.pkl`
- `model_features.json`
- `model_metrics.json`

### 2. Start API Server
```bash
python app.py
```

Server runs on: `http://0.0.0.0:5000`

### 3. Test Endpoints
See `test_parametric_api.py` for complete test examples

---

## Performance Metrics

### Disruption Detection Model
- **Accuracy**: ~85%
- **Eligible Precision**: ~82%
- **Training Samples**: 4000

### Claim Calculator Model
- **Mean Absolute Error**: ₹245.50
- **R² Score**: 0.7821
- **Training Samples**: 4000 (eligible claims only)

---

## Response Times

- Health check: <10ms
- Disruption detection: 20-50ms
- Claim calculation: 30-80ms
- Complete pipeline: 80-150ms
- Batch (100 claims): 2-4 seconds

---

## Key Features

✅ **Fast Processing** - Automatic claims in seconds
✅ **Transparent Calculation** - Full breakdown of payout logic
✅ **Fraud Protection** - Fraud indicator included in analysis
✅ **Batch Support** - Process multiple claims simultaneously
✅ **Production Ready** - Error handling, validation, monitoring
✅ **Parametric Model** - No manual claims needed
✅ **Fair Payouts** - Based on actual income loss, not arbitrary amounts

---

## Next Steps

1. Integrate frontend with `/process-claim` endpoint
2. Set up real-time disruption data feeds (weather API, pollution index API)
3. Implement worker authentication & authorization
4. Add database persistence for claims
5. Create admin dashboard for claim monitoring
6. Set up automated payouts via UPI/bank transfers

