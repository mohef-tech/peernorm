import { IkonSuara } from '../components/IkonSuara'
import { CERITA, type CeritaId } from '../data/cerita'
import { TEKS } from '../data/teks'

// S06: 3 kartu cerita + ikon suara (PRD §5, A.1).
export function PilihCerita({ onPilih }: { onPilih: (id: CeritaId) => void }) {
  return (
    <section className="layar">
      <div className="judul-dengan-suara">
        <h1>{TEKS.pilihCerita.judul}</h1>
        <IkonSuara id="pilih-cerita" />
      </div>
      <p>{TEKS.pilihCerita.sub}</p>
      <div className="grid-cerita">
        {CERITA.map((c) => (
          <button key={c.id} type="button" className="kartu kartu-cerita" onClick={() => onPilih(c.id)}>
            <span className="nomor" aria-hidden="true">
              {c.nomor}
            </span>
            {c.nama}
          </button>
        ))}
      </div>
    </section>
  )
}

