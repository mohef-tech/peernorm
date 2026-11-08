import { useEffect, useRef, useState } from 'react'
import { Tombol } from '../components/Tombol'
import { CERITA, type CeritaId } from '../data/cerita'
import { TEKS } from '../data/teks'
import { hentikanNarasi, putarNarasi } from '../engine/audio'

type Props = {
  id: CeritaId
  onSelesai: (id: CeritaId) => void
  onMenuCerita: () => void
  onCeritaLain: () => void
  onKembali?: () => void
}

const BASE_CERITA = `${import.meta.env.BASE_URL}assets/img/cerita/`
const BASE_LATIHAN = `${import.meta.env.BASE_URL}assets/img/latihan/`

// Pemetaan aset adegan & banner per indeks langkah di dalam folder public/assets/img/cerita/
const ADEGAN_FILES = ['adegan-cerita.webp', 'adegan-cerita2.webp'] as const
const BANNER_FILES = ['banner-judul.webp', 'banner-judul8.webp'] as const

export function Cerita({ id, onSelesai, onMenuCerita, onCeritaLain, onKembali }: Props) {
  const cerita = CERITA.find((c) => c.id === id) ?? CERITA[0]
  const [i, setI] = useState(0)
  const [ulang, setUlang] = useState(false)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const [sedangPutar, setSedangPutar] = useState(false)
  const [opsiTerpilih, setOpsiTerpilih] = useState<number | null>(null)
  const timerPilih = useRef<number>(0)

  const langkah = cerita.langkah[i]
  const tampil = ulang && langkah.jenis === 'pilihan' ? langkah.ulang : langkah
  const sedangPilihan = langkah.jenis === 'pilihan' && !ulang

  const tandaiGagal = (assetId: string) => setGagal((s) => (s[assetId] ? s : { ...s, [assetId]: true }))

  useEffect(() => {
    setSedangPutar(false)
    setOpsiTerpilih(null)
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    return () => {
      window.clearTimeout(timerPilih.current)
      hentikanNarasi()
    }
  }, [i, ulang, id])

  const maju = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    if (cerita.langkah[i + 1]?.jenis === 'selesai') {
      onSelesai(cerita.id)
    }
    setI(i + 1)
  }

  const mundur = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    if (ulang) {
      setUlang(false)
      return
    }
    if (i > 0) setI(i - 1)
  }

  const pilihRespon = (indeks: number, benar: boolean) => {
    if (opsiTerpilih !== null) return
    setOpsiTerpilih(indeks)
    hentikanNarasi()
    timerPilih.current = window.setTimeout(() => {
      if (benar) {
        maju()
      } else {
        setUlang(true)
      }
    }, 350)
  }

  const handleKembali = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    if (onKembali) {
      onKembali()
    } else {
      document.querySelector<HTMLButtonElement>('.tombol-beranda')?.click()
    }
  }

  const handleAudio = () => {
    if (sedangPutar) {
      hentikanNarasi()
      setSedangPutar(false)
      return
    }
    setSedangPutar(true)
    putarNarasi(tampil.id, () => setSedangPutar(false))
  }

  // Pemilihan aset adegan & banner berdasarkan indeks langkah (S07 = indeks 0, S08 = indeks 1, dst.)
  const adeganImg = ADEGAN_FILES[i] ?? ADEGAN_FILES[ADEGAN_FILES.length - 1]
  const bannerImg = BANNER_FILES[i] ?? BANNER_FILES[BANNER_FILES.length - 1]
  const keyBanner = `banner-${i}`

  // Pada cerita 'giliran' langkah 0 (S07) & 1 (S08), teks judul dan narasi sudah menyatu di dalam banner-judul*.webp.
  const pakaiTeksBawaanBanner = id === 'giliran' && (i === 0 || i === 1) && !ulang && !gagal[keyBanner]
  // Pada langkah pilihan S09 ('giliran-pilih'), judul atas menyatu di dalam banner-judul-latihan.webp.
  const pakaiBannerPilihan = sedangPilihan && id === 'giliran' && !gagal['banner-pilihan']

  return (
    <section className="layar layar-cerita-panggung">
      {/* Layer 1: Latar Cerita Full Panggung (1920x1080) */}
      {!gagal.latar && (
        <img
          className="cerita-latar"
          src={`${BASE_CERITA}latar-cerita.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar')
          }}
        />
      )}

      {/* Layer 2: Ilustrasi Adegan Dinamis (tampil saat bukan mode kartu pilihan S09) */}
      {!sedangPilihan && (
        <div className={`cerita-wadah-adegan cerita-adegan-langkah-${i}`}>
          <Adegan
            key={`${id}-${i}-${adeganImg}`}
            imgSrc={adeganImg}
            altSrc={`${tampil.id}.webp`}
            onGagal={() => tandaiGagal(`adegan-${i}`)}
          />
        </div>
      )}

      {/* Layer 3A: Banner Judul Atas & Kotak Narasi Bawah (S07 & S08) */}
      {!sedangPilihan && !gagal[keyBanner] && (
        <img
          key={bannerImg}
          className="cerita-item cerita-banner"
          src={`${BASE_CERITA}${bannerImg}`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal(keyBanner)
          }}
        />
      )}

      {/* Layer 3B: Banner Judul Pilihan S09 ("Pilih respon yang tepat ya" dari folder latihan) */}
      {pakaiBannerPilihan && (
        <img
          className="cerita-item cerita-banner-pilihan"
          src={`${BASE_LATIHAN}banner-judul-latihan.webp`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('banner-pilihan')
          }}
        />
      )}

      {/* Teks Judul & Narasi Dinamis */}
      <h1
        className={
          pakaiTeksBawaanBanner || pakaiBannerPilihan ? 'cerita-sr-only' : 'cerita-teks-judul'
        }
      >
        {sedangPilihan ? langkah.teks || cerita.judul : cerita.judul}
      </h1>

      {!sedangPilihan && tampil.teks && (
        <p className={pakaiTeksBawaanBanner ? 'cerita-sr-only' : 'cerita-teks-narasi'}>
          {tampil.teks}
        </p>
      )}

      {/* Mode Pilihan Respon (S09: 2 Kartu Bergambar dari folder latihan) */}
      {sedangPilihan && langkah.jenis === 'pilihan' && (
        <div className="cerita-grup-opsi">
          <button
            type="button"
            className={`cerita-kartu-opsi ${opsiTerpilih === 0 ? 'dipilih' : ''}`}
            disabled={opsiTerpilih !== null}
            aria-label={langkah.benar}
            onClick={() => pilihRespon(0, true)}
          >
            {id === 'giliran' && !gagal['opsi-1'] ? (
              <GambarOpsi
                utama={`${BASE_LATIHAN}opsi-respon-1.webp`}
                cadangan={`${BASE_LATIHAN}opsi-respon-1.webp.webp`}
                onGagal={() => tandaiGagal('opsi-1')}
              />
            ) : (
              <span className="cerita-kartu-opsi-teks">{langkah.benar}</span>
            )}
          </button>

          <button
            type="button"
            className={`cerita-kartu-opsi ${opsiTerpilih === 1 ? 'dipilih' : ''}`}
            disabled={opsiTerpilih !== null}
            aria-label={langkah.salah}
            onClick={() => pilihRespon(1, false)}
          >
            {id === 'giliran' && !gagal['opsi-2'] ? (
              <GambarOpsi
                utama={`${BASE_LATIHAN}opsi-respon-2.webp`}
                cadangan={`${BASE_LATIHAN}opsi-respon-2.webp.webp`}
                onGagal={() => tandaiGagal('opsi-2')}
              />
            ) : (
              <span className="cerita-kartu-opsi-teks">{langkah.salah}</span>
            )}
          </button>
        </div>
      )}

      {/* Overlay Aksi Ulangi & Selesai */}
      {(ulang || langkah.jenis === 'selesai') && (
        <div className="cerita-overlay-aksi">
          {ulang && (
            <Tombol onClick={() => setUlang(false)}>{TEKS.cerita.ulangi}</Tombol>
          )}
          {langkah.jenis === 'selesai' && (
            <div className="baris-tombol">
              <Tombol varian="kedua" onClick={onMenuCerita}>
                {TEKS.cerita.menuCerita}
              </Tombol>
              <Tombol onClick={onCeritaLain}>{TEKS.cerita.ceritaLain}</Tombol>
            </div>
          )}
        </div>
      )}

      {/* Layer 4 Kanan Bawah: Tombol Ikon Audio */}
      <button
        type="button"
        className="cerita-tombol-audio"
        aria-label="Dengarkan narasi"
        aria-pressed={sedangPutar}
        onClick={handleAudio}
      >
        {!gagal.audio ? (
          <img
            className="cerita-item cerita-audio-img"
            src={`${BASE_CERITA}ikon-audio.webp`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('audio')
            }}
          />
        ) : (
          <span className="cerita-fallback-kotak">Audio</span>
        )}
      </button>

      {/* Layer 4 Kanan Bawah: Tombol Panah Navigasi Maju (S07, S08, S09, dst.) */}
      {langkah.jenis !== 'selesai' && !ulang && (
        <button
          type="button"
          className="cerita-tombol-navigasi cerita-tombol-navigasi-kanan"
          onClick={maju}
          aria-label="Berikutnya"
        >
          {!gagal['nav-kanan'] ? (
            <img
              className="cerita-item cerita-nav-kanan-img"
              src={`${BASE_CERITA}tombol-nav-kanan.webp`}
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('nav-kanan')
              }}
            />
          ) : (
            <span className="cerita-fallback-kotak">{'>>'}</span>
          )}
        </button>
      )}

      {/* Layer 4 Kiri Bawah: Tombol Panah Navigasi Mundur (Tampil di S08 & S09 / indeks > 0) */}
      {i > 0 && (
        <button
          type="button"
          className="cerita-tombol-navigasi cerita-tombol-navigasi-kiri"
          onClick={mundur}
          aria-label="Sebelumnya"
        >
          {!gagal['nav-kiri'] ? (
            <img
              className="cerita-nav-kiri-img"
              src={`${BASE_CERITA}tombol-nav-kiri.webp`}
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('nav-kiri')
              }}
            />
          ) : (
            <span className="cerita-fallback-kotak">{'<<'}</span>
          )}
        </button>
      )}

      {/* Tombol Beranda (Kiri Atas) */}
      <button
        type="button"
        className="cerita-tombol-beranda"
        onClick={handleKembali}
        aria-label={TEKS.beranda}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
    </section>
  )
}

function Adegan({
  imgSrc,
  altSrc,
  onGagal,
}: {
  imgSrc: string
  altSrc: string
  onGagal: () => void
}) {
  const [src, setSrc] = useState(`${BASE_CERITA}${imgSrc}`)
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <img
      className="cerita-item cerita-adegan-img"
      src={src}
      alt=""
      fetchPriority="high"
      onError={() => {
        const kandidatAlt = `${BASE_CERITA}${altSrc}`
        if (src !== kandidatAlt) {
          setSrc(kandidatAlt)
        } else {
          setError(true)
          onGagal()
        }
      }}
    />
  )
}

function GambarOpsi({
  utama,
  cadangan,
  onGagal,
}: {
  utama: string
  cadangan: string
  onGagal: () => void
}) {
  const [src, setSrc] = useState(utama)

  return (
    <img
      className="cerita-item cerita-opsi-img"
      src={src}
      alt=""
      fetchPriority="high"
      onError={() => {
        if (src !== cadangan) {
          setSrc(cadangan)
        } else {
          onGagal()
        }
      }}
    />
  )
}
