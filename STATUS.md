# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 7 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis Canva)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (206 node, 481 edge, 13 komunitas — gunakan skill `graphify` sebelum membaca ulang seluruh repo)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai `PRD-PeerNorm.md` Bagian 11.3 & Aturan Anti-Slop
- [x] Stage 16:9 (`1920x1080`), dvh scaling (`src/components/Stage.tsx`), & overlay portrait "Putar layar"
- [x] State management global via `useReducer` di `src/App.tsx` & persistensi `localStorage` (`peernorm:v1` di `src/engine/storage.ts`)
- [x] **Standardisasi Format Aset**: Seluruh gambar visual panggung di `public/assets/img/` (S01 sampai S05) telah diseragamkan 100% ke format `.webp` menggunakan `sharp-cli`.
- [x] **S01 (Splash) — Tuntas Logika & Visual 1:1 Desain Acuan Canva**:
  - Diimplementasikan di `src/screens/Splash.tsx`, `src/gaya.css`, dan `src/engine/preload.ts` (`ASET_INTI` memuat 4 aset splash).
  - Layering 4 lapis: latar penuh (`latar-sekolah.webp`), judul logo (`logo-peernorm.webp`), karakter anak (`karakter-anak.webp`), dan kapsul progres (`kapsul-loading.webp` + `.bilah-isi`).
- [x] **S02 (Mulai) — Tuntas Logika & Visual 1:1 Pola Hot-Swapping**:
  - Diimplementasikan di `src/screens/Mulai.tsx` dan `src/gaya.css`.
  - Layering panggung 16:9: latar sekolah (`latar-sekolah.webp`), header logo terpusat + maskot matahari (`ikon-matahari.webp` di kiri atas), balon teks tagline ("Belajar berteman dengan cara yang menyenangkan"), dan tombol Play besar interaktif (mempertahankan trigger `musikHidup(true)` dan navigasi).
- [x] **S03 (Pilih Profil Kamu) — Tuntas Logika & Visual 1:1**:
  - Desain revisi klien disepakati menggunakan model 3 profil kartu visual (`kartu-profil-1.webp`, `kartu-profil-2.webp`, `kartu-profil-3.webp` yang memetakan ke data profil internal Anak A, B, C) tanpa keyboard virtual.
  - Layering: latar taman (`latar-profil.webp`), header judul (`judul-profil.webp`), 3 tombol kartu profil sejajar, dan hiasan ilustrasi anak di layer depan bawah (`anak-anak.webp` dengan `pointer-events: none`).
- [x] **S04 (Menu Utama / Slide 3 Canva) — Tuntas Logika & Visual 1:1**:
  - Grid 6 kartu menu utama (Profil, Petunjuk, Cerita Berteman, Latihan, Hadiah, Keluar) terpusat rapi.
  - Header kiri memuat grafis teks "Halo teman" dan header kanan memuat wadah counter skor bintang dinamis sesuai profil aktif.
- [x] **S05 (Petunjuk / Slide 5 Canva) — Tuntas Logika & Visual 1:1 (Strategi Composite Card)**:
  - Menggunakan satu papan komposit utuh (`papan-langkah.webp`) berisi langkah 1–5 untuk memastikan layout kokoh dan bebas pergeseran elemen teks.
  - Mempertahankan tombol audio "Dengarkan Petunjuk" di kanan bawah serta tombol kembali/beranda ramah anak di pojok kiri atas menuju Menu Utama (S04).
- [x] **S06 & S07 (Pilih Cerita & 3 Cerita Sosial Lengkap)**: Menunggu Giliran (`giliran`), Berbagi dengan Teman (`berbagi`), Menghadapi Perubahan (`perubahan`) selesai secara logika & mesin cerita (`src/screens/PilihCerita.tsx`, `src/screens/Cerita.tsx`, `src/data/cerita.ts`).
- [x] **S08, S09, S10 (Modul Latihan 4 Soal & Hasil)**:
  - Sampul otomatis 2,5 detik (S08).
  - Penyesuaian tata letak S09 1:1 desain acuan Canva (`Latihan.tsx` & `.layar-latihan-*` di `src/gaya.css`): banner judul atas terpusat presisi, 2 kartu opsi respon 543x790 dengan gap 88px, panah navigasi kiri, tombol audio, dan panah navigasi kanan.
  - Highlight netral 0,4 detik tanpa tanda benar/salah, dan kalkulasi skor terbaik maks 4 bintang (`src/screens/HasilLatihan.tsx`, `src/data/latihan.ts`).
- [x] **S11 (Hadiah 7 Slot Bintang & 3 Tingkat Lencana) & S12 (Modal Keluar + Reset Sesi)**: Selesai secara logika (`src/screens/Hadiah.tsx`, `src/screens/Keluar.tsx`, `src/engine/bintang.ts`).
- [x] **S13 (Panduan Pendamping)**: Selesai secara logika beserta *graceful media fallback* (`src/screens/Panduan.tsx`, `src/engine/audio.ts`).
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus di `src/engine/bintang.test.ts`).
- [x] **Knowledge Graph**: Diperbarui di `graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`, `manifest.json` — 206 node, 481 edge, 13 komunitas).

---

## 2. Tugas Berjalan / Berikutnya (NEXT TASK — Branch `canva`)

- [ ] **Prioritas 1 — Implementasi Visual Modul Cerita (S06 & S07 / Slide 6 dst di Canva)**:
  - Penataan visual layar pemilihan cerita (S06: 3 pilihan cerita sosial).
  - Penataan visual adegan cerita bergambar (S07: transisi panel narasi, ilustrasi adegan, dan kontrol pemutar audio narasi).
- [ ] **Prioritas 2 — Integrasi Visual Modul Latihan & Evaluasi (S08, S09, S10)**:
  - Layout sampul latihan otomatis (2,5 detik).
  - Penataan kartu 4 pilihan jawaban bergambar dengan posisi opsi acak & highlight netral 0,4 detik.
  - Tampilan layar hasil latihan dengan kalkulasi bintang maksimal 4.
- [ ] **Prioritas 3 — Integrasi Visual Hadiah & Modal Keluar (S11 & S12)**:
  - Rak koleksi 7 slot bintang dan visual 3 tingkatan lencana penghargaan.
  - Modal konfirmasi keluar ramah anak beserta tombol reset sesi.
- [ ] **Prioritas 4 — Integrasi Audio Fisik**:
  - Penempatan 26 file rekaman narasi (`public/assets/audio/<id>.mp3`) dan musik latar (`public/assets/audio/musik-pembuka.mp3`) sesuai spesifikasi Lampiran B `PRD-PeerNorm.md`.

---

## 3. Catatan Arsitektur & Aturan Ketat untuk AI Agent Selanjutnya
1. **Gunakan Knowledge Graph Lebih Dulu**: Jangan memindai ulang seluruh codebase dari nol. Baca `STATUS.md` dan `graphify-out/GRAPH_REPORT.md` (atau jalankan query `graphify` pada `graphify-out/graph.json`).
2. **Jangan Ubah Logika Inti Tanpa Instruksi**: Branch `canva` dikhususkan untuk *visual slicing*, *layering* panggung 16:9 (`1920x1080`), dan *asset integration*. Dilarang mengubah state machine di `src/App.tsx`, aturan kalkulasi bintang di `src/engine/bintang.ts`, ataupun merusak 8 unit test di `src/engine/bintang.test.ts`.
3. **Pola Asset Hot-Swapping (Drop-in Replacement)**:
   - Seluruh aset wajib berekstensi `.webp`.
   - Jalur direktori dan nama file dikunci di komponen React dan CSS. Jika ada pembaruan grafis dari Canva, file pengganti cukup ditimpa langsung ke folder target tanpa merombak file TSX/CSS.
4. **Standar Visual Panggung 16:9**:
   - Kanvas terkunci di `1920x1080` (`src/components/Stage.tsx`).
   - Gunakan `object-fit: cover` untuk latar belakang penuh dan `object-fit: contain; width: auto; height: auto;` untuk elemen transparan di atasnya guna mencegah distorsi atau pemotongan gambar (*anti-crop*).
   - Pertahankan touch target ramah anak (minimal setara `64px` di panggung) dan sediakan *graceful fallback* (`onError`) pada setiap elemen `<img>`.
5. **Verifikasi Wajib**: Selalu jalankan `npx tsc --noEmit && npm test` setiap selesai melakukan perubahan (wajib 0 error & 8/8 test passing).