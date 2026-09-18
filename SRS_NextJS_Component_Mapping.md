# SRS Next.js Component Mapping — VisualMath AI

Dokumen ini memetakan kebutuhan fungsional (FR-01 sampai FR-19) pada SRS/SKPL VisualMath AI ke implementasi Front-End berbasis Next.js App Router.

> Catatan:
> - Status implementasi didasarkan pada struktur source code yang tersedia pada project.
> - `Partial` berarti sebagian kebutuhan sudah memiliki representasi pada Front-End, tetapi belum seluruh alur sistem terbukti terimplementasi.
> - `Planned / Not Proven` berarti kebutuhan belum dapat dibuktikan dari source code yang tersedia.
> - Mapping ini tidak menganggap Laravel API, database PostgreSQL/MySQL, AI Engine production, atau service eksternal sebagai implementasi yang sudah tersedia apabila source code-nya tidak terdapat pada project.

---

# 1. Authentication & User Management

## FR-01 — Login

**Kebutuhan SRS:**  
Sistem menyediakan autentikasi pengguna untuk masuk ke aplikasi.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/login` |
| Page | `visualmathai-next/app/login/page.tsx` |
| Client Component | `visualmathai-next/app/components/LoginFormClient.tsx` |
| API Route | `visualmathai-next/app/api/login/route.ts` |
| Validation | Zod `LoginSchema` |
| Session | HTTP-only cookie `visualmath_session` |
| Status | Partial |

Validasi login dilakukan menggunakan Zod sebelum data diproses oleh API Route.

API login menggunakan cookie HTTP-only sebagai session demo. Implementasi ini belum dapat dianggap sebagai autentikasi production dengan database, JWT, bcrypt, atau provider identity eksternal.

---

## FR-02 — Profile / Data Pengguna

**Kebutuhan SRS:**  
Pengguna dapat mengelola atau melihat informasi profil sesuai hak akses.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Kebutuhan profil tercantum pada SRS, tetapi implementasi Front-End yang dapat dibuktikan dari source code belum tersedia.

---

# 2. Fitur Pembelajaran Mahasiswa

## FR-03 — Input Formula / Soal Matematika

**Kebutuhan SRS:**  
Mahasiswa dapat memasukkan formula atau soal matematika untuk diproses oleh sistem.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Page | `visualmathai-next/app/dashboard/explainer/page.tsx` |
| Client Component | `visualmathai-next/app/components/AIExplainerClient.tsx` |
| Status | Partial |

Komponen Client digunakan untuk interaksi input pengguna dan proses pembelajaran.

Input berbasis teks dapat direpresentasikan pada Front-End. Dukungan input gambar/OCR belum dapat dibuktikan dari source code yang tersedia.

---

## FR-04 — Validasi Input Matematika

**Kebutuhan SRS:**  
Sistem melakukan validasi terhadap data yang dikirim pengguna.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Validation | Zod |
| API | `visualmathai-next/app/api/*/route.ts` |
| Service | `visualmathai-next/app/services/` |
| Status | Partial |

Zod digunakan sebagai runtime schema validation pada data tertentu.

Contoh implementasi terdapat pada API login dan validasi response exercise.

---

## FR-05 — AI Math Explainer

**Kebutuhan SRS:**  
Sistem memberikan penjelasan matematika kepada mahasiswa.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Server Component | `app/dashboard/explainer/page.tsx` |
| Client Component | `app/components/AIExplainerClient.tsx` |
| Status | Partial |

UI dan alur Front-End untuk fitur AI Math Explainer tersedia.

Namun, implementasi AI/LLM production sebagai service eksternal tidak dapat dibuktikan hanya dari source code yang tersedia.

---

## FR-06 — Visualisasi / Grafik Interaktif

**Kebutuhan SRS:**  
Sistem menyediakan visualisasi grafik matematika secara interaktif.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Component | `AIExplainerClient.tsx` |
| Status | Partial |

Visualisasi merupakan bagian dari alur pembelajaran pada halaman explainer.

Implementasi engine visualisasi matematika production belum dapat dibuktikan sebagai service terpisah dari source code yang tersedia.

---

## FR-07 — Simulasi Parameter

**Kebutuhan SRS:**  
Mahasiswa dapat melakukan simulasi dengan mengubah parameter matematika.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Component | `AIExplainerClient.tsx` |
| State | Client-side state |
| Status | Partial |

Interaksi parameter dapat ditempatkan pada Client Component karena membutuhkan perubahan UI secara langsung.

---

## FR-08 — Penyelesaian Soal Bertahap

**Kebutuhan SRS:**  
Sistem menyediakan penyelesaian soal matematika secara bertahap.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Component | `AIExplainerClient.tsx` |
| Status | Partial |

Front-End menyediakan area untuk menampilkan hasil pembelajaran/penjelasan.

Algoritma Mathematical Engine terpisah sebagaimana dijelaskan pada SKPL belum tersedia sebagai source code backend pada repository ini.

---

## FR-09 — Contoh Penerapan Dunia Nyata

**Kebutuhan SRS:**  
Sistem memberikan contoh penerapan konsep matematika dalam konteks dunia nyata.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/explainer` |
| Component | `AIExplainerClient.tsx` |
| Status | Partial |

UI dapat menampilkan informasi penjelasan dan contoh pembelajaran.

Konten dinamis yang berasal dari AI production belum dapat dibuktikan dari source code yang tersedia.

---

# 3. Latihan dan Progres Mahasiswa

## FR-10 — Latihan Adaptif

**Kebutuhan SRS:**  
Mahasiswa dapat mengerjakan latihan matematika.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | `/dashboard/exercise` |
| Page | `app/dashboard/exercise/page.tsx` |
| Client Component | `app/components/ExerciseClient.tsx` |
| API Service | `app/services/exerciseApi.ts` |
| Query Hook | `app/hooks/useExercisesQuery.ts` |
| Server State | TanStack Query |
| Validation | `ExerciseSchema` |
| Status | Partial |

TanStack Query digunakan untuk mengambil dan melakukan mutation terhadap data exercise.

Response exercise divalidasi menggunakan Zod.

---

## FR-11 — Rekomendasi Latihan

**Kebutuhan SRS:**  
Sistem memberikan rekomendasi latihan berdasarkan kebutuhan atau perkembangan mahasiswa.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Mekanisme rekomendasi adaptif berbasis histori/performa belum dapat dibuktikan secara lengkap dari source code yang tersedia.

---

## FR-12 — Dashboard dan Progres Mahasiswa

**Kebutuhan SRS:**  
Mahasiswa dapat melihat informasi pembelajaran dan perkembangan/progres.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Dashboard | `/dashboard` |
| Progress | `/dashboard/progress` |
| Page | `app/dashboard/page.tsx` |
| Page | `app/dashboard/progress/page.tsx` |
| Component | `app/dashboard/progress/ProgressSummary.tsx` |
| Status | Partial |

Halaman dashboard dan progress tersedia sebagai bagian dari App Router.

---

# 4. Fitur Dosen

## FR-13 — Manajemen Materi dan Soal

**Kebutuhan SRS:**  
Dosen dapat mengelola materi dan soal pembelajaran.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Kebutuhan ini tercantum pada SRS, tetapi implementasi halaman dan API dosen belum dapat dibuktikan dari source code yang tersedia.

---

## FR-14 — Manajemen Kelas

**Kebutuhan SRS:**  
Dosen dapat mengelola kelas yang digunakan dalam proses pembelajaran.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Fitur manajemen kelas belum dapat dibuktikan dari implementasi repository.

---

## FR-15 — Dashboard Dosen

**Kebutuhan SRS:**  
Dosen dapat melihat informasi kelas, mahasiswa, materi, dan perkembangan pembelajaran.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Dashboard khusus dosen belum dapat dibuktikan dari source code yang tersedia.

---

# 5. Fitur Admin

## FR-16 — Manajemen User dan Role

**Kebutuhan SRS:**  
Admin dapat mengelola pengguna dan hak akses berdasarkan role.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Implementasi role management belum dapat dibuktikan dari repository.

---

## FR-17 — Konfigurasi AI

**Kebutuhan SRS:**  
Admin dapat melakukan konfigurasi terhadap layanan AI.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Halaman konfigurasi AI belum dapat dibuktikan dari source code yang tersedia.

---

## FR-18 — Monitoring Sistem

**Kebutuhan SRS:**  
Admin dapat melakukan monitoring terhadap sistem.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Route | Belum terbukti tersedia |
| Component | Belum terbukti tersedia |
| API | Belum terbukti tersedia |
| Status | Planned / Not Proven |

Dashboard monitoring admin belum dapat dibuktikan dari source code yang tersedia.

---

# 6. Persistence dan Riwayat Pembelajaran

## FR-19 — Penyimpanan Riwayat Pembelajaran

**Kebutuhan SRS:**  
Sistem menyimpan histori interaksi pembelajaran, formula, dan hasil latihan.

**Next.js Mapping:**

| Item | Implementasi |
|---|---|
| Exercise Query | `app/hooks/useExercisesQuery.ts` |
| API Service | `app/services/exerciseApi.ts` |
| Client State | Zustand |
| Server State | TanStack Query |
| Database | Belum terbukti tersedia |
| Status | Partial |

Front-End telah memiliki mekanisme pengelolaan data exercise melalui API service dan TanStack Query.

Namun, persistence database sebagaimana arsitektur SKPL belum dapat dibuktikan karena source code Laravel/database tidak terdapat pada repository yang digunakan.

---

# 7. Next.js App Router Architecture Mapping

| Konsep Next.js | Implementasi | Status |
|---|---|---|
| App Router | `visualmathai-next/app/` | Implemented |
| Server Components | Page/layout components | Implemented |
| Client Components | `LoginFormClient`, `AIExplainerClient`, `ExerciseClient` | Implemented |
| Nested Layout | `app/dashboard/layout.tsx` | Implemented |
| Loading UI | `app/dashboard/loading.tsx` | Implemented |
| Error UI | `app/dashboard/error.tsx` | Implemented |
| Dynamic Route | `app/dashboard/topic/[topic]/` | Implemented |
| API Route Handler | `app/api/login/route.ts`, exercise API | Implemented |
| Metadata | App Router metadata | Implemented |
| Suspense | Progress-related rendering | Partial |
| Middleware | Route protection | Implemented/tersedia pada struktur Next.js |
| Zod | Schema validation | Implemented |
| TanStack Query | `useExercisesQuery.ts` | Implemented |
| Zustand | `useUIStore.ts` | Implemented |

---

# 8. Pemisahan Server State dan Client UI State

VisualMath AI menggunakan pendekatan pemisahan state:

### Zustand

Digunakan untuk UI/client state.

File:

```text
visualmathai-next/app/store/useUIStore.ts