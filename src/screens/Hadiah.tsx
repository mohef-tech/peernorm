import { useState } from 'react'

const BASE_HADIAH = `${import.meta.env.BASE_URL}assets/img/hadiah/`

export function Hadiah({
  bintangSesi,
  onKembali,
}: {
  bintangSesi: number
  onKembali?: () => void
}) {
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  const handleKembali = () => {
    if (onKembali) {
      onKembali()
    } else {
      document.querySelector<HTMLButtonElement>('.tombol-beranda')?.click()
    }
  }

  // Evaluasi status lencana sesuai capaian bintang
  const lencana1Aktif = bintangSesi >= 1
  const lencana2Aktif = bintangSesi >= 4
  const lencana3Aktif = bintangSesi >= 7

  return (
    <section className="layar modul-hadiah-panggung">
      {/* Layer 1: Latar Belakang */}
      {!gagal.latar && (
        <img
          className="modul-hadiah-latar"
          src={`${BASE_HADIAH}latar-hadiah.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar')
          }}
        />
      )}

      {/* Layer 2: Bingkai Putih Kartu Hadiah */}
      {!gagal.bingkai && (
        <img
          className="modul-hadiah-bingkai"
          src={`${BASE_HADIAH}bingkai-hadiah.webp`}
          alt="Bintang"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('bingkai')
          }}
        />
      )}

      {/* Layer 3: Karakter Anak (z-index diturunkan ke 2 agar konten di atasnya) */}
      {!gagal.karakter && (
        <img
          className="modul-hadiah-karakter"
          src={`${BASE_HADIAH}karakter-hadiah.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('karakter')
          }}
        />
      )}

      {/* Layer 4: Deretan 7 Slot Bintang Dinamis */}
      <div className="modul-hadiah-deretan-bintang">
        {Array.from({ length: 7 }).map((_, i) => {
          const aktif = i < (bintangSesi || 7) // fallback preview jika bintangSesi 0
          return (
            <img
              key={i}
              className={`modul-hadiah-bintang-item ${aktif ? 'aktif' : 'redup'}`}
              src={`${BASE_HADIAH}bintang-hadiah-satuan.webp`}
              alt={aktif ? `Bintang ${i + 1}` : 'Belum tercapai'}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )
        })}
      </div>

      {/* Layer 5: Teks Pesan Semangat */}
      <div className="modul-hadiah-pesan">
        <p className="modul-hadiah-pesan-baris1">Hebat! Terus pertahankan</p>
        <p className="modul-hadiah-pesan-baris2">semangat belajarmu!</p>
      </div>

      {/* Layer 6: Rak 3 Lencana */}
      <div className="modul-hadiah-rak-lencana">
        <div className={`modul-hadiah-kartu-lencana ${lencana1Aktif ? 'aktif' : 'redup'}`}>
          <img
            src={`${BASE_HADIAH}lencana-1.webp`}
            alt="Aku Mulai Bisa"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>

        <span className="modul-hadiah-titik-penghubung">•••</span>

        <div className={`modul-hadiah-kartu-lencana ${lencana2Aktif ? 'aktif' : 'redup'}`}>
          <img
            src={`${BASE_HADIAH}lencana-2.webp`}
            alt="Aku Semakin Bisa"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>

        <span className="modul-hadiah-titik-penghubung">•••</span>

        <div className={`modul-hadiah-kartu-lencana ${lencana3Aktif ? 'aktif' : 'redup'}`}>
          <img
            src={`${BASE_HADIAH}lencana-3.webp`}
            alt="Aku Hebat Berteman"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </div>

      {/* Layer 7: Tombol Beranda */}
      <button
        type="button"
        className="cerita-tombol-beranda"
        onClick={handleKembali}
        aria-label="Kembali ke Beranda"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
    </section>
  )
}