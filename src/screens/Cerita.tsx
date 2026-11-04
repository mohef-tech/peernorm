import { useState } from 'react'
import { IkonSuara } from '../components/IkonSuara'
import { KartuPilihan } from '../components/KartuPilihan'
import { Tombol } from '../components/Tombol'
import { CERITA, type CeritaId } from '../data/cerita'
import { TEKS } from '../data/teks'

type Props = {
  id: CeritaId
  onSelesai: (id: CeritaId) => void
  onMenuCerita: () => void
  onCeritaLain: () => void
}

// S07: menjalankan daftar langkah cerita (PRD §6). Remount lewat `key` saat ganti cerita.
export function Cerita({ id, onSelesai, onMenuCerita, onCeritaLain }: Props) {
  const cerita = CERITA.find((c) => c.id === id) ?? CERITA[0]
  const [i, setI] = useState(0)
  const [ulang, setUlang] = useState(false)
  const langkah = cerita.langkah[i]
  const tampil = ulang && langkah.jenis === 'pilihan' ? langkah.ulang : langkah

  const maju = () => {
    // Bintang cerita diberikan saat mencapai langkah `selesai` (PRD §6, §8 #1).
    if (cerita.langkah[i + 1]?.jenis === 'selesai') onSelesai(cerita.id)
    setI(i + 1)
  }

  return (
    <section className="layar layar-cerita">
      <Adegan id={tampil.id} />
      <p className="pita">{cerita.judul}</p>
      {tampil.hal && <p className="hal">{tampil.hal}</p>}

      <div className="panel-teks">
        {tampil.teks && <p>{tampil.teks}</p>}
        <IkonSuara id={tampil.id} />
      </div>

      {langkah.jenis === 'pilihan' && !ulang && (
        <KartuPilihan
          tandai
          opsi={[
            { teks: langkah.benar, benar: true },
            { teks: langkah.salah, benar: false },
          ]}
          onPilih={(benar) => (benar ? maju() : setUlang(true))}
        />
      )}

      {ulang && <Tombol onClick={() => setUlang(false)}>{TEKS.cerita.ulangi}</Tombol>}

      {langkah.jenis === 'selesai' && (
        <div className="baris-tombol">
          <Tombol varian="kedua" onClick={onMenuCerita}>
            {TEKS.cerita.menuCerita}
          </Tombol>
          <Tombol onClick={onCeritaLain}>{TEKS.cerita.ceritaLain}</Tombol>
        </div>
      )}

      {langkah.jenis === 'narasi' && i > 0 && <Panah arah="kiri" onClick={() => setI(i - 1)} />}
      {(langkah.jenis === 'narasi' || langkah.jenis === 'hebat') && <Panah arah="kanan" onClick={maju} />}
    </section>
  )
}

function Panah({ arah, onClick }: { arah: 'kiri' | 'kanan'; onClick: () => void }) {
  return (
    <button type="button" className={`panah panah-${arah}`} aria-label={arah === 'kiri' ? 'Sebelumnya' : 'Berikutnya'} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={arah === 'kiri' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// Gambar adegan dari klien; disembunyikan bila file belum ada. Teks naratif sudah tampil di panel, jadi alt kosong.
function Adegan({ id }: { id: string }) {
  const [gagal, setGagal] = useState<string | null>(null)
  if (gagal === id) return null
  return (
    <img
      key={id}
      className="adegan"
      src={`${import.meta.env.BASE_URL}assets/img/${id}.webp`}
      alt=""
      width={1920}
      height={1080}
      fetchPriority="high"
      onError={() => setGagal(id)}
    />
  )
}

