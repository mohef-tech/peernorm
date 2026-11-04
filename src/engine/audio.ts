// Manajer suara (PRD §10.2, §10.3): satu narasi pada satu waktu, musik hanya setelah sentuhan pertama.
const BASE = import.meta.env.BASE_URL + 'assets/audio/'

let narasi: HTMLAudioElement | null = null
let berhentiCb: (() => void) | null = null
let musik: HTMLAudioElement | null = null
const tersedia = new Map<string, Promise<boolean>>()

// File belum dikirim klien = ikon suara disembunyikan (PRD §10.2).
export function cekSuara(id: string): Promise<boolean> {
  let p = tersedia.get(id)
  if (!p) {
    p = new Promise((ok) => {
      const a = new Audio()
      a.preload = 'metadata'
      a.onloadedmetadata = () => ok(true)
      a.onerror = () => ok(false)
      a.src = BASE + id + '.mp3'
    })
    tersedia.set(id, p)
  }
  return p
}

export function putarNarasi(id: string, saatBerhenti: () => void) {
  hentikanNarasi()
  narasi = new Audio(BASE + id + '.mp3')
  berhentiCb = saatBerhenti
  narasi.onended = hentikanNarasi
  narasi.play().catch(hentikanNarasi)
}

export function hentikanNarasi() {
  narasi?.pause()
  narasi = null
  const cb = berhentiCb
  berhentiCb = null
  cb?.()
}

// shortcut: musik dijeda langsung tanpa efek memudar, tambah fade saat musik final masuk (9-10 Nov).
export function musikHidup(hidup: boolean) {
  if (!hidup) return musik?.pause()
  if (!musik) {
    musik = new Audio(BASE + 'musik-pembuka.mp3')
    musik.loop = true
    musik.volume = 0.25
  }
  musik.play().catch(() => {})
}

