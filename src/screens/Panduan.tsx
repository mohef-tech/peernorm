import { useState } from 'react'
import { Tombol } from '../components/Tombol'
import { PANDUAN } from '../data/panduan'
import { TEKS } from '../data/teks'

type Props = {
  onReset: () => void
}

// S13: 1 halaman teks tips pendampingan (PRD §5, Lampiran A.6). Navigasi kembali ke Menu lewat tombol Beranda.
export function Panduan({ onReset }: Props) {
  const [konfirmasi, setKonfirmasi] = useState(false)
  const [selesaiReset, setSelesaiReset] = useState(false)

  const jalankanReset = () => {
    onReset()
    setKonfirmasi(false)
    setSelesaiReset(true)
  }

  return (
    <section className="layar layar-teks">
      {/* Pojok kanan atas, sejajar dengan .tombol-beranda (top: 40px) */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 10,
        }}
      >
        {selesaiReset && !konfirmasi && (
          <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--benar)' }}>
            ✓ Bintang direset
          </span>
        )}

        {!konfirmasi ? (
          <Tombol
            varian="kecil"
            onClick={() => {
              setSelesaiReset(false)
              setKonfirmasi(true)
            }}
          >
            Reset Bintang
          </Tombol>
        ) : (
          <>
            <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--salah)' }}>
              Hapus semua bintang?
            </span>
            <Tombol varian="kecil" onClick={jalankanReset}>
              Ya, Reset
            </Tombol>
            <Tombol varian="kecil" onClick={() => setKonfirmasi(false)}>
              Batal
            </Tombol>
          </>
        )}
      </div>

      <h1>{TEKS.menu.panduan}</h1>
      {PANDUAN.length === 0 ? (
        <p className="penanda">[Teks Panduan Pendamping dari klien, paling lambat 8 November]</p>
      ) : (
        <ol className="daftar-petunjuk">
          {PANDUAN.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      )}
    </section>
  )
}