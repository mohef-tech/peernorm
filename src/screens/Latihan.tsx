import { useEffect, useRef, useState } from 'react'
import { LATIHAN, type Soal } from '../data/latihan'
import { hentikanNarasi, putarNarasi } from '../engine/audio'

const SAMPUL_MS = 2500
const JEDA_PILIHAN_MS = 400

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
      <section className="layar modul-latihan-panggung">
        {!gagal.sampul ? (
          <img
            className="modul-latihan-latar"
            src={`${BASE_LATIHAN}sampul-latihan.webp`}
            alt="Latihan"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('sampul')
            }}
          />
        ) : (
          <h1 className="modul-latihan-sampul-judul">LATIHAN</h1>
        )}
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
  const [terpilih, setTerpilih] = useState<number | null>(null)
  const [sedangPutar, setSedangPutar] = useState(false)
  const timerPilih = useRef<number>(0)
  const { gagal, tandaiGagal } = gagalProps

  useEffect(() => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()

    // Langsung putar narasi pertanyaan begitu soal tampil di layar
    setSedangPutar(true)
    putarNarasi(soal.id, () => setSedangPutar(false))

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

  // Soal 1, 4 memiliki latar tersendiri; Soal 3 mengikuti latar Soal 2
  const namaLatar = nomor === 3 ? 'latar-latihan-2.webp' : `latar-latihan-${nomor}.webp`
  const latarFile = `${BASE_LATIHAN}${namaLatar}`
  const bannerFile = `${BASE_LATIHAN}banner-soal-${nomor}.webp`

  return (
    <section className="layar modul-latihan-panggung">
      {/* Layer 1: Latar Belakang Spesifik per Soal */}
      {!gagal[`latar-${nomor}`] && (
        <img
          className="modul-latihan-latar"
          src={latarFile}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal(`latar-${nomor}`)
          }}
        />
      )}

      {/* Layer 2: Banner Soal Atas */}
      {!gagal[`banner-${nomor}`] ? (
        <>
          <img
            className="modul-latihan-banner"
            src={bannerFile}
            alt={soal.tanya}
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal(`banner-${nomor}`)
            }}
          />
          {nomor === 3 && (
            <p className="modul-latihan-tanya-soal3">{soal.tanya}</p>
          )}
        </>
      ) : (
        <h1 className="modul-latihan-tanya-fallback">{soal.tanya}</h1>
      )}

      {/* Khusus Soal 3: Adegan Situasi Bermain Balok */}
      {nomor === 3 && !gagal['adegan-3'] && (
        <img
          className="modul-latihan-adegan-tengah"
          src={`${BASE_LATIHAN}adegan-soal-3.webp`}
          alt="Situasi bermain balok"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('adegan-3')
          }}
        />
      )}

      {/* Layer 3: Dua Kartu Respon */}
      <div className="modul-latihan-grup-kartu">
        {[
          { teks: soal.benar, benar: true },
          { teks: soal.salah, benar: false },
        ].map((o, i) => {
          const statePilih = terpilih === i ? 'dipilih' : ''
          const keyOpsi = `opsi-${soal.id}-${i}`
          const gambarGagal = gagal[keyOpsi]
          const fileOpsi = `${BASE_LATIHAN}opsi-${nomor}-${i + 1}.webp`

          return (
            <button
              key={i}
              type="button"
              className={`modul-latihan-kartu-opsi ${statePilih}`.trim()}
              disabled={terpilih !== null}
              onClick={() => tanganiPilih(i, o.benar)}
              aria-label={o.teks}
            >
              {!gambarGagal ? (
                <img
                  className="modul-latihan-opsi-img"
                  src={fileOpsi}
                  alt={o.teks}
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    tandaiGagal(keyOpsi)
                  }}
                />
              ) : (
                <div className="modul-latihan-kartu-fallback">{o.teks}</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Layer 4: Tombol Beranda Kiri Atas */}
      <button
        type="button"
        className="cerita-tombol-beranda"
        onClick={onKembali}
        aria-label="Kembali ke Beranda"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      {/* Layer 5: Tombol Audio Kanan Bawah */}
      <button
        type="button"
        className="modul-latihan-audio-btn"
        aria-label="Dengarkan soal"
        aria-pressed={sedangPutar}
        onClick={handleAudio}
      >
        {!gagal.audio ? (
          <img
            className="modul-latihan-audio-img"
            src={`${BASE_LATIHAN}ikon-audio.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('audio')
            }}
          />
        ) : (
          <span className="modul-latihan-fallback-kotak">Audio</span>
        )}
      </button>
    </section>
  )
}