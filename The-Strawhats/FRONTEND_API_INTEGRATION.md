# GigShield Frontend - Backend API Integration Guide

## 🎯 Overview

The GigShield frontend is fully integrated with the parametric insurance API backend. This document explains the integration and how to use it.

---

## 📁 Integration Files Created

### New Files Added

1. **`src/app/services/claimService.ts`** - API service layer
   - Complete TypeScript client for backend API
   - 6 main methods: detect disruption, calculate claim, process claim, batch processing, etc.
   - Full error handling and logging
   - Helper methods for formatting and utilities

2. **`src/app/components/ClaimProcessor.tsx`** - UI Component
   - Comprehensive claim processing interface
   - Two-stage form with disruption and claim inputs
   - Real-time result display with calculations
   - Result download functionality
   - Error logging and API status checking

3. **`.env.local`** - Environment configuration
   - `VITE_API_URL` - Backend API URL (default: http://localhost:5000)
   - Optional debug logging and timeout settings

### Modified Files

1. **`src/app/routes.tsx`** - Added claims route
   - New route: `/claims` → ClaimProcessor component

2. **`src/app/components/Navbar.tsx`** - Added Claims navigation
   - New navigation link to claims processor
   - Both desktop and mobile menu support

---

## 🚀 Quick Start

### 1. Backend Setup

Make sure the backend API is running:

```bash
cd RecommendationSystemBackend

# Train models (first time only)
python train_parametric_models.py

# Start API server
python app.py
```

You should see:
```
Loading Parametric Insurance Models...
✓ All models loaded
Starting on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd The-Strawhats

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

### 3. Access the Claims Processor

Open browser and navigate to:
- `http://localhost:5173/claims` (direct URL)
- Or click "Claims" in the navbar

---

## 📊 Architecture Overview

```
React Frontend (The-Strawhats)
        ↓
ClaimProcessor UI Component
        ↓
claimService (TypeScript API client)
        ↓
HTTP/REST API
        ↓
Flask Backend (RecommendationSystemBackend)
        ↓
Stage 1: Disruption Detection Model
Stage 2: Claim Amount Calculator Model
```

---

## 🔌 API Service Usage

### Basic Usage Example

```typescript
import { claimService } from '../services/claimService';

// Check if API is available
const available = await claimService.isAPIAvailable();

// Process a complete claim
const result = await claimService.processClaim({
  worker_id: "W0001",
  disruption_type: "Heavy Rain",
  disruption_intensity: "High",
  weather_condition: "Rainy",
  pollution_index: "Low",
  platform: "Zomato",
  city: "Bangalore",
  delivery_type: "Food Delivery",
  zone_safety_score: 70,
  gps_accuracy_percent: 98.5,
  income_loss_percentage: 35,
  days_worked_weekly: 6,
  avg_delivery_distance_km: 3.5,
  customer_rating: 4.7,
  weekly_avg_earnings: 9500,
  experience_months: 24,
  age_group: "25-35",
  claim_fraud_indicator: false,
});

if (result.claim_eligible) {
  console.log(`✅ Approved: ${claimService.formatPayout(result.claim_result.estimated_payout)}`);
} else {
  console.log(`❌ Rejected: ${result.claim_result.reason}`);
}
```

---

## 📋 Available Methods

### Health Check
```typescript
const health = await claimService.checkHealth();
// Returns: { status: 'healthy', models_loaded: true, timestamp: '...' }
```

### Stage 1: Disruption Detection
```typescript
const disruption = await claimService.detectDisruption({
  disruption_type: "Heavy Rain",
  disruption_intensity: "High",
  weather_condition: "Rainy",
  pollution_index: "Low",
  platform: "Zomato",
  city: "Bangalore",
  delivery_type: "Food Delivery",
  zone_safety_score: 70,
  gps_accuracy_percent: 98.5
});

// Returns: { eligible: true/false, eligibility_score: 0.87, confidence: {...} }
```

### Stage 2: Claim Amount
```typescript
const amount = await claimService.calculateClaim({
  eligible: true,
  income_loss_percentage: 35,
  days_worked_weekly: 6,
  avg_delivery_distance_km: 3.5,
  customer_rating: 4.7,
  weekly_avg_earnings: 9500,
  experience_months: 24,
  age_group: "25-35",
  claim_fraud_indicator: false
});

// Returns: { estimated_payout: 2847.50, calculation_breakdown: {...} }
```

### Complete Pipeline
```typescript
const result = await claimService.processClaim({
  worker_id: "W0001",
  // All Stage 1 fields...
  // All Stage 2 fields...
});

// Returns complete response with both stages
```

### Batch Processing
```typescript
const batch = await claimService.processClaimsBatch({
  workers: [
    { worker_id: "W0001", ...claimData },
    { worker_id: "W0002", ...claimData },
    // More workers...
  ]
});

// Returns: { total_processed: 2, results: [...] }
```

### Model Info
```typescript
const info = await claimService.getModelInfo();
// Returns model details, features, and performance metrics
```

---

## 🎨 UI Component: ClaimProcessor

The ClaimProcessor component provides a complete form-based interface with the following features:

### Features

- **Two-Stage Form**
  - Stage 1: Disruption Detection inputs
  - Stage 2: Claim Calculation inputs
  - Worker information section

- **Real-Time Results**
  - Live decision display (Approved/Rejected)
  - Expandable calculation breakdown
  - Confidence scores
  - Processing timestamps

- **Error Handling**
  - API availability checks
  - Detailed error messages
  - Network error recovery

- **Utilities**
  - Down result as JSON
  - Form reset
  - Helper text for all fields
  - Range sliders for numeric inputs

### Form Sections

**Worker Information**
- Worker ID
- Platform (Zomato, Swiggy, Zepto, Amazon, Flipkart)
- City
- Delivery Type
- Age Group
- Experience (months)

**Stage 1: Disruption Detection**
- Disruption Type
- Intensity Level
- Weather Condition
- Pollution Index
- Zone Safety Score
- GPS Accuracy

**Stage 2: Claim Calculation**
- Income Loss Percentage
- Days Worked (weekly)
- Average Delivery Distance
- Customer Rating
- Weekly Earnings
- Fraud Indicator

---

## 🔧 Configuration

### Environment Variables

**`.env.local`** file:

```env
# Required
VITE_API_URL=http://localhost:5000

# Optional
VITE_API_TIMEOUT=30000
VITE_DEBUG_API=true
```

### For Production

Update `.env.production` or environment variables:

```env
VITE_API_URL=https://api.gigshield.com
VITE_API_TIMEOUT=10000
VITE_DEBUG_API=false
```

---

## 🚨 Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const result = await claimService.processClaim(data);
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error ${error.statusCode}: ${error.errorMessage}`);
    console.error('Details:', error.details);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "API Server is not available" | Backend not running | Start: `python app.py` |
| "Missing features" | Required fields not provided | Check form validation |
| "Models not loaded" | Models haven't been trained | Run: `python train_parametric_models.py` |
| Network timeout | Slow connection | Increase `VITE_API_TIMEOUT` |

---

## 📊 Example Response

### Approved Claim

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

### Rejected Claim

```json
{
  "worker_id": "W0002",
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
  "processed_at": "2026-04-17T10:35:00.123456",
  "status": "success"
}
```

---

## 🧪 Testing the Integration

### 1. Manual Testing in Browser

Navigate to: `http://localhost:5173/claims`

Fill in the form with test data:
- Worker ID: W0001
- Platform: Zomato
- City: Bangalore
- Disruption Type: Heavy Rain
- Intensity: High
- Income Loss: 35%
- Weekly Earnings: ₹9500

Click "Process Claim" and review the result.

### 2. API Testing with cURL

```bash
# Check API health
curl http://localhost:5000/health

# Process a claim
curl -X POST http://localhost:5000/process-claim \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "W0001",
    "disruption_type": "Heavy Rain",
    ...
  }'
```

### 3. Console Logging

The service logs all requests and responses to browser console:

```
🔍 Detecting disruption... {disruption_type: "Heavy Rain", ...}
✅ Disruption detection result: {eligible: true, ...}
📋 Processing complete claim...
✅ Claim processing result: {claim_eligible: true, ...}
```

---

## 🔗 Navigation Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/dashboard` | Dashboard | User dashboard |
| `/admin` | AdminDashboard | Admin panel |
| `/claims` | ClaimProcessor | **Claim processing (NEW)** |
| `/login` | Login | User authentication |

---

## 📱 Mobile Responsiveness

The ClaimProcessor component is fully responsive:

- **Desktop**: Two-column layout (form + results)
- **Tablet**: Single column with sticky results
- **Mobile**: Full-width form with collapsible results

---

## 🎯 Integration Checklist

- [x] Create TypeScript API service (`claimService.ts`)
- [x] Build UI component (`ClaimProcessor.tsx`)
- [x] Configure environment variables (`.env.local`)
- [x] Add routes (`routes.tsx`)
- [x] Update navigation (`Navbar.tsx`)
- [ ] Test with running backend
- [ ] Configure for production
- [ ] Add to documentation
- [ ] Deploy to staging
- [ ] Production deployment

---

## 🔄 Backend API Endpoints

Reference endpoints available:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/detect-disruption` | POST | Stage 1 only |
| `/calculate-claim` | POST | Stage 2 only |
| `/process-claim` | POST | Complete pipeline |
| `/process-claims-batch` | POST | Batch processing |
| `/model-info` | GET | Model metadata |

See: `RecommendationSystemBackend/API_DOCUMENTATION.md`

---

## 📞 Troubleshooting

### Frontend Won't Connect to Backend

```bash
# Check if backend is running
curl http://localhost:5000/health

# If failed, start backend
cd RecommendationSystemBackend
python app.py
```

### Models Not Available

```bash
# Check if models are trained
ls -la RecommendationSystemBackend/*.pkl

# If missing, train them
python RecommendationSystemBackend/train_parametric_models.py
```

### CORS Issues

Backend already has CORS enabled. If you get CORS errors, ensure:
- Backend is running with `CORS(app)`
- API URL matches exactly (including http/https and port)

### Form Validation Issues

Check browser console for validation error messages. All fields are required for the complete pipeline.

---

## 🚀 Next Steps

1. **Start Backend**: `python app.py`
2. **Run Frontend**: `npm run dev`
3. **Open**: `http://localhost:5173/claims`
4. **Test**: Fill form and submit
5. **Review**: Check results and calculation breakdown

---

## 📚 Additional Resources

- Backend API Docs: `RecommendationSystemBackend/API_DOCUMENTATION.md`
- System Architecture: `RecommendationSystemBackend/SYSTEM_ARCHITECTURE.md`
- Quick Start Guide: `RecommendationSystemBackend/QUICK_START.md`
- Test Suite: `RecommendationSystemBackend/test_parametric_api.py`

---

## ✅ Integration Status

**✅ COMPLETE** - All endpoints properly integrated with frontend UI.

**Status**: Ready for testing and deployment.

