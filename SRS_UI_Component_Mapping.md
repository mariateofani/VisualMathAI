# SRS → UI Component Mapping Matrix
## VisualMath AI

| Modul SRS | Implementasi UI | File/Komponen | State/Interaksi |
|---|---|---|---|
| Autentikasi | Form login, input email, password, dan role | `App.tsx`, `authSchema.ts` | `email`, `password`, `role`, `user`, loading, error |
| Dashboard Mahasiswa | Dashboard utama dan menu fitur pembelajaran | `Dashboard.tsx` | `userName`, `userRole`, navigasi halaman |
| AI Math Explainer | Input rumus, pemilihan topik, hasil analisis dan langkah penyelesaian | `AIExplainer.tsx` | `formula`, `topic`, `analysis`, `loading`, `error` |
| Grafik Interaktif | Visualisasi data hasil analisis rumus | `App.tsx` / halaman grafik | `graphData`, `page` |
| Latihan Adaptif | Soal, pilihan/jawaban, pengecekan jawaban, feedback | `AdaptiveExercise.tsx` | `currentExercise`, `answer`, `feedback`, loading, error |
| Progres Belajar | Menampilkan persentase penguasaan materi | Halaman Progres | `progress`, loading, error |
| Dashboard Dosen | Materi, latihan soal, monitoring mahasiswa, dan profil | Dashboard Dosen | `userRole`, navigasi halaman |
| Dashboard Admin | Pengguna, materi, monitoring sistem, dan laporan | Dashboard Admin | `userRole`, navigasi halaman |
| UI Reusable | Tombol, input, card, badge, modal, header, footer, layout | `components/` | Props dan interaksi komponen |