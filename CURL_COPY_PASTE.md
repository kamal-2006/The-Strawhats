# Postman - Copy & Paste CURL Commands

## 1. HEALTH CHECK (Test Backend is Running)

### Copy this entire curl command:

```bash
curl -X GET http://localhost:5000/health -H "Content-Type: application/json"
```

### In Postman:
1. Create NEW request
2. Click **...** at top → **Paste as cURL**
3. Paste the command above
4. Click **Import**
5. Click **Send**

---

## 2. AUTO-PROCESS SINGLE CLAIM (Most Common Use)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "W0001",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
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
    "customer_rating": 4.7,
    "claim_fraud_indicator": false
  }'
```

---

## 3. AUTO-PROCESS BATCH (3 Claims)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-batch \
  -H "Content-Type: application/json" \
  -d '{
    "claims": [
      {
        "worker_id": "W0001",
        "platform": "Zomato",
        "city": "Bangalore",
        "delivery_type": "Food Delivery",
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
        "customer_rating": 4.7,
        "claim_fraud_indicator": false
      },
      {
        "worker_id": "W0002",
        "platform": "Flipkart",
        "city": "Mumbai",
        "delivery_type": "Parcel Delivery",
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
        "customer_rating": 4.8,
        "claim_fraud_indicator": false
      },
      {
        "worker_id": "W0003",
        "platform": "Uber Eats",
        "city": "Delhi",
        "delivery_type": "Food Delivery",
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
        "customer_rating": 4.5,
        "claim_fraud_indicator": false
      }
    ]
  }'
```

---

## 4. GET STATISTICS (From MongoDB)

### Copy entire command:

```bash
curl -X GET http://localhost:5000/auto-stats -H "Content-Type: application/json"
```

---

## 5. APPROVED CLAIM SCENARIO

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "APPROVED_001",
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
    "customer_rating": 4.7,
    "claim_fraud_indicator": false
  }'
```

**Result**: ✅ APPROVED with payout ~₹2847

---

## 6. REJECTED CLAIM SCENARIO (No Disruption)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "REJECTED_001",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "weekly_avg_earnings": 8500,
    "disruption_type": "Clear Day",
    "disruption_intensity": "Low",
    "income_loss_percentage": 5,
    "weather_condition": "Sunny",
    "pollution_index": "Low",
    "gps_accuracy_percent": 98.5,
    "zone_safety_score": 85,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.7,
    "claim_fraud_indicator": false
  }'
```

**Result**: ❌ REJECTED - No eligible disruption

---

## 7. FRAUD FLAG SCENARIO

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "FRAUD_001",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
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
    "customer_rating": 4.7,
    "claim_fraud_indicator": true
  }'
```

**Result**: ❌ REJECTED - Fraud indicator present

---

## 8. HIGH EXPERIENCE WORKER (Higher Payout)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "SENIOR_001",
    "platform": "Uber Eats",
    "city": "Pune",
    "delivery_type": "Food Delivery",
    "age_group": "35-45",
    "experience_months": 48,
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
    "claim_fraud_indicator": false
  }'
```

**Result**: ✅ APPROVED - Higher payout due to seniority

---

## 9. HIGH-RISK LOCATION (Flooding)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "RISK_001",
    "platform": "Flipkart",
    "city": "Kolkata",
    "delivery_type": "Parcel Delivery",
    "age_group": "30-40",
    "experience_months": 36,
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

**Result**: ✅ APPROVED - High disruption score

---

## 10. BULK BATCH (10 CLAIMS)

### Copy entire command:

```bash
curl -X POST http://localhost:5000/auto-process-batch \
  -H "Content-Type: application/json" \
  -d '{
    "claims": [
      {"worker_id": "B0001", "platform": "Zomato", "city": "Bangalore", "delivery_type": "Food Delivery", "weekly_avg_earnings": 8500, "disruption_type": "Heavy Rain", "disruption_intensity": "High", "income_loss_percentage": 40, "weather_condition": "Rainy", "pollution_index": "Low", "gps_accuracy_percent": 98.5, "zone_safety_score": 68, "days_worked_weekly": 6, "avg_delivery_distance_km": 3.5, "customer_rating": 4.7, "claim_fraud_indicator": false},
      {"worker_id": "B0002", "platform": "Flipkart", "city": "Mumbai", "delivery_type": "Parcel Delivery", "weekly_avg_earnings": 9500, "disruption_type": "Flooding", "disruption_intensity": "High", "income_loss_percentage": 50, "weather_condition": "Rainy", "pollution_index": "Normal", "gps_accuracy_percent": 97.2, "zone_safety_score": 55, "days_worked_weekly": 5, "avg_delivery_distance_km": 4.2, "customer_rating": 4.8, "claim_fraud_indicator": false},
      {"worker_id": "B0003", "platform": "Uber Eats", "city": "Delhi", "delivery_type": "Food Delivery", "weekly_avg_earnings": 7200, "disruption_type": "Dust Storm", "disruption_intensity": "Medium", "income_loss_percentage": 30, "weather_condition": "Dusty", "pollution_index": "High", "gps_accuracy_percent": 96.0, "zone_safety_score": 72, "days_worked_weekly": 7, "avg_delivery_distance_km": 2.8, "customer_rating": 4.5, "claim_fraud_indicator": false},
      {"worker_id": "B0004", "platform": "Zomato", "city": "Hyderabad", "delivery_type": "Food Delivery", "weekly_avg_earnings": 8000, "disruption_type": "Heavy Rain", "disruption_intensity": "Medium", "income_loss_percentage": 25, "weather_condition": "Rainy", "pollution_index": "Normal", "gps_accuracy_percent": 97.0, "zone_safety_score": 75, "days_worked_weekly": 6, "avg_delivery_distance_km": 3.2, "customer_rating": 4.6, "claim_fraud_indicator": false},
      {"worker_id": "B0005", "platform": "Swiggy", "city": "Chennai", "delivery_type": "Food Delivery", "weekly_avg_earnings": 7800, "disruption_type": "Extreme Heat", "disruption_intensity": "High", "income_loss_percentage": 35, "weather_condition": "Sunny", "pollution_index": "Normal", "gps_accuracy_percent": 96.5, "zone_safety_score": 70, "days_worked_weekly": 6, "avg_delivery_distance_km": 3.0, "customer_rating": 4.4, "claim_fraud_indicator": false},
      {"worker_id": "B0006", "platform": "Flipkart", "city": "Kolkata", "delivery_type": "Parcel Delivery", "weekly_avg_earnings": 8500, "disruption_type": "Flooding", "disruption_intensity": "High", "income_loss_percentage": 45, "weather_condition": "Rainy", "pollution_index": "High", "gps_accuracy_percent": 95.0, "zone_safety_score": 52, "days_worked_weekly": 5, "avg_delivery_distance_km": 4.0, "customer_rating": 4.3, "claim_fraud_indicator": false},
      {"worker_id": "B0007", "platform": "Zomato", "city": "Pune", "delivery_type": "Food Delivery", "weekly_avg_earnings": 7500, "disruption_type": "Heavy Rain", "disruption_intensity": "Low", "income_loss_percentage": 15, "weather_condition": "Rainy", "pollution_index": "Low", "gps_accuracy_percent": 98.0, "zone_safety_score": 78, "days_worked_weekly": 6, "avg_delivery_distance_km": 2.9, "customer_rating": 4.8, "claim_fraud_indicator": false},
      {"worker_id": "B0008", "platform": "Uber Eats", "city": "Bengaluru", "delivery_type": "Food Delivery", "weekly_avg_earnings": 8200, "disruption_type": "Clear Day", "disruption_intensity": "Low", "income_loss_percentage": 5, "weather_condition": "Sunny", "pollution_index": "Low", "gps_accuracy_percent": 98.5, "zone_safety_score": 85, "days_worked_weekly": 6, "avg_delivery_distance_km": 3.3, "customer_rating": 4.9, "claim_fraud_indicator": false},
      {"worker_id": "B0009", "platform": "Swiggy", "city": "Ahmedabad", "delivery_type": "Food Delivery", "weekly_avg_earnings": 7000, "disruption_type": "Dust Storm", "disruption_intensity": "High", "income_loss_percentage": 40, "weather_condition": "Dusty", "pollution_index": "Very High", "gps_accuracy_percent": 94.0, "zone_safety_score": 65, "days_worked_weekly": 6, "avg_delivery_distance_km": 3.1, "customer_rating": 4.2, "claim_fraud_indicator": false},
      {"worker_id": "B0010", "platform": "Zomato", "city": "Chandigarh", "delivery_type": "Food Delivery", "weekly_avg_earnings": 6800, "disruption_type": "Severe Cold", "disruption_intensity": "High", "income_loss_percentage": 38, "weather_condition": "Freezing", "pollution_index": "Low", "gps_accuracy_percent": 97.5, "zone_safety_score": 75, "days_worked_weekly": 5, "avg_delivery_distance_km": 2.7, "customer_rating": 4.4, "claim_fraud_indicator": false}
    ]
  }'
```

**Result**: ✅ Processes all 10 claims in one request

---

## HOW TO USE IN POSTMAN

### Method 1: Paste as cURL (Easiest)
1. Open Postman
2. Click **+** to create new request
3. Click **...** → **Paste as cURL**
4. Copy the entire curl command from above
5. Paste it
6. Click **Import**
7. Click **Send**

### Method 2: Manual Entry
1. Click **+** new request
2. Select **POST**
3. Paste URL: `http://localhost:5000/auto-process-claim`
4. Click **Body** → **raw** → **JSON**
5. Copy JSON from inside the `-d '{...}'` part
6. Paste it
7. Click **Send**

---

## WHAT TO EXPECT

### Approved Claim Response
```json
{
  "status": "approved",
  "payout_approved": 2847.50,
  "approval_reason": "Automatic approval"
}
```

### Rejected Claim Response
```json
{
  "status": "rejected",
  "payout_approved": 0.00,
  "approval_reason": "No eligible disruption detected"
}
```

### Batch Processing Response
```json
{
  "total_claims": 10,
  "approved_claims": 7,
  "rejected_claims": 3,
  "total_payout": 19932.50
}
```

---

## QUICK COMPARISON

| Request | Approvals | Rejections | Total Payout |
|---------|-----------|-----------|--------------|
| Single Claim | 1 | 0 | ₹2847 |
| Batch (3) | 3 | 0 | ₹8542 |
| Bulk (10) | ~7 | ~3 | ₹19,932 |

---

## NOTES

- ✅ All claims are **automatically processed** - no manual intervention
- ✅ All claims are **automatically validated**
- ✅ All claims are **automatically approved/rejected**
- ✅ All claims are **stored in MongoDB**
- ✅ All data is **automatically calculated** - no manual payouts
- ✅ **No additional steps required**

---

**That's it!** Just copy → paste → send!

