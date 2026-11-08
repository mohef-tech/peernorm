import { useState } from 'react'

export type CeritaId = 'giliran' | 'berbagi' | 'perubahan'

const BASE_PILIH = `${import.meta.env.BASE_URL}assets/img/pilih-cerita/`
const BASE_PETUNJUK = `${import.meta.env.BASE_URL}assets/img/petunjuk/`

const DAFTAR_CERITA: readonly [CeritaId, string, string][] = [
  ['giliran', 'Menunggu Giliran', 'kartu-cerita-giliran.webp'],
  ['berbagi', 'Berbagi dengan Teman', 'kartu-cerita-berbagi.webp'],
  ['perubahan', 'Menghadapi Perubahan', 'kartu-cerita-perubahan.webp'],
]

export function PilihCerita({
  onPilih,
  onKembali,
}: {
  onPilih: (id: CeritaId) => void
  onKembali?: () => void
}) {
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const tandaiGagal = (id: string) => setGagal((s) => ({ ...s, [id]: true }))
  const handleKembali = () => {
    if (onKembali) {
      onKembali()
    } else {
      document.querySelector<HTMLButtonElement>('.tombol-beranda')?.click()
    }
  }

  return (
    <section className="layar layar-pilih-cerita-stage">
      {/* Layer 1: Latar Belakang */}
      {!gagal['latar'] && (
        <img
          className="pilih-cerita-lapis pilih-cerita-latar"
          src={`${BASE_PILIH}latar-pilih-cerita.webp`}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          onError={() => tandaiGagal('latar')}
        />
      )}

      {/* Layer 2: Maskot Matahari (Kiri Atas, Reusable dari folder petunjuk) */}
      {!gagal['matahari'] && (
        <img
          className="pilih-cerita-lapis pilih-cerita-matahari"
          src={`${BASE_PETUNJUK}matahari.webp`}
          alt=""
          onError={() => tandaiGagal('matahari')}
        />
      )}

      {/* Layer 2: Header Judul */}
      {!gagal['judul'] ? (
        <img
          className="pilih-cerita-lapis pilih-cerita-judul"
          src={`${BASE_PILIH}judul-pilih-cerita.webp`}
          alt="Pilih Cerita Sosial"
          onError={() => tandaiGagal('judul')}
        />
      ) : (
        <h1 className="pilih-cerita-lapis pilih-cerita-judul-fallback">
          Pilih Cerita Sosial
        </h1>
      )}

      {/* Layer 3: Grid 3 Kartu Cerita */}
      <div className="pilih-cerita-grup-kartu">
        {DAFTAR_CERITA.map(([id, label, fileImg]) => (
          <button
            key={id}
            type="button"
            className="pilih-cerita-kartu-btn"
            aria-label={label}
            onClick={() => onPilih(id)}
          >
            {!gagal[id] ? (
              <img
                src={`${BASE_PILIH}${fileImg}`}
                alt={label}
                onError={() => tandaiGagal(id)}
              />
            ) : (
              /* Fallback jika gambar kartu gagal diload */
              <div className="pilih-cerita-kartu-fallback">
                {label}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Layer 4: Tombol Kembali / Beranda (Kiri Bawah) */}
      <button
        type="button"
        className="pilih-cerita-tombol-kembali"
        onClick={handleKembali}
        aria-label="Kembali ke Menu"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>
    </section>
  )
}