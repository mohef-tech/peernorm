import { useEffect, useRef, useState } from 'react'
import { LATIHAN, acakOpsi, type Soal } from '../data/latihan'
import { TEKS } from '../data/teks'
import { hentikanNarasi, putarNarasi } from '../engine/audio'

const SAMPUL_MS = 2500
const JEDA_PILIHAN_MS = 400

const BASE_CERITA = `${import.meta.env.BASE_URL}assets/img/cerita/`
const BASE_LATIHAN = `${import.meta.env.BASE_URL}assets/img/latihan/`

export function Latihan({
  langsungSoal = false,
  onSelesai,
  onKembali,
}: {
  langsungSoal?: boolean
  onSelesai: (benar: number) => void
  onKembali?: () => void
}) {
  const [sampul, setSampul] = useState(!langsungSoal)
  const [idx, setIdx] = useState(0)
  const [benar, setBenar] = useState(0)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})

  const tandaiGagal = (id: string) => setGagal((s) => (s[id] ? s : { ...s, [id]: true }))

  const handleKembali = () => {
    hentikanNarasi()
    if (onKembali) {
      onKembali()
    } else {
      document.querySelector<HTMLButtonElement>('.tombol-beranda')?.click()
    }
  }

  useEffect(() => {
    if (!sampul) return
    const t = window.setTimeout(() => setSampul(false), SAMPUL_MS)
    return () => window.clearTimeout(t)
  }, [sampul])

  if (sampul) {
    return (
      <section className="layar layar-latihan-panggung">
        {!gagal.latar && (
          <img
            className="layar-latihan-latar"
            src={`${BASE_CERITA}latar-cerita.webp`}
            alt=""
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('latar')
            }}
          />
        )}
        <h1 className="layar-latihan-sampul-judul">{TEKS.latihan.sampul}</h1>
      </section>
    )
  }

  const jawab = (ok: boolean) => {
    hentikanNarasi()
    const n = benar + (ok ? 1 : 0)
    if (idx === LATIHAN.length - 1) return onSelesai(n)
    setBenar(n)
    setIdx(idx + 1)
  }

  const mundur = () => {
    hentikanNarasi()
    if (idx > 0) setIdx(idx - 1)
  }

  return (
    <SoalLatihan
      key={idx}
      nomor={idx + 1}
      soal={LATIHAN[idx]}
      onJawab={jawab}
      onMundur={mundur}
      onKembali={handleKembali}
      gagalProps={{ gagal, tandaiGagal }}
    />
  )
}

function SoalLatihan({
  nomor,
  soal,
  onJawab,
  onMundur,
  onKembali,
  gagalProps,
}: {
  nomor: number
  soal: Soal
  onJawab: (benar: boolean) => void
  onMundur: () => void
  onKembali: () => void
  gagalProps: { gagal: Record<string, boolean>; tandaiGagal: (id: string) => void }
}) {
  const [opsi] = useState(() => acakOpsi(soal))
  const [terpilih, setTerpilih] = useState<number | null>(null)
  const [sedangPutar, setSedangPutar] = useState(false)
  const timerPilih = useRef<number>(0)
  const { gagal, tandaiGagal } = gagalProps

  useEffect(() => {
    setSedangPutar(false)
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    return () => {
      window.clearTimeout(timerPilih.current)
      hentikanNarasi()
    }
  }, [soal.id])

  const tanganiPilih = (indeks: number, isBenar: boolean) => {
    if (terpilih !== null) return
    setTerpilih(indeks)
    hentikanNarasi()
    timerPilih.current = window.setTimeout(() => {
      onJawab(isBenar)
    }, JEDA_PILIHAN_MS)
  }

  const handleAudio = () => {
    if (sedangPutar) {
      hentikanNarasi()
      setSedangPutar(false)
      return
    }
    setSedangPutar(true)
    putarNarasi(soal.id, () => setSedangPutar(false))
  }

  const getGambarOpsi = (isBenar: boolean) =>
    isBenar ? 'opsi-respon-1.webp' : 'opsi-respon-2.webp'

  return (
    <section className="layar layar-latihan-panggung">
      {/* Layer 1: Latar Belakang Reusable */}
      {!gagal.latar && (
        <img
          className="layar-latihan-latar"
          src={`${BASE_CERITA}latar-cerita.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar')
          }}
        />
      )}

      {/* Layer 2: Banner Judul Atas */}
      {!gagal.banner ? (
        <img
          className="layar-latihan-banner"
          src={`${BASE_LATIHAN}banner-judul-latihan.webp`}
          alt={soal.tanya}
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('banner')
          }}
        />
      ) : (
        <h1 className="layar-latihan-tanya-fallback">{soal.tanya}</h1>
      )}

      {/* Layer 3: Dua Kartu Respon (Acak dari latihan.ts) */}
      <div className="layar-latihan-grup-kartu">
        {opsi.map((o, i) => {
          const statePilih = terpilih === i ? 'dipilih' : ''
          const keyOpsi = `opsi-${soal.id}-${i}`
          const gambarGagal = gagal[keyOpsi]
          const fileOpsi = `${BASE_LATIHAN}${getGambarOpsi(o.benar)}`

          return (
            <button
              key={i}
              type="button"
              className={`layar-latihan-kartu-opsi ${statePilih}`.trim()}
              disabled={terpilih !== null}
              onClick={() => tanganiPilih(i, o.benar)}
              aria-label={o.teks}
            >
              {!gambarGagal ? (
                <img
                  className="layar-latihan-opsi-img"
                  src={fileOpsi}
                  alt={o.teks}
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    tandaiGagal(keyOpsi)
                  }}
                />
              ) : (
                <div className="layar-latihan-kartu-fallback">{o.teks}</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Layer 5 Kiri Bawah: Tombol Panah Navigasi Kiri */}
      <button
        type="button"
        className="layar-latihan-nav-btn layar-latihan-nav-kiri"
        onClick={nomor > 1 ? onMundur : onKembali}
        disabled={terpilih !== null}
        aria-label="Sebelumnya"
      >
        {!gagal['nav-kiri'] ? (
          <img
            className="layar-latihan-nav-kiri-img"
            src={`${BASE_CERITA}tombol-nav-kiri.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('nav-kiri')
            }}
          />
        ) : (
          <span className="layar-latihan-fallback-kotak">{'<<'}</span>
        )}
      </button>

      {/* Layer 5 Kanan Bawah (Samping Panah Kanan): Tombol Ikon Audio */}
      <button
        type="button"
        className="layar-latihan-audio-btn"
        aria-label="Dengarkan soal"
        aria-pressed={sedangPutar}
        onClick={handleAudio}
      >
        {!gagal.audio ? (
          <img
            className="layar-latihan-audio-img"
            src={`${BASE_CERITA}ikon-audio.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('audio')
            }}
          />
        ) : (
          <span className="layar-latihan-fallback-kotak">Audio</span>
        )}
      </button>

      {/* Layer 5 Kanan Bawah: Tombol Panah Navigasi Kanan */}
      <button
        type="button"
        className="layar-latihan-nav-btn layar-latihan-nav-kanan"
        onClick={() => onJawab(false)}
        disabled={terpilih !== null}
        aria-label="Berikutnya"
      >
        {!gagal['nav-kanan'] ? (
          <img
            className="layar-latihan-nav-kanan-img"
            src={`${BASE_CERITA}tombol-nav-kanan.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('nav-kanan')
            }}
          />
        ) : (
          <span className="layar-latihan-fallback-kotak">{'>>'}</span>
        )}
      </button>
    </section>
  )
}
