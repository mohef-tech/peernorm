import { useState } from 'react'
import { PenghitungBintang } from '../components/Bintang'
import { Tombol } from '../components/Tombol'
import { TEKS } from '../data/teks'

export type TujuanMenu = 'profil' | 'petunjuk' | 'pilihCerita' | 'latihan' | 'hadiah' | 'keluar' | 'panduan'

const BASE_MENU = `${import.meta.env.BASE_URL}assets/img/menu/`
const BASE_SPLASH = `${import.meta.env.BASE_URL}assets/img/splash/`

const TOMBOL_MENU: readonly [TujuanMenu, string, string][] = [
  ['profil', TEKS.menu.profil, 'menu-profil.png'],
  ['petunjuk', TEKS.menu.petunjuk, 'menu-petunjuk.webp'],
  ['pilihCerita', TEKS.menu.cerita, 'menu-cerita.webp'],
  ['latihan', TEKS.menu.latihan, 'menu-latihan.webp'],
  ['hadiah', TEKS.menu.hadiah, 'menu-hadiah.webp'],
  ['keluar', TEKS.menu.keluar, 'menu-keluar.webp'],
]

export function Menu({ total, onPilih }: { total: number; onPilih: (tujuan: TujuanMenu) => void }) {
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const tandaiGagal = (id: string) => setGagal((s) => ({ ...s, [id]: true }))

  return (
    <section className="layar layar-menu">
      {/* Layer 1: Latar Belakang */}
      {!gagal['latar'] && (
        <img
          className="menu-lapis menu-latar"
          src={`${BASE_SPLASH}latar-menu.webp`}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          onError={() => tandaiGagal('latar')}
        />
      )}

      {/* Layer 2 Kiri: Teks Halo */}
      {!gagal['halo'] ? (
        <img
          className="menu-lapis menu-halo"
          src={`${BASE_MENU}teks-halo.webp`}
          alt={TEKS.sapaan}
          onError={() => tandaiGagal('halo')}
        />
      ) : (
        <h1 className="menu-lapis menu-halo-fallback">{TEKS.sapaan}</h1>
      )}

      {/* Layer 2 Kanan: Wadah Bintang + Skor */}
      {!gagal['bintang'] ? (
        <div className="menu-lapis menu-bintang-grup">
          <img
            className="menu-bintang-img"
            src={`${BASE_MENU}wadah-bintang.webp`}
            alt="Skor Bintang"
            onError={() => tandaiGagal('bintang')}
          />
          <span className="menu-bintang-skor">{total}</span>
        </div>
      ) : (
        <PenghitungBintang total={total} />
      )}

      {/* Layer 3: Grid 6 Tombol Kartu */}
      <div className="menu-lapis menu-grid-kartu">
        {TOMBOL_MENU.map(([tujuan, label, fileImg]) => (
          !gagal[tujuan] ? (
            <button
              key={tujuan}
              type="button"
              className="menu-tombol-kartu"
              aria-label={label}
              onClick={() => onPilih(tujuan)}
            >
              <img
                src={`${BASE_MENU}${fileImg}`}
                alt={label}
                onError={() => tandaiGagal(tujuan)}
              />
            </button>
          ) : (
            /* Fallback jika gambar tombol gagal diload */
            <Tombol key={tujuan} onClick={() => onPilih(tujuan)}>
              {label}
            </Tombol>
          )
        ))}
      </div>

      {/* Layer 4: Tombol Panduan Pendamping (Dipertahankan di ujung bawah agar tidak memutus fungsi) */}
      <Tombol
        varian="kecil"
        className="tombol-panduan menu-panduan-mengambang"
        onClick={() => onPilih('panduan')}
      >
        {TEKS.menu.panduan}
      </Tombol>
    </section>
  )
}