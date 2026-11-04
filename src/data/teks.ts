// Teks layar umum (PRD Lampiran A.1). Teks di dalam ilustrasi (balon bicara) tertanam di gambar, bukan di sini.
export const TEKS = {
  tagline: 'Belajar berteman dengan cara yang menyenangkan',
  sapaan: 'Halo teman',
  menu: {
    profil: 'Profil',
    petunjuk: 'Petunjuk',
    cerita: 'Cerita Berteman',
    latihan: 'Latihan',
    hadiah: 'Hadiah',
    keluar: 'Keluar',
    panduan: 'Panduan Pendamping',
  },
  petunjuk: {
    judul: 'Petunjuk',
    butir: [
      'Klik salah satu pilihan cerita yang ingin dibuka',
      'Ikuti cerita sosial yang dipilih',
      'Pilih jawaban yang paling benar pada latihan',
      'Dapatkan bintang sebagai penghargaan',
      'Kumpulkan bintang dan tunjukkan pada guru/orang tua',
    ],
    dengarkan: 'Dengarkan Petunjuk',
  },
  pilihCerita: { judul: 'Pilih Cerita Sosial', sub: 'Pilih cerita yang ingin kamu baca!' },
  cerita: { ulangi: 'Ulangi', menuCerita: 'Menu Cerita', ceritaLain: 'Ke cerita lain' },
  latihan: { sampul: 'LATIHAN' },
  hasil: {
    judul: 'Hasil Latihan',
    pesan: (n: number) => `Hebat kamu mendapatkan ${n} Bintang!`,
    ulangi: 'Ulangi Latihan',
    menuCerita: 'Menu Cerita',
  },
  hadiah: {
    judul: 'Bintang',
    pesan: 'Hebat! Terus pertahankan semangat belajarmu!',
    lencana: {
      pembelajarHebat: { nama: 'Pembelajar Hebat', syarat: '1-3 Bintang' },
      rajinBelajar: { nama: 'Rajin Belajar', syarat: '4-6 Bintang' },
      semangatLuarBiasa: { nama: 'Semangat Luar Biasa', syarat: '7 Bintang' },
    },
  },
  keluar: { tanya: 'Apakah kamu yakin ingin keluar?', ya: 'Ya', tidak: 'Tidak' },
  putarLayar: 'Putar layar ke mendatar',
  beranda: 'Beranda',
  memuat: 'Memuat',
} as const

