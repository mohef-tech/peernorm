# Status Pengerjaan Proyek PeerNorm (Handover Dokumen)

Terakhir Diperbarui: 10 November 2026
Branch Aktif: `canva` -> `audio` (Persiapan Integrasi Aset Audio)
Base Code: `argon` (Logika 100% lulus audit TypeScript & 8 unit tests)
Stack: Vite + React + TypeScript + Vanilla CSS (No External Router)
Knowledge Graph: `graphify-out/` (Diperbarui secara berkala dengan Graphify)

---

## 1. Komponen & Fitur Selesai (DONE)
- [x] Inisiasi proyek sesuai `PRD-PeerNorm.md` Bagian 11.3 & Aturan Anti-Slop.
- [x] Stage 16:9 (`1920x1080`), dvh scaling (`src/components/Stage.tsx`), & overlay portrait "Putar layar".
- [x] State management global via `useReducer` di `src/App.tsx` & persistensi `localStorage` (`peernorm:v1` di `src/engine/storage.ts`).
- [x] **Standardisasi Format Aset**: Seluruh gambar visual panggung di `public/assets/img/` telah diseragamkan 100% ke format `.webp`.
- [x] **S01 (Splash)** — Tuntas Logika & Visual 1:1 Desain Acuan Canva.
- [x] **S02 (Mulai)** — Tuntas Logika & Visual 1:1 Pola Hot-Swapping.
- [x] **S03 (Pilih Profil Kamu)** — Tuntas Logika & Visual 1:1.
- [x] **S04 (Menu Utama / Slide 3 Canva)** — Tuntas Logika & Visual 1:1.
- [x] **S05 (Petunjuk / Slide 5 Canva)** — Tuntas Logika & Visual 1:1 (Strategi Composite Card).
- [x] **S06 (Pilih Cerita Sosial / Slide 6 Canva)** — Tuntas Logika & Visual 1:1.
- [x] **Cerita 1 ("Menunggu Giliran" / `giliran` — Slide 7 s.d. 12 Canva)** — Tuntas 100%.
- [x] **Cerita 2 ("Berbagi dengan Teman" / `berbagi` — Slide 13 s.d. 20 Canva)** — Tuntas 100%.
- [x] **Cerita 3 ("Menghadapi Perubahan" / `perubahan` — Slide 21 s.d. 29 Canva)** — Tuntas 100%.
- [x] **Modul Latihan Mandiri (Slide 30 s.d. 34 Canva di `src/screens/Latihan.tsx`)** — Tuntas 100%:
  - Sampul pembuka latihan (`sampul-latihan.webp`, timer 2,5s).
  - 4 soal pilihan ganda respons terisolasi (`modul-latihan-*`), layout banner atas, adegan tengah balok, dan tombol audio.
- [x] **Layar Evaluasi Hasil Latihan (Slide 35 Canva di `src/screens/HasilLatihan.tsx`)** — Tuntas 100%:
  - Tampilan rating 4 bintang, tombol "Ulangi Latihan" dan tombol "Jumlah Bintang" terintegrasi ke `App.tsx`.
- [x] **Layar Rak Hadiah Global (Slide 36 Canva di `src/screens/Hadiah.tsx`)** — Tuntas 100%:
  - Deretan 7 bintang dinamis, 3 tingkatan lencana penghargaan (*Aku Mulai Bisa*, *Aku Semakin Bisa*, *Aku Hebat Berteman*), dan ilustrasi karakter anak.
- [x] **Layar / Modal Keluar (Slide 37 Canva di `src/screens/Keluar.tsx` & `Menu.tsx`)** — Tuntas 100%.
- [x] **Verifikasi Kode**: `npx tsc --noEmit` bersih dan seluruh layer visual 1:1 terhadap Canva.

---

## 2. Tugas Berjalan / Sesi Selanjutnya (NEXT SESSION — Branch `audio`)

- [ ] **Prioritas 1 — Audit & Penempatan Aset Audio Fisik**:
  - Penempatan 26 file narasi fisik (`public/assets/audio/<id>.mp3`) dan BGM latar.
- [ ] **Prioritas 2 — Integrasi Engine Audio**:
  - Sinkronisasi narasi pada pemutaran adegan cerita, pembacaan soal latihan, feedback apresiasi, dan tombol audio modul latihan.
- [ ] **Prioritas 3 — End-to-End Testing**:
  - Pengujian alur audio bersamaan dengan akumulasi bintang 0 sampai 7.

---

## 3. Catatan Arsitektur & Aturan Ketat
1. **Modul Visual Panggung Terkunci**: Seluruh alur visual Slide 1 s.d. 37 sudah 1:1 dengan Canva dan stabil.
2. **Isolasi Styling**: Semua styling modul hasil latihan dan hadiah menggunakan selector khusus (`.modul-hasil-*` dan `.modul-hadiah-*`).
3. **Pemeriksaan Berkala**: Jalankan `npx tsc --noEmit && npm test` sebelum melakukan merge atau commit berikutnya.