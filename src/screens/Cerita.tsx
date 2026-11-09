import { useEffect, useRef, useState } from 'react'
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

const JEDA_PILIH_MS = 400

const BASE_ROOT_CERITA = `${import.meta.env.BASE_URL}assets/img/cerita/`
const BASE_LATIHAN = `${import.meta.env.BASE_URL}assets/img/latihan/`
const BASE_HASIL = `${import.meta.env.BASE_URL}assets/img/hasil-latihan/`

// Konfigurasi aset dinamis per ID cerita (mendukung Cerita 1 & Cerita 2)
const KONFIG_CERITA = {
  giliran: {
    base: `${import.meta.env.BASE_URL}assets/img/cerita/`,
    latar: 'latar-cerita.webp',
    adegan: ['adegan-cerita.webp', 'adegan-cerita2.webp'],
    banner: ['banner-judul.webp', 'banner-judul8.webp'],
    bannerKuis: `${BASE_LATIHAN}banner-judul-latihan.webp`,
    opsi1: `${BASE_LATIHAN}opsi-respon-1.webp`,
    opsi2: `${BASE_LATIHAN}opsi-respon-2.webp`,
    latarUlang: 'latar-konsekuensi.webp',
    balonUlang: 'balon-konsekuensi.webp',
    kotakSelesai: 'kotak-selesai.webp',
  },
  berbagi: {
    base: `${import.meta.env.BASE_URL}assets/img/cerita/berbagi/`,
    latar: 'latar-kelas-hijau.webp',
    adegan: ['adegan-1.webp', 'adegan-2.webp', 'adegan-3.webp', 'adegan-4.webp'],
    banner: ['banner-judul-1.webp', 'banner-judul-2.webp', 'banner-judul-3.webp', 'banner-judul-4.webp'],
    bannerKuis: `${import.meta.env.BASE_URL}assets/img/cerita/berbagi/banner-kuis.webp`,
    opsi1: `${import.meta.env.BASE_URL}assets/img/cerita/berbagi/opsi-respon-1.webp`,
    opsi2: `${import.meta.env.BASE_URL}assets/img/cerita/berbagi/opsi-respon-2.webp`,
    latarUlang: 'latar-konsekuensi.webp',
    balonUlang: 'balon-konsekuensi.webp',
    kotakSelesai: 'kotak-selesai.webp',
  },
  perubahan: {
    base: `${import.meta.env.BASE_URL}assets/img/cerita/perubahan/`,
    latar: 'latar-cerita.webp',
    adegan: [
      'adegan-1.webp', // Indeks 0 (Slide 21)
      'adegan-2.webp', // Indeks 1 (Slide 22)
      'adegan-3.webp', // Indeks 2 (Slide 23)
      '',              // Indeks 3 (Slide 24: Kuis Pilihan)
      '',              // Indeks 4 (Slide 25: Hebat / Bintang)
      'adegan-4.webp', // Indeks 5 (Slide 26: Adegan setuju main balok)
      'adegan-5.webp', // Indeks 6 (Slide 28: Adegan tos senang)
    ],
    banner: [
      'banner-judul-1.webp',
      'banner-judul-2.webp',
      'banner-judul-3.webp',
      '',
      '',
      'banner-judul-4.webp',
      'banner-judul-5.webp',
    ],
    bannerKuis: `${import.meta.env.BASE_URL}assets/img/cerita/perubahan/banner-kuis.webp`,
    opsi1: `${import.meta.env.BASE_URL}assets/img/cerita/perubahan/opsi-respon-1.webp`,
    opsi2: `${import.meta.env.BASE_URL}assets/img/cerita/perubahan/opsi-respon-2.webp`,
    latarUlang: 'latar-cerita.webp',
    balonUlang: 'balon-konsekuensi.webp',
    adeganUlang: 'adegan-konsekuensi.webp',
    kotakSelesai: 'kotak-selesai.webp',
  },
} as const

const KANDIDAT_LENCANA_HEBAT = [
  `${BASE_HASIL}lencana-hebat.webp`,
  `${BASE_HASIL}lencana-hebat.png`,
  `${BASE_ROOT_CERITA}lencana-hebat.webp`,
  `${BASE_ROOT_CERITA}lencana-hebat.png`,
  `${BASE_LATIHAN}lencana-hebat.webp`,
] as const

const KANDIDAT_KOTAK_UMPAN_BALIK = [
  `${BASE_HASIL}kotak-umpan-balik.webp`,
  `${BASE_HASIL}kotak-umpan-balik.png`,
  `${BASE_ROOT_CERITA}kotak-umpan-balik.webp`,
  `${BASE_ROOT_CERITA}kotak-umpan-balik.png`,
  `${BASE_LATIHAN}kotak-umpan-balik.webp`,
] as const

export function Cerita({ id, onSelesai, onMenuCerita, onCeritaLain, onKembali }: Props) {
  const cerita = CERITA.find((c) => c.id === id) ?? CERITA[0]
  const [indeksHalaman, setIndeksHalaman] = useState(0)
  const [ulang, setUlang] = useState(false)
  const [gagal, setGagal] = useState<Record<string, boolean>>({})
  const [sedangPutar, setSedangPutar] = useState(false)
  const [opsiTerpilih, setOpsiTerpilih] = useState<number | null>(null)
  const timerPilih = useRef<number>(0)

  const cfg = KONFIG_CERITA[id as keyof typeof KONFIG_CERITA] ?? KONFIG_CERITA.giliran
  const BASE_CERITA = cfg.base

  const langkah = cerita.langkah[indeksHalaman]
  const tampil = ulang && langkah.jenis === 'pilihan' ? langkah.ulang : langkah

  const modeAdegan = langkah.jenis === 'narasi' && !ulang
  const modePilihan = langkah.jenis === 'pilihan' && !ulang
  const modeUlang = langkah.jenis === 'pilihan' && ulang
  const modeHebat = langkah.jenis === 'hebat'
  const modeSelesai = langkah.jenis === 'selesai'

  const tandaiGagal = (assetId: string) =>
    setGagal((s) => (s[assetId] ? s : { ...s, [assetId]: true }))

  useEffect(() => {
    setSedangPutar(false)
    setOpsiTerpilih(null)
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()

    if (ulang || langkah.jenis === 'hebat' || langkah.jenis === 'selesai') {
      setSedangPutar(true)
      putarNarasi(tampil.id, () => setSedangPutar(false))
    }

    return () => {
      window.clearTimeout(timerPilih.current)
      hentikanNarasi()
    }
  }, [indeksHalaman, ulang, id, langkah.jenis, tampil.id])

  const maju = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()

    if (langkah.jenis === 'selesai') {
      onSelesai(cerita.id)
      onMenuCerita()
      return
    }

    const langkahBerikut = cerita.langkah[indeksHalaman + 1]
    if (!langkahBerikut) {
      onSelesai(cerita.id)
      onMenuCerita()
      return
    }

    if (langkahBerikut.jenis === 'hebat' || langkahBerikut.jenis === 'selesai') {
      onSelesai(cerita.id)
    }

    setIndeksHalaman(indeksHalaman + 1)
  }

  const mundur = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    if (ulang) {
      handleUlangi()
      return
    }
    if (indeksHalaman > 0) {
      setIndeksHalaman(indeksHalaman - 1)
    }
  }

  const handleUlangi = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    setUlang(false)
    setOpsiTerpilih(null)
    setIndeksHalaman(0)
  }

  const handleMenuCerita = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    onSelesai(cerita.id)
    onMenuCerita()
  }

  const handleCeritaLain = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    onSelesai(cerita.id)
    onCeritaLain()
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
    }, JEDA_PILIH_MS)
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

  const adeganImg = cfg.adegan[indeksHalaman] ?? cfg.adegan[cfg.adegan.length - 1]
  const bannerImg = cfg.banner[indeksHalaman]
  const keyBanner = `banner-${id}-${indeksHalaman}`
  const punyaBannerBawaan = modeAdegan && !modeUlang && Boolean(bannerImg) && !gagal[keyBanner]
  const punyaAdeganUlang = 'adeganUlang' in cfg && Boolean(cfg.adeganUlang)

  const pakaiKotakUmpanBalik = modeHebat && !gagal['kotak-umpan-balik']
  const pakaiTeksBawaanKotakSelesai = modeSelesai && !gagal['kotak-selesai']
  const pakaiLatarKonsekuensi = modeUlang && !gagal['latar-konsekuensi']

  const tampilNavKanan = (modeAdegan || modeHebat || modeSelesai) && !ulang
  const tampilNavKiri = indeksHalaman > 0 && !modeUlang && !modeSelesai

  return (
    <section className="layar layar-cerita-panggung">
      {/* Layer 1: Latar Panggung */}
      {pakaiLatarKonsekuensi ? (
        <img
          className="layar-cerita-konsekuensi-latar"
          src={`${BASE_CERITA}${cfg.latarUlang}`}
          alt=""
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            tandaiGagal('latar-konsekuensi')
          }}
        />
      ) : (
        !gagal.latar && (
          <img
            className="cerita-latar"
            src={`${BASE_CERITA}${cfg.latar}`}
            alt=""
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              tandaiGagal('latar')
            }}
          />
        )
      )}

      {/* =========================================================
          ADEGAN CERITA BERGAMBAR NORMAL
          ========================================================= */}
      {modeAdegan && (
        <>
          <div className={`cerita-wadah-adegan cerita-adegan-langkah-${indeksHalaman}`}>
            <Adegan
              key={`${id}-${indeksHalaman}-${adeganImg}`}
              basePath={BASE_CERITA}
              imgSrc={adeganImg}
              altSrc={`${tampil.id}.webp`}
              onGagal={() => tandaiGagal(`adegan-${indeksHalaman}`)}
            />
          </div>

          {punyaBannerBawaan && bannerImg && (
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

          <h1 className={punyaBannerBawaan ? 'cerita-sr-only' : 'cerita-teks-judul'}>
            {cerita.judul}
          </h1>

          {tampil.teks && (
            <p className={punyaBannerBawaan ? 'cerita-sr-only' : 'cerita-teks-narasi'}>
              {tampil.teks}
            </p>
          )}
        </>
      )}

      {/* =========================================================
          KUIS PILIHAN RESPON INTERAKTIF
          ========================================================= */}
      {modePilihan && langkah.jenis === 'pilihan' && (
        <>
          {!gagal['banner-pilihan'] ? (
            <img
              className="layar-latihan-banner"
              src={cfg.bannerKuis}
              alt={langkah.teks || cerita.judul}
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('banner-pilihan')
              }}
            />
          ) : (
            <h1 className="layar-latihan-tanya-fallback">{langkah.teks || cerita.judul}</h1>
          )}

          <div className="layar-latihan-grup-kartu">
            <button
              type="button"
              className={`layar-latihan-kartu-opsi ${opsiTerpilih === 0 ? 'dipilih' : ''}`.trim()}
              disabled={opsiTerpilih !== null}
              aria-label={langkah.benar}
              onClick={() => pilihRespon(0, true)}
            >
              {!gagal['opsi-1'] ? (
                <GambarOpsi
                  utama={cfg.opsi1}
                  cadangan={cfg.opsi1}
                  alt={langkah.benar}
                  onGagal={() => tandaiGagal('opsi-1')}
                />
              ) : (
                <div className="layar-latihan-kartu-fallback">{langkah.benar}</div>
              )}
            </button>

            <button
              type="button"
              className={`layar-latihan-kartu-opsi ${opsiTerpilih === 1 ? 'dipilih' : ''}`.trim()}
              disabled={opsiTerpilih !== null}
              aria-label={langkah.salah}
              onClick={() => pilihRespon(1, false)}
            >
              {!gagal['opsi-2'] ? (
                <GambarOpsi
                  utama={cfg.opsi2}
                  cadangan={cfg.opsi2}
                  alt={langkah.salah}
                  onGagal={() => tandaiGagal('opsi-2')}
                />
              ) : (
                <div className="layar-latihan-kartu-fallback">{langkah.salah}</div>
              )}
            </button>
          </div>
        </>
      )}

      {/* =========================================================
          LAYAR KONSEKUENSI / COBA LAGI (CABANG KELIRU)
          ========================================================= */}
      {modeUlang && (
        <>
          {/* Ilustrasi adegan jika ada (khusus Cerita 3: rebutan balok) */}
          {punyaAdeganUlang && 'adeganUlang' in cfg && (
            <div className="cerita-wadah-adegan layar-cerita-konsekuensi-adegan">
              <img
                className="cerita-item cerita-adegan-img"
                src={`${BASE_CERITA}${cfg.adeganUlang}`}
                alt=""
                fetchPriority="high"
              />
            </div>
          )}

          {!gagal['balon-konsekuensi'] ? (
            <>
              <img
                className={`layar-cerita-konsekuensi-balon ${
                  punyaAdeganUlang ? 'layar-cerita-konsekuensi-balon-tengah' : ''
                }`.trim()}
                src={`${BASE_CERITA}${cfg.balonUlang}`}
                alt=""
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  tandaiGagal('balon-konsekuensi')
                }}
              />
              <p className="cerita-sr-only">{tampil.teks}</p>
            </>
          ) : (
            <p className="layar-cerita-konsekuensi-balon-fallback">{tampil.teks}</p>
          )}

          <button
            type="button"
            className={`layar-cerita-konsekuensi-ulangi-btn ${
              punyaAdeganUlang ? 'layar-cerita-konsekuensi-ulangi-btn-tengah' : ''
            }`.trim()}
            onClick={handleUlangi}
            aria-label={TEKS.cerita.ulangi}
          >
            {!gagal['tombol-ulangi'] ? (
              <img
                className="layar-cerita-konsekuensi-ulangi-img"
                src={`${BASE_CERITA}tombol-ulangi.webp`}
                alt={TEKS.cerita.ulangi}
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  tandaiGagal('tombol-ulangi')
                }}
              />
            ) : (
              <span className="layar-cerita-konsekuensi-ulangi-fallback">
                {TEKS.cerita.ulangi}
              </span>
            )}
          </button>
        </>
      )}

      {/* =========================================================
          UMPAN BALIK APRESIASI BINTANG (HEBAT)
          ========================================================= */}
      {modeHebat && (
        <>
          {!gagal['lencana-hebat'] ? (
            <GambarKandidat
              kandidat={KANDIDAT_LENCANA_HEBAT}
              className="layar-cerita-hebat-lencana"
              alt="Hebat!"
              onGagal={() => tandaiGagal('lencana-hebat')}
            />
          ) : (
            <h1 className="cerita-teks-judul">Hebat!</h1>
          )}

          {pakaiKotakUmpanBalik && (
            <GambarKandidat
              kandidat={[
                `${BASE_CERITA}kotak-umpan-balik.webp`,
                ...KANDIDAT_KOTAK_UMPAN_BALIK,
              ]}
              className="layar-cerita-hebat-kotak"
              alt=""
              onGagal={() => tandaiGagal('kotak-umpan-balik')}
            />
          )}

          <p className={pakaiKotakUmpanBalik ? 'cerita-sr-only' : 'cerita-teks-narasi'}>
            {tampil.teks}
          </p>
        </>
      )}

      {/* =========================================================
          LAYAR CERITA SELESAI / APRESIASI AKHIR
          ========================================================= */}
      {modeSelesai && (
        <>
          {!gagal['pita-selesai'] ? (
            <img
              className="layar-cerita-selesai-pita"
              src={`${BASE_ROOT_CERITA}pita-cerita-selesai.webp`}
              alt="Cerita Selesai"
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('pita-selesai')
              }}
            />
          ) : (
            <h1 className="layar-cerita-selesai-pita-fallback">Cerita Selesai</h1>
          )}

          {!gagal['kado-terbuka'] && (
            <img
              className="layar-cerita-selesai-kado"
              src={`${BASE_ROOT_CERITA}kado-terbuka.webp`}
              alt=""
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('kado-terbuka')
              }}
            />
          )}

          {pakaiTeksBawaanKotakSelesai && (
            <img
              className="layar-cerita-selesai-kotak"
              src={`${BASE_CERITA}${cfg.kotakSelesai}`}
              alt=""
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('kotak-selesai')
              }}
            />
          )}

          <p
            className={
              pakaiTeksBawaanKotakSelesai
                ? 'cerita-sr-only'
                : 'layar-cerita-selesai-teks'
            }
          >
            {tampil.teks}
          </p>

          <div className="layar-cerita-selesai-grup-kiri">
            <button
              type="button"
              className="layar-cerita-selesai-aksi-btn"
              onClick={handleMenuCerita}
              aria-label={TEKS.cerita.menuCerita}
            >
              {!gagal['tombol-menu-cerita'] ? (
                <img
                  className="layar-cerita-selesai-aksi-img"
                  src={`${BASE_ROOT_CERITA}tombol-menu-cerita.webp`}
                  alt={TEKS.cerita.menuCerita}
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    tandaiGagal('tombol-menu-cerita')
                  }}
                />
              ) : (
                <span className="layar-cerita-selesai-aksi-fallback">
                  {TEKS.cerita.menuCerita}
                </span>
              )}
            </button>

            <button
              type="button"
              className="layar-cerita-selesai-aksi-btn"
              onClick={handleCeritaLain}
              aria-label={TEKS.cerita.ceritaLain}
            >
              {!gagal['tombol-cerita-lain'] ? (
                <img
                  className="layar-cerita-selesai-aksi-img"
                  src={`${BASE_ROOT_CERITA}tombol-cerita-lain.webp`}
                  alt={TEKS.cerita.ceritaLain}
                  fetchPriority="high"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    tandaiGagal('tombol-cerita-lain')
                  }}
                />
              ) : (
                <span className="layar-cerita-selesai-aksi-fallback">
                  {TEKS.cerita.ceritaLain}
                </span>
              )}
            </button>
          </div>
        </>
      )}

      {/* Layer Navigasi Audio & Panah */}
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
            src={`${BASE_ROOT_CERITA}ikon-audio.webp`}
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

      {tampilNavKanan && (
        <button
          type="button"
          className="cerita-tombol-navigasi cerita-tombol-navigasi-kanan"
          onClick={maju}
          aria-label={modeSelesai ? TEKS.cerita.menuCerita : 'Berikutnya'}
        >
          {!gagal['nav-kanan'] ? (
            <img
              className="cerita-item cerita-nav-kanan-img"
              src={`${BASE_ROOT_CERITA}tombol-nav-kanan.webp`}
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

      {tampilNavKiri && (
        <button
          type="button"
          className="cerita-tombol-navigasi cerita-tombol-navigasi-kiri"
          onClick={mundur}
          disabled={opsiTerpilih !== null}
          aria-label="Sebelumnya"
        >
          {!gagal['nav-kiri'] ? (
            <img
              className="cerita-nav-kiri-img"
              src={`${BASE_ROOT_CERITA}tombol-nav-kiri.webp`}
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

      {!modeSelesai && (
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
      )}
    </section>
  )
}

function Adegan({
  basePath,
  imgSrc,
  altSrc,
  onGagal,
}: {
  basePath: string
  imgSrc: string
  altSrc: string
  onGagal: () => void
}) {
  const [src, setSrc] = useState(`${basePath}${imgSrc}`)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSrc(`${basePath}${imgSrc}`)
    setError(false)
  }, [basePath, imgSrc])

  if (error) return null

  return (
    <img
      className="cerita-item cerita-adegan-img"
      src={src}
      alt=""
      fetchPriority="high"
      onError={() => {
        const kandidatAlt = `${basePath}${altSrc}`
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
  alt,
  onGagal,
}: {
  utama: string
  cadangan: string
  alt: string
  onGagal: () => void
}) {
  const [src, setSrc] = useState(utama)

  useEffect(() => {
    setSrc(utama)
  }, [utama])

  return (
    <img
      className="layar-latihan-opsi-img"
      src={src}
      alt={alt}
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

function GambarKandidat({
  kandidat,
  className,
  alt,
  onGagal,
}: {
  kandidat: readonly string[]
  className?: string
  alt: string
  onGagal: () => void
}) {
  const [idx, setIdx] = useState(0)

  return (
    <img
      className={className}
      src={kandidat[idx]}
      alt={alt}
      fetchPriority="high"
      onError={() => {
        if (idx + 1 < kandidat.length) {
          setIdx(idx + 1)
        } else {
          onGagal()
        }
      }}
    />
  )
}