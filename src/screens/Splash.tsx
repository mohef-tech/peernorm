import { useEffect, useState } from 'react'
import { TEKS } from '../data/teks'
import { ASET_INTI, muat } from '../engine/preload'

const MINIMAL_MS = 3000
const INTERVAL_MS = 50
const BASE_SPLASH = `${import.meta.env.BASE_URL}assets/img/splash/`

type LapisId = 'latar' | 'logo' | 'karakter' | 'kapsul'

// S01: 4 layer visual Canva di panggung 16:9 (1920x1080) + bilah progres dinamis 0%->100%; otomatis ke S02 (PRD §5).
export function Splash({ onSiap }: { onSiap: () => void }) {
  const [rasio, setRasio] = useState(0)
  const [gagal, setGagal] = useState<Partial<Record<LapisId, boolean>>>({})

  useEffect(() => {
    let batal = false
    let rasioAset = 0
    let asetSelesai = false
    const mulai = Date.now()

    const perbaruiProgres = () => {
      if (batal) return
      const rasioWaktu = Math.min(1, (Date.now() - mulai) / MINIMAL_MS)
      const gabungan = asetSelesai ? rasioWaktu : Math.min(rasioWaktu, Math.max(rasioAset, rasioWaktu * 0.9))
      setRasio(gabungan)
    }

    const timerProgres = setInterval(perbaruiProgres, INTERVAL_MS)
    const tunggu = new Promise<void>((ok) => setTimeout(ok, MINIMAL_MS))
    const muatAset = muat(ASET_INTI, (r) => {
      rasioAset = r
      perbaruiProgres()
    }).then(() => {
      asetSelesai = true
      perbaruiProgres()
    })

    Promise.all([muatAset, tunggu]).then(() => {
      if (batal) return
      clearInterval(timerProgres)
      setRasio(1)
      onSiap()
    })

    return () => {
      batal = true
      clearInterval(timerProgres)
    }
  }, [onSiap])

  const tandaiGagal = (id: LapisId) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))
  const persen = Math.round(rasio * 100)

  return (
    <section className="layar layar-splash">
      {/* Layer 1 (dasar): latar sekolah full stage */}
      {!gagal.latar && (
        <img
          className="splash-lapis splash-latar"
          src={`${BASE_SPLASH}latar-sekolah.webp`}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          onError={() => tandaiGagal('latar')}
        />
      )}

      {/* Layer 2 (atas tengah): judul / logo PeerNorm dengan fallback teks */}
      {!gagal.logo ? (
        <img
          className="splash-lapis splash-logo"
          src={`${BASE_SPLASH}logo-peernorm.webp`}
          alt="PeerNorm"
          width={980}
          height={200}
          fetchPriority="high"
          onError={() => tandaiGagal('logo')}
        />
      ) : (
        <h1 className="logo splash-logo-fallback">PeerNorm</h1>
      )}

      {/* Layer 3 (tengah bawah): tiga karakter anak dengan fallback teks */}
      {!gagal.karakter ? (
        <img
          className="splash-lapis splash-karakter"
          src={`${BASE_SPLASH}karakter-anak.webp`}
          alt=""
          width={630}
          height={463}
          fetchPriority="high"
          onError={() => tandaiGagal('karakter')}
        />
      ) : (
        <p className="splash-karakter-fallback">{TEKS.tagline}</p>
      )}

      {/* Layer 4 (bawah tengah): wadah kapsul loading + indikator progres dinamis 0%->100% */}
      <div className="splash-kapsul-wadah">
        {!gagal.kapsul && (
          <img
            className="splash-lapis splash-kapsul"
            src={`${BASE_SPLASH}kapsul-loading.webp`}
            alt=""
            width={548}
            height={74}
            onError={() => tandaiGagal('kapsul')}
          />
        )}
        <div
          className={`bilah bilah-splash${gagal.kapsul ? ' bilah-fallback' : ''}`}
          role="progressbar"
          aria-label={TEKS.memuat}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={persen}
        >
          <div className="bilah-isi" style={{ width: `${persen}%` }} />
        </div>
      </div>
    </section>
  )
}

