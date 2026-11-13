// Manajer suara (PRD §10.2, §10.3): satu narasi pada satu waktu, backsound pelan sesuai jenis halaman.
const BASE = (import.meta.env?.BASE_URL ?? '/') + 'assets/audio/'

export type ModeBacksound = 'mati' | 'tanpa-suara' | 'bersuara'

const FILE_BACKSOUND: Record<Exclude<ModeBacksound, 'mati'>, string> = {
  'tanpa-suara': 'backsound-untuk-halaman-tanpa-suara.mp3',
  bersuara: 'backsound-untuk-halaman-bersuara.mp3',
}

let narasi: HTMLAudioElement | null = null
let berhentiCb: (() => void) | null = null
let musik: HTMLAudioElement | null = null
let modeAktif: ModeBacksound = 'mati'
const musikGagal = new Set<string>()
const tersedia = new Map<string, Promise<boolean>>()

// File belum dikirim klien = ikon suara disembunyikan secara silent (PRD §10.2).
export function cekSuara(id: string): Promise<boolean> {
  if (typeof Audio === 'undefined') return Promise.resolve(false)
  let p = tersedia.get(id)
  if (!p) {
    p = new Promise<boolean>((ok) => {
      try {
        const a = new Audio()
        const selesai = (hasil: boolean) => {
          a.onloadedmetadata = null
          a.onerror = null
          ok(hasil)
        }
        a.preload = 'metadata'
        a.onloadedmetadata = () => selesai(true)
        a.onerror = () => selesai(false)
        a.src = BASE + id + '.mp3'
      } catch {
        ok(false)
      }
    })
    tersedia.set(id, p)
  }
  return p
}

export function putarNarasi(id: string, saatBerhenti: () => void) {
  hentikanNarasi()
  if (typeof Audio === 'undefined') return saatBerhenti()
  try {
    narasi = new Audio(BASE + id + '.mp3')
    berhentiCb = saatBerhenti
    narasi.onended = hentikanNarasi
    narasi.onerror = hentikanNarasi
    narasi.play().catch(hentikanNarasi)
  } catch {
    hentikanNarasi()
  }
}

export function hentikanNarasi() {
  if (narasi) {
    narasi.onended = null
    narasi.onerror = null
    narasi.pause()
    narasi = null
  }
  const cb = berhentiCb
  berhentiCb = null
  cb?.()
}

export function aturBacksound(mode: ModeBacksound) {
  if (mode === 'mati' || typeof Audio === 'undefined') {
    modeAktif = 'mati'
    musik?.pause()
    return
  }

  const namaFile = FILE_BACKSOUND[mode]
  if (musikGagal.has(namaFile)) return

  if (!musik || modeAktif !== mode) {
    if (musik) {
      musik.pause()
      musik = null
    }
    try {
      musik = new Audio(BASE + namaFile)
      musik.loop = true
      // Volume lebih pelan pada halaman bernarasi agar instruksi suara terdengar jelas
      musik.volume = mode === 'bersuara' ? 0.1 : 0.2
      musik.onerror = () => {
        musikGagal.add(namaFile)
        musik = null
      }
      modeAktif = mode
    } catch {
      musikGagal.add(namaFile)
      return
    }
  }

  musik.play().catch(() => { })
}

// Kompatibilitas untuk unit test (bintang.test.ts)
export function musikHidup(hidup: boolean) {
  aturBacksound(hidup ? 'tanpa-suara' : 'mati')
}