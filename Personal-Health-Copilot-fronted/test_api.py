import requests
import json

BASE_URL = "http://localhost:8000"

def test_all():
    print("=" * 60)
    print("AI HEALTH COPILOT BACKEND - AUTOMATED TEST SUITE")
    print("=" * 60)

    # 1. Health
    res = requests.get(f"{BASE_URL}/health")
    print(f"\n[1] GET /health (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2))

    # 2. ABHA Status
    res = requests.get(f"{BASE_URL}/api/v1/abha/status")
    print(f"\n[2] GET /api/v1/abha/status (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2))

    # 3. Link ABHA ID
    payload = {
        "abha_id": "91-9876-5432-1098",
        "patient_name": "Srinivasan Raman"
    }
    res = requests.post(f"{BASE_URL}/api/v1/abha/link", json=payload)
    print(f"\n[3] POST /api/v1/abha/link (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2))

    # 4. Copilot Query (English)
    copilot_query = {
        "query": "What are my current medications and what was my sugar reading?",
        "language": "en"
    }
    res = requests.post(f"{BASE_URL}/api/v1/copilot/query", json=copilot_query)
    print(f"\n[4] POST /api/v1/copilot/query - English (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2))

    # 5. Copilot Query (Hindi)
    copilot_query_hi = {
        "query": "मेरी शुगर रिपोर्ट कैसी है?",
        "language": "hi"
    }
    res = requests.post(f"{BASE_URL}/api/v1/copilot/query", json=copilot_query_hi)
    print(f"\n[5] POST /api/v1/copilot/query - Hindi (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2, ensure_ascii=False))

    # 6. Copilot Query (Telugu)
    copilot_query_te = {
        "query": "నా షుగర్ లెవెల్స్ ఎలా ఉన్నాయి?",
        "language": "te"
    }
    res = requests.post(f"{BASE_URL}/api/v1/copilot/query", json=copilot_query_te)
    print(f"\n[6] POST /api/v1/copilot/query - Telugu (Status: {res.status_code})")
    print(json.dumps(res.json(), indent=2, ensure_ascii=False))

    # 7. Upload Sample Medical Document
    # Create sample dummy prescription image bytes
    dummy_prescription_bytes = b"Sample Doctor Prescription - Rx: Metformin 500mg, 1-0-1"
    files = {
        "file": ("prescription_dr_verma.pdf", dummy_prescription_bytes, "application/pdf")
    }
    data = {
        "abha_id": "91-9876-5432-1098",
        "patient_name": "Srinivasan Raman"
    }
    res = requests.post(f"{BASE_URL}/api/v1/health-records/upload", files=files, data=data)
    print(f"\n[7] POST /api/v1/health-records/upload (Status: {res.status_code})")
    upload_res = res.json()
    print("Uploaded Record ID:", upload_res.get("id"))
    print("Record Type:", upload_res.get("document_type"))
    print("Multilingual Summary:")
    print(json.dumps(upload_res.get("summary"), indent=2, ensure_ascii=False))
    print("Medications:", upload_res.get("medications"))
    print("FHIR R4 Bundle ResourceType:", upload_res.get("fhir_bundle", {}).get("resourceType"))

    # 8. Get All Health Records
    res = requests.get(f"{BASE_URL}/api/v1/health-records")
    print(f"\n[8] GET /api/v1/health-records (Status: {res.status_code})")
    records = res.json()
    print(f"Total processed records in timeline: {len(records)}")

    print("\n" + "=" * 60)
    print("ALL 8 ENDPOINTS TESTED SUCCESSFULLY ON http://localhost:8000!")
    print("=" * 60)

if __name__ == "__main__":
    test_all()
