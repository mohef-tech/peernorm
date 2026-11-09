// Cerita sosial (PRD §6, Lampiran A.2-A.4). `id` langkah = nama file gambar dan suara
// (public/assets/img/<id>.webp, public/assets/audio/<id>.mp3, PRD §10.5).
// Jalur utama berurutan; langkah `ulang` menempel pada `pilihan` karena selalu kembali ke pilihan itu.

export type CeritaId = 'giliran' | 'berbagi' | 'perubahan'

type Dasar = { id: string; teks: string; hal?: string }

export type Langkah =
  | (Dasar & { jenis: 'narasi' })
  | (Dasar & { jenis: 'hebat' })
  | (Dasar & { jenis: 'selesai' })
  | (Dasar & { jenis: 'pilihan'; benar: string; salah: string; ulang: Dasar })

export type Cerita = { id: CeritaId; nomor: number; nama: string; judul: string; langkah: readonly Langkah[] }

export const CERITA: readonly Cerita[] = [
  {
    id: 'giliran',
    nomor: 1,
    nama: 'Menunggu Giliran',
    judul: 'Menunggu giliran bermain',
    langkah: [
      { jenis: 'narasi', id: 'giliran-01', hal: '1/4', teks: 'Kamu bermain bersama temanmu dan menunggu giliran dengan tenang' },
      { jenis: 'narasi', id: 'giliran-02', hal: '2/4', teks: 'Temanmu datang untuk meminta gilirannya' },
      {
        jenis: 'pilihan',
        id: 'giliran-pilih',
        hal: '3/4',
        teks: 'Pilih respon yang tepat ya',
        benar: 'Ya, giliranmu sekarang',
        salah: 'Tidak, aku tidak mau giliran',
        ulang: {
          id: 'giliran-ulang',
          hal: '4/4',
          teks: 'Kalau kamu tidak mau bergiliran, temanmu bisa merasa kesal dan tidak mau bermain lagi denganmu. Coba lagi yuk!',
        },
      },
      { jenis: 'hebat', id: 'giliran-hebat', hal: '4/4', teks: 'Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu bermain bergiliran' },
      { jenis: 'selesai', id: 'giliran-selesai', teks: 'Kamu sudah menyelesaikan cerita untuk bergiliran bermain dengan teman. Terus lakukan dengan baik ya!' },
    ],
  },
  {
    id: 'berbagi',
    nomor: 2,
    nama: 'Berbagi dengan Teman',
    judul: 'Berbagi dengan Teman',
    langkah: [
      { jenis: 'narasi', id: 'berbagi-01', hal: '1/6', teks: 'Temanmu ingin meminta makanan' },
      { jenis: 'narasi', id: 'berbagi-02', hal: '2/6', teks: 'Kamu tidak mau berbagi makanan' },
      { jenis: 'narasi', id: 'berbagi-03', hal: '3/6', teks: 'Temanmu merasa kesal denganmu' },
      { jenis: 'narasi', id: 'berbagi-04', hal: '4/6', teks: 'Apa yang seharusnya kamu lakukan agar temanmu tidak merasa kesal?' },
      {
        jenis: 'pilihan',
        id: 'berbagi-pilih',
        hal: '5/6',
        teks: 'Pilih respon yang paling tepat ya!',
        benar: 'Ya, aku mau berbagi',
        salah: 'Aku tidak perlu berbagi',
        ulang: { id: 'berbagi-ulang', hal: '6/6', teks: 'Kalau kamu tidak mau berbagi, temanmu bisa merasa kesal. Coba lagi yuk!' },
      },
      { jenis: 'hebat', id: 'berbagi-hebat', hal: '6/6', teks: 'Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu berbagi' },
      { jenis: 'selesai', id: 'berbagi-selesai', teks: 'Kamu sudah menyelesaikan cerita untuk berbagi dengan teman. Terus lakukan perilaku baik ya!' },
    ],
  },
  {
    id: 'perubahan',
    nomor: 3,
    nama: 'Menghadapi Perubahan',
    judul: 'Menghadapi perubahan',
    langkah: [
      {
        jenis: 'narasi',
        id: 'perubahan-01',
        hal: '1/6',
        teks: 'Kamu dan temanmu sedang asyik bermain bersama membaca cerita',
      },
      {
        jenis: 'narasi',
        id: 'perubahan-02',
        hal: '2/6',
        teks: 'Temanmu tiba-tiba ingin bermain balok saja',
      },
      {
        jenis: 'narasi',
        id: 'perubahan-03',
        hal: '3/6',
        teks: 'Temanmu ingin permainan berubah. Kamu harus bagaimana?',
      },
      {
        jenis: 'pilihan',
        id: 'perubahan-pilih',
        hal: '4/6',
        teks: 'Pilih respon yang paling tepat ya!',
        benar: 'Tarik napas, tenang, terima perubahan',
        salah: 'Marah dan merebut mainan',
        ulang: {
          id: 'perubahan-ulang',
          hal: '5/6',
          teks: 'Kamu berteriak dan menarik mainan karena marah. Temanmu jadi kesal, akhirnya tidak bisa bermain bersama',
        },
      },
      // Tanpa penghitung halaman (PRD I2).
      {
        jenis: 'hebat',
        id: 'perubahan-hebat',
        teks: 'Kamu memilih respon yang tepat! Temanmu jadi senang karena kamu dapat menerima perubahan dengan tenang',
      },
      {
        jenis: 'narasi',
        id: 'perubahan-terima',
        hal: '5/6',
        teks: 'Kamu menerima perubahan dengan tenang. Kamu dan temanmu bermain dengan bahagia.',
      },
      {
        jenis: 'narasi',
        id: 'perubahan-pelajaran',
        hal: '6/6',
        teks: 'Ketika rencana berubah, kamu boleh merasa kecewa. Kamu bisa menarik napas dengan tenang dan menjadi teman yang baik.',
      },
      {
        jenis: 'selesai',
        id: 'perubahan-selesai',
        teks: 'Kamu sudah menyelesaikan cerita untuk menghadapi perubahan. Terus lakukan dengan tenang ya!',
      },
    ],
  },
]

// Setelah cerita ketiga kembali ke cerita pertama (PRD A11).
export const ceritaBerikutnya = (id: CeritaId): CeritaId =>
  CERITA[(CERITA.findIndex((c) => c.id === id) + 1) % CERITA.length].id
