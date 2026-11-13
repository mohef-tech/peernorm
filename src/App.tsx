import { useCallback, useEffect, useReducer, useRef } from 'react'
import { Stage } from './components/Stage'
import { Tombol } from './components/Tombol'
import { ceritaBerikutnya, type CeritaId } from './data/cerita'
import type { ProfilId } from './data/profil'
import { TEKS } from './data/teks'
import { aturBacksound, hentikanNarasi, type ModeBacksound } from './engine/audio'
import { SESI_BARU, bintangSesi, selesaiCerita, selesaiLatihan, type Sesi } from './engine/bintang'
import { bacaTotal, mintaPersisten, simpanTotal, type Total } from './engine/storage'
import { Cerita } from './screens/Cerita'
import { Hadiah } from './screens/Hadiah'
import { HasilLatihan } from './screens/HasilLatihan'
import { Keluar } from './screens/Keluar'
import { Latihan } from './screens/Latihan'
import { Menu, type TujuanMenu } from './screens/Menu'
import { Mulai } from './screens/Mulai'
import { Panduan } from './screens/Panduan'
import { Petunjuk } from './screens/Petunjuk'
import { PilihCerita } from './screens/PilihCerita'
import { Profil } from './screens/Profil'
import { Splash } from './screens/Splash'

type Layar = 'splash' | 'mulai' | 'profil' | TujuanMenu | 'menu' | 'cerita' | 'hasilLatihan'

type State = {
  layar: Layar
  keluar: boolean
  profil: ProfilId | null
  total: Total
  sesi: Sesi
  cerita: CeritaId
  hasilLatihan: number
  putaran: number // naik tiap Ulangi Latihan agar Latihan mulai lagi dari soal 1
}

type Aksi =
  | { tipe: 'ke'; layar: Layar }
  | { tipe: 'tutupKeluar' }
  | { tipe: 'pilihProfil'; id: ProfilId }
  | { tipe: 'akhiriSesi'; layar: 'profil' | 'mulai' }
  | { tipe: 'bukaCerita'; id: CeritaId }
  | { tipe: 'ceritaSelesai'; id: CeritaId }
  | { tipe: 'latihanSelesai'; benar: number }
  | { tipe: 'ulangiLatihan' }
  | { tipe: 'resetSemua' }

// Setiap penambahan langsung masuk ke total profil aktif (PRD §8 #3).
function beri(state: State, hasil: { sesi: Sesi; tambah: number }): State {
  if (!state.profil || hasil.tambah === 0) return state
  const total = { ...state.total, [state.profil]: state.total[state.profil] + hasil.tambah }
  return { ...state, sesi: hasil.sesi, total }
}

function reducer(state: State, aksi: Aksi): State {
  switch (aksi.tipe) {
    case 'ke':
      if (aksi.layar === 'keluar') return { ...state, keluar: true, layar: 'keluar' }
      return { ...state, keluar: false, layar: aksi.layar, putaran: aksi.layar === 'latihan' ? 0 : state.putaran }
    case 'tutupKeluar':
      return { ...state, keluar: false, layar: state.layar === 'keluar' ? 'menu' : state.layar }
    case 'pilihProfil':
      return { ...state, keluar: false, profil: aksi.id, sesi: SESI_BARU, layar: 'menu' }
    case 'akhiriSesi': // Menu > Profil dan Keluar > Ya (PRD A3, A14)
      return { ...state, keluar: false, profil: null, sesi: SESI_BARU, layar: aksi.layar }
    case 'bukaCerita':
      return { ...state, cerita: aksi.id, layar: 'cerita' }
    case 'ceritaSelesai':
      return beri(state, selesaiCerita(state.sesi, aksi.id))
    case 'latihanSelesai':
      return { ...beri(state, selesaiLatihan(state.sesi, aksi.benar)), hasilLatihan: aksi.benar, layar: 'hasilLatihan' }
    case 'ulangiLatihan':
      return { ...state, putaran: state.putaran + 1, layar: 'latihan' }
    case 'resetSemua':
      return { ...state, total: bacaTotal(), sesi: SESI_BARU, hasilLatihan: 0 }
  }
}

const awal = (): State => ({
  layar: 'splash',
  keluar: false,
  profil: null,
  total: bacaTotal(),
  sesi: SESI_BARU,
  cerita: 'giliran',
  hasilLatihan: 0,
  putaran: 0,
})

// Halaman yang memiliki ikon audio & narasi suara
const LAYAR_BERSUARA: ReadonlySet<Layar> = new Set(['petunjuk', 'cerita', 'latihan'])
// Beranda = Menu. Tidak ditampilkan di Menu sendiri, Profil, dan Modal Keluar; lihat alur.md.
const TANPA_BERANDA: ReadonlySet<Layar> = new Set(['splash', 'mulai', 'profil', 'menu', 'keluar'])

function modeUntukLayar(layar: Layar): ModeBacksound {
  if (layar === 'splash') return 'mati'
  return LAYAR_BERSUARA.has(layar) ? 'bersuara' : 'tanpa-suara'
}

export function App() {
  const [state, dispatch] = useReducer(reducer, undefined, awal)
  const sudahDisentuh = useRef(false)
  const { layar } = state

  useEffect(mintaPersisten, [])
  useEffect(() => simpanTotal(state.total), [state.total])



  useEffect(() => {
    const atur = () => {
      if (!sudahDisentuh.current || document.hidden) {
        aturBacksound('mati')
      } else {
        aturBacksound(modeUntukLayar(layar))
      }
    }
    const saatTab = () => {
      if (document.hidden) hentikanNarasi()
      atur()
    }
    const saatSentuhPertama = () => {
      if (!sudahDisentuh.current) {
        sudahDisentuh.current = true
        atur()
      }
    }

    atur()
    document.addEventListener('visibilitychange', saatTab)
    window.addEventListener('pointerdown', saatSentuhPertama, { once: true })
    return () => {
      document.removeEventListener('visibilitychange', saatTab)
      window.removeEventListener('pointerdown', saatSentuhPertama)
    }
  }, [layar])

  const ke = useCallback((l: Layar) => dispatch({ tipe: 'ke', layar: l }), [])
  const keMulai = useCallback(() => ke('mulai'), [ke])
  const keMenu = useCallback(() => ke('menu'), [ke])
  const keMenuCerita = useCallback(() => ke('pilihCerita'), [ke])
  const tutupKeluar = useCallback(() => dispatch({ tipe: 'tutupKeluar' }), [])
  const keluarYa = useCallback(() => {
    simpanTotal(state.total)
    dispatch({ tipe: 'akhiriSesi', layar: 'mulai' })
  }, [state.total])
  const ceritaSelesai = useCallback((id: CeritaId) => dispatch({ tipe: 'ceritaSelesai', id }), [])
  const resetSemua = useCallback(() => {
    localStorage.clear()
    dispatch({ tipe: 'resetSemua' })
  }, [])

  const play = () => {
    // Musik harus dimulai di dalam sentuhan agar diizinkan Safari iPad (PRD A15).
    sudahDisentuh.current = true
    aturBacksound('tanpa-suara')
    ke('profil')
  }

  const pilihMenu = (tujuan: TujuanMenu) =>
    tujuan === 'profil' ? dispatch({ tipe: 'akhiriSesi', layar: 'profil' }) : ke(tujuan)

  const totalAktif = state.profil ? state.total[state.profil] : 0

  return (
    <main>
      <Stage>
        {layar === 'splash' && <Splash onSiap={keMulai} />}
        {layar === 'mulai' && <Mulai onPlay={play} />}
        {layar === 'profil' && <Profil total={state.total} onPilih={(id) => dispatch({ tipe: 'pilihProfil', id })} />}
        {layar === 'menu' && <Menu total={totalAktif} onPilih={pilihMenu} onKeluar={() => ke('keluar')} />}
        {layar === 'petunjuk' && <Petunjuk />}
        {layar === 'pilihCerita' && <PilihCerita onPilih={(id) => dispatch({ tipe: 'bukaCerita', id })} />}
        {layar === 'cerita' && (
          <Cerita
            key={state.cerita}
            id={state.cerita}
            onSelesai={ceritaSelesai}
            onMenuCerita={keMenuCerita}
            onCeritaLain={() => dispatch({ tipe: 'bukaCerita', id: ceritaBerikutnya(state.cerita) })}
          />
        )}
        {layar === 'latihan' && (
          <Latihan
            key={state.putaran}
            langsungSoal={state.putaran > 0}
            onSelesai={(benar) => dispatch({ tipe: 'latihanSelesai', benar })}
          />
        )}
        {layar === 'hasilLatihan' && (
          <HasilLatihan
            benar={state.hasilLatihan}
            onUlangi={() => dispatch({ tipe: 'ulangiLatihan' })}
            onKeHadiah={() => ke('hadiah')}
            onKembali={keMenu}
          />
        )}
        {layar === 'hadiah' && <Hadiah bintangSesi={bintangSesi(state.sesi)} onKembali={keMenu} />}
        {layar === 'panduan' && <Panduan onReset={resetSemua} />}

        {!TANPA_BERANDA.has(layar) && (
          <Tombol varian="kecil" className="tombol-beranda" onClick={keMenu}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="currentColor" />
            </svg>
            {TEKS.beranda}
          </Tombol>
        )}

        {(layar === 'keluar' || state.keluar) && <Keluar onYa={keluarYa} onTidak={tutupKeluar} />}
      </Stage>
      <div className="putar-layar">
        <p>{TEKS.putarLayar}</p>
      </div>
    </main>
  )
}