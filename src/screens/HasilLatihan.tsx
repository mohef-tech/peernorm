import { useState } from 'react'

const BASE_HASIL = `${import.meta.env.BASE_URL}assets/img/hasil-latihan/`

type Props = {
  benar: number
  onUlangi: () => void
  onKeHadiah?: () => void
  onMenuCerita?: () => void
  onKembali?: () => void
}

export function HasilLatihan({ benar, onUlangi, onKeHadiah, onMenuCerita, onKembali }: Props) {
  const [gagal, setGagal] = useState<Record<string, boolean>>({})

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  const handleKeHadiah = () => {
    if (onKeHadiah) {
      onKeHadiah()
    } else if (onMenuCerita) {
      onMenuCerita()
    }
  }

  return (
    <section className="layar modul-hasil-panggung">
      {/* Layer 1: Latar Belakang Hasil Latihan */}
      {!gagal.latar && (
        <img
          className="modul-hasil-latar"
          src={`${BASE_HASIL}latar-hasil-latihan.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar')
          }}
        />
      )}

      {/* Layer 2: Bingkai Putih Kartu Modal Hasil */}
      {!gagal.bingkai && (
        <img
          className="modul-hasil-bingkai"
          src={`${BASE_HASIL}bingkai-hasil.webp`}
          alt="Hasil Latihan"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('bingkai')
          }}
        />
      )}

      {/* Layer 3: Deretan Bintang Hasil Latihan */}
      {!gagal.bintang && (
        <div className="modul-hasil-kontainer-bintang">
          <img
            className="modul-hasil-bintang-img"
            src={`${BASE_HASIL}bintang-skor.webp`}
            alt={`${benar} Bintang`}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('bintang')
            }}
          />
        </div>
      )}

      {/* Layer 4: Baris Dua Tombol Aksi */}
      <div className="modul-hasil-baris-tombol">
        {/* Tombol Kiri: Ulangi Latihan */}
        <button
          type="button"
          className="modul-hasil-tombol-aksi"
          onClick={onUlangi}
          aria-label="Ulangi Latihan"
        >
          <img
            src={`${BASE_HASIL}tombol-ulangi-latihan.webp`}
            alt="Ulangi Latihan"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </button>

        {/* Tombol Kanan: Jumlah Bintang */}
        <button
          type="button"
          className="modul-hasil-tombol-aksi"
          onClick={handleKeHadiah}
          aria-label="Jumlah Bintang"
        >
          <img
            src={`${BASE_HASIL}tombol-jumlah-bintang.webp`}
            alt="Jumlah Bintang"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </button>
      </div>

      {/* Layer 5: Tombol Beranda Kiri Atas */}
      <button
        type="button"
        className="cerita-tombol-beranda"
        onClick={onKembali}
        aria-label="Kembali ke Beranda"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
    </section>
  )
}