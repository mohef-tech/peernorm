import { useEffect, useState } from 'react'
import { TEKS } from '../data/teks'
import { ASET_INTI, muat } from '../engine/preload'

const MINIMAL_MS = 3000
const INTERVAL_MS = 50
const BASE_SPLASH = `${import.meta.env.BASE_URL}assets/img/splash/`

type LapisId = 'latar' | 'logo' | 'karakter' | 'kapsul'

// S01: Layar Splash panggung 16:9 (1920x1080) + bilah progres dinamis 0%->100%; otomatis ke S02 (PRD §5).
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
    <section className="layar layer-splash-stage">
      {/* Layer 1: Latar Panggung (termasuk ilustrasi halaman sekolah & anak) */}
      {!gagal.latar && (
        <img
          className="layer-splash-bg"
          src={`${BASE_SPLASH}latar-sekolah.webp`}
          alt=""
           fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar')
          }}
        />
      )}

      {/* Layer 2: Logo PeerNorm (transparan, proporsional) */}
      {!gagal.logo ? (
        <img
          className="layer-splash-item layer-splash-logo"
          src={`${BASE_SPLASH}logo-peernorm.webp`}
          alt="PeerNorm"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('logo')
          }}
        />
      ) : (
        <h1 className="logo layer-splash-logo-fallback">PeerNorm</h1>
      )}

      {/* Layer 3: Karakter Anak (opsional bila dipisah dari latar-sekolah.webp) */}
      {!gagal.karakter && (
        <img
          className="layer-splash-item layer-splash-karakter"
          src={`${BASE_SPLASH}karakter-anak.webp`}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('karakter')
          }}
        />
      )}

      {/* Layer 4: Kapsul Loading & Bilah Progres Dinamis 0% -> 100% */}
      <div className="layer-splash-kapsul-wrap">
        {!gagal.kapsul && (
          <img
            className="layer-splash-item layer-splash-kapsul"
            src={`${BASE_SPLASH}kapsul-loading.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('kapsul')
            }}
          />
        )}
        <div
          className={`layer-splash-progres${gagal.kapsul ? ' layer-splash-progres-fallback' : ''}`}
          role="progressbar"
          aria-label={TEKS.memuat}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={persen}
        >
          <div className="layer-splash-progres-isi" style={{ width: `${persen}%` }} />
        </div>
      </div>
    </section>
  )
}


