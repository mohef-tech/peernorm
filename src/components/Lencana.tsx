import { TEKS } from '../data/teks'
import type { LencanaId } from '../engine/bintang'
import { IkonBintang } from './Bintang'

const URUTAN: readonly LencanaId[] = ['pembelajarHebat', 'rajinBelajar', 'semangatLuarBiasa']

// Tiga lencana, yang sesuai bintangSesi disorot (PRD §5 S11). Sorotan = garis + latar + ikon, bukan warna saja.
export function Lencana({ aktif }: { aktif: LencanaId | null }) {
  return (
    <ul className="lencana">
      {URUTAN.map((id) => {
        const { nama, syarat } = TEKS.hadiah.lencana[id]
        const ini = id === aktif
        return (
          <li key={id} className={ini ? 'aktif' : ''} aria-current={ini || undefined}>
            {ini && <IkonBintang />}
            <strong>{nama}</strong>
            <span>{syarat}</span>
          </li>
        )
      })}
    </ul>
  )
}

