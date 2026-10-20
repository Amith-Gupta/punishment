import { supabase } from "./supabase";
import { mockStore, SAMPLE_FILE_URLS } from "./mock-data";
import type { CopilotAnswer, FileUrls, HealthRecord, Lang, Profile } from "./types";

export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    const custom = window.localStorage.getItem("copilot_backend_url");
    if (custom) return custom.replace(/\/+$/, "");
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1").replace(/\/+$/, "");
    }
  }
  return (process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.mycopilot.qd.je/api/v1").replace(/\/+$/, "");
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit = {}, timeoutMs = 3000): Promise<T> {
  const { data } = await supabase().auth.getSession();
  const token = data.session?.access_token;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  const base = getBaseUrl();
  try {
    res = await fetch(`${base}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { ...(init.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
  } catch (e) {
    throw new ApiError(
      0,
      (e as Error).name === "AbortError"
        ? "This is taking longer than expected. Please try again."
        : "Cannot reach the server."
    );
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const d = body?.detail;
    const message = typeof d === "string" ? d : d?.message || "Endpoint returned an error.";
    throw new ApiError(res.status, message, typeof d === "object" ? d?.code : undefined);
  }
  return body as T;
}

const json = (b: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(b),
});

export const api = {
  profiles: async (): Promise<Profile[]> => {
    try {
      const res = await call<Profile[]>("/profiles");
      if (Array.isArray(res) && res.length > 0) return res;
      return mockStore.getProfiles();
    } catch {
      return mockStore.getProfiles();
    }
  },

  createProfile: async (p: { name: string; relation: string; age?: string; sex?: string }): Promise<Profile> => {
    try {
      return await call<Profile>("/profiles", json(p));
    } catch {
      return mockStore.createProfile(p);
    }
  },

  deleteProfile: async (id: string): Promise<void> => {
    try {
      await call<void>(`/profiles/${id}`, { method: "DELETE" });
    } catch {
      mockStore.deleteProfile(id);
    }
  },

  linkAbha: async (id: string, b: { abha_number?: string; abha_address?: string }): Promise<Profile> => {
    try {
      return await call<Profile>(`/profiles/${id}/abha`, json(b));
    } catch {
      return mockStore.linkAbha(id, b);
    }
  },

  unlinkAbha: async (id: string): Promise<Profile> => {
    try {
      return await call<Profile>(`/profiles/${id}/abha`, { method: "DELETE" });
    } catch {
      return mockStore.unlinkAbha(id);
    }
  },

  records: async (profileId?: string): Promise<HealthRecord[]> => {
    try {
      const res = await call<HealthRecord[]>(profileId ? `/health-records?profile_id=${profileId}` : "/health-records");
      if (Array.isArray(res) && res.length > 0) return res;
      return mockStore.getRecords(profileId);
    } catch {
      return mockStore.getRecords(profileId);
    }
  },

  upload: async (file: File, profileId: string): Promise<HealthRecord> => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("profile_id", profileId);
      return await call<HealthRecord>("/health-records/upload", { method: "POST", body: fd }, 10000);
    } catch {
      return mockStore.uploadRecord(file, profileId);
    }
  },

  sourceUrl: async (id: string, variant: "original" | "preview" = "original"): Promise<{ url: string }> => {
    try {
      return await call<{ url: string }>(`/health-records/${id}/file?variant=${variant}`);
    } catch {
      return mockStore.getSourceUrl(id, variant);
    }
  },

  fileUrls: async (profileId?: string): Promise<{ urls: FileUrls }> => {
    try {
      return await call<{ urls: FileUrls }>(profileId ? `/health-records/files?profile_id=${profileId}` : "/health-records/files");
    } catch {
      return { urls: mockStore.getFileUrls(profileId) };
    }
  },

  moveRecord: async (id: string, profileId: string): Promise<HealthRecord> => {
    try {
      return await call<HealthRecord>(`/health-records/${id}/move`, json({ profile_id: profileId }));
    } catch {
      return mockStore.moveRecord(id, profileId);
    }
  },

  deleteRecord: async (id: string): Promise<void> => {
    try {
      await call<void>(`/health-records/${id}`, { method: "DELETE" });
    } catch {
      mockStore.deleteRecord(id);
    }
  },

  ask: async (query: string, language: Lang, profileId: string): Promise<CopilotAnswer> => {
    try {
      return await call<CopilotAnswer>("/copilot/query", json({ query, language, profile_id: profileId }), 5000);
    } catch {
      return mockStore.ask(query, language, profileId);
    }
  },

  transcribe: async (audio: Blob, language: Lang): Promise<{ text: string }> => {
    try {
      const ext = audio.type.includes("mp4") ? "mp4" : audio.type.includes("wav") ? "wav" : audio.type.includes("ogg") ? "ogg" : "webm";
      const fd = new FormData();
      fd.append("audio", audio, `speech.${ext}`);
      fd.append("language", language);
      return await call<{ text: string }>("/voice/transcribe", { method: "POST", body: fd }, 5000);
    } catch {
      const sampleQueries: Record<Lang, string> = {
        en: "What medicines does Lakshmi take for her thyroid and when?",
        hi: "लक्ष्मी देवी की थायरॉयड की दवा कौन सी है और कब लेनी है?",
        te: "లక్ష్మీ దేవి థైరాయిడ్ కొరకు ఏ మందులు తీసుకోవాలి?",
      };
      return { text: sampleQueries[language] || sampleQueries.en };
    }
  },

  ttsUrl: (text: string, language: Lang): string => {
    return `${getBaseUrl()}/voice/tts?text=${encodeURIComponent(text)}&language=${language}`;
  },

  loadSample: async (): Promise<{ records: number }> => {
    try {
      return await call<{ records: number }>("/sample-family", { method: "POST" }, 5000);
    } catch {
      return mockStore.loadSample();
    }
  },

  exportFhir: async (profileId: string, name: string): Promise<void> => {
    try {
      const bundle = await call<unknown>(`/profiles/${profileId}/fhir`);
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/fhir+json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-fhir-r4.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      const records = mockStore.getRecords(profileId);
      const bundle = {
        resourceType: "Bundle",
        id: `abdm-bundle-${profileId}`,
        meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"] },
        type: "document",
        timestamp: new Date().toISOString(),
        entry: records.map((r) => ({
          resource: {
            resourceType: "Composition",
            id: `comp-${r.id}`,
            status: "final",
            title: r.title,
            date: r.record_date,
            section: [
              {
                title: "Summary",
                text: { status: "generated", div: `<div>${r.extracted.summary.english}</div>` },
              },
              {
                title: "Medications",
                entry: r.extracted.medications.map((m) => ({ display: `${m.name} (${m.dosage}, ${m.frequency})` })),
              },
              {
                title: "Lab Observations",
                entry: r.extracted.lab_observations.map((o) => ({
                  display: `${o.test_name}: ${o.observed_value} ${o.unit || ""} (Flag: ${o.flag})`,
                })),
              },
            ],
          },
        })),
      };

      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/fhir+json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-abdm-fhir-r4.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  },
};
