import { IkonSuara } from '../components/IkonSuara'
import { TEKS } from '../data/teks'

// S05: 5 butir petunjuk + tombol Dengarkan Petunjuk (PRD A.1).
export function Petunjuk() {
  const t = TEKS.petunjuk
  return (
    <section className="layar">
      <h1>{t.judul}</h1>
      <ol className="daftar-petunjuk">
        {t.butir.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ol>
      <IkonSuara id="petunjuk" label={t.dengarkan} />
    </section>
  )
}

