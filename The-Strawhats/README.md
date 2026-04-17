# 🛵 GigShield Frontend - AI-Powered Parametric Income Insurance

> **DEVTrails 2026 | Phase 1 Submission**
> Protecting India's gig delivery workers from uncontrollable income disruptions through AI-powered parametric insurance.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Solution Overview](#-solution-overview)
4. [Technology Stack](#-technology-stack)
5. [Project Structure](#-project-structure)
6. [Getting Started](#-getting-started)
7. [Key Features](#-key-features)
8. [Architecture](#-architecture)
9. [API Integration](#-api-integration)
10. [Development Status](#-development-status)



---

## 🎯 Project Overview

**GigShield** is a parametric income insurance platform designed specifically for India's gig delivery workers (Zomato, Swiggy, Zepto, Amazon, etc.). This repository contains the **frontend React/TypeScript application** built with modern web technologies.

**The Problem:** Delivery workers face sudden income loss due to uncontrollable external disruptions (heavy rain, flooding, pollution, strikes, etc.) with zero safety net or financial buffer.

**The Solution:** GigShield provides automatic, hassle-free parametric insurance payouts triggered directly when verified disruptions prevent workers from earning.

---

## 🔥 Problem Statement

India's platform-based delivery partners are the backbone of the digital economy, yet they operate without any safety net:

- **No stable income:** Dependent entirely on daily deliveries
- **Zero buffer:** Missing even 2 days causes significant financial stress
- **Uncontrollable disruptions:** Weather events, pollution emergencies, strikes, flooding
- **No employer support:** Classified as independent contractors with no benefits
- **Manual paperwork:** Traditional insurance requires complex claim filing

When a red-alert rain floods Mumbai, a pollution emergency shuts down Delhi, or a sudden local strike closes a market zone, these workers don't earn. **No hours worked = no income.**

---

## 💡 Solution Overview

GigShield directly addresses this gap with a modern parametric insurance platform:

✅ **Weekly Subscriptions** - Flexible, affordable coverage on a weekly basis  
✅ **Automatic Triggers** - External disruptions monitored via real-time APIs  
✅ **Instant Payouts** - No claim filing, no paperwork, no delays  
✅ **AI-Powered** - Machine learning detects eligible claims automatically  
✅ **Mobile-First** - Designed for workers using primarily on smartphones  
✅ **UPI Integration** - Direct payout via existing payment method  
✅ **Regional Support** - Available in Indian regional languages  

**Coverage:** Lost income only  
**Exclusions:** Health insurance, life insurance, accidents, vehicle repair

### Persona: Rajan, 28, Bengaluru
- Earns ₹18,000–₹22,000/month
- Works 10–12 hours/day, 6 days/week
- Zero savings buffer
- Trusts UPI and WhatsApp
- Skeptical of complex insurance forms

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18+** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side navigation

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Icon library
- **Motion** - Animation library
- **Shadcn/ui** - Pre-built component collection

### State Management & Context
- **React Context API** - Global state management
- **Custom Hooks** - Insurance context, language context, theme context

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Vite** - Fast builds and hot module replacement

### Additional Libraries
- **date-fns** - Date manipulation
- **clsx** - Class name utilities
- **canvas-confetti** - Celebration animations
- **Embla Carousel** - Carousel component
- **Input OTP** - OTP input handling
- **Sonner** - Toast notifications

---

## 📁 Project Structure

```
The-Strawhats/
├── src/
│   ├── main.tsx                    # React app entry point
│   ├── app/
│   │   ├── App.tsx                 # Main app component with providers
│   │   ├── routes.tsx              # React Router configuration
│   │   ├── contexts/
│   │   │   ├── InsuranceContext.tsx    # Insurance state management
│   │   │   ├── LanguageContext.tsx     # Localization context
│   │   │   └── ThemeContext.tsx        # Dark/light mode theme
│   │   ├── components/
│   │   │   ├── ClaimProcessor.tsx      # **NEW** Two-stage claim form UI
│   │   │   ├── AutoClaimsDashboard.tsx # Dashboard view
│   │   │   ├── Navbar.tsx              # Navigation bar
│   │   │   ├── Layout.tsx              # Layout wrapper
│   │   │   ├── LoadingScreen.tsx       # Loading state
│   │   │   ├── AnimatedCounter.tsx     # Counter animation
│   │   │   ├── StatsBanner.tsx         # Statistics display
│   │   │   ├── Footer.tsx              # Footer component
│   │   │   ├── FeatureComparison.tsx   # Feature comparison table
│   │   │   ├── home/                   # Landing page sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ProblemSection.tsx
│   │   │   │   ├── SolutionSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── ScenariosSection.tsx
│   │   │   │   ├── AIFeaturesSection.tsx
│   │   │   │   ├── DashboardPreview.tsx
│   │   │   │   ├── PersonaSection.tsx
│   │   │   │   ├── PricingSection.tsx
│   │   │   │   ├── TrustSection.tsx
│   │   │   │   ├── NotificationsSection.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   ├── ui/                     # Shadcn/ui components
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ... (30+ UI components)
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Landing page
│   │   │   ├── Dashboard.tsx           # Main dashboard
│   │   │   ├── AdminDashboard.tsx      # Admin view
│   │   │   ├── Login.tsx               # Authentication
│   │   │   └── NotFound.tsx            # 404 page
│   │   ├── services/
│   │   │   ├── claimService.ts         # **NEW** Backend API client
│   │   │   └── insuranceEngine.ts      # Insurance logic
│   │   ├── types/
│   │   │   └── insurance.ts            # TypeScript interfaces
│   │   ├── data/
│   │   │   └── mockData.ts             # Mock data for development
│   │   └── utils/
│   │       └── unsplash.ts             # Image utilities
│   └── styles/
│       ├── index.css                   # Global styles
│       ├── fonts.css                   # Font definitions
│       ├── tailwind.css                # Tailwind CSS
│       └── theme.css                   # Theme variables
├── package.json                    # Dependencies
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.local                      # **NEW** Environment variables
├── FRONTEND_API_INTEGRATION.md      # **NEW** Integration guide
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5000` (see Backend Setup below)

### Installation

1. **Clone the repository** (if needed):
```bash
git clone <repository-url>
cd guidwire/The-Strawhats
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment** (create `.env.local` if not present):
```bash
VITE_API_URL=http://localhost:5000
```

4. **Start development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup (Required)

The frontend requires a running backend API. Set it up in a separate terminal:

```bash
cd ../BackendAndModel

# Install Python dependencies
pip install -r requirements.txt

# Train ML models (first time only)
python train_parametric_models.py

# Start API server
python app.py
```

**Verify:** Backend should be running at `http://localhost:5000`

### Build for Production

```bash
npm run build
```

Generated files will be in the `dist/` directory.

---

## ✨ Key Features

### 1. **Claims Processor Component** (`ClaimProcessor.tsx`)
- **Two-stage form interface** for disruption detection and claim calculation
- **Real-time validation** of input fields
- **Automatic calculations** with breakdown display
- **Result export** as JSON for documentation
- **Error handling** with user-friendly messages
- **Mobile-responsive** design

### 2. **Backend API Integration** (`claimService.ts`)
- **6 API methods** for complete pipeline:
  - `checkHealth()` - Verify backend is running
  - `detectDisruption()` - Stage 1 eligibility check
  - `calculateClaim()` - Stage 2 payout calculation
  - `processClaim()` - Complete process (both stages)
  - `processClaimsBatch()` - Batch claim processing
  - `getModelInfo()` - Model metadata
- **TypeScript interfaces** for type safety
- **Error handling** with custom `APIError` class
- **Automatic fallbacks** and retry logic

### 3. **Insurance Context System** (`InsuranceContext.tsx`)
- **Global state management** for insurance data
- **User profile** information
- **Active policies** and coverage details
- **Disruption signals** real-time monitoring
- **Claims history** tracking
- **Fraud detection** with warnings
- **Earnings protection** calculation

### 4. **Multi-Language Support** (`LanguageContext.tsx`)
- Support for regional Indian languages
- Easy switching between languages
- Translation context for UI

### 5. **Theme Support** (`ThemeContext.tsx`)
- Dark/light mode toggle
- Persistent theme preference
- System theme detection

### 6. **Navigation & Routing** (`routes.tsx`)
- **Home** - Landing page with product overview
- **Dashboard** - Main application dashboard
- **Claims** - Claim processor interface
- **Admin** - Administrative dashboard
- **Login** - Authentication page
- **404** - Not found page

### 7. **Responsive UI Components**
- Mobile-first design
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Fast load times with Vite

---

## 🏗️ Architecture

### Component Hierarchy

```
App (Root)
├── ThemeProvider
│   └── InsuranceProvider
│       └── RouterProvider
│           ├── Layout
│           │   ├── Navbar
│           │   ├── Routes
│           │   │   ├── Home (HeroSection, ProblemSection, etc.)
│           │   │   ├── Dashboard (AutoClaimsDashboard)
│           │   │   ├── ClaimProcessor (Claims page)
│           │   │   ├── AdminDashboard
│           │   │   ├── Login
│           │   │   └── NotFound
│           │   └── Footer
│           └── Toaster (Notifications)
```

### Data Flow

```
User Input (ClaimProcessor)
    ↓
claimService.processClaim()
    ↓
Flask API (http://localhost:5000)
    ├── Stage 1: Disruption Detection
    │   └── RandomForestClassifier (87% precision)
    └── Stage 2: Claim Amount Calculation
        └── RandomForestRegressor (R² = 0.7821)
    ↓
Response Processing
    ↓
UI Display & Result Export
```

### State Management

```
InsuranceContext
├── User Authentication
├── Policy Information
├── Active Disruptions
├── Claim History
├── Fraud Detection
└── Earnings Tracking
```

---

## 🔗 API Integration

### Backend API Endpoints

The frontend communicates with these backend endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/health` | Health check |
| `POST` | `/detect-disruption` | Stage 1: Check eligibility |
| `POST` | `/calculate-claim` | Stage 2: Calculate payout |
| `POST` | `/process-claim` | Combined: Both stages |
| `POST` | `/process-claims-batch` | Batch processing |
| `GET` | `/model-info` | Model metadata |

### Example Usage

```typescript
import { claimService } from '@/services/claimService';

// Check backend is running
const health = await claimService.checkHealth();

// Detect disruption (Stage 1)
const disruption = await claimService.detectDisruption({
  disruption_type: 'heavy_rain',
  disruption_intensity: 'severe',
  weather_condition: 'thunderstorm',
  pollution_index: 'safe',
  platform: 'zomato',
  city: 'bengaluru',
  delivery_type: 'express',
  zone_safety_score: 0.85,
  gps_accuracy_percent: 92,
});

// Calculate claim amount (Stage 2)
if (disruption.eligible) {
  const claim = await claimService.calculateClaim({
    eligible: true,
    income_loss_percentage: 75,
    days_worked_weekly: 6,
    avg_delivery_distance_km: 8.5,
    customer_rating: 4.8,
    weekly_avg_earnings: 5000,
    experience_months: 24,
    age_group: '25-35',
    claim_fraud_indicator: false,
  });
  
  console.log(`Payout: ₹${claim.estimated_payout}`);
}
```

### Environment Configuration

Set the API URL via environment variables:

```bash
# .env.local
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
VITE_DEBUG_MODE=false
```

For more details, see [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md).

---

## 📊 Development Status

### ✅ Completed

- [x] React TypeScript project setup with Vite
- [x] Routing with React Router
- [x] Global state management (Insurance Context)
- [x] Theming system (Dark/Light mode)
- [x] Multi-language support framework
- [x] Comprehensive UI component library (Shadcn/ui)
- [x] Landing page with all sections
- [x] Dashboard with statistics
- [x] Claims processor component (two-stage form)
- [x] Backend API service layer (claimService.ts)
- [x] Integration with ML models
- [x] Error handling and validation
- [x] Mobile-responsive design
- [x] Toast notifications (Sonner)
- [x] Loading states and animations
- [x] Result export functionality
- [x] Comprehensive documentation

### 🔄 In Progress / Future

- [ ] User authentication & onboarding flow
- [ ] OTP-based phone verification
- [ ] Policy purchase workflow
- [ ] Real-time disruption monitoring dashboard
- [ ] Claim history and status tracking
- [ ] Payment integration (UPI/Razorpay)
- [ ] Notifications (Email/SMS/WhatsApp)
- [ ] Admin panel features
- [ ] Performance optimization
- [ ] E2E testing with Cypress/Playwright
- [ ] Mobile app version (React Native)

### 🎯 Testing

To test the Claims Processor:

1. Start backend: `python app.py` (in BackendAndModel folder)
2. Start frontend: `npm run dev`
3. Navigate to `http://localhost:5173/claims`
4. Fill in the two-stage form with sample data
5. Click "Process Claim" to see results
6. Export results as JSON

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| [ClaimProcessor.tsx](src/app/components/ClaimProcessor.tsx) | Two-stage claim form UI |
| [claimService.ts](src/app/services/claimService.ts) | Backend API client |
| [InsuranceContext.tsx](src/app/contexts/InsuranceContext.tsx) | Global state management |
| [routes.tsx](src/app/routes.tsx) | Application routing |
| [insurance.ts](src/app/types/insurance.ts) | TypeScript type definitions |
| [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) | API integration guide |

---

## 🔐 Security Considerations

- All API communication happens over HTTP (use HTTPS in production)
- Sensitive data is managed through secure context
- Input validation on all forms
- CORS enabled for cross-origin requests
- Environment variables for sensitive config

---

## 📞 Support & Documentation

- **Backend Setup:** See [../BackendAndModel/QUICK_START.md](../BackendAndModel/QUICK_START.md)
- **API Reference:** See [../BackendAndModel/API_DOCUMENTATION.md](../BackendAndModel/API_DOCUMENTATION.md)
- **System Architecture:** See [../BackendAndModel/SYSTEM_ARCHITECTURE.md](../BackendAndModel/SYSTEM_ARCHITECTURE.md)
- **Full Project Guide:** See [../COMPLETE_SETUP_GUIDE.md](../COMPLETE_SETUP_GUIDE.md)
- **Integration Details:** See [./FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md)

---

## 📄 License

This project is part of DEVTrails 2026 submission. All rights reserved.

---

## 👥 Contributors

Built with ❤️ for India's gig economy workers.
    ↓
[Risk Profiling via AI] → Weekly Premium Assigned
    ↓
[Policy Activated] → Real-Time Zone Monitoring Begins
    ↓
[Disruption Detected via API]
    ↓
[Eligibility Verification: GPS + Activity + Anti-Fraud Check]
    ↓
[Payout Auto-Triggered via UPI]
    ↓
[Worker Notified via WhatsApp/App]
```

---

## 💰 Weekly Premium Model & Parametric Triggers

### Why Weekly?

Delivery partners operate on a week-to-week income cycle. A monthly premium feels burdensome and disconnected from their cash flow. Weekly pricing matches how they think about money - and removes the friction of large upfront commitments.

### Premium Tiers

| Tier | Weekly Premium | Max Weekly Payout | Coverage |
|------|---------------|-------------------|----------|
| Basic | ₹29/week | ₹500 | Weather (rain/flood) |
| Standard | ₹59/week | ₹1,200 | Weather + Pollution + Strike |
| Pro | ₹99/week | ₹2,500 | All triggers + Priority payout |

> Premiums are dynamically adjusted by the AI risk engine based on the worker's city, zone, historical disruption frequency, and active hours per week.

### Parametric Triggers (Food Delivery Persona)

| Trigger Type | Specific Parameter | Threshold |
|---|---|---|
| Heavy Rain | IMD Rainfall Data | >50mm in 3 hrs (Red Alert) |
| Flooding | Civic flood zone alerts | Zone marked "flooded/impassable" |
| Extreme Heat | Temperature index | >43°C with heat advisory |
| Severe Pollution | AQI | >300 (Very Poor) with advisory |
| Local Strike | Traffic/news APIs | Verified disruption in zone >2 hrs |
| Sudden Curfew | Government notifications | Section 144 or equivalent imposed |

**Key Rule:** All triggers must be verifiable via at least **two independent data sources** before payouts are processed.

---

## 🤖 AI/ML Integration Plan

### 1. Dynamic Premium Calculation
- **Model:** Gradient Boosted Trees (XGBoost)
- **Inputs:** City, delivery zone, historical AQI/weather disruption frequency, worker's weekly active hours, platform ratings
- **Output:** Personalized weekly premium recommendation
- **Update frequency:** Weekly re-scoring

### 2. Risk Zone Mapping
- **Approach:** Clustering algorithms (K-Means / DBSCAN) to identify high-disruption micro-zones within cities
- **Data:** Historical IMD weather events, AQI logs, municipal flood data
- **Visualization:** Heatmaps in the analytics dashboard

### 3. Anomaly Detection for Fraud Prevention
- **Model:** Isolation Forest + rule-based layer
- **Signals monitored:**
  - GPS location vs. claimed delivery zone
  - Platform login/order activity during claimed disruption window
  - Device fingerprinting
  - Velocity of claims across users in same area
- **Output:** Fraud risk score per claim (0–100); auto-payout if <30, manual review if 30–70, auto-reject if >70

### 4. Predictive Disruption Alerts
- **Model:** Time-series forecasting (LSTM or Prophet)
- **Use:** Predict high-risk weeks and alert workers to subscribe/upgrade before disruption hits

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

> **Context:** A coordinated syndicate of 500 delivery workers in a tier-1 city has been detected exploiting parametric insurance platforms by using GPS-spoofing apps to fake their location inside red-alert weather zones - draining liquidity pools with fraudulent payouts.

### 1. The Differentiation: Genuine Stranded Worker vs. Bad Actor

Simple GPS coordinates are **never** used as the sole eligibility criterion. GigShield uses a **multi-signal behavioral verification engine** that a spoofer cannot easily replicate:

| Signal | Genuine Worker | GPS Spoofer |
|---|---|---|
| **Platform Activity Log** | Orders accepted/rejected, app open/close patterns consistent with disruption | Platform API shows no order attempts despite being "online" |
| **Accelerometer & Sensor Data** | Device shows movement patterns consistent with outdoor riding/stopping at traffic | Device sensors flat - characteristic of a stationary phone running a spoof app |
| **Network Cell Tower Triangulation** | Cell tower pings match the declared GPS zone | Cell tower data conflicts with the GPS coordinates being reported |
| **Battery & Data Usage Patterns** | Normal operational battery drain; consistent data pings | Abnormally high data usage (spoofing apps are data-intensive); inconsistent ping intervals |
| **Historical Behavioral Baseline** | Claim behavior matches prior disruption responses | First-time claim perfectly coinciding with a mass event; no prior history of disruption interaction |

**Decision Logic:** A worker must pass a **minimum of 3 out of 5 signal checks** for an auto-payout to proceed. A score of 2/5 enters a soft review queue. Below that triggers an alert.

---

### 2. The Data: Detecting a Coordinated Fraud Ring

Beyond individual signal checks, GigShield runs a **ring-detection layer** that looks for coordinated patterns across users:

- **Geo-Temporal Clustering:** If 50+ claims are filed from the same GPS coordinates (or within a 200m radius) within 30 minutes, this triggers a syndicate alert. Genuine stranded workers are distributed across a zone, not clustered at a single point.

- **Device Fingerprint Correlation:** Spoofing apps often run on a small set of rooted/modified devices. If multiple claims share identical device fingerprints or spoofing-app signatures (detected via device integrity APIs like Google Play Integrity), they are flagged as a coordinated group.

- **Telegram / Social Signal Monitoring (Metadata Only):** We monitor for sudden spikes in subscription and claim activity from specific pin codes that correlate with known organized labor Telegram group activity patterns - a behavioral signal, not content surveillance.

- **Velocity Rules:** No single geographic micro-zone (500m radius) can generate more than X auto-payouts per hour. Excess claims are queued for review. This rate-limits even a well-coordinated attack.

- **Cross-Platform Validation:** During a claimed disruption window, genuine workers will show reduced or zero activity on the Zomato/Swiggy app (no orders accepted). A worker claiming payout while simultaneously showing active order completion on the platform API is an immediate red flag.

---

### 3. The UX Balance: Protecting Honest Workers During Flagged Events

The worst outcome is punishing a genuine Rajan who is actually stuck in floodwater and whose GPS dropped because of a bad network. Our **"Benefit of the Doubt" protocol** ensures this doesn't happen:

**Three-Tier Response to Flagged Claims:**

| Flag Level | Action | Worker Experience |
|---|---|---|
| **Green (Score <30)** | Auto-pay immediately | Seamless - worker notices nothing |
| **Yellow (Score 30–70)** | Soft hold - 2-hr review window | Worker receives message: *"We're verifying your payout due to high claim volume. You'll receive it within 2 hours."* Payout released after review unless hard evidence of fraud. |
| **Red (Score >70)** | Claim paused; human review | Worker receives: *"We need a quick verification. Reply with a photo of your current location."* A simple selfie with geo-tagged metadata resolves legitimate cases in minutes. |

**Key UX Principles:**
- **Presumption of innocence:** Yellow flags default to *paying* unless fraud is confirmed, not the other way around.
- **No jargon:** Communications are in simple Hindi/Kannada/Tamil - not "Your claim has been flagged for anomalous geospatial activity."
- **Manual override available:** A worker can escalate any held payout via a one-tap WhatsApp message to a support bot that explains the delay in plain language.
- **Network drop protection:** If GPS drops during a genuine disruption (common in heavy rain), the system falls back to the **last verified cell tower location** within the past 30 minutes rather than immediately flagging the claim.

---

## 🛠️ Tech Stack & Development Plan

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React Native (mobile-first) + React.js (admin/analytics dashboard) |
| **Backend** | Node.js + Express / FastAPI (Python for ML services) |
| **Database** | PostgreSQL (transactional) + Redis (real-time session/fraud cache) |
| **ML/AI** | Python - scikit-learn, XGBoost, Prophet, Isolation Forest |
| **Weather API** | OpenWeatherMap API / IMD data feeds |
| **AQI API** | CPCB AQI API / OpenAQ |
| **Maps & Location** | Google Maps Platform / Mapbox |
| **Payments** | Razorpay UPI API (sandbox) |
| **Device Integrity** | Google Play Integrity API |
| **Notifications** | Twilio WhatsApp API + Firebase Push |
| **Auth** | Mobile OTP-based (no passwords) |
| **Hosting** | AWS / GCP (free tier for Phase 1) |

### Development Plan

**Phase 1 (Current - March 4–20): Ideation & Foundation**
- [x] Persona research and scenario definition
- [x] Premium model design and trigger mapping
- [x] AI/ML architecture planning
- [x] Anti-spoofing strategy design
- [ ] Basic wireframes / prototype (minimal scope)
- [ ] README and video submission

**Phase 2: Core Infrastructure**
- Backend API scaffolding
- Weather/AQI API integrations
- Database schema design
- Basic onboarding flow

**Phase 3: AI/ML Engine**
- Premium calculation model (training + integration)
- Fraud/anomaly detection pipeline
- Risk zone heatmap generation

**Phase 4: Payout Automation**
- Parametric trigger engine
- Razorpay UPI integration
- WhatsApp notification system

**Phase 5: Anti-Spoofing Layer**
- Behavioral signal collection pipeline
- Ring detection module
- Tiered review queue UI

**Phase 6: Dashboard & Polish**
- Analytics dashboard for operations team
- Worker-facing mobile app refinement
- Load testing and security audit

---

## 📱 Platform Choice: Web vs Mobile

**Decision: Mobile-First (React Native) with Web Admin Dashboard**

**Rationale:**
- Target users (delivery partners) live on their phones - they don't use desktops
- UPI payment confirmation, GPS data, and sensor data require native mobile access
- WhatsApp integration is most natural on mobile
- Admin/analytics dashboard is web-based for operations team use


## 👥 Team The Strawhats!

| Name | Role |
|---|---|
| Kamalesh K | Product & Strategy |
| Thiruselvan V | Backend / ML |
| Selvapraveen S | Frontend / Design |
| Prasanth E | Frontend / Design |

---

*Built for DEVTrails 2026 | GigShield — Because every delivery matters.*
