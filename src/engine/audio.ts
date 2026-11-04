// Manajer suara (PRD §10.2, §10.3): satu narasi pada satu waktu, musik hanya setelah sentuhan pertama.
const BASE = (import.meta.env?.BASE_URL ?? '/') + 'assets/audio/'

let narasi: HTMLAudioElement | null = null
let berhentiCb: (() => void) | null = null
let musik: HTMLAudioElement | null = null
let musikGagal = false
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

// shortcut: musik dijeda langsung tanpa efek memudar, tambah fade saat musik final masuk (9-10 Nov).
export function musikHidup(hidup: boolean) {
  if (!hidup) return musik?.pause()
  if (musikGagal || typeof Audio === 'undefined') return
  if (!musik) {
    try {
      musik = new Audio(BASE + 'musik-pembuka.mp3')
      musik.loop = true
      musik.volume = 0.25
      musik.onerror = () => {
        musikGagal = true
        musik = null
      }
    } catch {
      musikGagal = true
      return
    }
  }
  musik.play().catch(() => {})
}

