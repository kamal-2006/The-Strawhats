# GigShield - Postman CURL Commands Reference
## Complete API Endpoints for Automatic Claims Processing

**Base URL**: `http://localhost:5000`

---

## 1. HEALTH CHECK

### Health Check
```bash
curl -X GET http://localhost:5000/health \
  -H "Content-Type: application/json"
```

---

## 2. AUTOMATIC CLAIM PROCESSING (No Manual Input Required)

### 1. Auto-Process Single Claim
**Endpoint**: `/auto-process-claim`  
**Method**: POST  
**Description**: Automatically validates, processes, and approves single claim with no manual intervention

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "W0001",
    "worker_name": "Raj Kumar",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "age_group": "25-35",
    "experience_months": 24,
    "weekly_avg_earnings": 8500,
    "subscription_status": "active",
    "risk_score": 45,
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "income_loss_percentage": 40,
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "gps_accuracy_percent": 98.5,
    "zone_safety_score": 68,
    "claim_fraud_indicator": false,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.7
  }'
```

**Expected Response**:
```json
{
  "claim_id": "uuid",
  "worker_id": "W0001",
  "auto_processed": true,
  "status": "approved",
  "disruption_score": 0.87,
  "payout_approved": 2847.50,
  "approval_reason": "Automatic approval: disruption score 0.87, payout ₹2847.50",
  "timestamp": "2026-04-17T10:30:00.000000"
}
```

---

### 2. Auto-Process Multiple Claims (Batch)
**Endpoint**: `/auto-process-batch`  
**Method**: POST  
**Description**: Automatically process multiple claims in batch. Each claim auto-validated, processed, and approved.

```bash
curl -X POST http://localhost:5000/auto-process-batch \
  -H "Content-Type: application/json" \
  -d '{
    "claims": [
      {
        "worker_id": "W0001",
        "worker_name": "Raj Kumar",
        "platform": "Zomato",
        "city": "Bangalore",
        "delivery_type": "Food Delivery",
        "age_group": "25-35",
        "experience_months": 24,
        "weekly_avg_earnings": 8500,
        "disruption_type": "Heavy Rain",
        "disruption_intensity": "High",
        "income_loss_percentage": 40,
        "weather_condition": "Rainy",
        "pollution_index": "Low",
        "gps_accuracy_percent": 98.5,
        "zone_safety_score": 68,
        "days_worked_weekly": 6,
        "avg_delivery_distance_km": 3.5,
        "customer_rating": 4.7
      },
      {
        "worker_id": "W0002",
        "worker_name": "Priya Singh",
        "platform": "Flipkart",
        "city": "Mumbai",
        "delivery_type": "Parcel Delivery",
        "age_group": "30-40",
        "experience_months": 36,
        "weekly_avg_earnings": 9500,
        "disruption_type": "Flooding",
        "disruption_intensity": "High",
        "income_loss_percentage": 50,
        "weather_condition": "Rainy",
        "pollution_index": "Normal",
        "gps_accuracy_percent": 97.2,
        "zone_safety_score": 55,
        "days_worked_weekly": 5,
        "avg_delivery_distance_km": 4.2,
        "customer_rating": 4.8
      },
      {
        "worker_id": "W0003",
        "worker_name": "Arjun Patel",
        "platform": "Uber Eats",
        "city": "Delhi",
        "delivery_type": "Food Delivery",
        "age_group": "20-25",
        "experience_months": 12,
        "weekly_avg_earnings": 7200,
        "disruption_type": "Dust Storm",
        "disruption_intensity": "Medium",
        "income_loss_percentage": 30,
        "weather_condition": "Dusty",
        "pollution_index": "High",
        "gps_accuracy_percent": 96.0,
        "zone_safety_score": 72,
        "days_worked_weekly": 7,
        "avg_delivery_distance_km": 2.8,
        "customer_rating": 4.5
      }
    ]
  }'
```

**Expected Response**:
```json
{
  "batch_id": "uuid",
  "auto_processed": true,
  "total_claims": 3,
  "processed_claims": 3,
  "approved_claims": 3,
  "rejected_claims": 0,
  "total_payout": 8542.75,
  "summary": {
    "approval_rate": "100.0%",
    "average_payout": 2847.58,
    "total_approved": 3,
    "total_rejected": 0,
    "total_payout": 8542.75
  },
  "claims_result": [
    {
      "claim_id": "uuid",
      "worker_id": "W0001",
      "approved": true,
      "payout_approved": 2847.50,
      "reason": "Automatic approval..."
    }
  ],
  "timestamp": "2026-04-17T10:30:00.000000"
}
```

---

### 3. Get Processing Statistics (from MongoDB)
**Endpoint**: `/auto-stats`  
**Method**: GET  
**Description**: Retrieve processing statistics from MongoDB

```bash
curl -X GET http://localhost:5000/auto-stats \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "status": "success",
  "statistics": {
    "total_claims": 45,
    "total_approvals": 45,
    "total_logs": 12,
    "approved_count": 38,
    "rejected_count": 7,
    "average_approved_payout": 2856.42,
    "total_payout": 108543.96
  },
  "timestamp": "2026-04-17T10:30:00.000000"
}
```

---

## 3. MANUAL CLAIM PROCESSING (For Reference)

### Process Single Claim (Manual - Complete Pipeline)
```bash
curl -X POST http://localhost:5000/process-claim \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

---

## 4. STAGE 1: DISRUPTION DETECTION (Manual)

```bash
curl -X POST http://localhost:5000/detect-disruption \
  -H "Content-Type: application/json" \
  -d '{
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 65,
    "gps_accuracy_percent": 98.5
  }'
```

---

## 5. STAGE 2: CLAIM CALCULATION (Manual)

```bash
curl -X POST http://localhost:5000/calculate-claim \
  -H "Content-Type: application/json" \
  -d '{
    "income_loss_percentage": 35,
    "days_worked_weekly": 5,
    "avg_delivery_distance_km": 3.2,
    "customer_rating": 4.7,
    "weekly_avg_earnings": 8500,
    "experience_months": 24,
    "age_group": "25-35",
    "claim_fraud_indicator": false
  }'
```

---

## 6. MODEL INFORMATION

```bash
curl -X GET http://localhost:5000/model-info \
  -H "Content-Type: application/json"
```

---

## 7. BATCH PROCESSING (Manual)

```bash
curl -X POST http://localhost:5000/process-claims-batch \
  -H "Content-Type: application/json" \
  -d '{
    "workers": [
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
    ]
  }'
```

---

## TEST SCENARIOS FOR POSTMAN

### Scenario 1: Eligible Claim (Approved)
- Disruption: Heavy Rain (High intensity)
- Income Loss: 40%
- Zone Safety: 68
- Result: **APPROVED** ✓

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "TEST001",
    "platform": "Zomato",
    "city": "Bangalore",
    "weekly_avg_earnings": 9000,
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "income_loss_percentage": 40,
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "gps_accuracy_percent": 98,
    "zone_safety_score": 68,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.7,
    "claim_fraud_indicator": false
  }'
```

---

### Scenario 2: No Disruption (Rejected)
- Disruption: Clear Day (Low intensity)
- Result: **REJECTED** ✗

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "TEST002",
    "platform": "Zomato",
    "city": "Bangalore",
    "weekly_avg_earnings": 9000,
    "disruption_type": "Clear Day",
    "disruption_intensity": "Low",
    "income_loss_percentage": 5,
    "weather_condition": "Sunny",
    "pollution_index": "Low",
    "gps_accuracy_percent": 98,
    "zone_safety_score": 85,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.7,
    "claim_fraud_indicator": false
  }'
```

---

### Scenario 3: High-Risk Location (Variable Approval)
- Location: Kolkata or Mumbai
- Zone Safety: 50 (Low)
- Disruption: Flooding (High)

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "TEST003",
    "platform": "Flipkart",
    "city": "Kolkata",
    "weekly_avg_earnings": 8500,
    "disruption_type": "Flooding",
    "disruption_intensity": "High",
    "income_loss_percentage": 50,
    "weather_condition": "Rainy",
    "pollution_index": "High",
    "gps_accuracy_percent": 92,
    "zone_safety_score": 50,
    "days_worked_weekly": 5,
    "avg_delivery_distance_km": 4.2,
    "customer_rating": 4.5,
    "claim_fraud_indicator": false
  }'
```

---

### Scenario 4: Low-Risk Worker (High Payout)
- Experience: 48 months
- Rating: 4.9
- Income Loss: 10%

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "TEST004",
    "platform": "Uber Eats",
    "city": "Pune",
    "weekly_avg_earnings": 10000,
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "income_loss_percentage": 10,
    "weather_condition": "Rainy",
    "pollution_index": "Normal",
    "gps_accuracy_percent": 99,
    "zone_safety_score": 80,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.0,
    "customer_rating": 4.9,
    "claim_fraud_indicator": false,
    "experience_months": 48,
    "age_group": "30-40"
  }'
```

---

### Scenario 5: Fraud Flagged (Rejected)
- Fraud Indicator: true
- Result: **REJECTED** (50% penalty)

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "TEST005",
    "platform": "Zomato",
    "city": "Bangalore",
    "weekly_avg_earnings": 8500,
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "income_loss_percentage": 40,
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "gps_accuracy_percent": 98,
    "zone_safety_score": 68,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.7,
    "claim_fraud_indicator": true
  }'
```

---

## QUICK COPY-PASTE TEMPLATES FOR POSTMAN

### Method 1: Use Raw JSON Body
1. Open Postman
2. Create new REQUEST
3. Select **POST**
4. Paste URL: `http://localhost:5000/auto-process-claim`
5. Go to **Body** tab
6. Select **raw → JSON**
7. Paste the JSON payload
8. Click **Send**

### Method 2: Use curl directly in Terminal
```bash
# Copy any curl command above
# Open PowerShell/Terminal
# Paste and run
```

### Method 3: Import into Postman
1. **Tools → Import**
2. Paste raw text or URL
3. Select import option

---

## FIELD DEFINITIONS

### Worker Information Fields
- `worker_id`: Unique worker identifier (e.g., "W0001")
- `worker_name`: Worker name (optional)
- `platform`: Platform name ("Zomato", "Flipkart", "Uber Eats", etc.)
- `city`: City of operation
- `delivery_type`: Type of delivery ("Food Delivery", "Parcel Delivery", etc.)
- `age_group`: Age group ("20-25", "25-35", "30-40", etc.)
- `experience_months`: Months of experience
- `weekly_avg_earnings`: Average weekly earnings (₹)

### Disruption Fields
- `disruption_type`: Type ("Heavy Rain", "Flooding", "Dust Storm", etc.)
- `disruption_intensity`: Intensity level ("Low", "Medium", "High", "Severe")
- `weather_condition`: Weather ("Rainy", "Sunny", "Dusty", etc.)
- `pollution_index`: Pollution level ("Low", "Normal", "High")
- `zone_safety_score`: Safety score (0-100)
- `gps_accuracy_percent`: GPS accuracy percentage

### Claim Fields
- `income_loss_percentage`: Percentage of income lost (0-100)
- `days_worked_weekly`: Days worked per week (1-7)
- `avg_delivery_distance_km`: Average delivery distance
- `customer_rating`: Customer rating (0-5)
- `claim_fraud_indicator`: Fraud flag (true/false)
- `risk_score`: Risk score (0-100)

---

## STATUS CODES

| Code | Meaning |
|------|---------|
| 200 | Success - Claim processed and result returned |
| 400 | Bad Request - Missing or invalid fields |
| 500 | Server Error - Internal processing error |
| 503 | Service Unavailable - MongoDB or service not ready |

---

## RESPONSE STRUCTURE

All auto-processing responses include:
- `claim_id`: Unique claim identification number
- `worker_id`: Worker identifier
- `auto_processed`: Boolean indicating automatic processing
- `status`: "approved" or "rejected"
- `disruption_score`: Eligibility score (0-1)
- `payout_approved`: Approved payout amount
- `approval_reason`: Reason for approval/rejection
- `timestamp`: Processing timestamp

---

## HOW TO USE IN POSTMAN

### Import Collection (Recommended)
1. Create a new Postman Collection
2. Add each endpoint as a new request
3. Group by: Health Check, Auto-Processing, Manual Processing, etc.
4. Add test scripts to validate responses
5. Use environment variables for base URL

### Example Environment Setup
```json
{
  "base_url": "http://localhost:5000",
  "api_key": "your-api-key-here"
}
```

Then replace URLs with: `{{base_url}}/auto-process-claim`

---

## AUTOMATION WORKFLOW

### Full Automation Sequence:
```bash
# 1. Check health
curl -X GET http://localhost:5000/health

# 2. Process batch claims
curl -X POST http://localhost:5000/auto-process-batch \
  -H "Content-Type: application/json" \
  -d '{"claims": [...]}' > results.json

# 3. Get statistics
curl -X GET http://localhost:5000/auto-stats
```

---

**Last Updated**: April 17, 2026  
**API Version**: 1.0  
**Backend Status**: Running on port 5000  
**Database**: MongoDB Connected
