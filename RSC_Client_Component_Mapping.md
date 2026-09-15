# React Server Components & Client Components
## VisualMath AI – Modul 6

### Server Components

| No | File | Status |
|---|---|---|
| 1 | `app/layout.tsx` | Server Component |
| 2 | `app/page.tsx` | Server Component |
| 3 | `app/login/page.tsx` | Server Component |
| 4 | `app/dashboard/layout.tsx` | Server Component |
| 5 | `app/dashboard/page.tsx` | Server Component |
| 6 | `app/dashboard/loading.tsx` | Server Component |
| 7 | `app/dashboard/explainer/page.tsx` | Server Component |
| 8 | `app/dashboard/exercise/page.tsx` | Server Component |
| 9 | `app/dashboard/progress/page.tsx` | Server Component |
| 10 | `app/dashboard/progress/ProgressSummary.tsx` | Server Component |
| 11 | `app/dashboard/topic/[topic]/page.tsx` | Server Component |

### Client Components

| No | File | Alasan |
|---|---|---|
| 1 | `app/login/LoginFormClient.tsx` | Form interaction, state, fetch API |
| 2 | `app/dashboard/explainer/AIExplainerClient.tsx` | State dan interaksi AI Explainer |
| 3 | `app/dashboard/exercise/ExerciseClient.tsx` | State dan interaksi latihan |
| 4 | `app/dashboard/error.tsx` | Tombol reset error menggunakan event handler |

### Kesimpulan

Sebagian besar komponen utama VisualMath AI menggunakan
React Server Components. Client Components diisolasi hanya pada
bagian yang membutuhkan state, event handler, dan interaksi pengguna.