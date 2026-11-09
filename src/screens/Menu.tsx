import { useState } from 'react'
import { PenghitungBintang } from '../components/Bintang'
import { Tombol } from '../components/Tombol'
import { TEKS } from '../data/teks'

export type TujuanMenu = 'profil' | 'petunjuk' | 'pilihCerita' | 'latihan' | 'hadiah' | 'keluar' | 'panduan'

const BASE_MENU = `${import.meta.env.BASE_URL}assets/img/menu/`
const FALLBACK_LATAR = `${import.meta.env.BASE_URL}assets/img/splash/latar-sekolah.webp`

const TOMBOL_MENU: readonly [TujuanMenu, string, string][] = [
  ['profil', TEKS.menu.profil, 'menu-profil.webp'],
  ['petunjuk', TEKS.menu.petunjuk, 'menu-petunjuk.webp'],
  ['pilihCerita', TEKS.menu.cerita, 'menu-cerita.webp'],
  ['latihan', TEKS.menu.latihan, 'menu-latihan.webp'],
  ['hadiah', TEKS.menu.hadiah, 'menu-hadiah.webp'],
  ['keluar', TEKS.menu.keluar, 'menu-keluar.webp'],
]

export function Menu({
  total,
  onPilih,
  onKeluar,
}: {
  total: number
  onPilih: (tujuan: TujuanMenu) => void
  onKeluar?: () => void
}) {
  const [srcLatar, setSrcLatar] = useState(`${BASE_MENU}latar-menu.webp`)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  const handlePilih = (tujuan: TujuanMenu) => {
    if (tujuan === 'keluar' && onKeluar) {
      onKeluar()
      return
    }
    onPilih(tujuan)
  }

  return (
    <section className="layar layar-menu-stage">
      {/* Layer 1: Latar Belakang Panggung */}
      {!gagal.latar && (
        <img
          className="layar-menu-bg"
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

      {/* Layer 2 Kiri: Header Sapaan "Halo teman" */}
      {!gagal.halo ? (
        <img
          className="layar-menu-item layar-menu-halo"
          src={`${BASE_MENU}teks-halo.webp`}
          alt={TEKS.sapaan}
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('halo')
          }}
        />
      ) : (
        <h1 className="layar-menu-halo-fallback">{TEKS.sapaan}</h1>
      )}

      {/* Layer 2 Kanan: Wadah Bintang & Skor Dinamis */}
      {!gagal.bintang ? (
        <div className="layar-menu-bintang-wrap" aria-label={`${total} bintang`}>
          <img
            className="layar-menu-item layar-menu-bintang-img"
            src={`${BASE_MENU}wadah-bintang.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('bintang')
            }}
          />
          <span className="layar-menu-bintang-skor">{total}</span>
        </div>
      ) : (
        <PenghitungBintang total={total} />
      )}

      {/* Layer 3: Grid 3x2 Tombol Kartu Menu */}
      <div className="layar-menu-grid">
        {TOMBOL_MENU.map(([tujuan, label, fileImg]) => (
          <button
            key={tujuan}
            type="button"
            className="layar-menu-kartu-btn"
            aria-label={label}
            onClick={() => handlePilih(tujuan)}
          >
            {!gagal[tujuan] ? (
              <img
                className="layar-menu-item layar-menu-kartu-img"
                src={`${BASE_MENU}${fileImg}`}
                alt={label}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  tandaiGagal(tujuan)
                }}
              />
            ) : (
              <span className="layar-menu-kartu-fallback">{label}</span>
            )}
          </button>
        ))}
      </div>

      {/* Layer 4: Tombol Panduan Pendamping */}
      <Tombol
        varian="kecil"
        className="tombol-panduan layar-menu-panduan"
        onClick={() => onPilih('panduan')}
      >
        {TEKS.menu.panduan}
      </Tombol>
    </section>
  )
}
