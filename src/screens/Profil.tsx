import { IkonBintang } from '../components/Bintang'
import { IkonSuara } from '../components/IkonSuara'
import { PROFIL, type ProfilId } from '../data/profil'
import { TEKS } from '../data/teks'
import type { Total } from '../engine/storage'

// S03: memilih (bukan mengetik) satu dari 3 profil; total tiap profil tampil di tombolnya (PRD A1, §8 #6).
export function Profil({ total, onPilih }: { total: Total; onPilih: (id: ProfilId) => void }) {
  return (
    <section className="layar">
      {/* Avatar dari klien belum ada; tidak dibuat pengganti bergambar. */}
      <div className="judul-dengan-suara">
        <h1>{TEKS.sapaan}</h1>
        <IkonSuara id="profil" />
      </div>
      <div className="daftar-profil">
        {PROFIL.map((p) => (
          <button key={p.id} type="button" className="tombol tombol-utama tombol-profil" onClick={() => onPilih(p.id)}>
            <span>{p.label}</span>
            <span className="total-profil" aria-label={`${total[p.id]} bintang`}>
              <IkonBintang />
              {total[p.id]}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

