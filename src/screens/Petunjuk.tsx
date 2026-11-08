import { useEffect, useState } from 'react'
import { TEKS } from '../data/teks'
import { hentikanNarasi, putarNarasi } from '../engine/audio'

const BASE_PETUNJUK = `${import.meta.env.BASE_URL}assets/img/petunjuk/`
const FALLBACK_LATAR = `${import.meta.env.BASE_URL}assets/img/splash/latar-sekolah.webp`

export function Petunjuk({ onKembali }: { onKembali?: () => void }) {
  const [srcLatar, setSrcLatar] = useState(`${BASE_PETUNJUK}latar-petunjuk.webp`)
  const [srcPapan, setSrcPapan] = useState(`${BASE_PETUNJUK}konten-petunjuk.webp`)
  const [srcAudio, setSrcAudio] = useState(`${BASE_PETUNJUK}dengar-suara.webp`)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const [sedangPutar, setSedangPutar] = useState(false)

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))
  const t = TEKS.petunjuk

  useEffect(() => {
    return () => hentikanNarasi()
  }, [])

  const handleKembali = () => {
    hentikanNarasi()
    if (onKembali) {
      onKembali()
    } else {
      document.querySelector<HTMLButtonElement>('.tombol-beranda')?.click()
    }
  }

  const handleDengarkan = () => {
    if (sedangPutar) {
      hentikanNarasi()
      setSedangPutar(false)
      return
    }
    setSedangPutar(true)
    putarNarasi('petunjuk', () => setSedangPutar(false))
  }

  return (
    <section className="layar layar-petunjuk-stage">
      {/* Layer 1: Latar Belakang Panggung */}
      {!gagal.latar && (
        <img
          className="layar-petunjuk-bg"
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

      {/* Tombol Kembali / Beranda Ramah Anak (Pojok Kiri Atas di bawah Matahari) */}
      <button
        type="button"
        className="layar-petunjuk-kembali"
        onClick={handleKembali}
        aria-label={TEKS.beranda}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
        </svg>
        <span>{TEKS.beranda}</span>
      </button>

      {/* Layer 2: Maskot Matahari (opsional bila terpisah dari latar-petunjuk.webp) */}
      {!gagal.matahari && (
        <img
          className="layar-petunjuk-item layar-petunjuk-matahari"
          src={`${BASE_PETUNJUK}matahari.webp`}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('matahari')
          }}
        />
      )}

      {/* Layer 2: Judul Teks Petunjuk */}
      {!gagal.judul ? (
        <img
          className="layar-petunjuk-item layar-petunjuk-judul"
          src={`${BASE_PETUNJUK}judul-petunjuk.webp`}
          alt={t.judul}
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('judul')
          }}
        />
      ) : (
        <h1 className="layar-petunjuk-judul-fallback">{t.judul}</h1>
      )}

      {/* Layer 3: Papan Panduan Utuh (5 Langkah) */}
      <div className="layar-petunjuk-papan-wrap">
        {!gagal.konten ? (
          <img
            className="layar-petunjuk-item layar-petunjuk-papan"
            src={srcPapan}
            alt="5 Langkah Petunjuk Penggunaan"
            fetchPriority="high"
            onError={(e) => {
              const altPapan = `${BASE_PETUNJUK}papan-langkah.webp`
              if (srcPapan !== altPapan) {
                setSrcPapan(altPapan)
              } else {
                e.currentTarget.style.display = 'none'
                tandaiGagal('konten')
              }
            }}
          />
        ) : (
          <div className="layar-petunjuk-papan-fallback">
            <ol className="daftar-petunjuk">
              {t.butir.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Layer 4: Tombol Audio "Dengarkan Petunjuk" di Pojok Kanan Bawah */}
      <button
        type="button"
        className="layar-petunjuk-audio-btn"
        aria-label={t.dengarkan}
        aria-pressed={sedangPutar}
        onClick={handleDengarkan}
      >
        {!gagal.audio ? (
          <img
            className="layar-petunjuk-item layar-petunjuk-audio-img"
            src={srcAudio}
            alt={t.dengarkan}
            onError={(e) => {
              const altAudio = `${BASE_PETUNJUK}tombol-dengarkan.webp`
              if (srcAudio !== altAudio) {
                setSrcAudio(altAudio)
              } else {
                e.currentTarget.style.display = 'none'
                tandaiGagal('audio')
              }
            }}
          />
        ) : (
          <span className="layar-petunjuk-audio-fallback">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"
                fill="currentColor"
              />
            </svg>
            {t.dengarkan}
          </span>
        )}
      </button>
    </section>
  )
}
