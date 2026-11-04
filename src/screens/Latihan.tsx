import { useEffect, useState } from 'react'
import { KartuPilihan } from '../components/KartuPilihan'
import { LATIHAN, acakOpsi, type Soal } from '../data/latihan'
import { TEKS } from '../data/teks'

const SAMPUL_MS = 2500

// S08 sampul (I1) lalu S09 soal L1-L4. Ulangi Latihan langsung ke S09 soal 1 (PRD §5 S10, A12).
export function Latihan({ langsungSoal = false, onSelesai }: { langsungSoal?: boolean; onSelesai: (benar: number) => void }) {
  const [sampul, setSampul] = useState(!langsungSoal)
  const [idx, setIdx] = useState(0)
  const [benar, setBenar] = useState(0)

  useEffect(() => {
    if (!sampul) return
    const t = setTimeout(() => setSampul(false), SAMPUL_MS)
    return () => clearTimeout(t)
  }, [sampul])

  if (sampul) {
    return (
      <section className="layar">
        <h1 className="sampul-latihan">{TEKS.latihan.sampul}</h1>
      </section>
    )
  }

  const jawab = (ok: boolean) => {
    const n = benar + (ok ? 1 : 0)
    if (idx === LATIHAN.length - 1) return onSelesai(n)
    setBenar(n)
    setIdx(idx + 1)
  }

  return <SoalLatihan key={idx} nomor={idx + 1} soal={LATIHAN[idx]} onJawab={jawab} />
}

// Posisi benar/salah diacak setiap kali soal ditampilkan (A10, AC-08).
function SoalLatihan({ nomor, soal, onJawab }: { nomor: number; soal: Soal; onJawab: (benar: boolean) => void }) {
  const [opsi] = useState(() => acakOpsi(soal))

  return (
    <section className="layar">
      <p className="hal">{nomor}/{LATIHAN.length}</p>
      <h1 className="tanya">{soal.tanya}</h1>
      <KartuPilihan opsi={opsi} tandai={false} onPilih={onJawab} />
    </section>
  )
}

