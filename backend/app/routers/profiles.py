import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.schemas.payloads import ProfileItem, ProfileCreateRequest

router = APIRouter(tags=["Profiles & Family"])

# Default sample family profiles
PROFILES_STORE: List[ProfileItem] = [
    ProfileItem(
        id="p-lakshmi",
        name="Lakshmi Devi",
        relation="Mother",
        age="64",
        sex="F",
        abha_number="91-4521-7730-2286",
        abha_address="lakshmi.devi@abdm",
        abha_linked=True,
        abha_linked_at="2026-02-15T10:30:00Z",
        is_sample=True,
        created_at="2026-01-10T08:00:00Z"
    ),
    ProfileItem(
        id="p-ramesh",
        name="Ramesh Kumar",
        relation="Father",
        age="68",
        sex="M",
        abha_number="91-8834-1290-7711",
        abha_address="ramesh.kumar@abdm",
        abha_linked=True,
        abha_linked_at="2026-02-18T14:15:00Z",
        is_sample=True,
        created_at="2026-01-10T08:15:00Z"
    ),
    ProfileItem(
        id="p-rajesh",
        name="Rajesh Kumar Sharma",
        relation="Self",
        age="38",
        sex="M",
        abha_number="91-1234-5678-9012",
        abha_address="rajesh.sharma@abdm",
        abha_linked=True,
        abha_linked_at="2026-01-05T09:00:00Z",
        is_sample=True,
        created_at="2026-01-05T09:00:00Z"
    )
]


class LinkAbhaBody(BaseModel):
    abha_number: Optional[str] = None
    abha_address: Optional[str] = None


@router.get("/profiles", response_model=List[ProfileItem])
async def list_profiles():
    return PROFILES_STORE


@router.post("/profiles", response_model=ProfileItem, status_code=status.HTTP_201_CREATED)
async def create_profile(payload: ProfileCreateRequest):
    new_profile = ProfileItem(
        id=f"p-{uuid.uuid4().hex[:8]}",
        name=payload.name,
        relation=payload.relation,
        age=payload.age,
        sex=payload.sex,
        abha_number=None,
        abha_address=None,
        abha_linked=False,
        is_sample=False,
        created_at=datetime.utcnow().isoformat()
    )
    PROFILES_STORE.append(new_profile)
    return new_profile


@router.delete("/profiles/{profile_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_profile(profile_id: str):
    global PROFILES_STORE
    PROFILES_STORE = [p for p in PROFILES_STORE if p.id != profile_id]
    return None


@router.post("/profiles/{profile_id}/abha", response_model=ProfileItem)
async def link_profile_abha(profile_id: str, body: LinkAbhaBody):
    for p in PROFILES_STORE:
        if p.id == profile_id:
            p.abha_number = body.abha_number or p.abha_number or "91-1234-5678-9012"
            p.abha_address = body.abha_address or p.abha_address or f"{p.name.lower().replace(' ', '.')}@abdm"
            p.abha_linked = True
            p.abha_linked_at = datetime.utcnow().isoformat()
            return p
    raise HTTPException(status_code=404, detail="Profile not found")


@router.delete("/profiles/{profile_id}/abha", response_model=ProfileItem)
async def unlink_profile_abha(profile_id: str):
    for p in PROFILES_STORE:
        if p.id == profile_id:
            p.abha_linked = False
            p.abha_number = None
            p.abha_address = None
            p.abha_linked_at = None
            return p
    raise HTTPException(status_code=404, detail="Profile not found")


@router.get("/profiles/{profile_id}/fhir")
async def export_profile_fhir(profile_id: str):
    return {
        "resourceType": "Bundle",
        "id": f"abdm-bundle-{profile_id}",
        "type": "document",
        "timestamp": datetime.utcnow().isoformat(),
        "meta": {
            "profile": ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
        },
        "entry": []
    }


@router.post("/sample-family")
async def load_sample_family():
    return {"records": len(PROFILES_STORE)}
