# Graph Report - peernorm  (2026-11-05)

## Corpus Check
- Corpus is ~11,321 words - fits in a single context window. You may not need a graph.

## Summary
- 206 nodes · 481 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Layar Navigasi, Sesi, dan Lencana
- State Aplikasi Utama (App.tsx)
- Alur Tiga Cerita Sosial
- Manajer Audio dan IkonSuara
- Komponen Bintang, Lencana, dan Profil
- Mesin Cerita dan KartuPilihan
- Preload Aset dan Layar Splash (S01 Canva)
- Engine Kalkulasi Bintang (bintang.ts)
- Modul Latihan dan Pengacakan Opsi
- Deklarasi Tipe Unit Test
- Konfigurasi Build Vite
- Komunitas 12

## God Nodes (most connected - your core abstractions)
1. `App()` - 24 edges
2. `TEKS` - 16 edges
3. `IkonSuara()` - 12 edges
4. `Tombol Beranda` - 12 edges
5. `Tombol()` - 11 edges
6. `S04 Menu` - 11 edges
7. `Mesin Cerita (daftar langkah)` - 11 edges
8. `Cerita 3: Menghadapi Perubahan` - 11 edges
9. `Langkah pilihan` - 10 edges
10. `Cerita 1: Menunggu Giliran` - 9 edges

## Surprising Connections (you probably didn't know these)
- `S02 Mulai` --next_visual_integration--> `Aset Visual Mulai (public/assets/img/mulai/*.webp)`  [EXTRACTED]
  PRD-PeerNorm.md → public/assets/img/mulai/latar-sekolah.webp
- `App()` --indirect_call--> `mintaPersisten()`  [INFERRED]
  src/App.tsx → src/engine/storage.ts
- `App()` --calls--> `Stage()`  [EXTRACTED]
  src/App.tsx → src/components/Stage.tsx
- `App()` --calls--> `ceritaBerikutnya()`  [EXTRACTED]
  src/App.tsx → src/data/cerita.ts
- `App()` --calls--> `hentikanNarasi()`  [EXTRACTED]
  src/App.tsx → src/engine/audio.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Siklus sesi (Profil, Menu>Profil, Keluar>Ya)** — prd_peernorm_s03_profil, prd_peernorm_s04_menu, prd_peernorm_s12_keluar, prd_peernorm_sesi, prd_peernorm_bintang_sesi [EXTRACTED 1.00]
- **Pipa bintang: cerita/latihan -> sesi -> lencana -> total** — prd_peernorm_bintang_cerita, prd_peernorm_bintang_latihan, prd_peernorm_bintang_sesi, prd_peernorm_lencana, prd_peernorm_total_bintang, prd_peernorm_storage_localstorage [EXTRACTED 1.00]
- **Cabang pilihan cerita (benar/salah/Ulangi)** — prd_peernorm_langkah_pilihan, prd_peernorm_langkah_hebat, prd_peernorm_langkah_ulang, prd_peernorm_langkah_selesai [EXTRACTED 1.00]

## Communities (13 total, 4 thin omitted)

### Community 0 - "Layar Navigasi, Sesi, dan Lencana"
Cohesion: 0.07
Nodes (37): Aset Visual Mulai (public/assets/img/mulai/*.webp), AC-09 latihan hanya bila lebih baik, AC-10 bintangSesi <= 7, AC-11 lencana 1-3/4-6/7, AC-12 total tahan reload, AC-13 Keluar Ya/Tidak, AC-15 Beranda kecuali S01/S02, Anak (pengguna utama) (+29 more)

### Community 1 - "State Aplikasi Utama (App.tsx)"
Cohesion: 0.15
Nodes (22): AC-05 alur 3 cerita + Ulangi, AC-06 pilihan tanpa panah, AC-07 +1 sekali per cerita, berbagi-hebat, berbagi-pilih, berbagi-selesai, berbagi-ulang, Cerita 2: Berbagi dengan Teman (+14 more)

### Community 2 - "Alur Tiga Cerita Sosial"
Cohesion: 0.13
Nodes (23): Aksi, awal(), beri(), Layar, MUSIK_HIDUP, reducer(), State, TANPA_BERANDA (+15 more)

### Community 3 - "Manajer Audio dan IkonSuara"
Cohesion: 0.15
Nodes (19): components/IkonSuara, IkonSuara(), KartuPilihan(), Cerita, CERITA, ceritaBerikutnya(), CeritaId, Dasar (+11 more)

### Community 4 - "Komponen Bintang, Lencana, dan Profil"
Cohesion: 0.13
Nodes (15): App(), PenghitungBintang(), Props, Tombol(), PANDUAN, TEKS, HasilLatihan(), Props (+7 more)

### Community 5 - "Mesin Cerita dan KartuPilihan"
Cohesion: 0.20
Nodes (9): Latihan L1-L4, Opsi, Props, acakOpsi(), LATIHAN, OpsiLatihan, Soal, Latihan() (+1 more)

### Community 6 - "Preload Aset dan Layar Splash (S01 Canva)"
Cohesion: 0.35
Nodes (8): Bintang(), IkonBintang(), Lencana(), URUTAN, lencana(), LencanaId, Hadiah(), Profil()

### Community 7 - "Engine Kalkulasi Bintang (bintang.ts)"
Cohesion: 0.48
Nodes (5): ASET_INTI, muat(), muatSatu(), LapisId, Splash()

### Community 9 - "Deklarasi Tipe Unit Test"
Cohesion: 0.50
Nodes (3): AC-16 overlay portrait, components/Stage, Overlay Putar Layar

## Knowledge Gaps
- **22 isolated node(s):** `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)`, `Rajin Belajar (4-6)`, `Semangat Luar Biasa (7)` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 54 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Lencana dari bintangSesi` connect `Layar Navigasi, Sesi, dan Lencana` to `Alur Tiga Cerita Sosial`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `App()` (e.g. with `awal()` and `reducer()`) actually correct?**
  _`App()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layar Navigasi, Sesi, dan Lencana` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._
- **Why does `Cerita 3: Menghadapi Perubahan` connect `State Aplikasi Utama (App.tsx)` to `Layar Navigasi, Sesi, dan Lencana`, `Manajer Audio dan IkonSuara`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Tombol Beranda` (e.g. with `components/Tombol` and `S04 Menu`) actually correct?**
  _`Tombol Beranda` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Alur Tiga Cerita Sosial` be split into smaller, more focused modules?**
  _Cohesion score 0.13054187192118227 - nodes in this community are weakly interconnected._