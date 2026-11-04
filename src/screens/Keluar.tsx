import { useEffect, useRef } from 'react'
import { Tombol } from '../components/Tombol'
import { TEKS } from '../data/teks'

// S12: Ya mengakhiri sesi (A14); Tidak dan Escape kembali ke layar sebelumnya. Fokus awal di Tidak (aman).
export function Keluar({ onYa, onTidak }: { onYa: () => void; onTidak: () => void }) {
  const tidak = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    tidak.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onTidak()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onTidak])

  return (
    <section className="layar latar-dialog">
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="tanya-keluar">
        <h1 id="tanya-keluar">{TEKS.keluar.tanya}</h1>
        <div className="baris-tombol">
          <Tombol varian="kedua" onClick={onYa}>
            {TEKS.keluar.ya}
          </Tombol>
          <Tombol ref={tidak} onClick={onTidak}>
            {TEKS.keluar.tidak}
          </Tombol>
        </div>
      </div>
    </section>
  )
}

