
---

## `SRS_UI_Component_Mapping.md`

```md
# SRS UI Component Mapping — VisualMath AI

Dokumen ini memetakan kebutuhan fungsional pada SRS/SKPL VisualMath AI ke halaman dan komponen User Interface Front-End.

Mapping dibagi berdasarkan tiga aktor utama:

1. Mahasiswa
2. Dosen
3. Admin

Status implementasi menggunakan:

- **Implemented** = komponen/halaman dapat dibuktikan dari source code.
- **Partial** = sebagian kebutuhan sudah memiliki UI/representasi Front-End.
- **Planned / Not Proven** = belum dapat dibuktikan dari source code yang tersedia.

---

# 1. Authentication

## FR-01 — Login

**Aktor:** Semua pengguna

| UI Element | Implementasi |
|---|---|
| Login Page | `visualmathai-next/app/login/page.tsx` |
| Login Form | `visualmathai-next/app/components/LoginFormClient.tsx` |
| Email Input | Login Form |
| Password Input | Login Form |
| Validation | Zod `LoginSchema` |
| Submit | API `/api/login` |
| Session | HTTP-only cookie |
| Status | Partial |

Login menggunakan Client Component karena form membutuhkan interaksi pengguna.

Validasi request dilakukan menggunakan Zod sebelum data diproses oleh API Route.

---

## FR-02 — Profile

**Aktor:** Mahasiswa, Dosen, Admin

| UI Element | Implementasi |
|---|---|
| Profile Page | Belum terbukti tersedia |
| Profile Form | Belum terbukti tersedia |
| Edit Profile | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

# 2. Dashboard Mahasiswa

## FR-12 — Dashboard dan Progres

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Dashboard | `app/dashboard/page.tsx` |
| Dashboard Layout | `app/dashboard/layout.tsx` |
| Progress Page | `app/dashboard/progress/page.tsx` |
| Progress Summary | `app/dashboard/progress/ProgressSummary.tsx` |
| Loading State | `app/dashboard/loading.tsx` |
| Error State | `app/dashboard/error.tsx` |
| Status | Partial |

Dashboard menjadi area utama bagi mahasiswa untuk mengakses fitur pembelajaran.

---

# 3. AI Math Explainer

## FR-03 — Input Formula / Soal

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Explainer Page | `app/dashboard/explainer/page.tsx` |
| Input Interface | `AIExplainerClient.tsx` |
| Interactive Input | Client Component |
| Status | Partial |

---

## FR-04 — Validasi Input

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Input Validation | Zod |
| Validation Feedback | Client/API response |
| Status | Partial |

---

## FR-05 — Penjelasan Matematika

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Explanation Interface | `AIExplainerClient.tsx` |
| Explanation Result | Explainer UI |
| Status | Partial |

---

## FR-06 — Grafik Interaktif

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Graph Area | Explainer interface |
| Interactive Visualization | Partial |
| Status | Partial |

Implementasi engine visualisasi matematika sebagai service terpisah belum dapat dibuktikan dari repository.

---

## FR-07 — Simulasi Parameter

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Parameter Controls | Explainer interface |
| Client Interaction | `AIExplainerClient.tsx` |
| Status | Partial |

---

## FR-08 — Step-by-Step Solver

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Solution Result | Explainer interface |
| Step-by-Step Display | Partial |
| Status | Partial |

---

## FR-09 — Real-World Example

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Example Section | Explainer interface |
| Contextual Explanation | Partial |
| Status | Partial |

---

# 4. Latihan Adaptif

## FR-10 — Exercise

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Exercise Page | `app/dashboard/exercise/page.tsx` |
| Exercise Client | `app/components/ExerciseClient.tsx` |
| Exercise API Service | `app/services/exerciseApi.ts` |
| Query Hook | `app/hooks/useExercisesQuery.ts` |
| Data Validation | `ExerciseSchema` |
| Server State | TanStack Query |
| Status | Partial |

TanStack Query digunakan untuk mengelola data exercise yang berasal dari API.

---

## FR-11 — Rekomendasi Latihan

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Recommendation UI | Belum terbukti tersedia |
| Recommendation API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

# 5. Riwayat Pembelajaran

## FR-19 — Learning History

**Aktor:** Mahasiswa

| UI Element | Implementasi |
|---|---|
| Progress Interface | `app/dashboard/progress/` |
| Exercise Data | TanStack Query |
| API Service | `app/services/exerciseApi.ts` |
| Persistent Database UI | Belum terbukti |
| Status | Partial |

Front-End telah menyediakan pengelolaan data exercise dan progress interface.

Persistence permanen ke database sebagaimana arsitektur SKPL belum dapat dibuktikan dari repository Front-End.

---

# 6. Dashboard Dosen

## FR-13 — Manajemen Materi dan Soal

**Aktor:** Dosen

| UI Element | Implementasi |
|---|---|
| Material Management | Belum terbukti tersedia |
| Question Management | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

## FR-14 — Manajemen Kelas

**Aktor:** Dosen

| UI Element | Implementasi |
|---|---|
| Class Management | Belum terbukti tersedia |
| Student Management | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

## FR-15 — Monitoring Pembelajaran

**Aktor:** Dosen

| UI Element | Implementasi |
|---|---|
| Lecturer Dashboard | Belum terbukti tersedia |
| Student Progress | Belum terbukti tersedia |
| Class Progress | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

# 7. Dashboard Admin

## FR-16 — User & Role Management

**Aktor:** Admin

| UI Element | Implementasi |
|---|---|
| User Management | Belum terbukti tersedia |
| Role Management | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

## FR-17 — AI Configuration

**Aktor:** Admin

| UI Element | Implementasi |
|---|---|
| AI Configuration | Belum terbukti tersedia |
| Model Configuration | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

## FR-18 — System Monitoring

**Aktor:** Admin

| UI Element | Implementasi |
|---|---|
| Monitoring Dashboard | Belum terbukti tersedia |
| System Metrics | Belum terbukti tersedia |
| Status | Planned / Not Proven |

---

# 8. Global UI Architecture

## App Router

Struktur UI utama menggunakan Next.js App Router:

```text
visualmathai-next/
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── login/
    │   └── page.tsx
    ├── dashboard/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── loading.tsx
    │   ├── error.tsx
    │   ├── explainer/
    │   │   └── page.tsx
    │   ├── exercise/
    │   │   └── page.tsx
    │   ├── progress/
    │   │   ├── page.tsx
    │   │   └── ProgressSummary.tsx
    │   └── topic/
    │       └── [topic]/
    └── api/
        └── login/
            └── route.ts