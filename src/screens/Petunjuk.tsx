import { useState } from 'react'
import { IkonSuara } from '../components/IkonSuara'
import { TEKS } from '../data/teks'

const BASE_PETUNJUK = `${import.meta.env.BASE_URL}assets/img/petunjuk/`

export function Petunjuk({ onKembali }: { onKembali: () => void }) {
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const tandaiGagal = (id: string) => setGagal((s) => ({ ...s, [id]: true }))
  const t = TEKS.petunjuk

  return (
    <section className="layar layar-petunjuk">
      {/* Layer 1: Latar Belakang */}
      {!gagal['latar'] && (
        <img
          className="petunjuk-lapis petunjuk-latar"
          src={`${BASE_PETUNJUK}latar-petunjuk.webp`}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          onError={() => tandaiGagal('latar')}
        />
      )}

      {/* Layer 2: Tombol Kembali / Beranda (KIRI BAWAH) */}
      <button
        className="petunjuk-tombol-kembali"
        onClick={onKembali}
        aria-label="Kembali ke Menu"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>

      {/* Layer 3: Maskot Matahari */}
      {!gagal['matahari'] && (
        <img
          className="petunjuk-lapis petunjuk-matahari"
          src={`${BASE_PETUNJUK}matahari.webp`}
          alt=""
          onError={() => tandaiGagal('matahari')}
        />
      )}

      {/* Layer 4: Judul */}
      {!gagal['judul'] ? (
        <img
          className="petunjuk-lapis petunjuk-judul"
          src={`${BASE_PETUNJUK}judul-petunjuk.webp`}
          alt={t.judul}
          onError={() => tandaiGagal('judul')}
        />
      ) : (
        <h1 className="petunjuk-lapis petunjuk-judul-fallback">{t.judul}</h1>
      )}

      {/* Layer 5: Papan Konten 5 Langkah */}
      {!gagal['konten'] ? (
        <img
          className="petunjuk-lapis petunjuk-konten"
          src={`${BASE_PETUNJUK}konten-petunjuk.webp`}
          alt="Langkah-langkah petunjuk"
          onError={() => tandaiGagal('konten')}
        />
      ) : (
        <div className="petunjuk-lapis petunjuk-konten-fallback">
          <ol className="daftar-petunjuk">
            {t.butir.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Layer 6: Tombol Audio Dinamis (Kanan Bawah) */}
      <div className="petunjuk-lapis petunjuk-wadah-audio">
        {!gagal['audio'] && (
          <img
            className="petunjuk-gambar-audio"
            src={`${BASE_PETUNJUK}dengar-suara.webp`}
            alt=""
            onError={() => tandaiGagal('audio')}
          />
        )}
        <div className={`petunjuk-ikonsuara-pembungkus ${!gagal['audio'] ? 'ikonsuara-tersembunyi' : ''}`}>
          <IkonSuara id="petunjuk" label={t.dengarkan} />
        </div>
      </div>
    </section>
  )
}