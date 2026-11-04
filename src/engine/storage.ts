// Satu-satunya modul yang menyentuh penyimpanan (PRD §9); pindah ke server cukup ubah file ini.
import { PROFIL, type ProfilId } from '../data/profil'

const KUNCI = 'peernorm:v1'
export type Total = Record<ProfilId, number>

const kosong = (): Total => Object.fromEntries(PROFIL.map((p) => [p.id, 0])) as Total

// Data rusak atau tidak ada = mulai dari 0; aplikasi tidak boleh macet.
export function bacaTotal(): Total {
  const total = kosong()
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI) ?? 'null')
    for (const p of PROFIL) {
      const n = data?.profil?.[p.id]?.total
      if (Number.isInteger(n) && n >= 0) total[p.id] = n
    }
  } catch (err) {
    console.warn('[storage] tidak bisa dibaca, berjalan dengan memori', err)
  }
  return total
}

export function simpanTotal(total: Total) {
  const profil = Object.fromEntries(PROFIL.map((p) => [p.id, { total: total[p.id] }]))
  try {
    localStorage.setItem(KUNCI, JSON.stringify({ versi: 1, profil }))
  } catch (err) {
    console.warn('[storage] tidak bisa disimpan, berjalan dengan memori', err)
  }
}

export function mintaPersisten() {
  navigator.storage?.persist?.().catch(() => {})
}

