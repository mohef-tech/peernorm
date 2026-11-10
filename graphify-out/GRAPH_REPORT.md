# Graph Report - peernorm  (2026-11-09)

## Corpus Check
- Corpus is ~14,566 words - fits in a single context window. You may not need a graph.

## Summary
- 226 nodes · 482 edges · 14 communities
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Spesifikasi PRD Layar, Sesi & Lencana
- State & Navigasi Utama (App.tsx & Keluar)
- Komunitas AC-05 alur 3 cerita + Ulangi
- Modul Cerita Modular (Cerita.tsx & KONFIG_CERITA)
- State & Navigasi Utama (App.tsx & Keluar)
- Preload Aset & Layar Splash (S01 Canva)
- Modul Latihan Mandiri & Pengacakan Opsi
- Komponen Bintang, Lencana & Hadiah
- Deklarasi Tipe Unit Test
- Komunitas AC-16 overlay portrait
- Komunitas components/IkonSuara
- Komunitas Aset Visual Splash (public/assets/img/splash/*.webp)
- Komunitas Layering Panggung 16:9 Splash (src/gaya.css)
- Konfigurasi Build Vite

## God Nodes (most connected - your core abstractions)
1. `App.tsx` - 60 edges
2. `bintang.test.ts` - 25 edges
3. `App()` - 22 edges
4. `Cerita.tsx` - 18 edges
5. `teks.ts` - 15 edges
6. `TEKS` - 15 edges
7. `bintang.ts` - 15 edges
8. `Tombol Beranda` - 12 edges
9. `STATUS.md (Handover & Status Proyek)` - 12 edges
10. `Cerita 3: Menghadapi Perubahan` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Hadiah()` --documents_next_task--> `STATUS.md (Handover & Status Proyek)`  [EXTRACTED]
  STATUS.md
- `Latihan()` --documents_next_task--> `STATUS.md (Handover & Status Proyek)`  [EXTRACTED]
  STATUS.md
- `Splash()` --documents_done--> `STATUS.md (Handover & Status Proyek)`  [EXTRACTED]
  STATUS.md
- `S02 Mulai` --starts--> `Musik pembuka`  [EXTRACTED]
  /Users/mohammed/Projects/peernorm/PRD-PeerNorm.md
- `S06 Pilih Cerita` --offers--> `Cerita 1: Menunggu Giliran`  [EXTRACTED]
  /Users/mohammed/Projects/peernorm/PRD-PeerNorm.md
- `S06 Pilih Cerita` --offers--> `Cerita 2: Berbagi dengan Teman`  [EXTRACTED]
  /Users/mohammed/Projects/peernorm/PRD-PeerNorm.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Siklus sesi (Profil, Menu>Profil, Keluar>Ya)** — prd_peernorm_s03_profil, prd_peernorm_s04_menu, prd_peernorm_s12_keluar, prd_peernorm_sesi, prd_peernorm_bintang_sesi [EXTRACTED 1.00]
- **Pipa bintang: cerita/latihan -> sesi -> lencana -> total** — prd_peernorm_bintang_cerita, prd_peernorm_bintang_latihan, prd_peernorm_bintang_sesi, prd_peernorm_lencana, prd_peernorm_total_bintang, prd_peernorm_storage_localstorage [EXTRACTED 1.00]
- **Cabang pilihan cerita (benar/salah/Ulangi)** — prd_peernorm_langkah_pilihan, prd_peernorm_langkah_hebat, prd_peernorm_langkah_ulang, prd_peernorm_langkah_selesai [EXTRACTED 1.00]

## Communities (14 total)

### Community 0 - "Spesifikasi PRD Layar, Sesi & Lencana"
Cohesion: 0.06
Nodes (49): AC-09 latihan hanya bila lebih baik, AC-10 bintangSesi <= 7, AC-11 lencana 1-3/4-6/7, AC-12 total tahan reload, AC-13 Keluar Ya/Tidak, AC-15 Beranda kecuali S01/S02, Anak (pengguna utama), Aturan 2: latihan tambah selisih bila lebih baik (+41 more)

### Community 1 - "State & Navigasi Utama (App.tsx & Keluar)"
Cohesion: 0.10
Nodes (41): Aset Modal Keluar Slide 37 (public/assets/img/keluar/*.webp), Aset Visual Mulai (public/assets/img/mulai/*.webp), .layar-keluar-stage & .layar-keluar-* (src/gaya.css), App.tsx, Aksi, App(), awal(), Layar (+33 more)

### Community 2 - "Komunitas AC-05 alur 3 cerita + Ulangi"
Cohesion: 0.13
Nodes (33): AC-05 alur 3 cerita + Ulangi, AC-06 pilihan tanpa panah, AC-07 +1 sekali per cerita, Posisi jawaban diacak, Aturan 1: +1 per cerita sekali per sesi, berbagi-hebat, berbagi-pilih, berbagi-selesai (+25 more)

### Community 3 - "Modul Cerita Modular (Cerita.tsx & KONFIG_CERITA)"
Cohesion: 0.14
Nodes (25): Aset Cerita 2 Berbagi (public/assets/img/cerita/berbagi/*.webp), Aset Cerita 1 Giliran (public/assets/img/cerita/*.webp), Aset Cerita 3 Perubahan (public/assets/img/cerita/perubahan/*.webp), .layar-cerita-panggung & .layar-cerita-* (src/gaya.css), IkonSuara.tsx, IkonSuara(), audio.ts, cekSuara() (+17 more)

### Community 4 - "State & Navigasi Utama (App.tsx & Keluar)"
Cohesion: 0.16
Nodes (20): beri(), reducer(), cerita.ts, Cerita, CERITA, ceritaBerikutnya(), CeritaId, Dasar (+12 more)

### Community 5 - "Preload Aset & Layar Splash (S01 Canva)"
Cohesion: 0.17
Nodes (18): panduan.ts, PANDUAN, teks.ts, TEKS, preload.ts, ASET_INTI, muat(), muatSatu() (+10 more)

### Community 6 - "Modul Latihan Mandiri & Pengacakan Opsi"
Cohesion: 0.27
Nodes (12): KartuPilihan.tsx, KartuPilihan(), Opsi, Props, latihan.ts, acakOpsi(), LATIHAN, OpsiLatihan (+4 more)

### Community 7 - "Komponen Bintang, Lencana & Hadiah"
Cohesion: 0.36
Nodes (11): Bintang.tsx, Bintang(), IkonBintang(), PenghitungBintang(), Lencana.tsx, Lencana(), URUTAN, lencana() (+3 more)

### Community 8 - "Deklarasi Tipe Unit Test"
Cohesion: 0.33
Nodes (6): node-test.d.ts, deepEqual(), equal(), node:assert/strict, node:test, ok()

### Community 9 - "Komunitas AC-16 overlay portrait"
Cohesion: 0.50
Nodes (4): AC-16 overlay portrait, components/Stage, Overlay Putar Layar, Panggung 1920x1080 letterbox

### Community 10 - "Komunitas components/IkonSuara"
Cohesion: 0.50
Nodes (4): components/IkonSuara, src/engine/audio.ts, Musik pembuka, Narasi 26 rekaman

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Bagaimana `KONFIG_CERITA` di `src/screens/Cerita.tsx` memetakan aset ketiga cerita (`giliran`, `berbagi`, `perubahan`) ke mesin langkah `src/data/cerita.ts`?**
- **Bagaimana alur state `'keluar'` menghubungkan `Menu.tsx`, `App.tsx` (`reducer()`), dan `Keluar.tsx` (Slide 37 Canva)?**
- **Modul mana yang tercatat sebagai NEXT SESSION di `STATUS.md` dan bagaimana ketergantungannya pada `src/engine/bintang.ts`?**
