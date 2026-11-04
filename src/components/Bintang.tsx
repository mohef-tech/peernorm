// Bintang adalah mata uang hadiah di PRD §8, jadi ikon bintang di sini bermakna, bukan hiasan.
const BENTUK = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z'

export function IkonBintang({ terisi = true }: { terisi?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`ikon-bintang ${terisi ? 'terisi' : ''}`} aria-hidden="true">
      <path d={BENTUK} />
    </svg>
  )
}

// Slot bintang di Hadiah: terisi = bintangSesi (maks 7).
export function Bintang({ terisi, slot = 7 }: { terisi: number; slot?: number }) {
  return (
    <div className="baris-bintang" role="img" aria-label={`${terisi} dari ${slot} bintang`}>
      {Array.from({ length: slot }, (_, i) => (
        <IkonBintang key={i} terisi={i < terisi} />
      ))}
    </div>
  )
}

// Counter total profil (Profil, Menu).
export function PenghitungBintang({ total }: { total: number }) {
  return (
    <p className="penghitung" aria-label={`Total ${total} bintang`}>
      <IkonBintang />
      <span>{total}</span>
    </p>
  )
}

