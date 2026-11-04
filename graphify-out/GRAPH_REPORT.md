# Graph Report - peernorm  (2026-11-04)

## Corpus Check
- Corpus is ~10,725 words - fits in a single context window. You may not need a graph.

## Summary
- 201 nodes · 475 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Layar Navigasi, Sesi, dan Lencana
- State Aplikasi Utama (App.tsx)
- Alur Tiga Cerita Sosial
- Manajer Audio dan IkonSuara
- Komponen Bintang, Lencana, dan Profil
- Mesin Cerita dan KartuPilihan
- Engine Kalkulasi Bintang (bintang.ts)
- Modul Latihan dan Pengacakan Opsi
- Preload Aset dan Layar Splash
- Deklarasi Tipe Unit Test
- Panggung 16:9 dan Overlay Portrait

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
- `App()` --calls--> `hentikanNarasi()`  [EXTRACTED]
  src/App.tsx → src/engine/audio.ts
- `App()` --calls--> `musikHidup()`  [EXTRACTED]
  src/App.tsx → src/engine/audio.ts
- `App()` --calls--> `bintangSesi()`  [EXTRACTED]
  src/App.tsx → src/engine/bintang.ts
- `App()` --indirect_call--> `mintaPersisten()`  [INFERRED]
  src/App.tsx → src/engine/storage.ts
- `App()` --calls--> `Cerita()`  [EXTRACTED]
  src/App.tsx → src/screens/Cerita.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Siklus sesi (Profil, Menu>Profil, Keluar>Ya)** — prd_peernorm_s03_profil, prd_peernorm_s04_menu, prd_peernorm_s12_keluar, prd_peernorm_sesi, prd_peernorm_bintang_sesi [EXTRACTED 1.00]
- **Pipa bintang: cerita/latihan -> sesi -> lencana -> total** — prd_peernorm_bintang_cerita, prd_peernorm_bintang_latihan, prd_peernorm_bintang_sesi, prd_peernorm_lencana, prd_peernorm_total_bintang, prd_peernorm_storage_localstorage [EXTRACTED 1.00]
- **Cabang pilihan cerita (benar/salah/Ulangi)** — prd_peernorm_langkah_pilihan, prd_peernorm_langkah_hebat, prd_peernorm_langkah_ulang, prd_peernorm_langkah_selesai [EXTRACTED 1.00]

## Communities (12 total, 2 thin omitted)

### Community 0 - "Layar Navigasi, Sesi, dan Lencana"
Cohesion: 0.08
Nodes (33): AC-10 bintangSesi <= 7, AC-11 lencana 1-3/4-6/7, AC-12 total tahan reload, AC-13 Keluar Ya/Tidak, AC-15 Beranda kecuali S01/S02, Anak (pengguna utama), Bintang cerita (0-3), components/Bintang (+25 more)

### Community 1 - "State Aplikasi Utama (App.tsx)"
Cohesion: 0.11
Nodes (26): Aksi, App(), awal(), beri(), Layar, MUSIK_HIDUP, reducer(), State (+18 more)

### Community 2 - "Alur Tiga Cerita Sosial"
Cohesion: 0.16
Nodes (21): AC-05 alur 3 cerita + Ulangi, AC-06 pilihan tanpa panah, AC-07 +1 sekali per cerita, berbagi-hebat, berbagi-pilih, berbagi-selesai, berbagi-ulang, Cerita 2: Berbagi dengan Teman (+13 more)

### Community 3 - "Manajer Audio dan IkonSuara"
Cohesion: 0.16
Nodes (13): components/IkonSuara, Musik pembuka, IkonSuara(), PANDUAN, cekSuara(), hentikanNarasi(), musikHidup(), putarNarasi() (+5 more)

### Community 4 - "Komponen Bintang, Lencana, dan Profil"
Cohesion: 0.25
Nodes (11): Bintang(), IkonBintang(), PenghitungBintang(), Lencana(), URUTAN, TEKS, lencana(), Hadiah() (+3 more)

### Community 5 - "Mesin Cerita dan KartuPilihan"
Cohesion: 0.21
Nodes (12): KartuPilihan(), Opsi, Props, Cerita, CERITA, CeritaId, Dasar, Langkah (+4 more)

### Community 6 - "Engine Kalkulasi Bintang (bintang.ts)"
Cohesion: 0.20
Nodes (8): AC-09 latihan hanya bila lebih baik, Bintang latihan terbaik (0-4), bintangSesi(), LencanaId, MAKS_LATIHAN, MAKS_SESI, Sesi, SESI_BARU

### Community 7 - "Modul Latihan dan Pengacakan Opsi"
Cohesion: 0.27
Nodes (7): Latihan L1-L4, acakOpsi(), LATIHAN, OpsiLatihan, Soal, Latihan(), SoalLatihan()

### Community 8 - "Preload Aset dan Layar Splash"
Cohesion: 0.60
Nodes (4): ASET_INTI, muat(), muatSatu(), Splash()

### Community 10 - "Panggung 16:9 dan Overlay Portrait"
Cohesion: 0.50
Nodes (3): AC-16 overlay portrait, components/Stage, Overlay Putar Layar

## Knowledge Gaps
- **18 isolated node(s):** `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)`, `Rajin Belajar (4-6)`, `Semangat Luar Biasa (7)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 49 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Cerita 3: Menghadapi Perubahan` connect `Alur Tiga Cerita Sosial` to `Layar Navigasi, Sesi, dan Lencana`, `Mesin Cerita dan KartuPilihan`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `App()` (e.g. with `awal()` and `reducer()`) actually correct?**
  _`App()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Anak (pengguna utama)`, `Penghitung Halaman x/4, x/6`, `Pembelajar Hebat (1-3)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Layar Navigasi, Sesi, dan Lencana` be split into smaller, more focused modules?**
  _Cohesion score 0.0796221322537112 - nodes in this community are weakly interconnected._
- **Why does `Lencana dari bintangSesi` connect `Layar Navigasi, Sesi, dan Lencana` to `Engine Kalkulasi Bintang (bintang.ts)`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Tombol Beranda` (e.g. with `components/Tombol` and `S04 Menu`) actually correct?**
  _`Tombol Beranda` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `State Aplikasi Utama (App.tsx)` be split into smaller, more focused modules?**
  _Cohesion score 0.11379800853485064 - nodes in this community are weakly interconnected._