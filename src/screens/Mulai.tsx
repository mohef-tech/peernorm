import { useState } from 'react'
import { TEKS } from '../data/teks'

const BASE_MULAI = `${import.meta.env.BASE_URL}assets/img/mulai/`
const FALLBACK_LATAR = `${import.meta.env.BASE_URL}assets/img/splash/latar-sekolah.webp`

type LapisId = 'latar' | 'logo' | 'matahari' | 'balon' | 'tombol'

export function Mulai({ onPlay, onMulai }: { onPlay: () => void; onMulai?: () => void }) {
  const [srcLatar, setSrcLatar] = useState(`${BASE_MULAI}latar-sekolah.webp`)
  const [gagal, setGagal] = useState<Partial<Record<LapisId, boolean>>>({})

  const tandaiGagal = (id: LapisId) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))
  const handleKlikMulai = () => {
    if (onMulai) onMulai()
    onPlay()
  }

  return (
    <section className="layar layar-mulai-stage">
      {/* Layer 1: Latar Belakang Sekolah (dengan fallback ke latar splash) */}
      {!gagal.latar && (
        <img
          className="layar-mulai-bg"
          src={srcLatar}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            if (srcLatar !== FALLBACK_LATAR) {
              setSrcLatar(FALLBACK_LATAR)
            } else {
              e.currentTarget.style.display = 'none'
              tandaiGagal('latar')
            }
          }}
        />
      )}

      {/* Layer 2: Maskot Matahari & Logo Judul PeerNorm */}
      <div className="layar-mulai-header">
        {!gagal.matahari && (
          <img
            className="layar-mulai-item layar-mulai-matahari"
            src={`${BASE_MULAI}ikon-matahari.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('matahari')
            }}
          />
        )}

        {!gagal.logo ? (
          <img
            className="layar-mulai-item layar-mulai-logo"
            src={`${BASE_MULAI}logo-peernorm.webp`}
            alt="PeerNorm"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('logo')
            }}
          />
        ) : (
          <h1 className="logo layar-mulai-logo-fallback">PeerNorm</h1>
        )}
      </div>

      {/* Layer 3: Wadah Balon Teks Dialog & Tagline */}
      <div className="layar-mulai-balon-wrap">
        {!gagal.balon ? (
          <img
            className="layar-mulai-item layar-mulai-balon"
            src={`${BASE_MULAI}balon-teks.webp`}
            alt={TEKS.tagline}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('balon')
            }}
          />
        ) : (
          <div className="layar-mulai-balon-fallback">
            <p className="layar-mulai-tagline">{TEKS.tagline}</p>
          </div>
        )}
      </div>

      {/* Layer 4: Tombol Play Interaktif */}
      {!gagal.tombol ? (
        <button
          type="button"
          className="layar-mulai-tombol"
          aria-label="Mulai"
          onClick={handleKlikMulai}
        >
          <img
            className="layar-mulai-item layar-mulai-tombol-img"
            src={`${BASE_MULAI}tombol-play.webp`}
            alt="Mulai"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('tombol')
            }}
          />
        </button>
      ) : (
        <button
          type="button"
          className="tombol-play layar-mulai-tombol-fallback"
          aria-label="Mulai"
          onClick={handleKlikMulai}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
      )}
    </section>
  )
}
