// Soal latihan (PRD Lampiran A.5). Urutan soal tetap; posisi kartu diacak saat tampil.
export type Soal = { id: string; tanya: string; benar: string; salah: string }
export type OpsiLatihan = { teks: string; benar: boolean }

export function acakOpsi(soal: Soal, rng: () => number = Math.random): readonly [OpsiLatihan, OpsiLatihan] {
  const b: OpsiLatihan = { teks: soal.benar, benar: true }
  const s: OpsiLatihan = { teks: soal.salah, benar: false }
  return rng() < 0.5 ? [b, s] : [s, b]
}

export const LATIHAN: readonly Soal[] = [
  {
    id: 'latihan-1',
    tanya: 'Temanmu mengajak untuk bermain bersama, respon apa yang tepat?',
    benar: 'Ayo bermain',
    salah: 'Aku tidak mau berteman!',
  },
  {
    id: 'latihan-2',
    tanya: 'Kamu dan temanmu akan menaiki ayunan, respon apa yang tepat?',
    benar: 'Ayo kita bergiliran ya',
    salah: 'Tidak, aku mau duluan',
  },
  {
    id: 'latihan-3',
    tanya: 'Temanmu ingin mengganti permainan, responmu yang tepat ialah...',
    benar: 'Tenang dan menerima perubahan',
    salah: 'Marah kepada temanmu',
  },
  {
    id: 'latihan-4',
    tanya: 'Temanmu memintamu untuk berbagi makanan. Respon yang tepat ialah....',
    benar: 'Ya, kamu boleh memintanya',
    salah: 'Tidak, ini punyaku',
  },
]