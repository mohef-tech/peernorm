import { useEffect, useState } from 'react'
import { TEKS } from '../data/teks'
import { ASET_INTI, muat } from '../engine/preload'

const MINIMAL_MS = 3000

// S01: bilah muat sungguhan; lanjut setelah aset inti siap dan minimal 3 detik (PRD §5).
export function Splash({ onSiap }: { onSiap: () => void }) {
  const [rasio, setRasio] = useState(0)

  useEffect(() => {
    let batal = false
    const tunggu = new Promise((ok) => setTimeout(ok, MINIMAL_MS))
    Promise.all([muat(ASET_INTI, (r) => !batal && setRasio(r)), tunggu]).then(() => !batal && onSiap())
    return () => {
      batal = true
    }
  }, [onSiap])

  const persen = Math.round(rasio * 100)
  return (
    <section className="layar">
      {/* [LOGO]: nama produk sebagai teks sampai logo dan ilustrasi 3 anak dari klien masuk. */}
      <h1 className="logo">PeerNorm</h1>
      <div
        className="bilah"
        role="progressbar"
        aria-label={TEKS.memuat}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={persen}
      >
        <div style={{ width: `${persen}%` }} />
      </div>
    </section>
  )
}

