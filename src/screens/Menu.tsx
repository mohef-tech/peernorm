import { PenghitungBintang } from '../components/Bintang'
import { Tombol } from '../components/Tombol'
import { TEKS } from '../data/teks'

export type TujuanMenu = 'profil' | 'petunjuk' | 'pilihCerita' | 'latihan' | 'hadiah' | 'keluar' | 'panduan'

const TOMBOL: readonly [TujuanMenu, string][] = [
  ['profil', TEKS.menu.profil],
  ['petunjuk', TEKS.menu.petunjuk],
  ['pilihCerita', TEKS.menu.cerita],
  ['latihan', TEKS.menu.latihan],
  ['hadiah', TEKS.menu.hadiah],
  ['keluar', TEKS.menu.keluar],
]

// S04: counter total di pojok kanan atas, 6 tombol utama, tombol kecil Panduan Pendamping (PRD §5).
export function Menu({ total, onPilih }: { total: number; onPilih: (tujuan: TujuanMenu) => void }) {
  return (
    <section className="layar">
      <PenghitungBintang total={total} />
      <h1>{TEKS.sapaan}</h1>
      <div className="grid-menu">
        {TOMBOL.map(([tujuan, label]) => (
          <Tombol key={tujuan} onClick={() => onPilih(tujuan)}>
            {label}
          </Tombol>
        ))}
      </div>
      <Tombol varian="kecil" className="tombol-panduan" onClick={() => onPilih('panduan')}>
        {TEKS.menu.panduan}
      </Tombol>
    </section>
  )
}

