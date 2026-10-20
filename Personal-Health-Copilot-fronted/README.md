# AI-Powered Personal Health Copilot - Backend API

FastAPI backend service for extracting structured clinical data from medical documents (prescriptions, diagnostic reports, discharge summaries), translating summaries into regional languages (English, Hindi, Telugu), and generating **ABDM FHIR R4** compliant bundles.

---

## 🏛️ Architecture & Endpoints

- **`/docs`**: Interactive Swagger UI OpenAPI documentation
- **`/health`**: Service health & Vision AI configuration check
- **`/api/v1/health-records/upload`**: Document ingestion via Gemini Vision LLM + ABDM FHIR R4 converter
- **`/api/v1/health-records`**: Retrieve processed patient record timeline
- **`/api/v1/abha/link`**: Authenticate and link ABHA ID
- **`/api/v1/abha/status`**: Check ABHA link status
- **`/api/v1/copilot/query`**: AI Copilot natural language queries over clinical records

---

## 📁 Repository Structure

```
.
├── app/
│   ├── config.py             # Environment configurations
│   ├── main.py               # FastAPI entry point & CORS configuration
│   ├── routers/
│   │   ├── abha.py           # ABHA identification routes
│   │   ├── ingestion.py      # Multipart document upload & FHIR pipeline
│   │   └── search.py         # AI Copilot timeline querying route
│   ├── schemas/
│   │   ├── fhir_templates/   # NRCES ABDM R4 bundle templates
│   │   └── payloads.py       # Pydantic models for request & response
│   └── services/
│       ├── fhir_mapper.py    # ABDM FHIR R4 mapper
│       ├── ocr_engine.py     # Gemini 1.5 Flash multimodal extraction & fallback
│       ├── regex_cleaner.py  # Clinical dosage & lab range normalizer
│       └── translator.py     # Regional translation generator
├── database/
│   ├── schema.sql            # PostgreSQL / Supabase schema (pgvector & GIN indexes)
│   └── seed.sql              # Initial test patient records
├── .env.example              # Environment variables template
├── .env                      # Active local configuration
├── requirements.txt          # Python package requirements
└── README.md
```

---

## ⚡ How to Run

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment (Optional)
Edit [`.env`](file:///.env) to add your Gemini API Key or Supabase credentials (a smart fallback mock is included automatically if no key is provided):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start the Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive API Docs (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
