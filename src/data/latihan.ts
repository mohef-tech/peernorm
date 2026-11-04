// Soal latihan (PRD Lampiran A.5). Urutan soal tetap; posisi kartu diacak saat tampil.
export type Soal = { id: string; tanya: string; benar: string; salah: string }

export const LATIHAN: readonly Soal[] = [
  {
    id: 'L1',
    tanya: 'Temanmu mengajak untuk bermain bersama, respon apa yang tepat?',
    benar: 'Ayo bermain',
    salah: 'Aku tidak mau berteman!',
  },
  {
    id: 'L2',
    tanya: 'Kamu dan temanmu akan menaiki ayunan, respon apa yang tepat?',
    benar: 'Ayo kita bergiliran ya',
    salah: 'Tidak, aku mau duluan',
  },
  {
    id: 'L3',
    tanya: 'Temanmu ingin mengganti permainan, responmu yang tepat ialah...',
    benar: 'Tenang dan menerima perubahan',
    salah: 'Marah kepada temanmu',
  },
  {
    id: 'L4',
    tanya: 'Temanmu memintamu untuk berbagi makanan. Respon yang tepat ialah....',
    benar: 'Ya, kamu boleh memintanya',
    salah: 'Tidak, ini punyaku',
  },
]

