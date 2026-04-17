# GigShield Parametric Insurance - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd RecommendationSystemBackend
pip install -r requirements.txt
```

### Step 2: Train Models
```bash
python train_parametric_models.py
```

**Output:**
```
════════════════════════════════════════════════════════════════════════════════
PARAMETRIC INSURANCE MODEL TRAINING
════════════════════════════════════════════════════════════════════════════════

[STEP 1] Loading dataset...
Dataset shape: (5000, 31)

[STEP 2] Creating disruption eligibility labels...
Eligible claims: 3246 / 5000

[STEP 3] Data preprocessing...

[STEP 4] Feature engineering...
Disruption model - X shape: (5000, 9), y shape: (5000,)
Claim model - X shape: (3246, 8), y shape: (3246,)

[STEP 5] Encoding categorical variables...

[STEP 6] Train-test split...

[STEP 7] Training disruption detection model (Classification)...

--- Disruption Detection Model Performance ---
              precision    recall  f1-score   support
   Not Eligible       0.82      0.85      0.84      365
       Eligible       0.87      0.85      0.86      435

[STEP 8] Training claim amount calculator model (Regression)...

--- Claim Amount Calculator Model Performance ---
Mean Absolute Error: ₹245.50
R² Score: 0.7821

✅ PARAMETRIC INSURANCE MODELS TRAINED SUCCESSFULLY
════════════════════════════════════════════════════════════════════════════════

Generated files:
  - disruption_detection_model.pkl
  - claim_amount_model.pkl
  - label_encoders_disruption.pkl
  - label_encoders_claim.pkl
  - model_features.json
  - model_metrics.json
```

### Step 3: Start the API Server
```bash
python app.py
```

**Output:**
```
════════════════════════════════════════════════════════════════════════════════
Loading Parametric Insurance Models...
════════════════════════════════════════════════════════════════════════════════
✓ Disruption detection model loaded
✓ Claim amount model loaded
✓ Disruption encoders loaded
✓ Claim encoders loaded
✓ Feature mapping loaded
════════════════════════════════════════════════════════════════════════════════

════════════════════════════════════════════════════════════════════════════════
Starting Parametric Insurance API...
════════════════════════════════════════════════════════════════════════════════

Available endpoints:
  GET  /health                    - Health check
  POST /detect-disruption         - Stage 1: Disruption Detection
  POST /calculate-claim           - Stage 2: Claim Amount Calculation
  POST /process-claim             - Complete pipeline (Stage 1 + 2)
  POST /process-claims-batch      - Batch processing
  GET  /model-info                - Model information
════════════════════════════════════════════════════════════════════════════════
```

Server is ready at: `http://localhost:5000`

### Step 4: Test the API
```bash
# In a new terminal
python test_parametric_api.py
```

---

## 📋 Common Use Cases

### Use Case 1: Simple Eligibility Check
**Question:** "Is this worker eligible for a claim?"

```python
import requests

disruption_data = {
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 68,
    "gps_accuracy_percent": 99.1
}

response = requests.post(
    "http://localhost:5000/detect-disruption",
    json=disruption_data
)

result = response.json()
if result['eligible']:
    print(f"✅ Eligible for claim (Confidence: {result['eligibility_score']})")
else:
    print(f"❌ Not eligible (Confidence: {result['eligibility_score']})")
```

### Use Case 2: Calculate Payout Amount
**Question:** "How much should this worker receive?"

```python
claim_data = {
    "eligible": True,
    "income_loss_percentage": 35,
    "days_worked_weekly": 5,
    "avg_delivery_distance_km": 3.2,
    "customer_rating": 4.7,
    "weekly_avg_earnings": 8500,
    "experience_months": 24,
    "age_group": "25-35",
    "claim_fraud_indicator": False
}

response = requests.post(
    "http://localhost:5000/calculate-claim",
    json=claim_data
)

result = response.json()
payout = result['estimated_payout']
print(f"💰 Recommended payout: ₹{payout}")
print(f"Breakdown: {result['calculation_breakdown']}")
```

### Use Case 3: End-to-End Claim Processing
**Question:** "Should this worker get paid, and if yes, how much?"

```python
complete_data = {
    "worker_id": "W0001",
    # Stage 1: Disruption data
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 68,
    "gps_accuracy_percent": 99.1,
    # Stage 2: Worker/claim data
    "income_loss_percentage": 40,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.8,
    "weekly_avg_earnings": 9500,
    "experience_months": 28,
    "age_group": "25-35",
    "claim_fraud_indicator": False
}

response = requests.post(
    "http://localhost:5000/process-claim",
    json=complete_data
)

result = response.json()

if result['claim_eligible']:
    claim_result = result['claim_result']
    print(f"✅ CLAIM APPROVED")
    print(f"💰 Payout: ₹{claim_result['estimated_payout']}")
    print(f"Reason: {result['disruption_result']['type']} "
          f"({result['disruption_result']['intensity']})")
else:
    print(f"❌ CLAIM REJECTED")
    print(f"Reason: {result['claim_result']['reason']}")
```

### Use Case 4: Process Multiple Claims (Batch)
**Question:** "Process all pending claims from today"

```python
batch_data = {
    "workers": [
        {
            "worker_id": "W0001",
            "disruption_type": "Heavy Rain",
            ...  # all required fields
        },
        {
            "worker_id": "W0002",
            "disruption_type": "Flooding",
            ...  # all required fields
        },
        # More workers...
    ]
}

response = requests.post(
    "http://localhost:5000/process-claims-batch",
    json=batch_data
)

results = response.json()
print(f"Processed {results['total_processed']} claims")

for claim_result in results['results']:
    if claim_result['claim_eligible']:
        print(f"✅ {claim_result['worker_id']}: "
              f"₹{claim_result['claim_result']['estimated_payout']}")
    else:
        print(f"❌ {claim_result['worker_id']}: Rejected")
```

---

## 🔨 Frontend Integration Example (React/TypeScript)

### Service Layer
```typescript
// services/claimService.ts

const API_BASE_URL = "http://localhost:5000";

interface DisruptionInput {
  disruption_type: string;
  disruption_intensity: string;
  weather_condition: string;
  pollution_index: string;
  platform: string;
  city: string;
  delivery_type: string;
  zone_safety_score: number;
  gps_accuracy_percent: number;
}

interface ClaimInput {
  eligible: boolean;
  income_loss_percentage: number;
  days_worked_weekly: number;
  avg_delivery_distance_km: number;
  customer_rating: number;
  weekly_avg_earnings: number;
  experience_months: number;
  age_group: string;
  claim_fraud_indicator: boolean;
}

export const claimService = {
  async detectDisruption(data: DisruptionInput) {
    const response = await fetch(`${API_BASE_URL}/detect-disruption`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async calculateClaim(data: ClaimInput) {
    const response = await fetch(`${API_BASE_URL}/calculate-claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async processClaim(data: DisruptionInput & ClaimInput & { worker_id: string }) {
    const response = await fetch(`${API_BASE_URL}/process-claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getModelInfo() {
    const response = await fetch(`${API_BASE_URL}/model-info`);
    return response.json();
  },
};
```

### React Component
```typescript
// components/ClaimProcessor.tsx

import { useState } from "react";
import { claimService } from "../services/claimService";

export const ClaimProcessor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleProcessClaim = async (claimData: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await claimService.processClaim(claimData);
      setResult(result);

      if (result.claim_eligible) {
        const payout = result.claim_result.estimated_payout;
        alert(`✅ Claim Approved! Payout: ₹${payout}`);
      } else {
        alert(`❌ Claim Rejected: ${result.claim_result.reason}`);
      }
    } catch (err) {
      setError(err.message);
      alert("Error processing claim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form to collect claim data */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Collect form data and call handleProcessClaim
        }}
      >
        {/* Form fields */}
      </form>

      {/* Display result */}
      {result && (
        <div>
          <h3>Claim Result</h3>
          <p>Worker ID: {result.worker_id}</p>
          <p>Status: {result.claim_result.status}</p>
          {result.claim_eligible && (
            <p>Payout: ₹{result.claim_result.estimated_payout}</p>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## 🔄 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   GigShield Frontend (React)                │
│                     (The-Strawhats)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP POST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Flask API (Backend)                              │
│          (RecommendationSystemBackend)                      │
├─────────────────────────────────────────────────────────────┤
│  /process-claim endpoint                                    │
└────────┬─────────────────────────────────────────┬──────────┘
         │                                         │
         ▼                                         ▼
┌──────────────────────────┐       ┌──────────────────────────┐
│ STAGE 1: DISRUPTION      │       │ STAGE 2: CLAIM AMOUNT    │
│ DETECTION                │       │ CALCULATION              │
├──────────────────────────┤       ├──────────────────────────┤
│ RandomForestClassifier   │       │ RandomForestRegressor    │
├──────────────────────────┤       ├──────────────────────────┤
│ Input: 9 features        │       │ Input: 8 features        │
│ • disruption_type        │       │ • income_loss_%          │
│ • disruption_intensity   │       │ • days_worked_weekly     │
│ • weather_condition      │       │ • customer_rating        │
│ • pollution_index        │       │ • weekly_earnings        │
│ • platform, city, etc.   │       │ • experience_months      │
├──────────────────────────┤       ├──────────────────────────┤
│ Output:                  │       │ Output:                  │
│ • eligible: bool         │       │ • payout: float          │
│ • score: 0.0-1.0         │       │ • breakdown: dict        │
└──────────────────────────┘       └──────────────────────────┘
         │                                         │
         └─────────────────┬──────────────────────┘
                           │
                           ▼
                  ┌────────────────────┐
                  │  JSON Response     │
                  │  {                 │
                  │    worker_id,      │
                  │    claim_eligible, │
                  │    payout,         │
                  │    reasoning       │
                  │  }                 │
                  └────────────────────┘
```

---

## 📊 Response Examples

### ✅ Approved Claim
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
  }
}
```

### ❌ Rejected Claim
```json
{
  "worker_id": "W0002",
  "claim_eligible": false,
  "disruption_result": {
    "eligible": false,
    "eligibility_score": 0.22
  },
  "claim_result": {
    "status": "rejected",
    "reason": "No eligible disruption detected",
    "payout": 0.00
  }
}
```

---

## 📁 Project Structure

```
RecommendationSystemBackend/
├── app.py                          # Main Flask API
├── train_parametric_models.py      # Model training script
├── test_parametric_api.py          # Test suite
├── API_DOCUMENTATION.md            # Full API docs
├── QUICK_START.md                  # This file
├── requirements.txt                # Python dependencies
├── gig_workers_dataset_5000.csv    # Training data
└── generated files (after training):
    ├── disruption_detection_model.pkl
    ├── claim_amount_model.pkl
    ├── label_encoders_disruption.pkl
    ├── label_encoders_claim.pkl
    ├── model_features.json
    └── model_metrics.json
```

---

## 🐛 Troubleshooting

### Issue: "Models not loaded"
**Solution:** Run training script first
```bash
python train_parametric_models.py
```

### Issue: "Missing features" error
**Solution:** Ensure all required fields are included in API request
```python
# Get required fields
response = requests.get("http://localhost:5000/model-info")
model_info = response.json()
required_fields = model_info['models']['disruption_detection']['features']
```

### Issue: "Connection refused"
**Solution:** Start the API server first
```bash
python app.py
```

### Issue: "Port 5000 already in use"
**Solution:** Change port in app.py (last line)
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use 5001 instead
```

---

## 📈 Next Steps

1. **✅ Have:** Two trained models + API endpoints
2. **Next:** Integrate frontend with API
3. **Then:** Set up real-time disruption data feeds
4. **Later:** Add database persistence & payment integration
5. **Finally:** Deploy to production (AWS/Azure/GCP)

---

## 📞 Support

For API documentation, see: `API_DOCUMENTATION.md`
For test examples, see: `test_parametric_api.py`

