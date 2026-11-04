import { useEffect, useRef, useState } from 'react'

export type Opsi = { teks: string; benar: boolean }

type Props = {
  opsi: readonly [Opsi, Opsi]
  // Cerita: tanda benar/salah sekilas (A9). Latihan: hanya sorot netral, tanpa tanda.
  tandai: boolean
  onPilih: (benar: boolean) => void
}

// Sentuhan pertama langsung memilih, tanpa konfirmasi (I5). Remount lewat `key` untuk soal baru.
export function KartuPilihan({ opsi, tandai, onPilih }: Props) {
  const [dipilih, setDipilih] = useState<number | null>(null)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const pilih = (i: number) => {
    if (dipilih !== null) return
    setDipilih(i)
    timer.current = window.setTimeout(() => onPilih(opsi[i].benar), tandai ? 600 : 400)
  }

  return (
    <div className="kartu-pilihan">
      {opsi.map((o, i) => (
        <button
          key={o.teks}
          type="button"
          className={`kartu ${dipilih === i ? 'dipilih' : ''}`}
          disabled={dipilih !== null && dipilih !== i}
          aria-pressed={dipilih === i}
          onClick={() => pilih(i)}
        >
          {o.teks}
          {tandai && dipilih === i && (
            <span className={`tanda ${o.benar ? 'benar' : 'salah'}`} aria-hidden="true">
              {o.benar ? '✓' : '✗'}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

