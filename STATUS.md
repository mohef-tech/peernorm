# Status Pengerjaan Proyek PeerNorm

Terakhir Diperbarui: 4 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 7 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai PRD Bagian 11.3 & Aturan Anti-Slop
- [x] Stage 16:9 (`1920x1080`), dvh scaling, & overlay portrait "Putar layar"
- [x] State management global via `useReducer` di `App.tsx` & persistensi `localStorage` (`peernorm:v1`)
- [x] S01 (Splash) & S02 (Mulai dengan AudioContext trigger)
- [x] S03 (Profil Anak A, B, C) & S04 (Menu Utama + Counter Bintang)
- [x] S06 & S07: 3 Cerita Sosial Lengkap (Menunggu Giliran, Berbagi, Menghadapi Perubahan)
- [x] S08, S09, S10: Modul Latihan 4 Soal (Opsi acak, highlight netral 0,4s, skor terbaik maks 4 bintang)
- [x] S11 (Hadiah 7 slot bintang & 3 tingkat lencana) & S12 (Modal Keluar + Reset Sesi)
- [x] S05 (Petunjuk), S13 (Panduan Pendamping), dan graceful media fallback
- [x] Audit pengujian menyeluruh: TypeScript 0 error, build produksi bersih, 7 unit test pass

---

## 2. Tugas Berjalan / Planning Berikutnya (CURRENT & NEXT TASK - Branch `canva`)
- [ ] **Fase Pemetaan & Struktur Aset Gambar**:
  - [ ] Identifikasi dan listing ID adegan dari `src/data/cerita.ts` (Cerita 1, 2, 3) serta soal latihan.
  - [ ] Pemetaan halaman Canva ke nama berkas standar di `public/assets/img/<id>.webp`.
  - [ ] Penentuan strategi aset: apakah menggunakan flat background per adegan atau komponen terpisah (karakter, kartu opsi).
  - [ ] Skrip otomatisasi konversi format (PNG/JPG -> WebP teroptimasi 1920x1080).
- [ ] **Fase Integrasi Audio**:
  - [ ] Pemetaan file narasi & efek suara ke `public/assets/audio/<id>.mp3`.

---

## 3. Catatan Arsitektur Penting untuk AI Selanjutnya
- Branch `canva` dikhususkan untuk visual slicing & asset replacement. Jangan mengubah arsitektur state di `App.tsx` kecuali untuk penyesuaian binding aset.
- Pertahankan aspek rasio 16:9 dan touch target minimal 64px.