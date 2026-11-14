# PeerNorm — Belajar Berteman dengan Cara yang Menyenangkan

**PeerNorm** adalah aplikasi web edukasi interaktif berbasis cerita sosial (*social stories*) yang dirancang untuk membantu anak-anak usia sekolah dasar memahami norma pertemanan, empati, dan keterampilan sosial secara visual, auditori, dan menyenangkan.

🌐 **Live Demo:** [https://peernorm.vercel.app](https://peernorm.vercel.app)

---

## 📖 Ringkasan Aplikasi

PeerNorm menghadirkan pembelajaran perilaku sosial melalui pendekatan simulasi adegan sehari-hari di lingkungan sekolah. Anak-anak diajak mengamati situasi pertemanan, mendengarkan narasi suara, berlatih memilih respons yang tepat, serta mengumpulkan bintang dan lencana penghargaan sebagai bentuk penguatan positif (*positive reinforcement*).

Aplikasi ini dirancang menggunakan kanvas rasio tetap **16:9 (`1920×1080`)** yang responsif di berbagai ukuran layar—mulai dari laptop, tablet/iPad, hingga *smartphone* dalam mode layar penuh mendatar (*landscape fullscreen*).

---

## 🎯 Kegunaan & Sasaran Pengguna

* **Untuk Anak (Usia SD):** Melatih pemahaman sosial-emosional melalui 3 skenario utama pertemanan (*Menunggu Giliran*, *Berbagi dengan Teman*, dan *Menghadapi Perubahan*) yang dilengkapi ilustrasi ekspresif dan narasi suara.
* **Untuk Orang Tua, Guru, & Pendamping:** Menjadi media pendampingan terstruktur untuk berdiskusi mengenai konsekuensi perilaku sosial secara tenang tanpa menyalahkan anak, dilengkapi halaman **Panduan Pendamping** dan fitur reset progres.
* **Kebutuhan Riset & Pembelajaran Digital:** Siap digunakan langsung melalui browser tanpa proses instalasi rumit di perangkat pengguna.

---

## ✨ Fitur Utama

1. **Multi-Profil Pengguna:** Mendukung pemilihan profil anak sehingga perolehan bintang tersimpan terpisah secara lokal di browser perangkat (`localStorage`).
2. **3 Modul Cerita Interaktif:**
   * *Menunggu Giliran*
   * *Berbagi dengan Teman*
   * *Menghadapi Perubahan*
3. **Narasi Suara & Sistem Backsound 2 Mode:**
   * Pemutaran narasi suara per adegan cerita dan soal latihan.
   * Backsound otomatis menyesuaikan jenis layar (volume penuh lembut pada halaman tanpa narasi, dan volume tenang pada halaman bernarasi).
4. **Latihan Interaktif & Sistem Penghargaan (Bintang & Lencana):** Evaluasi pemahaman anak setelah membaca cerita dengan umpan balik visual langsung dan halaman **Hadiah**.
5. **Kontrol Pendamping (Reset Progres):** Tombol **Reset Bintang** dengan konfirmasi aman di halaman *Panduan Pendamping* untuk mengosongkan data sebelum sesi anak berikutnya.
6. **Dukungan Mode Layar Penuh (*Fullscreen*):** Otomatis mengaktifkan tampilan layar penuh saat tombol *Play* ditekan di perangkat *mobile* untuk meminimalkan distraksi bilah browser.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React + TypeScript
* **Build Tool:** Vite
* **Styling:** Vanilla CSS (`src/gaya.css` dengan arsitektur *responsive 16:9 stage scaling*)
* **State & Storage:** React Hooks (`useReducer`) + Web `localStorage` (dengan *persistent storage request*)
* **Audio Engine:** Native HTML5 Audio API (`src/engine/audio.ts`)
* **Deployment:** Vercel

---

## 📂 Struktur Proyek

```text
peernorm/
├── public/
│   └── assets/          # Aset gambar (.webp) dan audio narasi/backsound (.mp3)
├── src/
│   ├── components/      # Komponen UI reusable (Stage 16:9, Tombol, dll.)
│   ├── data/            # Data konten cerita, soal latihan, teks UI, & panduan
│   ├── engine/          # Logika manajemen audio, perhitungan bintang, & storage
│   ├── screens/         # Halaman layar (Splash, Mulai, Profil, Menu, Cerita, Latihan, Hadiah, Panduan)
│   ├── App.tsx          # Pengatur navigasi layar, state global, & sinkronisasi backsound
│   └── gaya.css         # Stylesheet utama aplikasi
├── PRD-PeerNorm.md      # Dokumen spesifikasi kebutuhan produk
├── alur.md              # Dokumentasi alur navigasi antar layar
├── index.html           # Entry point HTML
├── package.json         # Daftar dependensi dan skrip build
├── tsconfig.json        # Konfigurasi TypeScript
└── vite.config.ts       # Konfigurasi Vite

---

## 💻 System Requirements

### Lingkungan Pengembangan (Developer)

* **Node.js:** Versi `18.x` atau `20.x` LTS (direkomendasikan)
* **Package Manager:** `npm` v9+ (bawaan Node.js)
* **Git:** Versi terbaru untuk manajemen repositori

### Perangkat Pengguna (End-User)

* **Perangkat:** Laptop/PC, Tablet/iPad, atau Smartphone (orientasi layar mendatar / *landscape*)
* **Browser:** Google Chrome, Safari (iOS/iPadOS), Microsoft Edge, atau Firefox versi modern yang mendukung HTML5 Audio dan `localStorage`

---

## 🚀 Cara Cloning & Menjalankan di Lokal

1. **Clone repositori ini:**
```bash
git clone [https://github.com/mohef-tech/peernorm.git](https://github.com/mohef-tech/peernorm.git)

```


2. **Masuk ke direktori proyek:**
```bash
cd peernorm

```


3. **Instal seluruh dependensi:**
```bash
npm install

```


4. **Jalankan server pengembangan (*development mode*):**
```bash
npm run dev

```


Buka alamat lokal yang muncul di terminal (biasanya `http://localhost:5173`) melalui browser.


5. **Build untuk produksi (*production*):**
```bash
npm run build

```


Hasil kompilasi siap deploy akan tersimpan di dalam folder `dist/`.

---

## 📌 Catatan Operasional

* **Kebijakan Autoplay Browser:** Musik latar (*backsound*) dan mode layar penuh diaktifkan secara otomatis tepat setelah pengguna menekan tombol **Play** pada layar pembuka (*Mulai*) untuk mematuhi kebijakan keamanan audio pada browser modern (Chrome & Safari).
* **Penyimpanan Data Lokal:** Skor bintang disimpan secara mandiri di masing-masing browser perangkat. Gunakan menu **Panduan Pendamping $\rightarrow$ Reset Bintang** untuk mengulang progres dari awal.

---

## 👨‍💻 Pengembang

Dikembangkan oleh **Mohammed | Mohef Tech**

GitHub: [@mohef-tech](https://www.google.com/search?q=https://github.com/mohef-tech)
