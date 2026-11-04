# Graph Report - peernorm  (2026-11-03)

## Corpus Check
- Corpus is ~4,212 words - fits in a single context window. You may not need a graph.

## Summary
- 90 nodes · 166 edges · 9 communities
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Cerita Giliran dan Berbagi
- Navigasi Menu dan Peran
- Aturan Pemberian Bintang
- Sesi, bintangSesi, Lencana
- Cerita Perubahan dan Narasi
- Audio dan Pemuatan Aset
- Profil dan Penyimpanan Total
- Latihan
- Panggung 16:9

## God Nodes (most connected - your core abstractions)
1. `S04 Menu` - 13 edges
2. `Tombol Beranda` - 12 edges
3. `Mesin Cerita (daftar langkah)` - 11 edges
4. `Langkah pilihan` - 11 edges
5. `Cerita 3: Menghadapi Perubahan` - 11 edges
6. `S06 Pilih Cerita` - 9 edges
7. `Cerita 1: Menunggu Giliran` - 9 edges
8. `Cerita 2: Berbagi dengan Teman` - 9 edges
9. `Lencana dari bintangSesi` - 8 edges
10. `S03 Profil` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Langkah pilihan` --contrasts_with--> `Latihan tanpa tanda benar/salah`  [INFERRED]
  PRD-PeerNorm.md → PRD-PeerNorm.md  _Bridges community 0 → community 7_
- `src/engine/bintang.ts` --implements--> `Lencana dari bintangSesi`  [INFERRED]
  PRD-PeerNorm.md → PRD-PeerNorm.md  _Bridges community 2 → community 3_
- `S02 Mulai` --navigates_to--> `S03 Profil`  [EXTRACTED]
  PRD-PeerNorm.md → PRD-PeerNorm.md  _Bridges community 5 → community 6_
- `S03 Profil` --navigates_to--> `S04 Menu`  [EXTRACTED]
  PRD-PeerNorm.md → PRD-PeerNorm.md  _Bridges community 6 → community 1_
- `S03 Profil` --starts--> `Sesi (sekali main)`  [EXTRACTED]
  PRD-PeerNorm.md → PRD-PeerNorm.md  _Bridges community 6 → community 3_

## Hyperedges (group relationships)
- **Siklus sesi (Profil, Menu>Profil, Keluar>Ya)** — prd_peernorm_s03_profil, prd_peernorm_s04_menu, prd_peernorm_s12_keluar, prd_peernorm_sesi, prd_peernorm_bintang_sesi [EXTRACTED 1.00]
- **Pipa bintang: cerita/latihan -> sesi -> lencana -> total** — prd_peernorm_bintang_cerita, prd_peernorm_bintang_latihan, prd_peernorm_bintang_sesi, prd_peernorm_lencana, prd_peernorm_total_bintang, prd_peernorm_storage_localstorage [EXTRACTED 1.00]
- **Cabang pilihan cerita (benar/salah/Ulangi)** — prd_peernorm_langkah_pilihan, prd_peernorm_langkah_hebat, prd_peernorm_langkah_ulang, prd_peernorm_langkah_selesai [EXTRACTED 1.00]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Cerita Giliran dan Berbagi"
Cohesion: 0.25
Nodes (13): AC-05 alur 3 cerita + Ulangi, AC-06 pilihan tanpa panah, berbagi-hebat, berbagi-pilih, berbagi-selesai, berbagi-ulang, Cerita 2: Berbagi dengan Teman, Cerita 1: Menunggu Giliran (+5 more)

### Community 1 - "Navigasi Menu dan Peran"
Cohesion: 0.19
Nodes (16): AC-13 Keluar Ya/Tidak, AC-15 Beranda kecuali S01/S02, Anak (pengguna utama), components/Tombol, src/data/panduan.ts, src/data/teks.ts, PeerNorm App, Pendamping (+8 more)

### Community 2 - "Aturan Pemberian Bintang"
Cohesion: 0.22
Nodes (8): AC-07 +1 sekali per cerita, AC-09 latihan hanya bila lebih baik, Bintang cerita (0-3), Bintang latihan terbaik (0-4), src/engine/bintang.ts, src/engine/storage.ts, perubahan-selesai, S10 Hasil Latihan

### Community 3 - "Sesi, bintangSesi, Lencana"
Cohesion: 0.22
Nodes (8): AC-10 bintangSesi <= 7, AC-11 lencana 1-3/4-6/7, components/Bintang, components/Lencana, Pembelajar Hebat (1-3), Rajin Belajar (4-6), Semangat Luar Biasa (7), S11 Hadiah

### Community 4 - "Cerita Perubahan dan Narasi"
Cohesion: 0.46
Nodes (7): Cerita 3: Menghadapi Perubahan, src/data/cerita.ts, perubahan-hebat, perubahan-pelajaran (6/6), perubahan-pilih, perubahan-terima (5/6), perubahan-ulang

### Community 5 - "Audio dan Pemuatan Aset"
Cohesion: 0.25
Nodes (7): components/IkonSuara, src/engine/audio.ts, src/engine/preload.ts, Musik pembuka, Pemuatan aset (inti + per cerita), S01 Splash, S02 Mulai

### Community 6 - "Profil dan Penyimpanan Total"
Cohesion: 0.38
Nodes (4): AC-12 total tahan reload, src/data/profil.ts, 3 Profil Anak (A/B/C), S03 Profil

### Community 7 - "Latihan"
Cohesion: 0.29
Nodes (5): components/KartuPilihan, src/data/latihan.ts, Latihan L1-L4, S08 Latihan Sampul, S09 Latihan 1-4

### Community 8 - "Panggung 16:9"
Cohesion: 0.50
Nodes (3): AC-16 overlay portrait, components/Stage, Overlay Putar Layar

## Knowledge Gaps
- **23 isolated node(s):** `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)`, `Rajin Belajar (4-6)`, `Semangat Luar Biasa (7)` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 25 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `S04 Menu` connect `Navigasi Menu dan Peran` to `Sesi, bintangSesi, Lencana`, `Profil dan Penyimpanan Total`, `Latihan`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **What connects `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `S06 Pilih Cerita` connect `Navigasi Menu dan Peran` to `Cerita Giliran dan Berbagi`, `Cerita Perubahan dan Narasi`, `Audio dan Pemuatan Aset`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._