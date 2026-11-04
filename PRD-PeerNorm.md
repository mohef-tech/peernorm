# PRD — PeerNorm (Web Pembelajaran Cerita Sosial)

- **Versi:** 1.0 (draf kerja)
- **Tanggal:** 3 November 2026
- **Pembuat:** Mohammed (mohef)
- **Status:** dikunci setelah batas keberatan klien, Rabu 4 November 2026 pukul 17.00, bila tidak ada keberatan
- **Target siap:** 14 November 2026 (uji kelayakan ahli paling lambat 16 November 2026)

**Acuan (urutan prioritas jika bertentangan):**
1. Pesan ketentuan ke klien (3 Nov) = keputusan final
2. Jawaban tertulis klien (1–2 Nov)
3. Storyboard terbaru (2 Nov, desain Canva)

Harga dan pembayaran tidak dibahas di dokumen ini (ada di ringkasan penawaran terpisah).

---

## 1. Ringkasan

PeerNorm adalah aplikasi web pembelajaran untuk anak: 3 cerita sosial dengan pilihan respons, 4 latihan, serta bintang dan lencana sebagai penghargaan. Aplikasi dibuat untuk tesis klien. Anak **selalu didampingi orang dewasa** yang mengarahkan ke respons yang benar.

**Tujuan:**
- Anak memahami respons yang tepat dalam situasi pertemanan: menunggu giliran, berbagi, menghadapi perubahan.
- Penghargaan bintang memotivasi anak memakai aplikasi berulang kali.
- Pendamping (guru, orang tua, terapis) punya halaman tips singkat.

**Bukan tujuan:** rekap data di aplikasi, dashboard admin, pengubah isi lewat aplikasi, akun/login, mode offline.

## 2. Pengguna dan konteks

| Peran | Keterangan |
|---|---|
| Anak | Pengguna utama, didampingi dewasa. Antarmuka harus tenang, besar, minim distraksi |
| Pendamping | Guru pembimbing, orang tua, atau terapis. Membuka halaman Panduan Pendamping |
| Peneliti | Mencatat bintang tiap anak secara manual (foto layar Menu). Tidak ada fitur khusus di aplikasi |

**Konteks uji coba:** satu perangkat dipakai 3 anak bergantian. Perangkat: tablet dan HP (laptop juga bisa membuka). Tampilan landscape.

## 3. Lingkup

### 3.1 Termasuk
1. Semua layar sesuai storyboard 2 November (bagian 5)
2. 3 cerita sosial, 4 latihan
3. Bintang dan lencana (bagian 8)
4. 3 profil anak yang sudah disiapkan (memilih, bukan mengetik)
5. Halaman Panduan Pendamping (1 halaman teks)
6. Suara narasi per halaman (diputar saat ikon ditekan) dan musik pembuka
7. Penyimpanan bintang di browser
8. Tombol Beranda kecil di setiap halaman (kecuali Splash dan Mulai)

### 3.2 Di luar lingkup (perubahan = tambahan biaya, estimasi dulu)
- Panel admin atau pengubah isi lewat aplikasi
- Rekap atau unduhan data di aplikasi
- Mode offline atau PWA
- Anak keempat atau lebih, akun, login
- Perubahan alur atau aturan di luar dokumen ini
- Pre-test atau post-test
- Pembuatan atau penyuntingan gambar, rekaman suara, dan musik (disediakan klien)
- Hosting dan domain jangka panjang

### 3.3 Aturan perbaikan dan perubahan
- **Perbaikan** (aplikasi tidak sesuai dokumen ini): gratis.
- **Perubahan** (beda dari dokumen ini): berbayar, estimasi biaya disampaikan sebelum dikerjakan.

## 4. Keputusan dan asumsi (terkunci)

Hal yang belum digambar atau belum dijawab klien ditentukan seperti ini:

| # | Hal | Keputusan |
|---|---|---|
| A1 | Profil | 3 tombol profil menggantikan kolom ketik nama; nama sementara Anak A/B/C, final dari klien paling lambat 8 Nov |
| A2 | Pilih profil | Setelah Mulai tampil Profil; Profil di Menu dipakai untuk berganti anak |
| A3 | "Sekali main" (sesi) | Sejak memilih profil sampai Keluar → Ya, berganti profil, atau halaman dimuat ulang |
| A4 | Bintang dalam satu sesi | Tiap cerita memberi 1 bintang sekali; latihan memakai hasil terbaik (maks 4); total sesi maks 7 |
| A5 | Lencana | Berdasarkan bintang sesi (bukan total): 1–3, 4–6, 7 |
| A6 | Total bintang | Jumlah semua sesi per profil, terus bertambah, tampil di pojok kanan atas Menu |
| A7 | Urutan Menghadapi Perubahan | Pilihan benar → Hebat → adegan menerima → pelajaran → Cerita Selesai. Salah → adegan marah + Ulangi |
| A8 | Halaman pilihan | Panah lanjut tidak ditampilkan; anak harus memilih |
| A9 | Tanda ✓/✗ | Di cerita: muncul sekilas setelah memilih. Di latihan: tidak ditampilkan sama sekali |
| A10 | Posisi jawaban | Latihan diacak; cerita mengikuti storyboard |
| A11 | Cerita Selesai | Dua tombol: Menu Cerita dan Ke cerita lain (cerita berikutnya; setelah cerita ketiga kembali ke cerita pertama). Panah biru dihapus |
| A12 | Latihan | Satu kali jawab per soal, tanpa halaman benar/salah, langsung lanjut. Ulangi Latihan mulai soal 1 |
| A13 | Hasil Latihan | Menampilkan jumlah bintang ("mendapatkan N bintang!") |
| A14 | Keluar → Ya | Kembali ke Mulai, sesi berakhir, profil aktif dikosongkan |
| A15 | Musik pembuka | Mulai setelah sentuhan pertama (tombol play), lembut, berulang |
| A16 | Online | Butuh internet saat dibuka dan saat memilih cerita |
| A17 | Browser uji | Chrome (Android) dan Safari (iPad), versi terbaru |

**Asumsi internal (tidak disampaikan ke klien, ubah bila perlu):**
- I1: Halaman sampul Latihan tampil 2,5 detik lalu otomatis ke Latihan 1.
- I2: Halaman Hebat di Menghadapi Perubahan tidak menampilkan penghitung halaman (agar tidak ganda dengan 5/6 dan 6/6).
- I3: Narasi halaman pilihan membacakan pertanyaan lalu kedua pilihan.
- I4: Tombol kembali bawaan browser/gestur tidak ditangani khusus.
- I5: Pilihan kartu: sentuhan pertama langsung memilih (tanpa konfirmasi).

## 5. Layar dan navigasi

Panggung tetap rasio 16:9 yang diskalakan memenuhi layar (bagian 11.2). Tombol Beranda kecil di semua layar kecuali S01 dan S02.

| ID | Layar | Isi | Navigasi |
|---|---|---|---|
| S01 | Splash | Logo PeerNorm, 3 anak, bilah muat sungguhan (memuat aset inti) | Otomatis ke S02 setelah aset inti siap dan minimal 3 detik |
| S02 | Mulai | Logo, tagline "Belajar berteman dengan cara yang menyenangkan", tombol play | Play → S03; sentuhan ini memulai musik |
| S03 | Profil | Avatar, sapaan "Halo teman", 3 tombol nama, counter total bintang profil terpilih | Sentuh nama → profil aktif, sesi baru → S04 |
| S04 | Menu | "Halo teman", counter total (pojok kanan atas), 6 tombol: Profil, Petunjuk, Cerita Berteman, Latihan, Hadiah, Keluar; tombol kecil Panduan Pendamping | Sesuai tombol |
| S05 | Petunjuk | 5 butir petunjuk, tombol "Dengarkan Petunjuk" | Beranda |
| S06 | Pilih Cerita | "Pilih Cerita Sosial", 3 kartu (Menunggu Giliran, Berbagi dengan Teman, Menghadapi Perubahan), ikon suara | Kartu → cerita; Beranda |
| S07 | Cerita | Langkah-langkah cerita (bagian 6) | Panah kiri/kanan, pilihan, Ulangi, tombol selesai |
| S08 | Latihan sampul | Tulisan "LATIHAN" | Otomatis → S09 (I1) |
| S09 | Latihan 1–4 | Pertanyaan + 2 kartu | Pilih → soal berikutnya; soal 4 → S10 |
| S10 | Hasil Latihan | "Hebat kamu mendapatkan N Bintang!", tombol Ulangi Latihan, tombol Menu Cerita | Ulangi → S09 soal 1; Menu Cerita → S06 |
| S11 | Hadiah | Judul "Bintang", 7 slot bintang (terisi = bintang sesi), teks "Hebat! Terus pertahankan semangat belajarmu!", 3 lencana (yang sesuai disorot) | Beranda |
| S12 | Keluar | Dialog "Apakah kamu yakin ingin keluar?", Ya / Tidak | Ya → S02 (A14); Tidak → layar sebelumnya |
| S13 | Panduan Pendamping | 1 halaman teks tips (disiapkan klien) | Beranda |
| — | Putar layar | Tampil bila perangkat portrait: "Putar layar ke mendatar" | Hilang saat landscape |

Tombol Menu → Profil: mengakhiri sesi, ke S03.
Tombol Menu → Latihan: ke S08. Tombol Menu → Hadiah: ke S11. Tombol Menu → Keluar: S12.

## 6. Mesin cerita

Setiap cerita adalah daftar langkah. Jenis langkah:

| Jenis | Perilaku |
|---|---|
| `narasi` | Gambar + teks + ikon suara. Panah kiri/kanan (kiri disembunyikan di langkah pertama) |
| `pilihan` | Dua kartu gambar. Panah lanjut tidak ada. Memilih benar → `hebat`; salah → `ulang`. Setelah memilih, ✓/✗ muncul ±0,6 detik sebelum pindah |
| `hebat` | Gambar maskot bintang + teks. Panah kanan ke langkah berikutnya |
| `ulang` | Gambar + penjelasan akibat + tombol **Ulangi** (kembali ke `pilihan` yang sama). Tanpa panah lanjut |
| `selesai` | Kotak hadiah + teks. Dua tombol: Menu Cerita, Ke cerita lain. Bintang cerita diberikan di sini |

**Penghitung halaman:** mengikuti label storyboard (x/4 atau x/6); `hebat` di cerita 3 tanpa penghitung (I2).

**Alur:**
- `giliran`: narasi 1/4 → narasi 2/4 → pilihan 3/4 → hebat 4/4 (atau ulang 4/4) → selesai
- `berbagi`: narasi 1/6 → 2/6 → 3/6 → 4/6 → pilihan 5/6 → hebat 6/6 (atau ulang 6/6) → selesai
- `perubahan`: narasi 1/6 → 2/6 → 3/6 → pilihan 4/6 → hebat → narasi terima 5/6 → narasi pelajaran 6/6 → selesai. Salah: adegan marah 5/6 dengan Ulangi → kembali ke pilihan 4/6

Seluruh teks dan pemetaan gambar/suara ada di **Lampiran A**.

## 7. Latihan

- 4 soal berurutan (L1–L4), tiap soal 2 kartu gambar. Urutan soal tetap; posisi benar/salah diacak setiap kali soal ditampilkan.
- Memilih → sorot netral kartu terpilih ±0,4 detik → soal berikutnya. Tidak ada tanda benar/salah (A9, A12).
- Hasil Latihan: jumlah benar (0–4) = bintang latihan.
- Ulangi Latihan: mulai soal 1; bintang latihan sesi = nilai terbaik (A4).
- Isi soal ada di Lampiran A.

## 8. Bintang dan lencana

**Istilah:** sesi = A3. `bintangSesi` = bintang cerita (0–3) + bintang latihan terbaik (0–4) → maks 7. `total` = jumlah seluruh bintang yang pernah diberikan ke profil itu.

**Aturan:**
1. Cerita X selesai (mencapai langkah `selesai`) pertama kali di sesi ini → +1 bintang cerita.
2. Latihan selesai dengan N benar; jika N > bintang latihan sesi → selisih ditambahkan.
3. Setiap penambahan langsung menambah `total` profil dan disimpan segera.
4. Lencana ditentukan dari `bintangSesi`: 0 = tanpa lencana; 1–3 = Pembelajar Hebat; 4–6 = Rajin Belajar; 7 = Semangat Luar Biasa.
5. Sesi baru mulai dari `bintangSesi` = 0.
6. Counter Menu dan Profil menampilkan `total` profil aktif. Hadiah menampilkan `bintangSesi` (slot terisi) dan lencana aktif.

**Contoh klien:** sesi 1 = 5 bintang → lencana Rajin Belajar; sesi 2 = 7 bintang → lencana Semangat Luar Biasa; `total` = 12.

## 9. Profil dan penyimpanan

**Penyimpanan:** `localStorage`, kunci `peernorm:v1`, dibungkus satu modul (`storage`), sehingga bila nanti pindah ke server hanya modul itu yang berubah.

```json
{
  "versi": 1,
  "profil": {
    "A": { "total": 0 },
    "B": { "total": 0 },
    "C": { "total": 0 }
  }
}
```

- Daftar profil dan label (inisial) ada di file data `profil`; label diganti tanpa mengubah kode.
- `bintangSesi`, profil aktif, dan status cerita hanya di memori (hilang saat sesi berakhir).
- Pembacaan dilindungi: data rusak/tidak ada → mulai dari 0, aplikasi tidak macet. Bila penyimpanan tidak tersedia → berjalan dengan memori, ditandai di konsol.
- Meminta penyimpanan persisten (`navigator.storage.persist()`) bila tersedia.
- **Tidak ada data yang dikirim ke server.** Tidak ada rekap atau unduhan.

**Catatan untuk klien (panduan satu halaman, disertakan saat serah terima):**
- Pakai satu perangkat dan satu browser yang sama selama uji coba.
- Jangan hapus riwayat/data browser; jangan pakai mode penyamaran.
- Bila data terhapus, total kembali ke 0. Saran: foto layar Menu setelah tiap anak selesai.

## 10. Suara dan aset

### 10.1 Gambar
- Satu gambar adegan per layar (latar + karakter), tanpa teks dan tombol; teks, tombol, panah, dan pita judul dibuat di kode.
- Elemen yang butuh latar transparan (maskot bintang, kotak hadiah, ikon menu, avatar) diekspor terpisah dari Canva.
- Teks di dalam ilustrasi (balon bicara) tertanam dan tidak bisa diubah.
- Font: padanan gratis untuk web yang mirip font Canva.
- Format: WebP (adegan), PNG (transparan), target 150–250 KB per adegan.

### 10.2 Narasi (26 rekaman)
- MP3 mono, bitrate rendah (target 50–80 KB per file). Penamaan sesuai Lampiran B.
- Diputar **hanya saat ikon suara ditekan**. Satu suara pada satu waktu; berhenti otomatis saat pindah layar; ikon berubah saat sedang diputar; menekan lagi menghentikan.
- Bila file rekaman belum ada, ikon suara pada layar itu disembunyikan (aplikasi tetap jalan).

### 10.3 Musik pembuka
- Mulai setelah sentuhan pertama pada tombol play (S02). Volume rendah, berulang.
- Hidup di S02–S04; memudar saat masuk cerita/latihan; hidup lagi saat kembali ke Menu. Berhenti saat tab disembunyikan.

### 10.4 Pemuatan
- Splash memuat inti saja: S02–S06, S10–S13, musik.
- Aset tiap cerita dimuat saat cerita dipilih; langkah berikutnya dimuat lebih dulu saat anak membaca langkah sekarang.
- Target total aset di bawah 15 MB.

### 10.5 Penamaan file
- Gambar: `img/<cerita>-<kode>.webp` (contoh `img/giliran-01.webp`, `img/berbagi-pilih.webp`), UI: `img/ui-<nama>.png`.
- Suara: `audio/<id>.mp3` (id di Lampiran B).
- Pemetaan lengkap di file data (satu tempat), bukan di kode.

## 11. Teknis

### 11.1 Tumpukan
- Vite + React + TypeScript, situs statis (tanpa server, database, akun, atau variabel rahasia).
- State aplikasi: `useReducer`/`useState` biasa; tanpa library router.
- Gaya: CSS biasa; animasi CSS ringan.
- Pemasangan: Netlify (akun gratis; hemat deploy produksi karena berbasis kredit) atau Cloudflare Pages sebagai cadangan. Bangun dan uji lokal dulu; uji di tablet/HP lewat Wi-Fi yang sama.
- Git sejak hari pertama; repo GitHub privat, menjadi publik tanpa aset klien setelah selesai.

### 11.2 Tampilan
- Panggung virtual 1920×1080 diskalakan agar pas layar (letterbox), semua posisi mengikuti panggung.
- Portrait → overlay "Putar layar". Hindari masalah `100vh` di browser mobile (`dvh`).
- Sasaran sentuh besar (setara ≥ 64 px di panggung); `touch-action: manipulation`; nonaktifkan seleksi teks dan zoom dua-ketuk.
- Prinsip untuk anak: transisi halus ≤ 0,6 detik, tanpa kedip atau gerakan mendadak, tanpa suara otomatis kecuali musik lembut setelah sentuhan pertama.

### 11.3 Struktur folder
```
peernorm/
  public/assets/img/        public/assets/audio/
  src/
    data/      cerita.ts  latihan.ts  profil.ts  teks.ts  panduan.ts
    engine/    storage.ts  bintang.ts  audio.ts  preload.ts
    screens/   Splash  Mulai  Profil  Menu  Petunjuk  PilihCerita
               Cerita  Latihan  HasilLatihan  Hadiah  Keluar  Panduan
    components/ Stage  Tombol  KartuPilihan  IkonSuara  Lencana  Bintang
    App.tsx    main.tsx
  PRD.md   alur.md
```

## 12. Kriteria penerimaan

- **AC-01** Splash menampilkan bilah muat sungguhan dan otomatis ke Mulai.
- **AC-02** Menyentuh play memulai musik (tidak ada suara sebelum sentuhan).
- **AC-03** Profil menampilkan 3 tombol; memilih satu masuk ke Menu dan counter menampilkan total profil itu.
- **AC-04** Di Menu, tombol Profil mengakhiri sesi dan kembali ke Profil.
- **AC-05** Ketiga cerita berjalan sesuai alur bagian 6, termasuk cabang salah → Ulangi.
- **AC-06** Halaman pilihan tidak punya panah lanjut; ✓/✗ hanya muncul sekilas setelah memilih.
- **AC-07** Cerita Selesai memberi +1 bintang sekali per cerita per sesi; mengulang cerita di sesi yang sama tidak menambah.
- **AC-08** Latihan: 4 soal, posisi jawaban berubah setiap kali ditampilkan, tanpa tanda benar/salah.
- **AC-09** Hasil Latihan menampilkan jumlah benar; Ulangi Latihan memberi bintang hanya bila hasil lebih baik dari sebelumnya di sesi itu.
- **AC-10** `bintangSesi` tidak pernah lebih dari 7.
- **AC-11** Lencana sesuai `bintangSesi` (1–3, 4–6, 7); sesi baru mulai dari 0.
- **AC-12** Total di Menu bertambah antar sesi dan tetap ada setelah halaman dimuat ulang atau tab ditutup lalu dibuka lagi.
- **AC-13** Keluar → Ya kembali ke Mulai dan profil aktif kosong; Tidak kembali ke layar sebelumnya.
- **AC-14** Ikon suara memutar, menghentikan, dan berhenti otomatis saat pindah layar; ikon tersembunyi bila file tidak ada.
- **AC-15** Tombol Beranda ada di semua layar kecuali Splash dan Mulai; tombol Panduan Pendamping ada di Menu dan membuka teks 1 halaman.
- **AC-16** Portrait menampilkan overlay "Putar layar".
- **AC-17** Berjalan baik di Chrome Android dan Safari iPad; tidak ada galat di konsol.
- **AC-18** Total aset < 15 MB; layar cerita tampil ≤ 2 detik setelah dipilih di Wi-Fi biasa.
- **AC-19** Tidak ada permintaan jaringan yang mengirim data anak.

## 13. Jadwal (3–14 November)

| Tanggal | Pekerjaan | Ketergantungan |
|---|---|---|
| 3–4 Nov | Kerangka proyek, panggung 16:9, state, file data, Git; gambar dan suara pengganti | Batas keberatan klien 4 Nov 17.00 |
| 5–6 Nov | Mesin cerita + 1 cerita utuh (Menunggu Giliran), Profil, penyimpanan, bintang | — |
| 7–8 Nov | Dua cerita lain, Latihan, Hasil, Hadiah, Keluar | **8 Nov:** nama profil dan teks Panduan dari klien |
| 9–10 Nov | Manajer suara, musik, Petunjuk, Panduan Pendamping, aset final | **9 Nov:** rekaman narasi dari klien |
| 11–12 Nov | Uji di tablet/HP, perbaikan, optimasi ukuran | — |
| 13 Nov | Penyangga, pemasangan, panduan satu halaman untuk peneliti | — |
| 14 Nov | Serah terima (siap) | — |

Bila kiriman klien terlambat, jadwal bergeser; versi uji tetap bisa diserahkan tanpa ikon suara pada layar yang rekamannya belum ada.

## 14. Risiko

| Risiko | Dampak | Penanganan |
|---|---|---|
| Rekaman suara terlambat | Uji ke anak tanpa narasi | Versi uji tanpa ikon suara; file ditambahkan kemudian |
| Hasil ekspor Canva tidak transparan | Waktu memotong aset | Satu gambar adegan per layar; elemen transparan seperlunya |
| Font eksklusif Canva | Tampilan sedikit berbeda | Padanan gratis |
| Data browser terhapus | Total bintang hilang | Panduan peneliti + foto layar Menu |
| iPad membersihkan data situs lama | Total hilang | Pakai berkala; panduan peneliti |
| Perubahan dari dosen/klien setelah dikunci | Jadwal dan biaya | Aturan 3.3; estimasi dulu |
| Kredit Netlify habis | Situs dijeda | Hemat deploy produksi; cadangan Cloudflare Pages |
| Perangkat uji tidak sesuai asumsi (A17) | Perbaikan ekstra | Minta merek/OS/browser perangkat uji lebih awal |

---

## Lampiran A — Teks dan pemetaan

### A.1 Menu dan halaman umum
- **S02 tagline:** Belajar berteman dengan cara yang menyenangkan
- **S04:** Halo teman — tombol: Profil, Petunjuk, Cerita Berteman, Latihan, Hadiah, Keluar
- **S05 Petunjuk:**
  1. Klik salah satu pilihan cerita yang ingin dibuka
  2. Ikuti cerita sosial yang dipilih
  3. Pilih jawaban yang paling benar pada latihan
  4. Dapatkan bintang sebagai penghargaan
  5. Kumpulkan bintang dan tunjukkan pada guru/orang tua
  Tombol: Dengarkan Petunjuk
- **S06:** Pilih Cerita Sosial — Pilih cerita yang ingin kamu baca! — 1 Menunggu Giliran, 2 Berbagi dengan Teman, 3 Menghadapi Perubahan
- **S10:** Hasil Latihan — Hebat kamu mendapatkan N Bintang! — Ulangi Latihan, Menu Cerita
- **S11:** Bintang — Hebat! Terus pertahankan semangat belajarmu! — 1-3 Bintang Pembelajar Hebat; 4-6 Bintang Rajin Belajar; 7 Bintang Semangat Luar Biasa
- **S12:** Keluar — Apakah kamu yakin ingin keluar? — Ya, Tidak

### A.2 Cerita 1 — Menunggu Giliran (`giliran`), judul: "Menunggu giliran bermain"
| Langkah | Jenis | Teks |
|---|---|---|
| giliran-01 (1/4) | narasi | Kamu bermain bersama temanmu dan menunggu giliran dengan tenang |
| giliran-02 (2/4) | narasi | Temanmu datang untuk meminta gilirannya (balon: "Rian, giliranku sekarang ya.") |
| giliran-pilih (3/4) | pilihan | Pilih respon yang tepat ya — **benar:** Ya, giliranmu sekarang — salah: Tidak, aku tidak mau giliran |
| giliran-hebat (4/4) | hebat | Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu bermain bergiliran |
| giliran-ulang (4/4) | ulang | Kalau kamu tidak mau bergiliran, temanmu bisa merasa kesal dan tidak mau bermain lagi denganmu — Coba lagi yuk! [Ulangi] |
| giliran-selesai | selesai | Kamu sudah menyelesaikan cerita untuk bergiliran bermain dengan teman. Terus lakukan dengan baik ya! |

### A.3 Cerita 2 — Berbagi dengan Teman (`berbagi`), judul: "Berbagi dengan Teman"
| Langkah | Jenis | Teks |
|---|---|---|
| berbagi-01 (1/6) | narasi | Temanmu ingin meminta makanan (balon: "Boleh aku minta sedikit?") |
| berbagi-02 (2/6) | narasi | Kamu tidak mau berbagi makanan (balon: "Tidak, aku tidak mau berbagi!") |
| berbagi-03 (3/6) | narasi | Temanmu merasa kesal denganmu |
| berbagi-04 (4/6) | narasi | Apa yang seharusnya kamu lakukan agar temanmu tidak merasa kesal? (balon: "Aku harus bagaimana?") |
| berbagi-pilih (5/6) | pilihan | Pilih respon yang paling tepat ya! — **benar:** Ya, aku mau berbagi — salah: Aku tidak perlu berbagi |
| berbagi-hebat (6/6) | hebat | Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu berbagi |
| berbagi-ulang (6/6) | ulang | Kalau kamu tidak mau berbagi, temanmu bisa merasa kesal — Coba lagi yuk! [Ulangi] |
| berbagi-selesai | selesai | Kamu sudah menyelesaikan cerita untuk berbagi dengan teman. Terus lakukan perilaku baik ya! |

### A.4 Cerita 3 — Menghadapi Perubahan (`perubahan`), judul: "Menghadapi perubahan"
| Langkah | Jenis | Teks |
|---|---|---|
| perubahan-01 (1/6) | narasi | Kamu dan temanmu sedang asyik bermain bersama membaca cerita |
| perubahan-02 (2/6) | narasi | Temanmu tiba-tiba ingin bermain balok saja (balon: "Aku ingin bermain balok saja") |
| perubahan-03 (3/6) | narasi | Temanmu ingin permainan berubah. Kamu harus bagaimana? |
| perubahan-pilih (4/6) | pilihan | **benar:** Tarik napas, tenang, terima perubahan — salah: Marah dan merebut mainan |
| perubahan-hebat (tanpa nomor) | hebat | Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu dapat menerima perubahan dengan tenang |
| perubahan-terima (5/6) | narasi | Kamu menerima perubahan dengan tenang. Kamu dan temanmu bermain dengan bahagia. (balon: "Baik, kita bermain balok saja ya!") |
| perubahan-pelajaran (6/6) | narasi | Ketika rencana berubah, kamu boleh merasa kecewa. Kamu bisa menarik napas dengan tenang dan menjadi teman yang baik. |
| perubahan-ulang (5/6) | ulang | Kamu berteriak dan menarik mainan karena marah. Temanmu jadi kesal, akhirnya tidak bisa bermain bersama [Ulangi] |
| perubahan-selesai | selesai | Kamu sudah menyelesaikan cerita untuk menghadapi perubahan. Terus lakukan dengan tenang ya! |

### A.5 Latihan (`latihan`), kartu benar/salah (posisi diacak)
| Soal | Pertanyaan | Benar | Salah |
|---|---|---|---|
| L1 | Temanmu mengajak untuk bermain bersama, respon apa yang tepat? | Ayo bermain | Aku tidak mau berteman! |
| L2 | Kamu dan temanmu akan menaiki ayunan, respon apa yang tepat? | Ayo kita bergiliran ya | Tidak, aku mau duluan |
| L3 | Temanmu ingin mengganti permainan, responmu yang tepat ialah... | Tenang dan menerima perubahan | Marah kepada temanmu |
| L4 | Temanmu memintamu untuk berbagi makanan. Respon yang tepat ialah.... | Ya, kamu boleh memintanya | Tidak, ini punyaku |

### A.6 Panduan Pendamping
Teks 1 halaman disiapkan klien (paling lambat 8 Nov). Disimpan di `data/panduan.ts`.

---

## Lampiran B — Daftar rekaman narasi (26)

Format: MP3, mono, volume seragam, tanpa jeda panjang di awal/akhir. Nama file = ID + `.mp3`. Teks boleh disesuaikan klien; nama file tetap.

| # | ID file | Layar | Isi yang dibaca |
|---|---|---|---|
| 1 | `profil` | Profil | Halo teman! Pilih namamu ya. *(usulan)* |
| 2 | `petunjuk` | Petunjuk | Petunjuk. Satu, klik salah satu pilihan cerita yang ingin dibuka. Dua, ikuti cerita sosial yang dipilih. Tiga, pilih jawaban yang paling benar pada latihan. Empat, dapatkan bintang sebagai penghargaan. Lima, kumpulkan bintang dan tunjukkan pada guru atau orang tua. |
| 3 | `pilih-cerita` | Pilih Cerita | Pilih cerita sosial. Pilih cerita yang ingin kamu baca! Satu, Menunggu Giliran. Dua, Berbagi dengan Teman. Tiga, Menghadapi Perubahan. |
| 4 | `giliran-01` | Menunggu Giliran 1/4 | Kamu bermain bersama temanmu dan menunggu giliran dengan tenang |
| 5 | `giliran-02` | 2/4 | Temanmu datang untuk meminta gilirannya |
| 6 | `giliran-pilih` | 3/4 pilihan | Pilih respon yang tepat ya. Ya, giliranmu sekarang. Atau, tidak, aku tidak mau giliran. |
| 7 | `giliran-hebat` | Hebat | Hebat! Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu bermain bergiliran |
| 8 | `giliran-ulang` | Coba lagi | Kalau kamu tidak mau bergiliran, temanmu bisa merasa kesal dan tidak mau bermain lagi denganmu. Coba lagi yuk! |
| 9 | `giliran-selesai` | Selesai | Cerita selesai. Kamu sudah menyelesaikan cerita untuk bergiliran bermain dengan teman. Terus lakukan dengan baik ya! |
| 10 | `berbagi-01` | Berbagi 1/6 | Temanmu ingin meminta makanan |
| 11 | `berbagi-02` | 2/6 | Kamu tidak mau berbagi makanan |
| 12 | `berbagi-03` | 3/6 | Temanmu merasa kesal denganmu |
| 13 | `berbagi-04` | 4/6 | Apa yang seharusnya kamu lakukan agar temanmu tidak merasa kesal? |
| 14 | `berbagi-pilih` | 5/6 pilihan | Pilih respon yang paling tepat ya! Ya, aku mau berbagi. Atau, aku tidak perlu berbagi. |
| 15 | `berbagi-hebat` | Hebat | Hebat! Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu berbagi |
| 16 | `berbagi-ulang` | Coba lagi | Kalau kamu tidak mau berbagi, temanmu bisa merasa kesal. Coba lagi yuk! |
| 17 | `berbagi-selesai` | Selesai | Cerita selesai. Kamu sudah menyelesaikan cerita untuk berbagi dengan teman. Terus lakukan perilaku baik ya! |
| 18 | `perubahan-01` | Perubahan 1/6 | Kamu dan temanmu sedang asyik bermain bersama membaca cerita |
| 19 | `perubahan-02` | 2/6 | Temanmu tiba-tiba ingin bermain balok saja |
| 20 | `perubahan-03` | 3/6 | Temanmu ingin permainan berubah. Kamu harus bagaimana? |
| 21 | `perubahan-pilih` | 4/6 pilihan | Tarik napas, tenang, terima perubahan. Atau, marah dan merebut mainan. |
| 22 | `perubahan-hebat` | Hebat | Hebat! Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu dapat menerima perubahan dengan tenang |
| 23 | `perubahan-terima` | 5/6 | Kamu menerima perubahan dengan tenang. Kamu dan temanmu bermain dengan bahagia. |
| 24 | `perubahan-pelajaran` | 6/6 | Ketika rencana berubah, kamu boleh merasa kecewa. Kamu bisa menarik napas dengan tenang dan menjadi teman yang baik. |
| 25 | `perubahan-ulang` | Coba lagi | Kamu berteriak dan menarik mainan karena marah. Temanmu jadi kesal, akhirnya tidak bisa bermain bersama. Coba lagi yuk! |
| 26 | `perubahan-selesai` | Selesai | Cerita selesai. Kamu sudah menyelesaikan cerita untuk menghadapi perubahan. Terus lakukan dengan tenang ya! |
| + | `musik-pembuka` | Mulai/Menu | Musik lembut, berulang (bukan narasi) |
