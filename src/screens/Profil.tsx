import { useState } from 'react'
import { IkonSuara } from '../components/IkonSuara'
import { PROFIL, type ProfilId } from '../data/profil'
import type { Total } from '../engine/storage'

const BASE_PROFIL = `${import.meta.env.BASE_URL}assets/img/profil/`
const FALLBACK_LATAR = `${import.meta.env.BASE_URL}assets/img/splash/latar-sekolah.webp`

export function Profil({ total, onPilih }: { total: Total; onPilih: (id: ProfilId) => void }) {
  const [srcLatar, setSrcLatar] = useState(`${BASE_PROFIL}latar-profil.webp`)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  return (
    <section className="layar layar-profil-stage">
      {/* Layer 1: Latar Panggung */}
      {!gagal.latar && (
        <img
          className="layar-profil-bg"
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

      {/* Layer 2: Judul Teks Header */}
      <div className="layar-profil-header">
        {!gagal.judul ? (
          <img
            className="layar-profil-item layar-profil-judul"
            src={`${BASE_PROFIL}judul-profil.webp`}
            alt="Pilih Profil Kamu - Tekan salah satu profil untuk mulai"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('judul')
            }}
          />
        ) : (
          <div className="layar-profil-judul-fallback">
            <h1>Pilih Profil Kamu</h1>
            <p>Tekan salah satu profil untuk mulai</p>
          </div>
        )}
      </div>

      {/* Layer 3: Grid 3 Tombol Kartu Profil (Profil 1 -> A, Profil 2 -> B, Profil 3 -> C) */}
      <div className="layar-profil-grid">
        {PROFIL.map((p, index) => {
          const nomor = index + 1
          const idKartu = `kartu-${p.id}`
          return (
            <button
              key={p.id}
              type="button"
              className="layar-profil-kartu-btn"
              aria-label={`Profil ${nomor} (${p.label}), ${total[p.id]} bintang`}
              onClick={() => onPilih(p.id)}
            >
              {!gagal[idKartu] ? (
                <img
                  className="layar-profil-item layar-profil-kartu-img"
                  src={`${BASE_PROFIL}kartu-profil-${nomor}.webp`}
                  alt={`Profil ${nomor}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    tandaiGagal(idKartu)
                  }}
                />
              ) : (
                <div className={`layar-profil-kartu-fallback layar-profil-warna-${nomor}`}>
                  <span className="layar-profil-fallback-label">Profil</span>
                  <div className="layar-profil-fallback-angka">{nomor}</div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Layer 4: Hiasan Karakter Anak di Area Bawah (pointer-events: none) */}
      {!gagal.anak && (
        <img
          className="layar-profil-item layar-profil-anak"
          src={`${BASE_PROFIL}anak-anak.webp`}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('anak')
          }}
        />
      )}

      {/* Trigger Audio Instruksi (tersembunyi secara visual) */}
      <div className="layar-profil-audio-sr">
        <IkonSuara id="profil" />
      </div>
    </section>
  )
}
