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
  - Layer 1 (dasar): `public/assets/img/splash/latar-sekolah.webp` (`object-fit: cover`, memenuhi panggung `1920x1080` tanpa garis putih).
  - Layer 2 (atas tengah): `public/assets/img/splash/logo-peernorm.webp` (`top: 6.5%`, `width: 980px`, `max-height: 200px`, dengan outline stiker putih halus & fallback `<h1 className="logo">PeerNorm</h1>`).
  - Layer 3 (tengah bawah): `public/assets/img/splash/karakter-anak.webp` (`top: 336px`, `width: 630px`, `max-height: 465px`, proporsional di bawah logo tanpa menabrak teks `PeerNorm` & fallback teks tagline).
  - Layer 4 (bawah tengah): `public/assets/img/splash/kapsul-loading.webp` (`top: 856px`, `width: 548px`, `height: 74px`) + bar progres dinamis (`.bilah-splash > .bilah-isi`, `0% -> 100%` selama minimal 3 detik & preload `ASET_INTI`), otomatis lanjut ke S02 setelah selesai.
- [x] **S02 (Mulai) — Selesai Secara Logika**:
  - Komponen `src/screens/Mulai.tsx` telah menangani trigger `musikHidup(true)` pada sentuhan pertama tombol Play dan navigasi ke S03 (Profil).
  - *Catatan Aset*: Aset visual Canva untuk S02 sudah tersedia di `public/assets/img/mulai/` (`latar-sekolah.webp`, `logo-peernorm.webp`, `ikon-matahari.webp`, `balon-teks.webp`, `tombol-play.webp`) namun belum di-layer ke `src/screens/Mulai.tsx`.
- [x] **S03 (Profil Anak A, B, C) & S04 (Menu Utama + Counter Bintang)**: Selesai secara logika & UI fungsional (`src/screens/Profil.tsx`, `src/screens/Menu.tsx`).
- [x] **S06 & S07 (Pilih Cerita & 3 Cerita Sosial Lengkap)**: Menunggu Giliran (`giliran`), Berbagi dengan Teman (`berbagi`), Menghadapi Perubahan (`perubahan`) selesai secara logika & mesin cerita (`src/screens/PilihCerita.tsx`, `src/screens/Cerita.tsx`, `src/data/cerita.ts`).
- [x] **S08, S09, S10 (Modul Latihan 4 Soal & Hasil)**: Sampul otomatis 2,5 detik, 4 soal (L1–L4) dengan posisi opsi acak, highlight netral 0,4 detik tanpa tanda benar/salah, dan kalkulasi skor terbaik maks 4 bintang (`src/screens/Latihan.tsx`, `src/screens/HasilLatihan.tsx`, `src/data/latihan.ts`).
- [x] **S11 (Hadiah 7 Slot Bintang & 3 Tingkat Lencana) & S12 (Modal Keluar + Reset Sesi)**: Selesai secara logika (`src/screens/Hadiah.tsx`, `src/screens/Keluar.tsx`, `src/engine/bintang.ts`).
- [x] **S05 (Petunjuk) & S13 (Panduan Pendamping)**: Selesai beserta *graceful media fallback* bila file gambar/audio fisik belum tersedia (`src/screens/Petunjuk.tsx`, `src/screens/Panduan.tsx`, `src/engine/audio.ts`).
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus di `src/engine/bintang.test.ts`).
- [x] **Knowledge Graph**: Diperbarui di `graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`, `manifest.json` — 206 node, 481 edge, 13 komunitas).

---

## 2. Tugas Berjalan / Berikutnya (NEXT TASK — Branch `canva`)
- [ ] **Prioritas 1 — Implementasi Visual Canva pada Layar Mulai (S02)**:
  - Perbarui `src/screens/Mulai.tsx` dan `src/gaya.css` menggunakan aset yang sudah siap di `public/assets/img/mulai/`:
    - `latar-sekolah.webp` (background full stage)
    - `ikon-matahari.webp` (dekorasi matahari)
    - `logo-peernorm.webp` (judul PeerNorm)
    - `balon-teks.webp` (tagline "Belajar berteman dengan cara yang menyenangkan")
    - `tombol-play.webp` (tombol interaktif utama untuk masuk ke S03 & menyalakan `musikHidup(true)`)
  - Sediakan *graceful degradation* (fallback teks/warna/SVG bila file gambar gagal dimuat) seperti pada `Splash.tsx`.
- [ ] **Prioritas 2 — Integrasi Visual Layar Berikutnya (Hot-Swap / Layering Canva)**:
  - **S03 (Profil)** & **S04 (Menu Utama)**: Penataan aset avatar, tombol nama, dan ikon menu saat aset masuk ke `public/assets/img/`.
  - **S06 & S07 (Cerita 1, 2, 3)**: Penempatan ilustrasi adegan cerita (`public/assets/img/<id>.webp`).
  - **S08 – S12 (Latihan, Hasil, Hadiah, Keluar)**: Penataan kartu pilihan bergambar, maskot bintang, kotak hadiah, dan 3 lencana.
- [ ] **Prioritas 3 — Integrasi Audio**:
  - Penempatan 26 rekaman narasi (`public/assets/audio/<id>.mp3`) dan musik latar (`public/assets/audio/musik-pembuka.mp3`) sesuai Lampiran B `PRD-PeerNorm.md`.

---

## 3. Catatan Arsitektur & Aturan Ketat untuk AI Agent Selanjutnya
1. **Gunakan Knowledge Graph Lebih Dulu**: Jangan memindai ulang seluruh codebase dari nol. Baca `STATUS.md` dan `graphify-out/GRAPH_REPORT.md` (atau jalankan query `graphify` pada `graphify-out/graph.json`).
2. **Jangan Ubah Logika Inti Tanpa Instruksi**: Branch `canva` dikhususkan untuk *visual slicing*, *layering* panggung 16:9 (`1920x1080`), dan *asset integration*. Jangan mengubah state machine di `src/App.tsx`, aturan kalkulasi bintang di `src/engine/bintang.ts`, ataupun merusak 8 unit test di `src/engine/bintang.test.ts`.
3. **Standar Visual Panggung 16:9**:
   - Kanvas terkunci di `1920x1080` (`src/components/Stage.tsx`).
   - Gunakan `object-fit: cover` untuk latar belakang penuh dan `object-fit: contain; image-rendering: auto;` untuk elemen transparan di atasnya.
   - Pertahankan sasaran sentuh ramah anak (minimal setara `64px` di panggung) dan sediakan *graceful fallback* (`onError`) pada setiap elemen `<img>`.
4. **Verifikasi Wajib**: Selalu jalankan `npx tsc --noEmit && npm test` setiap selesai melakukan perubahan.
