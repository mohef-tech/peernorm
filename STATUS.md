# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 5 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis Canva)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (206 node, 481 edge, 13 komunitas — gunakan skill `graphify` sebelum membaca ulang seluruh repo)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai `PRD-PeerNorm.md` Bagian 11.3 & Aturan Anti-Slop
- [x] Stage 16:9 (`1920x1080`), dvh scaling (`src/components/Stage.tsx`), & overlay portrait "Putar layar"
- [x] State management global via `useReducer` di `src/App.tsx` & persistensi `localStorage` (`peernorm:v1` di `src/engine/storage.ts`)
- [x] **S01 (Splash) — Tuntas Logika & Visual 1:1 Desain Acuan Canva**:
  - Diimplementasikan di `src/screens/Splash.tsx`, `src/gaya.css`, dan `src/engine/preload.ts` (`ASET_INTI` memuat 4 aset splash).
  - Layering 4 lapis: latar penuh (`latar-sekolah.webp`), judul logo (`logo-peernorm.webp`), karakter anak (`karakter-anak.webp`), dan kapsul progres (`kapsul-loading.webp` + `.bilah-isi`).
- [x] **S02 (Mulai) — Tuntas Logika & Visual 1:1 Pola Hot-Swapping**:
  - Diimplementasikan di `src/screens/Mulai.tsx` dan `src/gaya.css`.
  - Layering panggung 16:9: latar sekolah (`latar-sekolah.webp`), header logo terpusat + maskot matahari (`ikon-matahari.webp` di kiri atas), balon teks tagline ("Belajar berteman dengan cara yang menyenangkan"), dan tombol Play besar interaktif (mempertahankan trigger `musikHidup(true)` dan navigasi).
  - *Catatan Aset*: Posisi dan koordinat sudah presisi. Kotak putih sementara dari hasil ekspor Canva akan otomatis hilang begitu klien menyetor aset transparan bersih (cukup timpa berkas di `public/assets/img/mulai/`).
- [x] **S03 (Profil Anak A, B, C) & S04 (Menu Utama + Counter Bintang)**: Selesai secara logika & UI fungsional (`src/screens/Profil.tsx`, `src/screens/Menu.tsx`).
- [x] **S06 & S07 (Pilih Cerita & 3 Cerita Sosial Lengkap)**: Menunggu Giliran (`giliran`), Berbagi dengan Teman (`berbagi`), Menghadapi Perubahan (`perubahan`) selesai secara logika & mesin cerita (`src/screens/PilihCerita.tsx`, `src/screens/Cerita.tsx`, `src/data/cerita.ts`).
- [x] **S08, S09, S10 (Modul Latihan 4 Soal & Hasil)**: Sampul otomatis 2,5 detik, 4 soal (L1–L4) dengan posisi opsi acak, highlight netral 0,4 detik tanpa tanda benar/salah, dan kalkulasi skor terbaik maks 4 bintang (`src/screens/Latihan.tsx`, `src/screens/HasilLatihan.tsx`, `src/data/latihan.ts`).
- [x] **S11 (Hadiah 7 Slot Bintang & 3 Tingkat Lencana) & S12 (Modal Keluar + Reset Sesi)**: Selesai secara logika (`src/screens/Hadiah.tsx`, `src/screens/Keluar.tsx`, `src/engine/bintang.ts`).
- [x] **S05 (Petunjuk) & S13 (Panduan Pendamping)**: Selesai secara logika beserta *graceful media fallback* (`src/screens/Petunjuk.tsx`, `src/screens/Panduan.tsx`, `src/engine/audio.ts`).
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus di `src/engine/bintang.test.ts`).
- [x] **Knowledge Graph**: Diperbarui di `graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`, `manifest.json` — 206 node, 481 edge, 13 komunitas).

---

## 2. Tugas Berjalan / Berikutnya (NEXT TASK — Branch `canva`)

- [ ] **Prioritas 1 — Implementasi Visual Layar Petunjuk (S05: Petunjuk.tsx)**:
  - Strategi Aset: Menggunakan *composite card* (papan putih langkah 1–5 disatukan dalam satu gambar utuh agar tata letak stabil dan presisi 1:1).
  - Aset di `public/assets/img/petunjuk/`:
    - `latar-petunjuk.webp` (background taman/langit panggung 16:9)
    - `matahari.webp` (maskot matahari tersenyum di kiri atas)
    - `judul-petunjuk.webp` (teks judul "PETUNJUK" di atas tengah)
    - `papan-langkah.webp` (kartu kesatuan utuh berisi langkah panduan 1–5)
    - `tombol-dengarkan.webp` (tombol audio "Dengarkan Petunjuk" di kanan bawah)
  - Fitur Aksesibilitas: Pasang tombol kembali/beranda ramah anak di pojok kiri atas panggung menuju Menu Utama (S04) karena tombol kembali tidak tersedia di desain Canva asli.
  - Sediakan *graceful fallback* (`onError`) pada semua elemen `<img>`.

- [ ] **Prioritas 2 — Implementasi Visual Menu Utama (S04: Menu.tsx / Slide 3 Canva)**:
  - Menata grid 6 kartu menu utama (Profil, Petunjuk, Cerita Berteman, Latihan, Hadiah, Keluar) dari folder aset `public/assets/img/menu/`.
  - Pasang header kiri ("Halo teman") dan header kanan (indikator skor bintang dinamis).

- [ ] **Prioritas 3 — Klarifikasi S03 (Profil Pengguna / Slide 4 Canva) [STATUS: HOLD]**:
  - Konfirmasi ke klien via GMeet malam ini terkait perbedaan alur:
    - *Desain Canva*: Input bebas ("Ketik nama kamu di sini...") dengan 1 avatar.
    - *Sistem Saat Ini*: Pilihan 3 Profil Anak (A, B, C) dengan persistensi skor terpisah dan tanpa keyboard virtual (ramah anak usia dini).
  - Solusi yang diajukan: Mempertahankan mesin 3 profil, namun polesan kartu profil mengadopsi visual Canva Slide 4.

- [ ] **Prioritas 4 — Integrasi Visual Cerita & Modul Latihan (S06 – S12)**:
  - Penempatan ilustrasi adegan cerita (`public/assets/img/cerita/<id>.webp`).
  - Penataan kartu latihan, maskot bintang, kotak hadiah, dan 3 lencana.

- [ ] **Prioritas 5 — Integrasi Audio**:
  - Penempatan 26 rekaman narasi (`public/assets/audio/<id>.mp3`) dan musik latar (`public/assets/audio/musik-pembuka.mp3`) sesuai Lampiran B `PRD-PeerNorm.md`.

---

## 3. Catatan Arsitektur & Aturan Ketat untuk AI Agent Selanjutnya
1. **Gunakan Knowledge Graph Lebih Dulu**: Jangan memindai ulang seluruh codebase dari nol. Baca `STATUS.md` dan `graphify-out/GRAPH_REPORT.md` (atau jalankan query `graphify` pada `graphify-out/graph.json`).
2. **Jangan Ubah Logika Inti Tanpa Instruksi**: Branch `canva` dikhususkan untuk *visual slicing*, *layering* panggung 16:9 (`1920x1080`), dan *asset integration*. Jangan mengubah state machine di `src/App.tsx`, aturan kalkulasi bintang di `src/engine/bintang.ts`, ataupun merusak 8 unit test di `src/engine/bintang.test.ts`.
3. **Pola Asset Hot-Swapping (Drop-in Replacement)**:
   - Jalur direktori dan nama file dikunci di komponen React dan CSS.
   - Jika aset saat ini memiliki latar belakang putih akibat ekspor Canva, jangan ubah kodingan menjadi rumit; aset baru yang transparan cukup ditimpa (*replace*) langsung ke foldernya.
4. **Standar Visual Panggung 16:9**:
   - Kanvas terkunci di `1920x1080` (`src/components/Stage.tsx`).
   - Gunakan `object-fit: cover` untuk latar belakang penuh dan `object-fit: contain; image-rendering: auto;` untuk elemen transparan di atasnya.
   - Pertahankan sasaran sentuh ramah anak (minimal setara `64px` di panggung) dan sediakan *graceful fallback* (`onError`) pada setiap elemen `<img>`.
5. **Verifikasi Wajib**: Selalu jalankan `npx tsc --noEmit && npm test` setiap selesai melakukan perubahan (wajib 0 error & 8/8 test passing).