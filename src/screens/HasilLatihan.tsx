import { Tombol } from '../components/Tombol'
import { TEKS } from '../data/teks'

type Props = { benar: number; onUlangi: () => void; onMenuCerita: () => void }

// S10: jumlah benar = bintang latihan (PRD §7, A13).
export function HasilLatihan({ benar, onUlangi, onMenuCerita }: Props) {
  const t = TEKS.hasil
  return (
    <section className="layar">
      <h1>{t.judul}</h1>
      <p className="pesan-besar">{t.pesan(benar)}</p>
      <div className="baris-tombol">
        <Tombol varian="kedua" onClick={onMenuCerita}>
          {t.menuCerita}
        </Tombol>
        <Tombol onClick={onUlangi}>{t.ulangi}</Tombol>
      </div>
    </section>
  )
}

