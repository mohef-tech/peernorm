# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 8 November 2026
Branch Aktif: `canva` (Eksperimen & Integrasi Aset Grafis Canva)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (206 node, 481 edge, 13 komunitas — gunakan skill `graphify` sebelum membaca ulang seluruh repo)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai `PRD-PeerNorm.md` Bagian 11.3 & Aturan Anti-Slop.
- [x] Stage 16:9 (`1920x1080`), dvh scaling (`src/components/Stage.tsx`), & overlay portrait "Putar layar".
- [x] State management global via `useReducer` di `src/App.tsx` & persistensi `localStorage` (`peernorm:v1` di `src/engine/storage.ts`).
- [x] **Standardisasi Format Aset**: Seluruh gambar visual panggung di `public/assets/img/` (S01 sampai S06) telah diseragamkan 100% ke format `.webp`.
- [x] **S01 (Splash) — Tuntas Logika & Visual 1:1 Desain Acuan Canva**:
  - Diimplementasikan di `src/screens/Splash.tsx`, `src/gaya.css`, dan `src/engine/preload.ts` (`ASET_INTI` memuat 4 aset splash).
  - Layering 4 lapis: latar penuh (`latar-sekolah.webp`), judul logo (`logo-peernorm.webp`), karakter anak (`karakter-anak.webp`), dan kapsul progres (`kapsul-loading.webp` + `.bilah-isi`).
- [x] **S02 (Mulai) — Tuntas Logika & Visual 1:1 Pola Hot-Swapping**:
  - Diimplementasikan di `src/screens/Mulai.tsx` dan `src/gaya.css`.
  - Layering panggung 16:9: latar sekolah (`latar-sekolah.webp`), header logo terpusat + maskot matahari (`ikon-matahari.webp` di kiri atas), balon teks tagline ("Belajar berteman dengan cara yang menyenangkan"), dan tombol Play besar interaktif (mempertahankan trigger `musikHidup(true)` dan navigasi).
- [x] **S03 (Pilih Profil Kamu) — Tuntas Logika & Visual 1:1**:
  - Model 3 profil kartu visual (`kartu-profil-1.webp`, `kartu-profil-2.webp`, `kartu-profil-3.webp` yang memetakan ke data profil internal Anak A, B, C) tanpa keyboard virtual.
  - Layering: latar taman (`latar-profil.webp`), header judul (`judul-profil.webp`), 3 tombol kartu profil sejajar, dan hiasan ilustrasi anak di layer depan bawah (`anak-anak.webp` dengan `pointer-events: none`).
- [x] **S04 (Menu Utama / Slide 3 Canva) — Tuntas Logika & Visual 1:1**:
  - Grid 6 kartu menu utama (Profil, Petunjuk, Cerita Berteman, Latihan, Hadiah, Keluar) terpusat rapi.
  - Header kiri memuat grafis teks "Halo teman" dan header kanan memuat wadah counter skor bintang dinamis sesuai profil aktif.
- [x] **S05 (Petunjuk / Slide 5 Canva) — Tuntas Logika & Visual 1:1 (Strategi Composite Card)**:
  - Papan komposit utuh (`papan-langkah.webp`) berisi langkah 1–5 untuk memastikan layout kokoh dan bebas pergeseran teks.
  - Tombol audio "Dengarkan Petunjuk" di kanan bawah serta tombol kembali/beranda ramah anak di pojok kiri atas menuju Menu Utama (S04).
- [x] **S06 (Pilih Cerita Sosial / Slide 6 Canva) — Tuntas Logika & Visual 1:1**:
  - Grid 3 kartu cerita utuh (`kartu-cerita-giliran.webp`, `kartu-cerita-berbagi.webp`, `kartu-cerita-perubahan.webp`) dengan hover scale 1.04 dan tombol kembali ke Menu Utama di kiri atas.
- [x] **S07 Inti Cerita (Slide 7–10 Canva) — Tuntas Refactoring Alur & Penataan Visual Bersih**:
  - **Slide 7 & 8 (Adegan 1 & 2)**: Layout panggung 16:9 terisolasi, ilustrasi tengah anti-crop, teks narasi terpusat di dalam kotak kuning bawah, navigasi panah kiri/kanan dinamis.
  - **Slide 9 (Kuis Pilihan Respon / Halaman 3)**: Papan pertanyaan terisolasi bersih (tanpa overlay berbayang adegan sebelumnya), 2 kartu pilihan respon (`opsi-respon-1.webp` dan `opsi-respon-2.webp`), panah navigasi kanan dikunci/disembunyikan sehingga anak wajib memilih.
  - **Slide 10 (Feedback Apresiasi Benar / Halaman 4)**: Pita lencana bintang "Hebat!" (`lencana-hebat.webp`) dan kotak teks apresiasi (`kotak-umpan-balik.webp`) terpusat proporsional.
- [x] **Verifikasi & Pengujian**: `npx tsc --noEmit` (0 error) dan `npm test` (8/8 unit test lulus di `src/engine/bintang.test.ts`).
- [x] **Knowledge Graph**: Diperbarui di `graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `graph.html`, `manifest.json` — 206 node, 481 edge, 13 komunitas).

---

## 2. Tugas Berjalan / Berikutnya (NEXT TASK — Branch `canva`)

- [ ] **Prioritas 1 — Implementasi Cabang Alur Cerita (Slide 11 & Slide 12 Canva di `Cerita.tsx`)**:
  - **Slide 11 (Feedback Respon Keliru / Konsekuensi)**:
    - Muncul jika anak memilih opsi negatif di Slide 9 ("Tidak, aku tidak mau giliran").
    - Menampilkan ilustrasi anak perempuan cemberut berkacak pinggang, balon narasi konsekuensi sosial, dan tombol merah "Coba lagi yuk! / Ulangi".
    - Logika klik "Ulangi": Mereset indeks halaman kembali ke Slide 7 (Halaman 1) cerita terkait.
  - **Slide 12 (Layar Cerita Selesai & Apresiasi Kado)**:
    - Muncul setelah anak menekan tombol panah lanjut dari Slide 10.
    - Banner judul atas "Cerita Selesai", ilustrasi kotak kado terbuka di tengah dengan konfeti, kotak teks konklusi di bawah.
    - Tombol aksi navigasi: "Menu Cerita" (kembali ke S06) dan "Ke cerita lain" (lanjut ke cerita sosial berikutnya).
- [ ] **Prioritas 2 — Integrasi Visual Modul Latihan Mandiri 4 Soal (S08, S09, S10 di `Latihan.tsx` & `HasilLatihan.tsx`)**:
  - Penataan sampul otomatis 2,5 detik (S08).
  - 4 soal pilihan ganda acak dengan highlight netral 0,4 detik.
  - Layar rangkuman hasil akhir latihan perolehan maksimal 4 bintang.
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