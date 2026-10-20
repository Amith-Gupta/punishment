# AI-Powered Personal Health Copilot (ABDM FHIR R4)

A full-stack, multilingual personal health copilot designed for Indian families. It reads clinical prescriptions, laboratory diagnostic reports, and hospital discharge summaries, extracts structured data using Gemini Multimodal Vision AI, explains results in plain language across **English, Hindi, and Telugu**, and packages health data into **ABDM FHIR R4** compliant bundles.

---

## 🏗️ Architecture Overview

The repository is organized into a cohesive full-stack architecture:

```
.
├── app/                      # Next.js 15 App Router frontend
├── components/               # React 19 UI components (overview, timeline, medicines, copilot, speech)
├── lib/                      # Types, i18n localization, API client, mock store, Supabase client
├── public/                   # Static sample documents (prescriptions, lab reports, discharge summaries)
├── backend/                  # FastAPI Python backend service
│   ├── app/
│   │   ├── config.py         # Environment configurations (CORS, keys)
│   │   ├── main.py           # FastAPI entrypoint with CORS & router mounts
│   │   ├── routers/
│   │   │   ├── ingestion.py  # Document upload, Vision OCR & FHIR mapper
│   │   │   ├── search.py     # AI Copilot medical query reasoning
│   │   │   ├── abha.py       # ABHA identification routes
│   │   │   └── profiles.py   # Family member profiles & FHIR export
│   │   ├── schemas/          # Pydantic data models & FHIR schemas
│   │   └── services/         # OCR engine, FHIR mapper, regex cleaner, translator
│   ├── database/             # PostgreSQL / Supabase schema (pgvector & GIN indexes)
│   ├── requirements.txt      # Python dependencies
│   └── test_api.py           # Automated test suite for backend endpoints
├── package.json              # Next.js dependencies and scripts
└── README.md
```

---

## ✨ Key Features

1. **Multimodal Medical Document Extraction**:
   - Ingests prescriptions, lab panels, and discharge summaries (PNG, JPEG, WEBP, PDF).
   - Gemini 1.5 Flash Vision AI extracts diagnoses, medications, dosages, lab values, and reference intervals.
   - Built-in clinical fallback ensures 100% demo resilience even without external API keys.

2. **ABDM FHIR R4 Standardized Bundles**:
   - Converts extracted clinical data into NRCES ABDM-compliant FHIR R4 bundles (`PrescriptionRecord`, `DiagnosticReportRecord`, `DischargeSummaryRecord`).
   - Generates FHIR `Composition`, `Patient`, `Practitioner`, `MedicationRequest`, and `Observation` resources with SNOMED CT and LOINC codings.

3. **Regional Multilingual Summaries**:
   - Patient-friendly health explanations generated in **English**, **Hindi (हिंदी)**, and **Telugu (తెలుగు)**.
   - Real-time Web Speech & voice read-aloud support.

4. **Family Health Timeline & Medicine Tracker**:
   - Multi-profile management for the entire family (Mother, Father, Self, Children).
   - Daily medicine schedule organized by morning, afternoon, and night dosages.
   - Abnormal lab metric flags (Fasting blood sugar, HbA1c, Cholesterol, TSH, Haemoglobin).

---

## 🚀 Getting Started

### 1. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install

# Run the development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build
```

### 2. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Start FastAPI server (runs on http://localhost:8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive API Documentation (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

### 3. Running Backend Tests

```bash
cd backend
python test_api.py
```

---

## ⚙️ Environment Variables

### Frontend (`.env.local` or `.env`):
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Backend (`backend/.env`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key
HOST=0.0.0.0
PORT=8000
FRONTEND_ORIGIN=http://localhost:3000
```
