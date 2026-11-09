# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 9 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis Canva)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (206 node, 481 edge, 13 komunitas — gunakan skill `graphify` sebelum membaca ulang seluruh repo)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai `PRD-PeerNorm.md` Bagian 11.3 & Aturan Anti-Slop.
- [x] Stage 16:9 (`1920x1080`), dvh scaling (`src/components/Stage.tsx`), & overlay portrait "Putar layar".
- [x] State management global via `useReducer` di `src/App.tsx` & persistensi `localStorage` (`peernorm:v1` di `src/engine/storage.ts`).
- [x] **Standardisasi Format Aset**: Seluruh gambar visual panggung di `public/assets/img/` telah diseragamkan 100% ke format `.webp`.
- [x] **S01 (Splash) — Tuntas Logika & Visual 1:1 Desain Acuan Canva**.
- [x] **S02 (Mulai) — Tuntas Logika & Visual 1:1 Pola Hot-Swapping**.
- [x] **S03 (Pilih Profil Kamu) — Tuntas Logika & Visual 1:1**.
- [x] **S04 (Menu Utama / Slide 3 Canva) — Tuntas Logika & Visual 1:1**.
- [x] **S05 (Petunjuk / Slide 5 Canva) — Tuntas Logika & Visual 1:1 (Strategi Composite Card)**.
- [x] **S06 (Pilih Cerita Sosial / Slide 6 Canva) — Tuntas Logika & Visual 1:1**:
  - Grid 3 kartu cerita (`kartu-cerita-giliran.webp`, `kartu-cerita-berbagi.webp`, `kartu-cerita-perubahan.webp`).
- [x] **Cerita 1 ("Menunggu Giliran" / `giliran` — Slide 7 s.d. 12 Canva) — Tuntas 100%**:
  - Slide 7 & 8: Adegan bergambar 1 & 2.
  - Slide 9: Kuis pilihan respon interaktif.
  - Slide 10: Feedback apresiasi benar ("Hebat!" + bintang).
  - Slide 11: Konsekuensi respon keliru + tombol ulangi ke Halaman 1.
  - Slide 12: Cerita Selesai (apresiasi kado terbuka, tombol "Menu Cerita", dan "Ke cerita lain").
- [x] **Cerita 2 ("Berbagi dengan Teman" / `berbagi` — Slide 13 s.d. 20 Canva) — Tuntas 100%**:
  - Implementasi pola arsitektur *data-driven* modular pada `src/screens/Cerita.tsx` via `KONFIG_CERITA`.
  - Direktori aset terisolasi rapi di `public/assets/img/cerita/berbagi/` (15 aset `.webp` mandiri).
  - Slide 13–16: 4 alur panel adegan bertahap (`adegan-1.webp` s.d. `adegan-4.webp` & `banner-judul-1.webp` s.d. `banner-judul-4.webp`).
  - Slide 17: Kuis pilihan respon (`opsi-respon-1.webp` dan `opsi-respon-2.webp`).
  - Slide 18: Apresiasi positif bintang.
  - Slide 19: Konsekuensi respon keliru + tombol ulangi ke Halaman 1.
  - Slide 20: Penutup kado dan tombol navigasi sekuensial.
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus di `src/engine/bintang.test.ts`).

---

## 2. Tugas Berjalan / Berikutnya (NEXT TASK — Branch `canva`)

- [ ] **Prioritas 1 — Implementasi Cerita 3 ("Menghadapi Perubahan" / `perubahan` — Slide 21 dst di Canva)**:
  - Pengecekan folder slide Google Drive Cerita 3.
  - Standardisasi penamaan file semantik dan konversi `.webp` ke subfolder `public/assets/img/cerita/perubahan/`.
  - Pendaftaran pemetaan adegan, banner, kuis, dan konsekuensi pada `KONFIG_CERITA` di `src/screens/Cerita.tsx` dan `src/data/cerita.ts`.
- [ ] **Prioritas 2 — Integrasi Visual Modul Latihan Mandiri 4 Soal (S08, S09, S10 di `Latihan.tsx` & `HasilLatihan.tsx`)**:
  - Layout sampul latihan otomatis (2,5 detik).
  - 4 soal pilihan ganda acak dengan highlight netral 0,4 detik.
  - Layar rangkuman hasil akhir latihan perolehan maksimal 4 bintang.
- [ ] **Prioritas 3 — Integrasi Visual Hadiah & Modal Keluar (S11 & S12)**:
  - Rak koleksi 7 slot bintang dan visual 3 tingkatan lencana penghargaan.
  - Modal konfirmasi keluar ramah anak beserta tombol reset sesi.
- [ ] **Prioritas 4 — Integrasi Audio Fisik**:
  - Penempatan 26 file rekaman narasi (`public/assets/audio/<id>.mp3`) dan musik latar.

---

## 3. Catatan Arsitektur & Aturan Ketat
1. **Prinsip Modul Data-Driven**: Logika `Cerita.tsx` telah mendukung multi-cerita secara dinamis. Modul cerita ketiga cukup menambahkan entri pada konfigurasi tanpa mengubah styling CSS panggung 16:9 yang sudah stabil.
2. **Standardisasi Format**: Seluruh aset gambar wajib berformat `.webp` di folder masing-masing.
3. **Verifikasi Wajib**: Setiap selesai integrasi, jalankan `npx tsc --noEmit && npm test`.