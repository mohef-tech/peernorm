import { PANDUAN } from '../data/panduan'
import { TEKS } from '../data/teks'

// S13: 1 halaman teks tips pendampingan (PRD §5, Lampiran A.6). Navigasi kembali ke Menu lewat tombol Beranda.
export function Panduan() {
  return (
    <section className="layar layar-teks">
      <h1>{TEKS.menu.panduan}</h1>
      {PANDUAN.length === 0 ? (
        <p className="penanda">[Teks Panduan Pendamping dari klien, paling lambat 8 November]</p>
      ) : (
        <ol className="daftar-petunjuk">
          {PANDUAN.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      )}
    </section>
  )
}
