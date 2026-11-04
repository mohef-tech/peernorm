// Aturan bintang dan lencana (PRD §8). Murni, tanpa efek samping; penyimpanan di storage.ts.
import type { CeritaId } from '../data/cerita'

export type Sesi = { ceritaSelesai: readonly CeritaId[]; latihanTerbaik: number }
export type LencanaId = 'pembelajarHebat' | 'rajinBelajar' | 'semangatLuarBiasa'

export const SESI_BARU: Sesi = { ceritaSelesai: [], latihanTerbaik: 0 }
export const MAKS_LATIHAN = 4

// Aturan 1: +1 hanya saat cerita itu pertama kali selesai di sesi ini.
export function selesaiCerita(sesi: Sesi, id: CeritaId): { sesi: Sesi; tambah: number } {
  if (sesi.ceritaSelesai.includes(id)) return { sesi, tambah: 0 }
  return { sesi: { ...sesi, ceritaSelesai: [...sesi.ceritaSelesai, id] }, tambah: 1 }
}

// Aturan 2: latihan memakai hasil terbaik; hanya selisihnya yang ditambahkan.
export function selesaiLatihan(sesi: Sesi, benar: number): { sesi: Sesi; tambah: number } {
  const n = Math.max(0, Math.min(MAKS_LATIHAN, Math.floor(benar)))
  if (n <= sesi.latihanTerbaik) return { sesi, tambah: 0 }
  return { sesi: { ...sesi, latihanTerbaik: n }, tambah: n - sesi.latihanTerbaik }
}

export const bintangSesi = (sesi: Sesi) => sesi.ceritaSelesai.length + sesi.latihanTerbaik

// Aturan 4: 0 = tanpa lencana; 1-3, 4-6, 7.
export function lencana(bintang: number): LencanaId | null {
  if (bintang >= 7) return 'semangatLuarBiasa'
  if (bintang >= 4) return 'rajinBelajar'
  if (bintang >= 1) return 'pembelajarHebat'
  return null
}

