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

const BASE_CERITA = `${import.meta.env.BASE_URL}assets/img/cerita/`
const BASE_LATIHAN = `${import.meta.env.BASE_URL}assets/img/latihan/`
const BASE_HASIL = `${import.meta.env.BASE_URL}assets/img/hasil-latihan/`

// Pemetaan aset adegan & banner khusus Halaman 1/4 (indeks 0) dan Halaman 2/4 (indeks 1)
const ADEGAN_FILES = ['adegan-cerita.webp', 'adegan-cerita2.webp'] as const
const BANNER_FILES = ['banner-judul.webp', 'banner-judul8.webp'] as const

const KANDIDAT_LENCANA_HEBAT = [
  `${BASE_HASIL}lencana-hebat.webp`,
  `${BASE_HASIL}lencana-hebat.png`,
  `${BASE_CERITA}lencana-hebat.webp`,
  `${BASE_CERITA}lencana-hebat.png`,
  `${BASE_LATIHAN}lencana-hebat.webp`,
] as const

const KANDIDAT_KOTAK_UMPAN_BALIK = [
  `${BASE_HASIL}kotak-umpan-balik.webp`,
  `${BASE_HASIL}kotak-umpan-balik.png`,
  `${BASE_CERITA}kotak-umpan-balik.webp`,
  `${BASE_CERITA}kotak-umpan-balik.png`,
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

  const langkah = cerita.langkah[indeksHalaman]
  const tampil = ulang && langkah.jenis === 'pilihan' ? langkah.ulang : langkah

  // Isolasi mode render per tahap halaman:
  // - modeAdegan: Slide 7 & 8 (Adegan Cerita 1/4 & 2/4)
  // - modePilihan: Slide 9 (Kuis Pilihan Respon 3/4)
  // - modeUlang: Slide 11 (Konsekuensi / Coba Lagi)
  // - modeHebat: Slide 10 (Umpan Balik Bintang 4/4)
  // - modeSelesai: Slide 12 (Cerita Selesai / Apresiasi Akhir)
  const modeAdegan = langkah.jenis === 'narasi'
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

    // Putar otomatis narasi saat berada di layar konsekuensi (Slide 11), apresiasi (Slide 10), atau selesai (Slide 12)
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

    // Jika sedang di Slide 12 ('selesai'), panah kanan menyimpan bintang reward dan kembali ke Menu Cerita (S06)
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

  // Tombol "Ulangi" di Slide 11: reset cerita kembali ke Halaman 1 (Slide 7, indeksHalaman = 0)
  const handleUlangi = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    setUlang(false)
    setOpsiTerpilih(null)
    setIndeksHalaman(0)
  }

  // Aksi Tombol "Menu Cerita" di Slide 12
  const handleMenuCerita = () => {
    window.clearTimeout(timerPilih.current)
    hentikanNarasi()
    onSelesai(cerita.id)
    onMenuCerita()
  }

  // Aksi Tombol "Ke cerita lain" di Slide 12
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

  // Aset adegan & banner khusus Halaman 1/4 (indeks 0) dan Halaman 2/4 (indeks 1)
  const adeganImg = ADEGAN_FILES[indeksHalaman] ?? ADEGAN_FILES[ADEGAN_FILES.length - 1]
  const bannerImg = BANNER_FILES[indeksHalaman]
  const keyBanner = `banner-${indeksHalaman}`
  const punyaBannerBawaan =
    modeAdegan && id === 'giliran' && Boolean(bannerImg) && !gagal[keyBanner]

  // Di Halaman 4/4 ('hebat') cerita 'giliran', teks apresiasi sudah menyatu di kotak-umpan-balik
  const pakaiKotakUmpanBalik = modeHebat && id === 'giliran' && !gagal['kotak-umpan-balik']

  // Di Slide 12 ('selesai') cerita 'giliran', teks kesimpulan sudah tertanam di kotak-selesai.webp
  const pakaiTeksBawaanKotakSelesai =
    modeSelesai && id === 'giliran' && !gagal['kotak-selesai']

  // Latar konsekuensi khusus Slide 11 (memuat latar kelas + karakter anak cemberut di kiri)
  const pakaiLatarKonsekuensi = modeUlang && !gagal['latar-konsekuensi']

  // Tombol panah kanan AKTIF di Slide 7, 8 (modeAdegan), Slide 10 (modeHebat), dan Slide 12 (modeSelesai);
  // DIHILANGKAN di Slide 9 (modePilihan) & Slide 11 (modeUlang)
  const tampilNavKanan = (modeAdegan || modeHebat || modeSelesai) && !ulang
  // Tombol panah kiri tampil di Slide 8, 9, 10; disembunyikan di Slide 7, Slide 11 (modeUlang), dan Slide 12 (modeSelesai)
  const tampilNavKiri = indeksHalaman > 0 && !modeUlang && !modeSelesai

  return (
    <section className="layar layar-cerita-panggung">
      {/* Layer 1: Latar Panggung (latar-konsekuensi.webp saat Slide 11 aktif, atau latar-cerita.webp) */}
      {pakaiLatarKonsekuensi ? (
        <img
          className="layar-cerita-konsekuensi-latar"
          src={`${BASE_CERITA}latar-konsekuensi.webp`}
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
            src={`${BASE_CERITA}latar-cerita.webp`}
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
          HALAMAN 1/4 & 2/4: ADEGAN CERITA BERGAMBAR NORMAL (SLIDE 7 & 8)
          ========================================================= */}
      {modeAdegan && (
        <>
          <div className={`cerita-wadah-adegan cerita-adegan-langkah-${indeksHalaman}`}>
            <Adegan
              key={`${id}-${indeksHalaman}-${adeganImg}`}
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
          HALAMAN 3/4: KUIS PILIHAN RESPON INTERAKTIF (SLIDE 9 CANVA)
          Terisolasi penuh tanpa adegan 2 di belakangnya & tanpa nav kanan
          ========================================================= */}
      {modePilihan && langkah.jenis === 'pilihan' && (
        <>
          {!gagal['banner-pilihan'] ? (
            <img
              className="layar-latihan-banner"
              src={`${BASE_LATIHAN}banner-judul-latihan.webp`}
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
                  utama={`${BASE_LATIHAN}opsi-respon-1.webp`}
                  cadangan={`${BASE_LATIHAN}opsi-respon-1.webp.webp`}
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
                  utama={`${BASE_LATIHAN}opsi-respon-2.webp`}
                  cadangan={`${BASE_LATIHAN}opsi-respon-2.webp.webp`}
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
          SLIDE 11 CANVA: LAYAR KONSEKUENSI / COBA LAGI (CABANG KELIRU)
          Mandiri tanpa menimpa kuis: balon konsekuensi + tombol ulangi ke Hal 1
          ========================================================= */}
      {modeUlang && (
        <>
          {!gagal['balon-konsekuensi'] && id === 'giliran' ? (
            <>
              <img
                className="layar-cerita-konsekuensi-balon"
                src={`${BASE_CERITA}balon-konsekuensi.webp`}
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
            className="layar-cerita-konsekuensi-ulangi-btn"
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
          HALAMAN 4/4: UMPAN BALIK APRESIASI BINTANG (SLIDE 10 CANVA)
          Terisolasi bersih: Lencana bintang di atas & kotak umpan balik di bawah
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
              kandidat={KANDIDAT_KOTAK_UMPAN_BALIK}
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
          SLIDE 12 CANVA: LAYAR CERITA SELESAI / APRESIASI AKHIR
          Pita atas + Kado terbuka tengah + Kotak kesimpulan bawah + 2 Tombol Kiri
          ========================================================= */}
      {modeSelesai && (
        <>
          {/* Layer 3: Pita Judul Atas ("Cerita Selesai") */}
          {!gagal['pita-selesai'] ? (
            <img
              className="layar-cerita-selesai-pita"
              src={`${BASE_CERITA}pita-cerita-selesai.webp`}
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

          {/* Layer 3: Ilustrasi Kado Terbuka di Tengah Panggung */}
          {!gagal['kado-terbuka'] && (
            <img
              className="layar-cerita-selesai-kado"
              src={`${BASE_CERITA}kado-terbuka.webp`}
              alt=""
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('kado-terbuka')
              }}
            />
          )}

          {/* Layer 2: Kotak Teks Kesimpulan di Bawah Tengah */}
          {pakaiTeksBawaanKotakSelesai && (
            <img
              className="layar-cerita-selesai-kotak"
              src={`${BASE_CERITA}kotak-selesai.webp`}
              alt=""
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                tandaiGagal('kotak-selesai')
              }}
            />
          )}

          {/* Layer 4: Teks Kesimpulan (sr-only bila tertanam di kotak-selesai.webp, atau tampil jelas) */}
          <p
            className={
              pakaiTeksBawaanKotakSelesai
                ? 'cerita-sr-only'
                : 'layar-cerita-selesai-teks'
            }
          >
            {tampil.teks}
          </p>

          {/* Layer 5 Kiri Bawah: 2 Tombol Aksi Disusun Vertikal */}
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
                  src={`${BASE_CERITA}tombol-menu-cerita.webp`}
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
                  src={`${BASE_CERITA}tombol-cerita-lain.webp`}
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

      {/* Layer 5 Kanan Bawah: Tombol Ikon Audio */}
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

      {/* Layer 5 Kanan Bawah: Tombol Panah Navigasi Kanan */}
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

      {/* Layer 4 Kiri Bawah: Tombol Panah Navigasi Mundur */}
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

      {/* Tombol Beranda (Kiri Atas -> Kembali ke S04 Menu Utama, disembunyikan di Slide 12 agar sesuai acuan Canva) */}
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
  alt,
  onGagal,
}: {
  utama: string
  cadangan: string
  alt: string
  onGagal: () => void
}) {
  const [src, setSrc] = useState(utama)

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
