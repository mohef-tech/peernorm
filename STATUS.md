# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 10 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis Canva)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (Diperbarui secara berkala dengan Graphify)

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
  - Implementasi pola modular data-driven di `src/screens/Cerita.tsx` via `KONFIG_CERITA`.
  - Folder aset terisolasi di `public/assets/img/cerita/berbagi/`.
  - Slide 13–16: 4 panel narasi adegan bertahap.
  - Slide 17: Kuis pilihan respon simetris.
  - Slide 18: Apresiasi bintang positif.
  - Slide 19: Konsekuensi respon keliru + tombol ulangi.
  - Slide 20: Cerita selesai & tombol aksi.
- [x] **Cerita 3 ("Menghadapi Perubahan" / `perubahan` — Slide 21 s.d. 29 Canva) — Tuntas 100%**:
  - Folder aset terisolasi di `public/assets/img/cerita/perubahan/`.
  - Slide 21–23: Adegan 1 s.d. 3.
  - Slide 24: Kuis respon simetris dengan latar panggung kelas kayu.
  - Slide 25: Apresiasi bintang ("Hebat!").
  - Slide 26 & 28: Adegan lanjutan narasi positif (kesepakatan bermain balok & tos senang).
  - Slide 27: Konsekuensi keliru bersih terisolasi + tombol ulangi.
  - Slide 29: Cerita selesai kado terbuka.
- [x] **Layar / Modal Keluar (Slide 37 Canva di `src/screens/Keluar.tsx` & `Menu.tsx`) — Tuntas 100%**:
- Kartu "Keluar" di Menu Utama aktif membuka dialog konfirmasi.
- Layout modal 1:1: `latar-keluar.webp`, `bingkai-keluar.webp`, `tombol-ya.webp` (reset sesi ke Mulai/Profil), dan `tombol-tidak.webp` (kembali ke Menu Utama).
- [x] **Modul Latihan Mandiri (Slide 30–34 Canva di `src/screens/Latihan.tsx`) — Tuntas 100%**:
  - Slide 30: Sampul transisi pembuka modul latihan (`sampul-latihan.webp`, timer 2,5 detik).
  - Slide 31–34: 4 soal evaluasi pemahaman dengan styling terisolasi penuh (`modul-latihan-*`).
  - Pemetaan data statis `{ benar, salah }` langsung dari `src/data/latihan.ts` tanpa pengacakan runtime, menjaga konsistensi posisi tombol 1:1 desain acuan Canva.
  - Background mandiri (`latar-latihan-1.webp` untuk soal 1 & 3, `latar-latihan-2.webp` untuk soal 2, `latar-latihan-4.webp` untuk soal 4) dan layer ilustrasi situasi balok khusus Soal 3 (`adegan-soal-3.webp`).
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus).

---

## 2. Tugas Berjalan / Sesi Selanjutnya (NEXT SESSION — Branch `canva`)

- [ ] **Prioritas 1 — Evaluasi Akhir & Finishing Latihan (Slide 35 Canva)**:
  - Slide 35: Layar evaluasi hasil latihan perolehan maksimal 4 bintang (`HasilLatihan.tsx`).
  - Penyesuaian mikro layouting (posisi vertikal kartu/banner agar lebih rapat ke atas).
- [ ] **Prioritas 2 — Integrasi Visual Hadiah Bintang (Slide 36 Canva / `src/screens/Hadiah.tsx`)**:
  - Rak koleksi 7 slot bintang dan visual 3 tingkatan lencana penghargaan.
- [ ] **Prioritas 3 — Integrasi Audio Fisik**:
  - Penempatan 26 file narasi fisik (`public/assets/audio/<id>.mp3`) dan musik latar. 

---

## 3. Catatan Arsitektur & Aturan Ketat
1. **Modul Cerita & Keluar Terkunci**: Seluruh alur Cerita 1, 2, 3 dan Modal Keluar sudah divalidasi visual dan logika, tidak memerlukan perombakan lagi.
2. **Standardisasi Aset**: Semua aset visual di `public/assets/img/` wajib berformat `.webp`.
3. **Pemeriksaan Berkala**: Jalankan `npx tsc --noEmit && npm test` sebelum melakukan commit.