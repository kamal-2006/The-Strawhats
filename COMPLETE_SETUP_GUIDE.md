# GigShield Complete Setup Guide - Frontend & Backend Integration

## 🎯 Complete Setup in 3 Steps

### Step 1: Backend Setup (5 minutes)
### Step 2: Frontend Setup (3 minutes)  
### Step 3: Test Integration (2 minutes)

---

## 📋 Prerequisites

- **Python 3.9+** (for backend)
- **Node.js 18+** (for frontend)
- **npm or yarn** (package manager)
- **Two terminals** (one for backend, one for frontend)

---

## 🔙 Step 1: Backend Setup

### 1.1 Navigate to Backend Directory

```bash
cd RecommendationSystemBackend
```

### 1.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed Flask==3.1.0 flask-cors==4.0.0 scikit-learn==1.0.0 pandas==2.0.0 numpy==1.24.0...
```

### 1.3 Train the ML Models

```bash
python train_parametric_models.py
```

**Expected output:**
```
════════════════════════════════════════════════════════════════════════════════
PARAMETRIC INSURANCE MODEL TRAINING
════════════════════════════════════════════════════════════════════════════════

[STEP 1] Loading dataset...
Dataset shape: (5000, 31)
Eligible claims: 3246 / 5000

[STEP 2] Creating disruption eligibility labels...
[STEP 3] Data preprocessing...
[STEP 4] Feature engineering...
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

✅ **Verify** - Check that these files were created:
```bash
ls -la *.pkl *.json
```

You should see 6 files created.

### 1.4 Start the API Server

```bash
python app.py
```

**Expected output:**
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

 * Running on http://0.0.0.0:5000
 * Press CTRL+C to quit
 * Restarting with stat reloader
 * Debugger is active!
 * Debugger PIN: ###-###-###
```

✅ **API is running on**: `http://localhost:5000`

**Keep this terminal running! ⚠️ Do not close it.**

---

## 🎨 Step 2: Frontend Setup

### 2.1 Open a NEW Terminal

Open a new terminal/PowerShell window **in the same project root**.

### 2.2 Navigate to Frontend Directory

```bash
cd The-Strawhats
```

### 2.3 Install Dependencies

```bash
npm install
```

**Expected output:**
```
added XXX packages in X.XXs
```

### 2.4 Verify Environment Configuration

Check that `.env.local` file exists with correct API URL:

```bash
cat .env.local
```

**Expected content:**
```env
# GigShield API Configuration
VITE_API_URL=http://localhost:5000

# Optional: API timeout in milliseconds
VITE_API_TIMEOUT=30000

# Optional: Enable debug logging
VITE_DEBUG_API=true
```

✅ If file doesn't exist or has wrong URL, update it:
```env
VITE_API_URL=http://localhost:5000
```

### 2.5 Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help

  ➜ Web ready on http://localhost:5173/
```

✅ **Frontend is running on**: `http://localhost:5173`

**Keep this terminal running too! ⚠️ Do not close it.**

---

## 🧪 Step 3: Test the Integration

### 3.1 Open Browser

Open your web browser and go to:
```
http://localhost:5173/claims
```

You should see the **Claim Processor** interface with the form.

### 3.2 Check API Connection

Look at the browser console (F12 → Console tab). You should see:
```
🔌 Claim Service initialized with API URL: http://localhost:5000
```

### 3.3 Fill in Test Data

Use these values to test:

**Worker Information**
- Worker ID: `W0001`
- Platform: `Zomato`
- City: `Bangalore`
- Delivery Type: `Food Delivery`
- Age Group: `25-35`
- Experience: `24` months

**Stage 1: Disruption Detection**
- Disruption Type: `Heavy Rain`
- Intensity: `High`
- Weather: `Rainy`
- Pollution Index: `Low`
- Zone Safety Score: `68`
- GPS Accuracy: `98.5%`

**Stage 2: Claim Calculation**
- Income Loss: `40%` (use slider)
- Days Worked: `6`
- Delivery Distance: `3.5` km
- Customer Rating: `4.7`
- Weekly Earnings: `9500` ₹
- Fraud Indicator: `unchecked`

### 3.4 Submit the Claim

Click the **"Process Claim"** button.

### 3.5 Expected Result

Should see a response like:

```
✅ CLAIM APPROVED
₹2847.50

Stage 1 Result
Type: Heavy Rain
Intensity: High
Eligibility: 87%

Show Calculation Breakdown
Model prediction: ₹3100.00
Income loss percentage: 40
Weekly earnings: ₹9500
Max possible payout: ₹3400.00
Final payout: ₹2847.50
```

### 3.6 Check Backend Logs

Look at the backend terminal. You should see:

```
🔍 Detecting disruption...
✅ Disruption detection result: {...}
📋 Processing complete claim...
✅ Claim processing result: {...}
```

✅ **Integration Complete!** Both frontend and backend are communicating successfully.

---

## 🎨 Test Different Scenarios

Try these scenarios to verify the system:

### Scenario 1: Eligible Claim (Approved)
- Disruption Type: `Heavy Rain` (High intensity)
- Income Loss: `40%`
- **Expected**: Approved with payout

### Scenario 2: No Disruption (Rejected)
- Disruption Type: `Clear Day` (Low intensity)
- **Expected**: Rejected (no eligible disruption)

### Scenario 3: High Risk Location
- City: `Kolkata` or `Mumbai`
- Disruption Type: `Flooding` (High)
- Zone Safety: `50` (low)
- **Expected**: Higher payout due to risk

### Scenario 4: Low Risk Worker
- Customer Rating: `4.9` (high)
- Experience: `48` months (high)
- Income Loss: `10%` (low)
- **Expected**: Lower but stable payout

---

## ✅ Verification Checklist

After setup, verify these all work:

### Backend Checks

```bash
# 1. Test health endpoint
curl http://localhost:5000/health

# Expected:
# {"status":"healthy","models_loaded":true,"timestamp":"..."}

# 2. Test disruption detection
curl -X POST http://localhost:5000/detect-disruption \
  -H "Content-Type: application/json" \
  -d '{"disruption_type":"Heavy Rain","disruption_intensity":"High","weather_condition":"Rainy","pollution_index":"Low","platform":"Zomato","city":"Bangalore","delivery_type":"Food Delivery","zone_safety_score":68,"gps_accuracy_percent":98.5}'

# Expected: eligibility score between 0-1

# 3. Check model info
curl http://localhost:5000/model-info
```

### Frontend Checks

- [ ] Claims page loads (`/claims`)
- [ ] Form accepts all inputs
- [ ] Submit button processes claim
- [ ] Results display correctly
- [ ] API messages appear in console
- [ ] Handle API errors gracefully

### API Connectivity

- [ ] Backend runs on `http://localhost:5000`
- [ ] Frontend connects to backend
- [ ] No CORS errors in console
- [ ] requests/responses logged
- [ ] Models loaded successfully

---

## 🚨 Troubleshooting

### Issue: "API Server is not available"

**Solution:**
1. Check backend terminal - is it still running?
2. If not, restart: `python app.py`
3. Verify API URL in `.env.local`: `http://localhost:5000`
4. Check firewall isn't blocking port 5000

### Issue: "Models not loaded"

**Solution:**
1. Check if training completed: `ls -la *.pkl`
2. If files missing, retrain: `python train_parametric_models.py`
3. Restart backend: `python app.py`

### Issue: "Missing features" Error

**Solution:**
1. Fill in ALL form fields
2. Check none are empty (especially disruption type and earnings)
3. Verify data types match (numbers aren't text, etc.)

### Issue: Frontend shows blank page

**Solution:**
1. Ensure frontend is running: `npm run dev`
2. Check console (F12) for errors
3. Verify port 5173 is open (check different port if needed)
4. Clear browser cache: Ctrl+Shift+Delete

### Issue: "Connection refused"

**Solution:**
1. Make sure both terminals are running
2. Don't close the terminals while testing
3. If closed accidentally, restart both
4. Verify URLs match: `localhost:5000` (backend), `localhost:5173` (frontend)

---

## 📊 What's Running

After successful setup, you should have:

```
┌─────────────────────────────────────────────────┐
│ Terminal 1: Backend API                         │
│ Location: RecommendationSystemBackend/          │
│ Command: python app.py                          │
│ Port: 5000                                      │
│ Status: ✅ Running                              │
│ URL: http://localhost:5000                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Terminal 2: Frontend Dev Server                 │
│ Location: The-Strawhats/                        │
│ Command: npm run dev                            │
│ Port: 5173                                      │
│ Status: ✅ Running                              │
│ URL: http://localhost:5173                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Browser                                         │
│ Navigate to: http://localhost:5173/claims       │
│ Status: ✅ Connected                            │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure After Setup

```
guidwire/
├── RecommendationSystemBackend/
│   ├── app.py                          ← Main API server
│   ├── train_parametric_models.py      ← Training script
│   ├── gig_workers_dataset_5000.csv    ← Training data
│   ├── disruption_detection_model.pkl  ← Trained model 1
│   ├── claim_amount_model.pkl          ← Trained model 2
│   ├── label_encoders_*.pkl            ← Encoders
│   ├── model_features.json             ← Feature mapping
│   ├── model_metrics.json              ← Performance metrics
│   └── ... (other files)
│
└── The-Strawhats/
    ├── src/app/
    │   ├── services/
    │   │   ├── claimService.ts         ← API CLIENT (NEW)
    │   │   └── insuranceEngine.ts
    │   ├── components/
    │   │   ├── ClaimProcessor.tsx      ← FORM UI (NEW)
    │   │   ├── Navbar.tsx              ← Updated
    │   │   └── ... (other components)
    │   ├── routes.tsx                  ← Updated
    │   └── ... (other files)
    ├── .env.local                      ← API CONFIG (NEW)
    ├── package.json
    ├── vite.config.ts
    └── ... (other files)
```

---

## 🎯 Next Steps After Setup

1. **Test with different scenarios** - Try various claim types
2. **Review the API docs** - See `API_DOCUMENTATION.md`
3. **Check system architecture** - See `SYSTEM_ARCHITECTURE.md`
4. **Run test suite** - See `test_parametric_api.py`
5. **Customize the UI** - Add your branding/changes
6. **Deploy to production** - Configure production URLs
7. **Set up monitoring** - Add logging and analytics
8. **Add payment integration** - Connect UPI/bank for payouts

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `RecommendationSystemBackend/API_DOCUMENTATION.md` | Complete API reference |
| `RecommendationSystemBackend/SYSTEM_ARCHITECTURE.md` | Technical architecture |
| `RecommendationSystemBackend/QUICK_START.md` | Backend quick start |
| `The-Strawhats/FRONTEND_API_INTEGRATION.md` | Frontend integration guide |
| This file | Complete setup guide |

---

## ✅ Success Indicators

You know everything is working when:

✅ Backend terminal shows: `Running on http://0.0.0.0:5000`  
✅ Frontend terminal shows: `Local: http://localhost:5173`  
✅ Browser loads: `/claims` page  
✅ Form submits without errors  
✅ Results display with calculated payout  
✅ Console shows API logs  
✅ No error messages appear  

---

## 🆘 Emergency Troubleshooting

### If something breaks:

1. **Stop everything** - Press Ctrl+C in both terminals
2. **Close browser** - Completely close and reopen
3. **Check ports** - Ensure 5000 and 5173 aren't used elsewhere
4. **Clear cache** - Clear browser cache and cookies
5. **Restart everything**:
   - Terminal 1: `python app.py`
   - Terminal 2: `npm run dev`
6. **Reopen browser** - Go to `http://localhost:5173/claims`

### Still not working?

Check these in order:

```bash
# 1. Verify backend is running
curl -v http://localhost:5000/health

# 2. Verify models are trained
ls -la RecommendationSystemBackend/*.pkl

# 3. Check frontend dev server
curl -v http://localhost:5173/

# 4. Check .env.local file
cat The-Strawhats/.env.local

# 5. View backend logs (look for errors)
# Check the backend terminal output

# 6. View frontend console logs
# Press F12 in browser and check Console tab
```

---

## 🎉 You're All Set!

Congratulations! Your GigShield parametric insurance platform is now fully operational with frontend and backend properly integrated.

**Happy testing! 🚀**

---

## 📞 Quick Reference

| Need | Command | Terminal |
|------|---------|----------|
| Start Backend | `python app.py` | Terminal 1 |
| Start Frontend | `npm run dev` | Terminal 2 |
| Train Models | `python train_parametric_models.py` | Terminal 1 (before app.py) |
| Test API | `curl http://localhost:5000/health` | Separate terminal |
| View Frontend | `http://localhost:5173/claims` | Browser |
| View Backend Logs | Check Terminal 1 | Terminal 1 |
| View Frontend Logs | Press F12 → Console | Browser |

