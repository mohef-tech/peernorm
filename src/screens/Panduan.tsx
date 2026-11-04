import { PANDUAN } from '../data/panduan'
import { TEKS } from '../data/teks'

// S13: 1 halaman teks tips dari klien (PRD A.6).
export function Panduan() {
  return (
    <section className="layar layar-teks">
      <h1>{TEKS.menu.panduan}</h1>
      {PANDUAN.length === 0 ? (
        <p className="penanda">[Teks Panduan Pendamping dari klien, paling lambat 8 November]</p>
      ) : (
        PANDUAN.map((p, i) => <p key={i}>{p}</p>)
      )}
    </section>
  )
}
