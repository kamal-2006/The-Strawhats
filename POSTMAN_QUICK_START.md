# Postman Quick Start Guide for GigShield API

## Setup Instructions

### Step 1: Open Postman

1. Launch Postman on your computer
2. Create a new **Collection** named "GigShield Auto Claims"

### Step 2: Create Environment Variables (Optional but Recommended)

1. Click **Environments** in the left panel
2. Click **+** to create new environment
3. Name it: `GigShield`
4. Add these variables:

```
Variable Name: base_url
Initial Value: http://localhost:5000
Current Value: http://localhost:5000

Variable Name: api_key
Initial Value: (leave blank if not needed)
Current Value: (leave blank if not needed)
```

5. Click **Save**
6. Select this environment from dropdown (top right)

---

## Quick Test: Health Check

### Method 1: Import from curl (Fastest)

1. Click **+** tab to create new request
2. Click **... → Paste as cURL**
3. Paste this:

```bash
curl -X GET http://localhost:5000/health \
  -H "Content-Type: application/json"
```

4. Click **Import**
5. Click **Send**

### Method 2: Manual Setup

1. Click **+ tab**
2. Select **GET** method
3. URL: `http://localhost:5000/health`
4. Click **Send**

**Expected Response** (Status: 200):
```json
{
  "status": "healthy",
  "models_loaded": true,
  "timestamp": "2026-04-17T10:30:00.123456"
}
```

---

## Auto-Process Single Claim (Most Important)

### Step 1: Create New Request

1. Click **+** tab
2. Name it: "Auto-Process Claim"
3. Select **POST**
4. URL: `http://localhost:5000/auto-process-claim`

### Step 2: Add Headers

1. Click **Headers** tab
2. Add:

```
Key: Content-Type
Value: application/json
```

### Step 3: Add Request Body

1. Click **Body** tab
2. Select **raw**
3. Select **JSON** from dropdown
4. Paste this JSON:

```json
{
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
}
```

### Step 4: Send Request

1. Click **Send** button
2. Check response in lower panel

**Expected Response** (Status: 200):
```json
{
  "claim_id": "550e8400-e29b-41d4-a716-446655440000",
  "worker_id": "W0001",
  "auto_processed": true,
  "status": "approved",
  "disruption_score": 0.87,
  "payout_approved": 2847.50,
  "disruption_details": {
    "type": "Heavy Rain",
    "intensity": "High",
    "score": 0.87
  },
  "payout_calculation": {
    "model_prediction": 3100.00,
    "max_theoretical": 3400.00,
    "final_approved": 2847.50
  },
  "approval_reason": "Automatic approval: disruption score 0.87, payout ₹2847.50",
  "approval_id": "550e8400-e29b-41d4-a716-446655440001",
  "timestamp": "2026-04-17T10:30:00.000000"
}
```

---

## Auto-Process Batch (Multiple Claims)

### Step 1: Create New Request

1. Click **+** tab
2. Name it: "Auto-Process Batch"
3. Select **POST**
4. URL: `http://localhost:5000/auto-process-batch`

### Step 2: Add Headers

1. **Headers** → Add:

```
Key: Content-Type
Value: application/json
```

### Step 3: Add Request Body

1. Click **Body** → **raw** → **JSON**
2. Paste:

```json
{
  "claims": [
    {
      "worker_id": "W0001",
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
    },
    {
      "worker_id": "W0002",
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
      "customer_rating": 4.8,
      "claim_fraud_indicator": false
    }
  ]
}
```

### Step 4: Send & View Results

Click **Send** to process all claims at once!

**Expected Response**:
```json
{
  "batch_id": "550e8400-e29b-41d4-a716-446655440002",
  "auto_processed": true,
  "total_claims": 2,
  "processed_claims": 2,
  "approved_claims": 2,
  "rejected_claims": 0,
  "total_payout": 5695.00,
  "summary": {
    "approval_rate": "100.0%",
    "average_payout": 2847.50,
    "total_approved": 2,
    "total_rejected": 0,
    "total_payout": 5695.00
  }
}
```

---

## Get Statistics

### Create Request

1. Click **+** tab
2. Name it: "Get Statistics"
3. Select **GET**
4. URL: `http://localhost:5000/auto-stats`
5. Click **Send**

**Response Shows MongoDB Statistics**:
```json
{
  "status": "success",
  "statistics": {
    "total_claims": 10,
    "total_approvals": 10,
    "total_logs": 2,
    "approved_count": 8,
    "rejected_count": 2,
    "average_approved_payout": 2856.42,
    "total_payout": 22851.36
  }
}
```

---

## Save as Collection

### Export & Share

1. **Right-click collection** → **Export**
2. Select format: **Collection v2.1**
3. Save as: `GigShield-AutoClaims.json`
4. Share with team!

---

## Tips & Tricks

### 1. Use Pre-request Scripts for Dynamic Data

Add this in **Pre-request Script** tab to auto-generate unique worker IDs:

```javascript
pm.environment.set("worker_id", "W" + Math.floor(Math.random() * 10000));
pm.environment.set("timestamp", new Date().toISOString());
```

Then use in body: `"worker_id": "{{worker_id}}"`

### 2. Use Tests to Validate Response

Add this in **Tests** tab:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains approval status", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Payout is valid number", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.payout_approved).to.be.a('number');
});
```

### 3. Create API Documentation

1. Click **...** → **Add description**
2. Add detailed endpoint documentation
3. Add examples for each scenario

---

## Common Issues & Solutions

### Issue: "Cannot connect to server"

**Solution:**
1. Check if backend is running: `python app.py` in terminal
2. Verify URL is: `http://localhost:5000`
3. Check firewall isn't blocking port 5000

### Issue: "Request timeout"

**Solution:**
1. Increase timeout in Postman settings
2. Settings → General → Request timeout (increase to 30000ms)

### Issue: "Invalid JSON"

**Solution:**
1. Use Postman's beautify feature:
   - Body tab → **...** → **Beautify**
2. Check all strings have quotes: `"field": "value"`
3. No trailing commas in JSON

### Issue: "403 Forbidden" or "401 Unauthorized"

**Solution:**
- Current API doesn't require authentication
- If error persists, check CORS settings
- Verify API is running in debug mode

---

## API Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success ✓ | Great! Your claim was processed |
| 400 | Bad Request | Check JSON format and required fields |
| 500 | Server Error | Check backend logs in terminal |
| 503 | Service Unavailable | MongoDB connection issue |

---

## Response Time Expectations

- **Single Claim**: 50-100ms
- **Batch (3 claims)**: 100-200ms
- **Batch (10+ claims)**: 200-500ms

---

## Next Steps

1. ✅ Test single claim: `GET /health` then `POST /auto-process-claim`
2. ✅ Test batch processing: `POST /auto-process-batch`
3. ✅ Check statistics: `GET /auto-stats`
4. ✅ Modify test data and iterate
5. ✅ Export collection for team sharing

---

## Documentation

- Full API Reference: `POSTMAN_CURL_COMMANDS.md`
- Setup Guide: `COMPLETE_SETUP_GUIDE.md`
- Architecture: `RecommendationSystemBackend/SYSTEM_ARCHITECTURE.md`

---

## Support

**Backend Running?** ✓  
**MongoDB Connected?** ✓  
**Models Trained?** ✓  
**Ready to Process Claims?** ✓✓✓

You're all set! Start with: **GET /health** then **POST /auto-process-claim**

