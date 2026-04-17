# GigShield Frontend - AI-Powered Parametric Income Insurance

> **DEVTrails 2026 | Phase 1 Submission**
> Protecting India's gig delivery workers from uncontrollable income disruptions through AI-powered parametric insurance.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Key Features](#key-features)
8. [Architecture](#architecture)
9. [API Integration](#api-integration)
10. [Development Status](#development-status)

---

## Project Overview

**GigShield** is a parametric income insurance platform designed specifically for India's gig delivery workers (Zomato, Swiggy, Zepto, Amazon, etc.). This repository contains the **frontend React/TypeScript application** built with modern web technologies.

**The Problem:** Delivery workers face sudden income loss due to uncontrollable external disruptions (heavy rain, flooding, pollution, strikes, etc.) with zero safety net or financial buffer.

**The Solution:** GigShield provides automatic, hassle-free parametric insurance payouts triggered directly when verified disruptions prevent workers from earning.

---

## Problem Statement

India's platform-based delivery partners are the backbone of the digital economy, yet they operate without any safety net:

- **No stable income:** Dependent entirely on daily deliveries
- **Zero buffer:** Missing even 2 days causes significant financial stress
- **Uncontrollable disruptions:** Weather events, pollution emergencies, strikes, flooding
- **No employer support:** Classified as independent contractors with no benefits
- **Manual paperwork:** Traditional insurance requires complex claim filing

When a red-alert rain floods Mumbai, a pollution emergency shuts down Delhi, or a sudden local strike closes a market zone, these workers don't earn. **No hours worked = no income.**

---

## Solution Overview

GigShield directly addresses this gap with a modern parametric insurance platform:

- Weekly Subscriptions - Flexible, affordable coverage on a weekly basis
- Automatic Triggers - External disruptions monitored via real-time APIs
- Instant Payouts - No claim filing, no paperwork, no delays
- AI-Powered - Machine learning detects eligible claims automatically
- Mobile-First - Designed for workers using primarily on smartphones
- UPI Integration - Direct payout via existing payment method
- Regional Support - Available in Indian regional languages

**Coverage:** Lost income only
**Exclusions:** Health insurance, life insurance, accidents, vehicle repair

### Persona: Rajan, 28, Bengaluru
- Earns 18,000-22,000/month
- Works 10-12 hours/day, 6 days/week
- Zero savings buffer
- Trusts UPI and WhatsApp
- Skeptical of complex insurance forms

---

## Technology Stack

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

## Project Structure

```
The-Strawhats/
├── src/
│   ├── main.tsx                    # React app entry point
│   ├── app/
│   │   ├── App.tsx                 # Main app component with providers
│   │   ├── routes.tsx              # React Router configuration
│   │   ├── contexts/
│   │   │   ├── InsuranceContext.tsx
│   │   │   ├── LanguageContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── components/
│   │   │   ├── ClaimProcessor.tsx      # Two-stage claim form UI
│   │   │   ├── AutoClaimsDashboard.tsx # Dashboard view
│   │   │   ├── Navbar.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── home/                   # Landing page sections
│   │   │   └── ui/                     # Shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   ├── claimService.ts         # Backend API client
│   │   │   └── insuranceEngine.ts
│   │   ├── types/
│   │   │   └── insurance.ts
│   │   ├── data/
│   │   │   └── mockData.ts
│   │   └── utils/
│   │       └── unsplash.ts
│   └── styles/
│       ├── index.css
│       ├── fonts.css
│       ├── tailwind.css
│       └── theme.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.local
├── FRONTEND_API_INTEGRATION.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (https://nodejs.org/)
- npm or yarn package manager
- Backend API running on http://localhost:5000

### Installation

1. Navigate to frontend directory:
```bash
cd guidwire/The-Strawhats
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (.env.local):
```
VITE_API_URL=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

App will be available at http://localhost:5173

### Backend Setup

In a separate terminal:

```bash
cd ../BackendAndModel

# Install dependencies
pip install -r requirements.txt

# Train ML models (first time only)
python train_parametric_models.py

# Start API server
python app.py
```

### Build for Production

```bash
npm run build
```

---

## Key Features

### 1. Claims Processor Component
- Two-stage form interface for disruption detection and claim calculation
- Real-time validation of input fields
- Automatic calculations with breakdown display
- Result export as JSON
- Error handling with user-friendly messages
- Mobile-responsive design

### 2. Backend API Integration
- 6 API methods for complete pipeline
- TypeScript interfaces for type safety
- Error handling with custom APIError class
- Automatic fallbacks and retry logic

### 3. Insurance Context System
- Global state management for insurance data
- User profile information
- Active policies and coverage details
- Disruption signals real-time monitoring
- Claims history tracking
- Fraud detection with warnings

### 4. Multi-Language Support
- Support for regional Indian languages
- Easy switching between languages
- Translation context for UI

### 5. Theme Support
- Dark/light mode toggle
- Persistent theme preference
- System theme detection

### 6. Navigation & Routing
- Home - Landing page with product overview
- Dashboard - Main application dashboard
- Claims - Claim processor interface
- Admin - Administrative dashboard
- Login - Authentication page

### 7. Responsive UI Components
- Mobile-first design
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Fast load times with Vite

---

## Architecture

### Component Hierarchy

```
App (Root)
├── ThemeProvider
│   └── InsuranceProvider
│       └── RouterProvider
│           ├── Layout
│           │   ├── Navbar
│           │   ├── Routes
│           │   └── Footer
│           └── Toaster
```

### Data Flow

```
User Input (ClaimProcessor)
    ↓
claimService.processClaim()
    ↓
Flask API (http://localhost:5000)
    ├── Stage 1: Disruption Detection
    └── Stage 2: Claim Amount Calculation
    ↓
Response Processing
    ↓
UI Display & Result Export
```

---

## API Integration

### Backend API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /health | Health check |
| POST | /detect-disruption | Stage 1: Check eligibility |
| POST | /calculate-claim | Stage 2: Calculate payout |
| POST | /process-claim | Combined: Both stages |
| POST | /process-claims-batch | Batch processing |
| GET | /model-info | Model metadata |

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
```

---

## Development Status

### Completed

- [x] React TypeScript project setup with Vite
- [x] Routing with React Router
- [x] Global state management (Insurance Context)
- [x] Theming system (Dark/Light mode)
- [x] Multi-language support framework
- [x] Comprehensive UI component library
- [x] Landing page with all sections
- [x] Dashboard with statistics
- [x] Claims processor component (two-stage form)
- [x] Backend API service layer
- [x] Integration with ML models
- [x] Error handling and validation
- [x] Mobile-responsive design

### In Progress / Future

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

---

## Testing

To test the Claims Processor:

1. Start backend: python app.py (in BackendAndModel folder)
2. Start frontend: npm run dev
3. Navigate to http://localhost:5173/claims
4. Fill in the two-stage form with sample data
5. Click "Process Claim" to see results
6. Export results as JSON

---

## Key Files Reference

| File | Purpose |
|------|---------|
| ClaimProcessor.tsx | Two-stage claim form UI |
| claimService.ts | Backend API client |
| InsuranceContext.tsx | Global state management |
| routes.tsx | Application routing |
| insurance.ts | TypeScript type definitions |
| FRONTEND_API_INTEGRATION.md | API integration guide |

---

## Security Considerations

- All API communication uses HTTP (use HTTPS in production)
- Sensitive data managed through secure context
- Input validation on all forms
- CORS enabled for cross-origin requests
- Environment variables for sensitive config

---

## Documentation

- Backend Setup: ../BackendAndModel/QUICK_START.md
- API Reference: ../BackendAndModel/API_DOCUMENTATION.md
- System Architecture: ../BackendAndModel/SYSTEM_ARCHITECTURE.md
- Full Project Guide: ../COMPLETE_SETUP_GUIDE.md
- Integration Details: ./FRONTEND_API_INTEGRATION.md

---

Built with love for India's gig economy workers.
