import { useState } from 'react'
import { TEKS } from '../data/teks'

const BASE_MULAI = `${import.meta.env.BASE_URL}assets/img/mulai/`

type LapisId = 'latar' | 'logo' | 'matahari' | 'balon' | 'tombol'

export function Mulai({ onPlay }: { onPlay: () => void }) {
  const [gagal, setGagal] = useState<Partial<Record<LapisId, boolean>>>({})
  const tandaiGagal = (id: LapisId) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  return (
    <section className="layar layar-mulai">
      {/* Layer 1: Latar Sekolah */}
      {!gagal.latar && (
        <img
          className="mulai-lapis mulai-latar"
          src={`${BASE_MULAI}latar-sekolah.webp`}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          onError={() => tandaiGagal('latar')}
        />
      )}

      {/* Layer 2: Maskot Matahari & Logo */}
      <div className="mulai-grup-logo">
        {!gagal.matahari && (
          <img
            className="mulai-matahari"
            src={`${BASE_MULAI}ikon-matahari.webp`}
            alt=""
            onError={() => tandaiGagal('matahari')}
          />
        )}

        {!gagal.logo ? (
          <img
            className="mulai-logo"
            src={`${BASE_MULAI}logo-peernorm.webp`}
            alt="PeerNorm"
            fetchPriority="high"
            onError={() => tandaiGagal('logo')}
          />
        ) : (
          <h1 className="logo mulai-logo-fallback">PeerNorm</h1>
        )}
      </div>

      {/* Layer 3: Balon Teks Dialog */}
      <div className="mulai-grup-tagline">
        {!gagal.balon && (
          <img
            className="mulai-balon"
            src={`${BASE_MULAI}balon-teks.webp`}
            alt=""
            onError={() => tandaiGagal('balon')}
          />
        )}
        <p className={`mulai-teks ${gagal.balon ? 'mulai-teks-fallback' : ''}`}>
          {TEKS.tagline}
        </p>
      </div>

      {/* Layer 4: Tombol Play Interaktif */}
      {!gagal.tombol ? (
        <button
          type="button"
          className="mulai-tombol-aksi"
          aria-label="Mulai"
          onClick={onPlay}
        >
          <img
            src={`${BASE_MULAI}tombol-play.webp`}
            alt="Tombol Play"
            onError={() => tandaiGagal('tombol')}
          />
        </button>
      ) : (
        <button
          type="button"
          className="tombol-play mulai-tombol-fallback"
          aria-label="Mulai"
          onClick={onPlay}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
      )}
    </section>
  )
}