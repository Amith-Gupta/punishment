import type { CopilotAnswer, FileUrls, HealthRecord, Lang, Profile } from "./types";

const SVG_LAB_REPORT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" style="background:%23ffffff;font-family:system-ui,sans-serif">
  <rect width="800" height="1100" fill="%23ffffff"/>
  <rect x="0" y="0" width="800" height="12" fill="%230f766e"/>
  
  <!-- Header -->
  <text x="50" y="65" font-size="22" font-weight="bold" fill="%230f766e">APOLLO CLINICAL DIAGNOSTICS</text>
  <text x="50" y="85" font-size="12" fill="%2364748b">NABH %26 NABL ACCREDITED MOLECULAR LAB %26 BIOCHEMISTRY</text>
  <text x="50" y="100" font-size="11" fill="%2394a3b8">Banjara Hills Road No. 2, Hyderabad | Reg: LAB-HYD-2026-9912</text>
  
  <line x1="50" y1="115" x2="750" y2="115" stroke="%23e2e8f0" stroke-width="2"/>
  
  <!-- Patient Info Box -->
  <rect x="50" y="130" width="700" height="95" rx="6" fill="%23f8fafc" stroke="%23cbd5e1"/>
  <text x="70" y="155" font-size="13" font-weight="bold" fill="%231e293b">Patient Name:</text>
  <text x="170" y="155" font-size="13" fill="%23334155">Lakshmi Devi</text>
  
  <text x="420" y="155" font-size="13" font-weight="bold" fill="%231e293b">Age / Sex:</text>
  <text x="500" y="155" font-size="13" fill="%23334155">64 Yrs / Female</text>
  
  <text x="70" y="180" font-size="13" font-weight="bold" fill="%231e293b">ABHA ID:</text>
  <text x="170" y="180" font-size="13" font-family="monospace" fill="%230f766e">91-4521-7730-2286</text>
  
  <text x="420" y="180" font-size="13" font-weight="bold" fill="%231e293b">Collection Date:</text>
  <text x="520" y="180" font-size="13" fill="%23334155">28-Mar-2026 07:30 AM</text>
  
  <text x="70" y="205" font-size="13" font-weight="bold" fill="%231e293b">Ref By:</text>
  <text x="170" y="205" font-size="13" fill="%23334155">Dr. Suresh Rao, MD (Endo)</text>
  
  <text x="420" y="205" font-size="13" font-weight="bold" fill="%231e293b">Sample Type:</text>
  <text x="520" y="205" font-size="13" fill="%23334155">Venous Blood (Fluoride/Serum)</text>

  <!-- Table Title -->
  <rect x="50" y="245" width="700" height="32" fill="%23f1f5f9"/>
  <text x="65" y="266" font-size="12" font-weight="bold" fill="%23334155">INVESTIGATION (BIOCHEMISTRY %26 METABOLIC)</text>
  <text x="360" y="266" font-size="12" font-weight="bold" fill="%23334155">OBSERVED</text>
  <text x="480" y="266" font-size="12" font-weight="bold" fill="%23334155">UNIT</text>
  <text x="580" y="266" font-size="12" font-weight="bold" fill="%23334155">REFERENCE RANGE</text>
  <text x="700" y="266" font-size="12" font-weight="bold" fill="%23334155">FLAG</text>

  <!-- Row 1: Glucose -->
  <text x="65" y="305" font-size="13" font-weight="600" fill="%231e293b">Fasting Blood Sugar (FBS)</text>
  <text x="65" y="322" font-size="10" fill="%2364748b">Hexokinase method</text>
  <text x="360" y="305" font-size="14" font-weight="bold" fill="%23dc2626">185</text>
  <text x="480" y="305" font-size="12" fill="%23475569">mg/dL</text>
  <text x="580" y="305" font-size="12" fill="%23475569">70 - 99</text>
  <rect x="695" y="290" width="45" height="20" rx="3" fill="%23fee2e2"/>
  <text x="705" y="305" font-size="11" font-weight="bold" fill="%23dc2626">HIGH</text>
  <line x1="50" y1="335" x2="750" y2="335" stroke="%23f1f5f9"/>

  <!-- Row 2: HbA1c -->
  <text x="65" y="360" font-size="13" font-weight="600" fill="%231e293b">Glycated Hemoglobin (HbA1c)</text>
  <text x="65" y="377" font-size="10" fill="%2364748b">HPLC Ion-exchange method</text>
  <text x="360" y="360" font-size="14" font-weight="bold" fill="%23dc2626">8.4</text>
  <text x="480" y="360" font-size="12" fill="%23475569">%</text>
  <text x="580" y="360" font-size="12" fill="%23475569">4.0 - 5.6</text>
  <rect x="695" y="345" width="45" height="20" rx="3" fill="%23fee2e2"/>
  <text x="705" y="360" font-size="11" font-weight="bold" fill="%23dc2626">HIGH</text>
  <line x1="50" y1="390" x2="750" y2="390" stroke="%23f1f5f9"/>

  <!-- Row 3: Total Cholesterol -->
  <text x="65" y="415" font-size="13" font-weight="600" fill="%231e293b">Total Serum Cholesterol</text>
  <text x="65" y="432" font-size="10" fill="%2364748b">CHOD-PAP Enzymatic</text>
  <text x="360" y="415" font-size="14" font-weight="bold" fill="%23dc2626">240</text>
  <text x="480" y="415" font-size="12" fill="%23475569">mg/dL</text>
  <text x="580" y="415" font-size="12" fill="%23475569">125 - 200</text>
  <rect x="695" y="400" width="45" height="20" rx="3" fill="%23fee2e2"/>
  <text x="705" y="415" font-size="11" font-weight="bold" fill="%23dc2626">HIGH</text>
  <line x1="50" y1="445" x2="750" y2="445" stroke="%23f1f5f9"/>

  <!-- Row 4: TSH -->
  <text x="65" y="470" font-size="13" font-weight="600" fill="%231e293b">TSH (Ultrasensitive Thyroid)</text>
  <text x="65" y="487" font-size="10" fill="%2364748b">CLIA Electrochemiluminescence</text>
  <text x="360" y="470" font-size="14" font-weight="bold" fill="%23dc2626">7.9</text>
  <text x="480" y="470" font-size="12" fill="%23475569">uIU/mL</text>
  <text x="580" y="470" font-size="12" fill="%23475569">0.4 - 4.0</text>
  <rect x="695" y="455" width="45" height="20" rx="3" fill="%23fee2e2"/>
  <text x="705" y="470" font-size="11" font-weight="bold" fill="%23dc2626">HIGH</text>
  <line x1="50" y1="500" x2="750" y2="500" stroke="%23f1f5f9"/>

  <!-- Row 5: Haemoglobin -->
  <text x="65" y="525" font-size="13" font-weight="600" fill="%231e293b">Haemoglobin (Hb)</text>
  <text x="65" y="542" font-size="10" fill="%2364748b">SLS-Hb automated cell counter</text>
  <text x="360" y="525" font-size="14" font-weight="bold" fill="%232563eb">9.6</text>
  <text x="480" y="525" font-size="12" fill="%23475569">g/dL</text>
  <text x="580" y="525" font-size="12" fill="%23475569">12.0 - 15.5</text>
  <rect x="695" y="510" width="45" height="20" rx="3" fill="%23dbeafe"/>
  <text x="707" y="525" font-size="11" font-weight="bold" fill="%232563eb">LOW</text>
  <line x1="50" y1="555" x2="750" y2="555" stroke="%23f1f5f9"/>

  <!-- Row 6: 25-OH Vitamin D -->
  <text x="65" y="580" font-size="13" font-weight="600" fill="%231e293b">25-OH Vitamin D (Total)</text>
  <text x="65" y="597" font-size="10" fill="%2364748b">Chemiluminescence (CLIA)</text>
  <text x="360" y="580" font-size="14" font-weight="bold" fill="%232563eb">14.0</text>
  <text x="480" y="580" font-size="12" fill="%23475569">ng/mL</text>
  <text x="580" y="580" font-size="12" fill="%23475569">30 - 100</text>
  <rect x="695" y="565" width="45" height="20" rx="3" fill="%23dbeafe"/>
  <text x="707" y="580" font-size="11" font-weight="bold" fill="%232563eb">LOW</text>
  <line x1="50" y1="610" x2="750" y2="610" stroke="%23f1f5f9"/>

  <!-- Row 7: Creatinine (Normal) -->
  <text x="65" y="635" font-size="13" font-weight="600" fill="%231e293b">Serum Creatinine</text>
  <text x="65" y="652" font-size="10" fill="%2364748b">Modified Jaffe method</text>
  <text x="360" y="635" font-size="14" font-weight="bold" fill="%2316a34a">0.9</text>
  <text x="480" y="635" font-size="12" fill="%23475569">mg/dL</text>
  <text x="580" y="635" font-size="12" fill="%23475569">0.7 - 1.3</text>
  <rect x="690" y="620" width="55" height="20" rx="3" fill="%23dcfce7"/>
  <text x="696" y="635" font-size="11" font-weight="bold" fill="%2316a34a">NORMAL</text>
  <line x1="50" y1="665" x2="750" y2="665" stroke="%23f1f5f9"/>

  <!-- Footer Seal & Sign -->
  <g transform="translate(530, 850)">
    <circle cx="90" cy="50" r="40" fill="none" stroke="%23cbd5e1" stroke-width="2" stroke-dasharray="4"/>
    <text x="90" y="45" font-size="9" text-anchor="middle" fill="%2394a3b8">VERIFIED REPORT</text>
    <text x="90" y="60" font-size="9" text-anchor="middle" fill="%2394a3b8">APOLLO LABS</text>
    <path d="M 40 85 Q 90 60 140 80 Q 160 50 180 85" fill="none" stroke="%231e3a8a" stroke-width="2"/>
    <text x="40" y="105" font-size="12" font-weight="bold" fill="%231e293b">Dr. Ananya Sen, MD</text>
    <text x="40" y="120" font-size="11" fill="%2364748b">Consultant Pathologist (KMC 48192)</text>
  </g>
</svg>`;

const SVG_PRESCRIPTION = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" style="background:%23ffffff;font-family:system-ui,sans-serif">
  <rect width="800" height="1100" fill="%23ffffff"/>
  <rect x="0" y="0" width="800" height="12" fill="%232563eb"/>
  
  <text x="50" y="65" font-size="22" font-weight="bold" fill="%231e40af">SRI VENKATESWARA DIABETES %26 ENDOCRINE CLINIC</text>
  <text x="50" y="85" font-size="14" font-weight="600" fill="%23334155">DR. SURESH RAO, MD, DM (Endocrinology)</text>
  <text x="50" y="102" font-size="11" fill="%2364748b">Senior Consultant Diabetologist | Reg No: AP-MC-39102</text>
  <text x="50" y="117" font-size="11" fill="%2394a3b8">H.No 4-12, Green Glen Towers, Somajiguda, Hyderabad | Tel: 040-23458890</text>
  
  <line x1="50" y1="130" x2="750" y2="130" stroke="%232563eb" stroke-width="1.5"/>

  <!-- Patient Details -->
  <text x="50" y="160" font-size="13" font-weight="bold" fill="%231e293b">Patient: <tspan font-weight="normal">Lakshmi Devi</tspan></text>
  <text x="320" y="160" font-size="13" font-weight="bold" fill="%231e293b">Age/Sex: <tspan font-weight="normal">64 Y / Female</tspan></text>
  <text x="560" y="160" font-size="13" font-weight="bold" fill="%231e293b">Date: <tspan font-weight="normal">30-Mar-2026</tspan></text>
  
  <text x="50" y="185" font-size="13" font-weight="bold" fill="%231e293b">ABHA: <tspan font-weight="normal" font-family="monospace" fill="%230f766e">91-4521-7730-2286</tspan></text>
  <text x="320" y="185" font-size="13" font-weight="bold" fill="%231e293b">Diagnosis: <tspan font-weight="normal">Type 2 DM, Subclinical Hypothyroidism, Dyslipidemia</tspan></text>
  
  <line x1="50" y1="205" x2="750" y2="205" stroke="%23e2e8f0" stroke-width="1"/>

  <text x="50" y="245" font-size="28" font-family="serif" font-weight="bold" fill="%232563eb">℞</text>

  <!-- Medication 1 -->
  <text x="90" y="275" font-size="15" font-weight="bold" fill="%230f172a">1. Tab Metformin Hydrochloride 500 mg</text>
  <text x="110" y="295" font-size="13" font-weight="600" fill="%232563eb">1 - 0 - 1  (Twice daily, with lunch and dinner)</text>
  <text x="110" y="312" font-size="12" fill="%2364748b">Duration: 90 days · Take with meals to avoid gastric discomfort</text>

  <!-- Medication 2 -->
  <text x="90" y="350" font-size="15" font-weight="bold" fill="%230f172a">2. Tab Levothyroxine Sodium 50 mcg (Thyronorm / Eltroxin)</text>
  <text x="110" y="370" font-size="13" font-weight="600" fill="%232563eb">1 - 0 - 0  (Once daily early morning)</text>
  <text x="110" y="387" font-size="12" fill="%2364748b">Duration: 90 days · Take empty stomach with 1 glass water, 30 min before tea/breakfast</text>

  <!-- Medication 3 -->
  <text x="90" y="425" font-size="15" font-weight="bold" fill="%230f172a">3. Tab Atorvastatin Calcium 10 mg</text>
  <text x="110" y="445" font-size="13" font-weight="600" fill="%232563eb">0 - 0 - 1  (Once daily at bedtime)</text>
  <text x="110" y="462" font-size="12" fill="%2364748b">Duration: 30 days · Cholesterol control</text>

  <!-- Medication 4 -->
  <text x="90" y="500" font-size="15" font-weight="bold" fill="%230f172a">4. Tab Ferrous Ascorbate 100 mg (Iron supplement)</text>
  <text x="110" y="520" font-size="13" font-weight="600" fill="%232563eb">0 - 1 - 0  (Once daily after lunch)</text>
  <text x="110" y="537" font-size="12" fill="%2364748b">Duration: 60 days · Avoid taking simultaneously with tea or calcium</text>

  <!-- Medication 5 -->
  <text x="90" y="575" font-size="15" font-weight="bold" fill="%230f172a">5. Cap Cholecalciferol (Vitamin D3) 60,000 IU</text>
  <text x="110" y="595" font-size="13" font-weight="600" fill="%232563eb">Weekly once on Sunday after breakfast</text>
  <text x="110" y="612" font-size="12" fill="%2364748b">Duration: 8 weeks, then recheck serum Vitamin D levels</text>

  <rect x="50" y="650" width="700" height="90" rx="6" fill="%23eff6ff" stroke="%23bfdbfe"/>
  <text x="70" y="675" font-size="12" font-weight="bold" fill="%231e40af">General Advice %26 Next Follow-up:</text>
  <text x="70" y="695" font-size="12" fill="%231e3a8a">• Follow low carbohydrate, diabetic diet. Daily 30 min brisk walk.</text>
  <text x="70" y="712" font-size="12" fill="%231e3a8a">• Check home fasting and post-prandial blood sugar 2 times a week in logbook.</text>
  <text x="70" y="729" font-size="12" fill="%231e3a8a">• Review in clinic after 3 months with repeat FBS, HbA1c, and Lipid panel.</text>

  <!-- Doctor Signature -->
  <g transform="translate(530, 850)">
    <path d="M 30 70 Q 70 30 110 65 Q 140 40 170 70" fill="none" stroke="%231e3a8a" stroke-width="2.5"/>
    <text x="30" y="95" font-size="14" font-weight="bold" fill="%230f172a">Dr. Suresh Rao, MD</text>
    <text x="30" y="112" font-size="11" fill="%2364748b">Reg No: AP-MC-39102</text>
  </g>
</svg>`;

export const SAMPLE_PROFILES: Profile[] = [
  {
    id: "p-lakshmi",
    name: "Lakshmi Devi",
    relation: "Mother",
    age: "64",
    sex: "F",
    abha_number: "91-4521-7730-2286",
    abha_address: "lakshmi.devi@abdm",
    abha_linked: true,
    abha_linked_at: "2026-02-15T10:30:00Z",
    is_sample: true,
    created_at: "2026-01-10T08:00:00Z",
  },
  {
    id: "p-ramesh",
    name: "Ramesh Kumar",
    relation: "Father",
    age: "68",
    sex: "M",
    abha_number: "91-8834-1290-7711",
    abha_address: "ramesh.kumar@abdm",
    abha_linked: true,
    abha_linked_at: "2026-02-18T14:15:00Z",
    is_sample: true,
    created_at: "2026-01-10T08:15:00Z",
  },
  {
    id: "p-rajesh",
    name: "Rajesh Kumar Sharma",
    relation: "Self",
    age: "38",
    sex: "M",
    abha_number: "91-1234-5678-9012",
    abha_address: "rajesh.sharma@abdm",
    abha_linked: true,
    abha_linked_at: "2026-01-05T09:00:00Z",
    is_sample: true,
    created_at: "2026-01-05T09:00:00Z",
  },
  {
    id: "p-ananya",
    name: "Ananya Kumar",
    relation: "Daughter",
    age: "10",
    sex: "F",
    abha_number: "91-7654-3210-9876",
    abha_address: "ananya.kumar@abdm",
    abha_linked: true,
    abha_linked_at: "2026-03-01T11:00:00Z",
    is_sample: true,
    created_at: "2026-03-01T11:00:00Z",
  },
];

export const SAMPLE_RECORDS: HealthRecord[] = [
  {
    id: "rec-lakshmi-01",
    profile_id: "p-lakshmi",
    document_type: "DiagnosticReport",
    record_date: "2026-03-28",
    title: "Metabolic & Lipid Profile - Apollo Diagnostics",
    source_filename: "apollo_lipid_profile_lakshmi.pdf",
    source_mime: "application/pdf",
    has_source_file: true,
    has_preview: true,
    name_check: "match",
    extraction: { engine: "Gemini 1.5 Flash Vision OCR", model: "gemini-1.5-flash", duration_ms: 1240, warnings: [] },
    is_sample: true,
    created_at: "2026-03-28T10:00:00Z",
    extracted: {
      record_type: "DiagnosticReport",
      record_date: "2026-03-28",
      patient_name: "Lakshmi Devi",
      patient_age: "64",
      patient_sex: "F",
      doctor_name: "Dr. Suresh Rao",
      facility_name: "Apollo Clinical Diagnostics",
      handwritten: false,
      languages_detected: ["en"],
      unreadable_parts: [],
      diagnoses: ["Type 2 Diabetes Mellitus", "Dyslipidemia", "Hypothyroidism", "Mild Anaemia"],
      medications: [],
      lab_observations: [
        {
          test_name: "Fasting Blood Sugar",
          observed_value: "185",
          unit: "mg/dL",
          reference_range: "70 - 99",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Fasting blood sugar of 185 mg/dL is higher than the normal limit of 99 mg/dL. Requires diabetes management.",
            hindi: "उपवास रक्त शर्करा 185 mg/dL सामान्य सीमा 99 से अधिक है। मधुमेह नियंत्रण की आवश्यकता है।",
            telugu: "ఫాస్టింగ్ బ్లడ్ షుగర్ 185 mg/dL సాధారణ పరిమితి 99 కంటే ఎక్కువ.",
          },
        },
        {
          test_name: "Glycated Hemoglobin (HbA1c)",
          observed_value: "8.4",
          unit: "%",
          reference_range: "4.0 - 5.6",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "HbA1c 8.4% reflects elevated average blood sugar over the last 3 months.",
            hindi: "HbA1c 8.4% पिछले 3 महीनों में उच्च औसत रक्त शर्करा को दर्शाता है।",
            telugu: "HbA1c 8.4% గత 3 నెలలుగా సగటున అధిక చక్కెర స్థాయిలను సూచిస్తుంది.",
          },
        },
        {
          test_name: "Total Serum Cholesterol",
          observed_value: "240",
          unit: "mg/dL",
          reference_range: "125 - 200",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Total cholesterol is above the desirable 200 mg/dL cutoff.",
            hindi: "कुल कोलेस्ट्रॉल 200 mg/dL के वांछनीय स्तर से ऊपर है।",
            telugu: "మొత్తం కొలెస్ట్రాల్ 200 mg/dL కంటే ఎక్కువగా ఉంది.",
          },
        },
        {
          test_name: "TSH (Ultrasensitive)",
          observed_value: "7.9",
          unit: "uIU/mL",
          reference_range: "0.4 - 4.0",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Elevated TSH indicates underactive thyroid gland (hypothyroidism).",
            hindi: "बढ़ा हुआ TSH थायरॉयड ग्रंथि के कम सक्रिय होने का संकेत देता है।",
            telugu: "ఎలివేటెడ్ TSH థైరాయిడ్ తక్కువగా పనిచేస్తుందని సూచిస్తుంది.",
          },
        },
        {
          test_name: "Haemoglobin",
          observed_value: "9.6",
          unit: "g/dL",
          reference_range: "12.0 - 15.5",
          flag: "LOW",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Hemoglobin of 9.6 g/dL indicates mild anaemia.",
            hindi: "9.6 g/dL हीमोग्लोबिन हल्के एनीमिया का संकेत देता है।",
            telugu: "హీమోగ్లోబిన్ 9.6 g/dL రక్తహీనతను సూచిస్తుంది.",
          },
        },
        {
          test_name: "25-OH Vitamin D",
          observed_value: "14.0",
          unit: "ng/mL",
          reference_range: "30 - 100",
          flag: "LOW",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Vitamin D is deficient at 14.0 ng/mL (optimal: above 30 ng/mL).",
            hindi: "विटामिन डी की कमी (14.0 ng/mL) है।",
            telugu: "విటమిన్ డి లోపం ఉంది (14.0 ng/mL).",
          },
        },
        {
          test_name: "Serum Creatinine",
          observed_value: "0.9",
          unit: "mg/dL",
          reference_range: "0.7 - 1.3",
          flag: "NORMAL",
          flag_source: "computed",
          uncertain: false,
          explanation: {
            english: "Normal kidney function marker.",
            hindi: "गुर्दे की सामान्य कार्यप्रणाली।",
            telugu: "కిడ్నీ పనితీరు సాధారణంగా ఉంది.",
          },
        },
      ],
      summary: {
        english: "Metabolic and lipid panel reveals uncontrolled Fasting Blood Sugar (185 mg/dL), elevated HbA1c (8.4%), and High Total Cholesterol (240 mg/dL). Elevated TSH (7.9 uIU/mL) confirms hypothyroidism, while Low Hemoglobin (9.6 g/dL) and Vitamin D (14 ng/mL) indicate mild anaemia and deficiency. Kidney function remains completely normal.",
        hindi: "मेटाबॉलिक रिपोर्ट में उपवास रक्त शर्करा (185 mg/dL) और HbA1c (8.4%) बढ़ा हुआ है। कोलेस्ट्रॉल 240 mg/dL और थायरॉयड TSH 7.9 uIU/mL भी अधिक है। हीमोग्लोबिन और विटामिन डी कम हैं, जबकि गुर्दे सामान्य हैं।",
        telugu: "మెటబాలిక్ నివేదికలో ఫాస్టింగ్ బ్లడ్ షుగర్ (185 mg/dL), HbA1c (8.4%) మరియు కొలెస్ట్రాల్ (240 mg/dL) ఎక్కువగా ఉన్నాయి. థైరాయిడ్ TSH (7.9) పెరిగింది. హీమోగ్లోబిన్ మరియు విటమిన్ డి తక్కువగా ఉన్నాయి, కిడ్నీలు సాధారణంగా ఉన్నాయి.",
      },
      doctor_questions: {
        english: [
          "Should we titrate Metformin or add a secondary agent given HbA1c of 8.4%?",
          "Would you recommend starting Statin therapy for cholesterol of 240 mg/dL?",
          "Should Levothyroxine dosage be increased from 50 mcg for TSH of 7.9?",
        ],
        hindi: [
          "क्या HbA1c 8.4% के लिए मेटफॉर्मिन की खुराक बढ़ानी चाहिए?",
          "क्या 240 mg/dL कोलेस्ट्रॉल के लिए स्टेटिन शुरू करना चाहिए?",
        ],
        telugu: [
          "HbA1c 8.4% ఉన్నందున మెట్‌ఫార్మిన్ మోతాదు సర్దుబాటు చేయాలా?",
          "కొలెస్ట్రాల్ 240 mg/dL కొరకు స్టాటిన్ ప్రారంభించాలా?",
        ],
      },
    },
    fhir_bundle: {
      resourceType: "Bundle",
      id: "bundle-diag-lakshmi-01",
      meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportRecord"] },
      type: "document",
      timestamp: "2026-03-28T10:00:00Z",
      entry: [
        {
          resource: {
            resourceType: "Composition",
            id: "comp-diag-01",
            status: "final",
            type: { text: "Diagnostic Report" },
            title: "Comprehensive Metabolic & Lipid Panel",
            date: "2026-03-28",
          },
        },
      ],
    },
  },
  {
    id: "rec-lakshmi-02",
    profile_id: "p-lakshmi",
    document_type: "Prescription",
    record_date: "2026-03-30",
    title: "Endocrinology Prescription - Dr. Suresh Rao, MD",
    source_filename: "dr_rao_prescription_lakshmi.png",
    source_mime: "image/png",
    has_source_file: true,
    has_preview: true,
    name_check: "match",
    extraction: { engine: "Gemini 1.5 Flash Vision OCR", model: "gemini-1.5-flash", duration_ms: 980, warnings: [] },
    is_sample: true,
    created_at: "2026-03-30T11:30:00Z",
    extracted: {
      record_type: "Prescription",
      record_date: "2026-03-30",
      patient_name: "Lakshmi Devi",
      patient_age: "64",
      patient_sex: "F",
      doctor_name: "Dr. Suresh Rao",
      facility_name: "Sri Venkateswara Diabetes Clinic",
      handwritten: true,
      languages_detected: ["en"],
      unreadable_parts: [],
      diagnoses: ["Type 2 Diabetes Mellitus", "Subclinical Hypothyroidism", "Dyslipidemia"],
      lab_observations: [],
      medications: [
        {
          name: "Metformin Hydrochloride",
          dosage: "500 mg",
          frequency: "1-0-1",
          timing: "With meals",
          duration: "90 days",
          uncertain: false,
          instructions: {
            english: "Take twice daily with breakfast and dinner to minimize stomach upset.",
            hindi: "भोजन के साथ दिन में दो बार लें।",
            telugu: "భోజనంతో పాటు రోజుకు రెండుసార్లు తీసుకోండి.",
          },
        },
        {
          name: "Levothyroxine Sodium",
          dosage: "50 mcg",
          frequency: "1-0-0",
          timing: "Empty stomach",
          duration: "90 days",
          uncertain: false,
          instructions: {
            english: "Take once daily early in the morning on an empty stomach with a glass of water, 30 minutes before tea or breakfast.",
            hindi: "सुबह खाली पेट एक गिलास पानी के साथ लें।",
            telugu: "ఉదయం ఖాళీ కడుపుతో ఒక గ్లాసు నీటితో తీసుకోండి.",
          },
        },
        {
          name: "Atorvastatin Calcium",
          dosage: "10 mg",
          frequency: "0-0-1",
          timing: "Bedtime",
          duration: "30 days",
          uncertain: false,
          instructions: {
            english: "Take once daily before sleeping for cholesterol management.",
            hindi: "रात को सोने से पहले लें।",
            telugu: "రాత్రి పడుకునే ముందు తీసుకోండి.",
          },
        },
        {
          name: "Ferrous Ascorbate",
          dosage: "100 mg",
          frequency: "0-1-0",
          timing: "After lunch",
          duration: "60 days",
          uncertain: false,
          instructions: {
            english: "Take once daily after lunch for iron deficiency anaemia.",
            hindi: "दोपहर के भोजन के बाद लें।",
            telugu: "మధ్యాహ్న భోజనం తర్వాత తీసుకోండి.",
          },
        },
        {
          name: "Cholecalciferol (Vitamin D3)",
          dosage: "60,000 IU",
          frequency: "Weekly",
          timing: "After breakfast",
          duration: "8 weeks",
          uncertain: false,
          instructions: {
            english: "Take one capsule once a week on Sunday morning.",
            hindi: "सप्ताह में एक बार रविवार को लें।",
            telugu: "వారానికి ఒకసారి ఆదివారం తీసుకోండి.",
          },
        },
      ],
      summary: {
        english: "Prescription targets glycemic control (Metformin twice daily), thyroid hormone stabilization (Levothyroxine 50 mcg on empty stomach), lipid management (Atorvastatin at night), and treatment of iron and Vitamin D deficiencies.",
        hindi: "यह नुस्खा शुगर नियंत्रण (मेटफॉर्मिन), थायरॉयड (लेवोथायरोक्सिन खाली पेट), कोलेस्ट्रॉल (एटोरवास्टेटिन रात में) और विटामिन की कमी को दूर करने के लिए है।",
        telugu: "ఈ ప్రిస్క్రిప్షన్ షుగర్ కంట్రోల్ (మెట్‌ఫార్మిన్), థైరాయిడ్ (లెవోథైరాక్సిన్ ఖాళీ కడుపుతో), కొలెస్ట్రాల్ మరియు విటమిన్ లోప నివారణ కొరకు సూచించబడింది.",
      },
      doctor_questions: {
        english: [
          "Should we recheck thyroid function (TSH) in 8 weeks?",
          "Can the Iron supplement be taken with orange juice for better absorption?",
        ],
        hindi: ["क्या 8 सप्ताह बाद फिर से थायरॉयड TSH की जांच करानी होगी?"],
        telugu: ["8 వారాల తర్వాత మళ్లీ థైరాయిడ్ TSH పరీక్ష చేయించాలా?"],
      },
    },
    fhir_bundle: {
      resourceType: "Bundle",
      id: "bundle-rx-lakshmi-02",
      meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord"] },
      type: "document",
      timestamp: "2026-03-30T11:30:00Z",
      entry: [
        {
          resource: {
            resourceType: "Composition",
            id: "comp-rx-02",
            status: "final",
            type: { text: "Prescription Record" },
            title: "Endocrinology Prescription - Dr. Suresh Rao",
            date: "2026-03-30",
          },
        },
      ],
    },
  },
  {
    id: "rec-ramesh-01",
    profile_id: "p-ramesh",
    document_type: "DiagnosticReport",
    record_date: "2026-03-15",
    title: "Cardiology Review & Lipid Profile - Care Hospital",
    source_filename: "care_cardio_ramesh.pdf",
    source_mime: "application/pdf",
    has_source_file: true,
    has_preview: true,
    name_check: "match",
    extraction: { engine: "Gemini 1.5 Flash Vision OCR", model: "gemini-1.5-flash", duration_ms: 890, warnings: [] },
    is_sample: true,
    created_at: "2026-03-15T09:00:00Z",
    extracted: {
      record_type: "DiagnosticReport",
      record_date: "2026-03-15",
      patient_name: "Ramesh Kumar",
      patient_age: "68",
      patient_sex: "M",
      doctor_name: "Dr. K. V. Murthy",
      facility_name: "Care Heart Institute",
      handwritten: false,
      languages_detected: ["en"],
      unreadable_parts: [],
      diagnoses: ["Primary Essential Hypertension", "Hypertriglyceridemia"],
      medications: [
        {
          name: "Telmisartan",
          dosage: "40 mg",
          frequency: "1-0-0",
          timing: "Morning",
          duration: "90 days",
          uncertain: false,
          instructions: { english: "Take daily in the morning for blood pressure.", hindi: "रक्तचाप के लिए सुबह लें।" },
        },
        {
          name: "Amlodipine",
          dosage: "5 mg",
          frequency: "0-0-1",
          timing: "Bedtime",
          duration: "90 days",
          uncertain: false,
          instructions: { english: "Take at night for additional BP control.", hindi: "अतिरिक्त बीपी नियंत्रण के लिए रात को लें।" },
        },
        {
          name: "Ecosprin (Aspirin)",
          dosage: "75 mg",
          frequency: "0-1-0",
          timing: "After lunch",
          duration: "90 days",
          uncertain: false,
          instructions: { english: "Take daily after lunch.", hindi: "दोपहर के भोजन के बाद लें।" },
        },
      ],
      lab_observations: [
        {
          test_name: "Systolic Blood Pressure",
          observed_value: "148",
          unit: "mmHg",
          reference_range: "90 - 120",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
        },
        {
          test_name: "Diastolic Blood Pressure",
          observed_value: "92",
          unit: "mmHg",
          reference_range: "60 - 80",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
        },
        {
          test_name: "Serum Triglycerides",
          observed_value: "215",
          unit: "mg/dL",
          reference_range: "50 - 150",
          flag: "HIGH",
          flag_source: "computed",
          uncertain: false,
        },
        {
          test_name: "Serum Potassium",
          observed_value: "4.2",
          unit: "mEq/L",
          reference_range: "3.5 - 5.0",
          flag: "NORMAL",
          flag_source: "computed",
          uncertain: false,
        },
      ],
      summary: {
        english: "Cardiology follow-up demonstrates elevated Blood Pressure (148/92 mmHg) and High Triglycerides (215 mg/dL). Prescribed dual antihypertensive therapy (Telmisartan + Amlodipine) and low-dose Aspirin.",
        hindi: "कार्डियोलॉजी जांच में रक्तचाप (148/92 mmHg) और ट्राइग्लिसराइड्स (215 mg/dL) अधिक हैं। बीपी की दवाएं और एस्पिरिन दी गई हैं।",
        telugu: "కార్డియాలజీ సమీక్షలో రక్తపోటు (148/92 mmHg) మరియు ట్రైగ్లిజరైడ్స్ ఎక్కువగా ఉన్నట్లు తేలింది.",
      },
      doctor_questions: {
        english: ["Should we do a 24-hour ambulatory blood pressure monitoring (ABPM)?"],
        hindi: ["क्या 24 घंटे की बीपी मॉनिटरिंग की आवश्यकता है?"],
        telugu: ["24 గంటల రక్తపోటు పర్యవేక్షణ చేయాలా?"],
      },
    },
    fhir_bundle: {
      resourceType: "Bundle",
      id: "bundle-cardio-ramesh-01",
      meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportRecord"] },
      type: "document",
      timestamp: "2026-03-15T09:00:00Z",
      entry: [],
    },
  },
  {
    id: "rec-rajesh-01",
    profile_id: "p-rajesh",
    document_type: "DiagnosticReport",
    record_date: "2026-02-10",
    title: "Executive Health Checkup - Max Healthcare",
    source_filename: "max_health_checkup_rajesh.pdf",
    source_mime: "application/pdf",
    has_source_file: true,
    has_preview: true,
    name_check: "match",
    extraction: { engine: "Gemini 1.5 Flash Vision OCR", model: "gemini-1.5-flash", duration_ms: 780, warnings: [] },
    is_sample: true,
    created_at: "2026-02-10T08:30:00Z",
    extracted: {
      record_type: "DiagnosticReport",
      record_date: "2026-02-10",
      patient_name: "Rajesh Kumar Sharma",
      patient_age: "38",
      patient_sex: "M",
      doctor_name: "Dr. Meenakshi Joshi",
      facility_name: "Max Healthcare",
      handwritten: false,
      languages_detected: ["en"],
      unreadable_parts: [],
      diagnoses: ["Routine Health Evaluation - All Parameters Optimal"],
      medications: [],
      lab_observations: [
        {
          test_name: "Fasting Blood Sugar",
          observed_value: "92",
          unit: "mg/dL",
          reference_range: "70 - 99",
          flag: "NORMAL",
          flag_source: "computed",
          uncertain: false,
        },
        {
          test_name: "HbA1c",
          observed_value: "5.2",
          unit: "%",
          reference_range: "4.0 - 5.6",
          flag: "NORMAL",
          flag_source: "computed",
          uncertain: false,
        },
        {
          test_name: "Total Cholesterol",
          observed_value: "172",
          unit: "mg/dL",
          reference_range: "125 - 200",
          flag: "NORMAL",
          flag_source: "computed",
          uncertain: false,
        },
      ],
      summary: {
        english: "Annual executive health panel shows excellent metabolic health with normal blood glucose (92 mg/dL), optimal HbA1c (5.2%), and healthy lipid parameters.",
        hindi: "वार्षिक स्वास्थ्य जांच में सभी रिपोर्ट सामान्य हैं। रक्त शर्करा और कोलेस्ट्रॉल बिल्कुल स्वस्थ स्तर पर हैं।",
        telugu: "వార్షిక ఆరోగ్య పరీక్షలో అన్ని ఫలితాలు సాధారణంగా ఉన్నాయి.",
      },
      doctor_questions: {
        english: ["Recommended interval for next executive health checkup?"],
        hindi: ["अगली स्वास्थ्य जांच कब करानी चाहिए?"],
        telugu: ["తదుపరి చెకప్ ఎప్పుడు చేయించుకోవాలి?"],
      },
    },
    fhir_bundle: {
      resourceType: "Bundle",
      id: "bundle-health-rajesh-01",
      meta: { profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportRecord"] },
      type: "document",
      timestamp: "2026-02-10T08:30:00Z",
      entry: [],
    },
  },
];

export const SAMPLE_FILE_URLS: FileUrls = {
  "rec-lakshmi-01": {
    original: SVG_LAB_REPORT,
    preview: SVG_LAB_REPORT,
  },
  "rec-lakshmi-02": {
    original: SVG_PRESCRIPTION,
    preview: SVG_PRESCRIPTION,
  },
  "rec-ramesh-01": {
    original: SVG_LAB_REPORT,
    preview: SVG_LAB_REPORT,
  },
  "rec-rajesh-01": {
    original: SVG_LAB_REPORT,
    preview: SVG_LAB_REPORT,
  },
};

// Client-side in-memory & localStorage store
class MockDataStore {
  private profiles: Profile[] = [];
  private records: HealthRecord[] = [];
  private fileUrls: FileUrls = {};

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === "undefined") {
      this.profiles = [...SAMPLE_PROFILES];
      this.records = [...SAMPLE_RECORDS];
      this.fileUrls = { ...SAMPLE_FILE_URLS };
      return;
    }

    try {
      const savedProfiles = localStorage.getItem("copilot_mock_profiles");
      const savedRecords = localStorage.getItem("copilot_mock_records");
      this.profiles = savedProfiles ? JSON.parse(savedProfiles) : [...SAMPLE_PROFILES];
      this.records = savedRecords ? JSON.parse(savedRecords) : [...SAMPLE_RECORDS];
      this.fileUrls = { ...SAMPLE_FILE_URLS };
    } catch {
      this.profiles = [...SAMPLE_PROFILES];
      this.records = [...SAMPLE_RECORDS];
      this.fileUrls = { ...SAMPLE_FILE_URLS };
    }
  }

  private save() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("copilot_mock_profiles", JSON.stringify(this.profiles));
      localStorage.setItem("copilot_mock_records", JSON.stringify(this.records));
    } catch {}
  }

  getProfiles(): Profile[] {
    return [...this.profiles];
  }

  createProfile(p: { name: string; relation: string; age?: string; sex?: string }): Profile {
    const newProfile: Profile = {
      id: `p-${Date.now()}`,
      name: p.name,
      relation: p.relation,
      age: p.age || null,
      sex: p.sex || null,
      abha_number: null,
      abha_address: null,
      abha_linked: false,
      is_sample: false,
      created_at: new Date().toISOString(),
    };
    this.profiles.push(newProfile);
    this.save();
    return newProfile;
  }

  deleteProfile(id: string): void {
    this.profiles = this.profiles.filter((p) => p.id !== id);
    this.records = this.records.filter((r) => r.profile_id !== id);
    this.save();
  }

  linkAbha(id: string, b: { abha_number?: string; abha_address?: string }): Profile {
    const prof = this.profiles.find((p) => p.id === id);
    if (!prof) throw new Error("Profile not found");
    if (b.abha_number) prof.abha_number = b.abha_number;
    if (b.abha_address) prof.abha_address = b.abha_address;
    prof.abha_linked = true;
    prof.abha_linked_at = new Date().toISOString();
    this.save();
    return prof;
  }

  unlinkAbha(id: string): Profile {
    const prof = this.profiles.find((p) => p.id === id);
    if (!prof) throw new Error("Profile not found");
    prof.abha_number = null;
    prof.abha_address = null;
    prof.abha_linked = false;
    prof.abha_linked_at = null;
    this.save();
    return prof;
  }

  getRecords(profileId?: string): HealthRecord[] {
    if (profileId) {
      return this.records.filter((r) => r.profile_id === profileId);
    }
    return [...this.records];
  }

  getFileUrls(profileId?: string): FileUrls {
    return { ...this.fileUrls };
  }

  getSourceUrl(id: string, variant: "original" | "preview" = "original"): { url: string } {
    const u = this.fileUrls[id]?.[variant] || SVG_LAB_REPORT;
    return { url: u };
  }

  moveRecord(id: string, profileId: string): HealthRecord {
    const rec = this.records.find((r) => r.id === id);
    if (!rec) throw new Error("Record not found");
    rec.profile_id = profileId;
    this.save();
    return rec;
  }

  deleteRecord(id: string): void {
    this.records = this.records.filter((r) => r.id !== id);
    this.save();
  }

  uploadRecord(file: File, profileId: string): HealthRecord {
    const id = `rec-up-${Date.now()}`;
    const isLab = /lab|blood|test|report|cbc|lipid/i.test(file.name);
    const docType = isLab ? "DiagnosticReport" : "Prescription";
    const profile = this.profiles.find((p) => p.id === profileId);
    const patientName = profile ? profile.name : "Verified Patient";

    const newRecord: HealthRecord = {
      id,
      profile_id: profileId,
      document_type: docType,
      record_date: new Date().toISOString().split("T")[0],
      title: `${isLab ? "Diagnostic Lab Report" : "Doctor Prescription"} - ${file.name.replace(/\.[^/.]+$/, "")}`,
      source_filename: file.name,
      source_mime: file.type || "image/png",
      has_source_file: true,
      has_preview: true,
      name_check: "match",
      extraction: {
        engine: "AI Multimodal Vision Engine (Client Mode)",
        model: "gemini-1.5-flash",
        duration_ms: 1100,
        warnings: [],
      },
      is_sample: false,
      created_at: new Date().toISOString(),
      extracted: isLab
        ? {
            record_type: "DiagnosticReport",
            record_date: new Date().toISOString().split("T")[0],
            patient_name: patientName,
            patient_age: profile?.age || "50",
            patient_sex: profile?.sex || "F",
            doctor_name: "Dr. Consulting Physician",
            facility_name: "Diagnostic Care Centre",
            handwritten: false,
            languages_detected: ["en"],
            unreadable_parts: [],
            diagnoses: ["Clinical Metabolic Evaluation"],
            medications: [],
            lab_observations: [
              {
                test_name: "Fasting Blood Sugar",
                observed_value: "142",
                unit: "mg/dL",
                reference_range: "70 - 99",
                flag: "HIGH",
                flag_source: "computed",
                uncertain: false,
              },
              {
                test_name: "Total Cholesterol",
                observed_value: "210",
                unit: "mg/dL",
                reference_range: "125 - 200",
                flag: "HIGH",
                flag_source: "computed",
                uncertain: false,
              },
            ],
            summary: {
              english: `Uploaded report for ${patientName} shows mildly elevated Fasting Blood Sugar (142 mg/dL) and Total Cholesterol (210 mg/dL).`,
              hindi: `${patientName} की अपलोड की गई रिपोर्ट में रक्त शर्करा (142 mg/dL) और कोलेस्ट्रॉल थोड़ा बढ़ा हुआ है।`,
              telugu: `${patientName} నివేదికలో బ్లడ్ షుగర్ మరియు కొలెస్ట్రాల్ ఎక్కువగా ఉన్నాయి.`,
            },
            doctor_questions: {
              english: ["Should dietary modifications be initiated for elevated glucose?"],
              hindi: ["क्या आहार में बदलाव शुरू करना चाहिए?"],
              telugu: ["ఆహారపు అలవాట్లలో మార్పులు చేసుకోవాలా?"],
            },
          }
        : {
            record_type: "Prescription",
            record_date: new Date().toISOString().split("T")[0],
            patient_name: patientName,
            patient_age: profile?.age || "50",
            patient_sex: profile?.sex || "F",
            doctor_name: "Dr. Consulting Physician",
            facility_name: "Primary Care Hospital",
            handwritten: true,
            languages_detected: ["en"],
            unreadable_parts: [],
            diagnoses: ["Prescription Evaluation"],
            lab_observations: [],
            medications: [
              {
                name: "Metformin Hydrochloride",
                dosage: "500 mg",
                frequency: "1-0-1",
                timing: "After meals",
                duration: "30 days",
                uncertain: false,
                instructions: { english: "Take after breakfast and dinner.", hindi: "भोजन के बाद लें।" },
              },
              {
                name: "Multivitamin Tablet",
                dosage: "1 Tab",
                frequency: "0-1-0",
                timing: "After lunch",
                duration: "30 days",
                uncertain: false,
                instructions: { english: "Daily supplement after food.", hindi: "दैनिक सप्लीमेंट।" },
              },
            ],
            summary: {
              english: `Prescription uploaded for ${patientName}. Contains active regular medication schedule.`,
              hindi: `${patientName} के लिए डॉक्टर का पर्चा सफलतापूर्वक अपलोड किया गया।`,
              telugu: `${patientName} కొరకు ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయబడింది.`,
            },
            doctor_questions: {
              english: ["Follow up after 30 days of prescribed regimen."],
              hindi: ["30 दिनों के बाद दोबारा परामर्श लें।"],
              telugu: ["30 రోజుల తర్వాత మళ్లీ సంప్రదించండి."],
            },
          },
      fhir_bundle: {
        resourceType: "Bundle",
        id: `bundle-up-${id}`,
        meta: { profile: [`https://nrces.in/ndhm/fhir/r4/StructureDefinition/${docType}Record`] },
        type: "document",
        timestamp: new Date().toISOString(),
        entry: [],
      },
    };

    this.records.unshift(newRecord);
    this.fileUrls[id] = {
      original: isLab ? SVG_LAB_REPORT : SVG_PRESCRIPTION,
      preview: isLab ? SVG_LAB_REPORT : SVG_PRESCRIPTION,
    };
    this.save();
    return newRecord;
  }

  ask(query: string, language: Lang, profileId: string): CopilotAnswer {
    const q = query.toLowerCase();
    const profile = this.profiles.find((p) => p.id === profileId);
    const name = profile ? profile.name : "the patient";
    const profileRecords = this.records.filter((r) => r.profile_id === profileId);

    const citations = profileRecords.slice(0, 2).map((r) => ({
      record_id: r.id,
      title: r.title,
      record_date: r.record_date,
    }));

    let answerEn = "";
    let answerHi = "";
    let answerTe = "";

    if (q.includes("thyroid") || q.includes("levothyroxine") || q.includes("tsh")) {
      answerEn = `${name} is prescribed Levothyroxine Sodium 50 mcg for thyroid support. She should take it once daily early in the morning on an empty stomach with a glass of water, 30 minutes before tea or breakfast. Her latest TSH was 7.9 uIU/mL. [${citations[1]?.record_id || "rec-lakshmi-02"}]`;
      answerHi = `${name} को थायरॉयड के लिए लेवोथायरोक्सिन 50 एमसीजी दी गई है। इसे सुबह खाली पेट एक गिलास पानी के साथ नाश्ते से 30 मिनट पहले लेना है। उनका नवीनतम TSH स्तर 7.9 uIU/mL था।`;
      answerTe = `${name}కు థైరాయిడ్ కొరకు లెవోథైరాక్సిన్ 50 mcg సూచించబడింది. దీనిని ఉదయం ఖాళీ కడుపుతో నీటితో టిఫిన్‌కు 30 నిమిషాల ముందు తీసుకోవాలి. తాజా TSH స్థాయి 7.9 uIU/mL.`;
    } else if (q.includes("sugar") || q.includes("glucose") || q.includes("diabetes") || q.includes("hba1c") || q.includes("metformin")) {
      answerEn = `Based on the latest metabolic panel, ${name}'s Fasting Blood Sugar is 185 mg/dL (High, normal: 70-99) and HbA1c is 8.4% (High, normal: 4.0-5.6). She is prescribed Metformin 500mg twice daily with meals (1-0-1) to manage blood sugar. [${citations[0]?.record_id || "rec-lakshmi-01"}]`;
      answerHi = `${name} की उपवास रक्त शर्करा 185 mg/dL (उच्च) और HbA1c 8.4% (उच्च) है। रक्त शर्करा को नियंत्रित करने के लिए मेटफॉर्मिन 500mg दिन में दो बार भोजन के साथ लेने की सलाह दी गई है।`;
      answerTe = `${name} యొక్క ఫాస్టింగ్ బ్లడ్ షుగర్ 185 mg/dL మరియు HbA1c 8.4% ఎక్కువగా ఉన్నాయి. షుగర్ నియంత్రణకు మెట్‌ఫార్మిన్ 500mg రోజుకు రెండుసార్లు భోజనంతో తీసుకోవాలి.`;
    } else if (q.includes("medicine") || q.includes("medication") || q.includes("tablet") || q.includes("dose")) {
      answerEn = `Current active medications for ${name} include: 1) Levothyroxine 50 mcg (morning empty stomach), 2) Metformin 500mg (twice daily with meals), 3) Atorvastatin 10mg (once at bedtime), and 4) Ferrous Ascorbate 100mg (once after lunch). [${citations[1]?.record_id || "rec-lakshmi-02"}]`;
      answerHi = `${name} की वर्तमान दवाओं में शामिल हैं: लेवोथायरोक्सिन 50mcg (सुबह खाली पेट), मेटफॉर्मिन 500mg (भोजन के साथ दो बार), एटोरवास्टेटिन 10mg (रात को), और आयरन की गोली (दोपहर बाद)।`;
      answerTe = `${name} యొక్క ప్రస్తుత మందులు: లెవోథైరాక్సిన్ 50mcg (ఉదయం ఖాళీ కడుపుతో), మెట్‌ఫార్మిన్ 500mg (రెండుసార్లు), అటోర్వాస్టాటిన్ 10mg (రాత్రి), ఐరన్ టాబ్లెట్ (మధ్యాహ్నం).`;
    } else {
      answerEn = `Hello! I am your AI Health Copilot. In ${name}'s records, the primary markers requiring attention are elevated Fasting Blood Glucose (185 mg/dL), HbA1c (8.4%), and TSH (7.9 uIU/mL). You can ask me about medication timings, lab ranges, or doctor instructions.`;
      answerHi = `नमस्ते! मैं आपका एआई हेल्थ कोपायलट हूं। ${name} के स्वास्थ्य रिकॉर्ड में रक्त शर्करा (185 mg/dL), HbA1c (8.4%) और TSH (7.9) पर ध्यान देने की आवश्यकता है। आप दवाओं के समय या परीक्षण के बारे में पूछ सकते हैं।`;
      answerTe = `నమస్తే! నేను మీ AI హెల్త్ కోపైలట్‌ని. ${name} రికార్డులలో బ్లడ్ షుగర్, HbA1c మరియు థైరాయిడ్ TSH ఎక్కువగా ఉన్నాయి. మీరు మందుల సమయాలు లేదా ల్యాబ్ ఫలితాల గురించి ఏదైనా అడగవచ్చు.`;
    }

    let finalAnswer = answerEn;
    if (language === "hi") finalAnswer = answerHi;
    if (language === "te") finalAnswer = answerTe;

    return {
      answer: finalAnswer,
      language,
      citations,
      disclaimer: "AI-generated clinical summary based on uploaded health records. Consult your doctor for medical advice.",
      safety: "ok",
      model: "Health Copilot AI Engine",
    };
  }

  loadSample(): { records: number } {
    this.profiles = [...SAMPLE_PROFILES];
    this.records = [...SAMPLE_RECORDS];
    this.fileUrls = { ...SAMPLE_FILE_URLS };
    this.save();
    return { records: this.records.length };
  }
}

export const mockStore = new MockDataStore();
