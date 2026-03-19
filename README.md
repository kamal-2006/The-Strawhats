# 🛵 GigShield — AI-Powered Parametric Income Insurance for India's Delivery Partners

> **DEVTrails 2026 | Phase 1 Submission**
> Protecting the backbone of India's gig economy from uncontrollable income disruptions.

---

## 📌 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Our Persona](#-our-persona)
3. [Solution Overview](#-solution-overview)
4. [Persona-Based Scenarios & Workflow](#-persona-based-scenarios--workflow)
5. [Weekly Premium Model & Parametric Triggers](#-weekly-premium-model--parametric-triggers)
6. [AI/ML Integration Plan](#-aiml-integration-plan)
7. [Adversarial Defense & Anti-Spoofing Strategy](#-adversarial-defense--anti-spoofing-strategy)
8. [Tech Stack & Development Plan](#-tech-stack--development-plan)
9. [Platform Choice: Web vs Mobile](#-platform-choice-web-vs-mobile)
10. [Deliverables](#-deliverables)

---

## 🔥 Problem Statement

India's platform-based delivery partners — working for Zomato, Swiggy, Zepto, Amazon, and similar platforms — are the silent engine of our digital economy. Yet they operate without any safety net.

When a red-alert rain floods Mumbai, a pollution emergency shuts down Delhi, or a sudden local strike closes an entire market zone — these workers don't earn. No hours worked = no income. There is no buffer, no savings protection, and no employer to fall back on.

**GigShield** directly addresses this gap: an AI-powered, parametric income insurance platform that triggers automatic payouts when verifiable external disruptions prevent delivery partners from working — **no manual claims, no paperwork, no delays.**

---

## 👤 Our Persona

**Segment Chosen:** Food Delivery — Zomato & Swiggy Partners

**Representative User: Rajan, 28, Bengaluru**
- Earns ₹18,000–₹22,000/month
- Works 10–12 hours/day, 6 days/week
- Has zero savings buffer — misses even 2 days = significant stress
- Owns a two-wheeler; rents a room; sends money home monthly
- Trusts UPI and WhatsApp; is skeptical of complex insurance forms

---

## 💡 Solution Overview

GigShield is a **parametric income insurance platform** where:

- Workers subscribe on a **weekly basis** for a small, affordable premium
- External disruption triggers (weather, pollution, curfew, etc.) are monitored in **real time** via APIs
- When a verified trigger occurs in a worker's active delivery zone, a **payout is automatically initiated** — no claim filing required
- The entire experience is mobile-first, available in regional languages, and integrated with UPI for instant payouts

> ⚠️ **Strictly excluded:** Health insurance, life insurance, accident coverage, vehicle repair. GigShield covers **lost income only.**

---

## 🧭 Persona-Based Scenarios & Workflow

### Scenario 1: Red-Alert Rainfall in Bengaluru

**Trigger:** IMD issues red alert; rainfall exceeds 80mm in 3 hours in Koramangala/Indiranagar zones.

**Workflow:**
1. GigShield's weather monitoring detects the red alert via Weather API
2. System cross-references which active subscribers are registered in that zone
3. GPS and platform activity data confirms workers are in or near the affected zone
4. Payout of ₹200–₹400 (based on their weekly coverage tier) is sent automatically via UPI within 15 minutes
5. Worker receives WhatsApp notification: *"Heavy rain payout of ₹300 credited. Stay safe."*

---

### Scenario 2: Sudden Local Strike / Market Closure

**Trigger:** A localized auto/cab strike in Whitefield closes access to a major restaurant cluster.

**Workflow:**
1. GigShield ingests strike data from traffic APIs + civic news feeds
2. Workers in that zone who have active coverage are identified
3. A partial income-loss payout is triggered for verified non-delivery hours
4. Workers are notified and offered a "zone shift advisory" to nearby active areas

---

### Scenario 3: Severe Air Quality (AQI > 400) in Delhi-NCR

**Trigger:** AQI exceeds 400 in Gurugram; government advisory issued against outdoor activity.

**Workflow:**
1. AQI monitoring feed detects threshold breach
2. All active GigShield subscribers in Gurugram zones are flagged for auto-trigger
3. Payout calculated based on average daily income × disruption hours
4. Amount credited; worker notified via app + SMS

---

### General Application Workflow
```
[Worker Onboarding]
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

Delivery partners operate on a week-to-week income cycle. A monthly premium feels burdensome and disconnected from their cash flow. Weekly pricing matches how they think about money — and removes the friction of large upfront commitments.

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

> **Context:** A coordinated syndicate of 500 delivery workers in a tier-1 city has been detected exploiting parametric insurance platforms by using GPS-spoofing apps to fake their location inside red-alert weather zones — draining liquidity pools with fraudulent payouts.

### 1. The Differentiation: Genuine Stranded Worker vs. Bad Actor

Simple GPS coordinates are **never** used as the sole eligibility criterion. GigShield uses a **multi-signal behavioral verification engine** that a spoofer cannot easily replicate:

| Signal | Genuine Worker | GPS Spoofer |
|---|---|---|
| **Platform Activity Log** | Orders accepted/rejected, app open/close patterns consistent with disruption | Platform API shows no order attempts despite being "online" |
| **Accelerometer & Sensor Data** | Device shows movement patterns consistent with outdoor riding/stopping at traffic | Device sensors flat — characteristic of a stationary phone running a spoof app |
| **Network Cell Tower Triangulation** | Cell tower pings match the declared GPS zone | Cell tower data conflicts with the GPS coordinates being reported |
| **Battery & Data Usage Patterns** | Normal operational battery drain; consistent data pings | Abnormally high data usage (spoofing apps are data-intensive); inconsistent ping intervals |
| **Historical Behavioral Baseline** | Claim behavior matches prior disruption responses | First-time claim perfectly coinciding with a mass event; no prior history of disruption interaction |

**Decision Logic:** A worker must pass a **minimum of 3 out of 5 signal checks** for an auto-payout to proceed. A score of 2/5 enters a soft review queue. Below that triggers an alert.

---

### 2. The Data: Detecting a Coordinated Fraud Ring

Beyond individual signal checks, GigShield runs a **ring-detection layer** that looks for coordinated patterns across users:

- **Geo-Temporal Clustering:** If 50+ claims are filed from the same GPS coordinates (or within a 200m radius) within 30 minutes, this triggers a syndicate alert. Genuine stranded workers are distributed across a zone, not clustered at a single point.

- **Device Fingerprint Correlation:** Spoofing apps often run on a small set of rooted/modified devices. If multiple claims share identical device fingerprints or spoofing-app signatures (detected via device integrity APIs like Google Play Integrity), they are flagged as a coordinated group.

- **Telegram / Social Signal Monitoring (Metadata Only):** We monitor for sudden spikes in subscription and claim activity from specific pin codes that correlate with known organized labor Telegram group activity patterns — a behavioral signal, not content surveillance.

- **Velocity Rules:** No single geographic micro-zone (500m radius) can generate more than X auto-payouts per hour. Excess claims are queued for review. This rate-limits even a well-coordinated attack.

- **Cross-Platform Validation:** During a claimed disruption window, genuine workers will show reduced or zero activity on the Zomato/Swiggy app (no orders accepted). A worker claiming payout while simultaneously showing active order completion on the platform API is an immediate red flag.

---

### 3. The UX Balance: Protecting Honest Workers During Flagged Events

The worst outcome is punishing a genuine Rajan who is actually stuck in floodwater and whose GPS dropped because of a bad network. Our **"Benefit of the Doubt" protocol** ensures this doesn't happen:

**Three-Tier Response to Flagged Claims:**

| Flag Level | Action | Worker Experience |
|---|---|---|
| **Green (Score <30)** | Auto-pay immediately | Seamless — worker notices nothing |
| **Yellow (Score 30–70)** | Soft hold — 2-hr review window | Worker receives message: *"We're verifying your payout due to high claim volume. You'll receive it within 2 hours."* Payout released after review unless hard evidence of fraud. |
| **Red (Score >70)** | Claim paused; human review | Worker receives: *"We need a quick verification. Reply with a photo of your current location."* A simple selfie with geo-tagged metadata resolves legitimate cases in minutes. |

**Key UX Principles:**
- **Presumption of innocence:** Yellow flags default to *paying* unless fraud is confirmed, not the other way around.
- **No jargon:** Communications are in simple Hindi/Kannada/Tamil — not "Your claim has been flagged for anomalous geospatial activity."
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
| **ML/AI** | Python — scikit-learn, XGBoost, Prophet, Isolation Forest |
| **Weather API** | OpenWeatherMap API / IMD data feeds |
| **AQI API** | CPCB AQI API / OpenAQ |
| **Maps & Location** | Google Maps Platform / Mapbox |
| **Payments** | Razorpay UPI API (sandbox) |
| **Device Integrity** | Google Play Integrity API |
| **Notifications** | Twilio WhatsApp API + Firebase Push |
| **Auth** | Mobile OTP-based (no passwords) |
| **Hosting** | AWS / GCP (free tier for Phase 1) |

### Development Plan

**Phase 1 (Current — March 4–20): Ideation & Foundation**
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
- Target users (delivery partners) live on their phones — they don't use desktops
- UPI payment confirmation, GPS data, and sensor data require native mobile access
- WhatsApp integration is most natural on mobile
- Admin/analytics dashboard is web-based for operations team use

---

## 📦 Deliverables

- [x] This README (Idea Document)
- [ ] GitHub Repository (this repo)
- [ ] 2-Minute Strategy Video — [Link to be added before March 20 EOD]

---

## 👥 Team

| Name | Role |
|---|---|
| [Your Name] | Product & Strategy |
| [Team Member] | Backend / ML |
| [Team Member] | Frontend / Design |

---

*Built for DEVTrails 2026 | GigShield — Because every delivery matters.*