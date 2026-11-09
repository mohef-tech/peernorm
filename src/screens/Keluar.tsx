import { useEffect, useRef, useState } from 'react'
import { TEKS } from '../data/teks'

const BASE_KELUAR = `${import.meta.env.BASE_URL}assets/img/keluar/`
const FALLBACK_LATAR = `${import.meta.env.BASE_URL}assets/img/splash/latar-sekolah.webp`

// S12 (Slide 37 Canva): Ya mengakhiri sesi (A14); Tidak dan Escape kembali ke Menu Utama (S04). Fokus awal di Tidak (aman).
export function Keluar({ onYa, onTidak }: { onYa: () => void; onTidak: () => void }) {
  const tidak = useRef<HTMLButtonElement>(null)
  const [srcLatar, setSrcLatar] = useState(`${BASE_KELUAR}latar-keluar.webp`)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  useEffect(() => {
    tidak.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onTidak()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onTidak])

  return (
    <section className="layar layar-keluar-stage">
      {/* Layer 1: Latar Belakang Kelas */}
      {!gagal.latar && (
        <img
          className="layar-keluar-bg"
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

      {/* Layer 2: Kotak Dialog Konfirmasi Keluar */}
      <div
        className="layar-keluar-kotak"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="tanya-keluar"
      >
        {!gagal.bingkai ? (
          <>
            <img
              className="layar-keluar-item layar-keluar-bingkai"
              src={`${BASE_KELUAR}bingkai-keluar.webp`}
              alt={`${TEKS.menu.keluar}: ${TEKS.keluar.tanya}`}
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('bingkai')
              }}
            />
            <h1 id="tanya-keluar" className="layar-keluar-sr">
              {TEKS.keluar.tanya}
            </h1>
          </>
        ) : (
          <div className="layar-keluar-bingkai-fallback">
            <span className="layar-keluar-judul-fallback">{TEKS.menu.keluar}</span>
            <h1 id="tanya-keluar" className="layar-keluar-tanya-fallback">
              {TEKS.keluar.tanya}
            </h1>
          </div>
        )}

        {/* Layer 3: Tombol Aksi Ya & Tidak */}
        <div className="layar-keluar-aksi">
          <button
            type="button"
            className="layar-keluar-btn"
            aria-label={TEKS.keluar.ya}
            onClick={onYa}
          >
            {!gagal.ya ? (
              <img
                className="layar-keluar-item layar-keluar-btn-img"
                src={`${BASE_KELUAR}tombol-ya.webp`}
                alt={TEKS.keluar.ya}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  tandaiGagal('ya')
                }}
              />
            ) : (
              <span className="layar-keluar-btn-fallback layar-keluar-ya-fallback">
                {TEKS.keluar.ya}
              </span>
            )}
          </button>

          <button
            ref={tidak}
            type="button"
            className="layar-keluar-btn"
            aria-label={TEKS.keluar.tidak}
            onClick={onTidak}
          >
            {!gagal.tidak ? (
              <img
                className="layar-keluar-item layar-keluar-btn-img"
                src={`${BASE_KELUAR}tombol-tidak.webp`}
                alt={TEKS.keluar.tidak}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  tandaiGagal('tidak')
                }}
              />
            ) : (
              <span className="layar-keluar-btn-fallback layar-keluar-tidak-fallback">
                {TEKS.keluar.tidak}
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
