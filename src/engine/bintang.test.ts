import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SESI_BARU, bintangSesi, lencana, selesaiCerita, selesaiLatihan } from './bintang.ts'

test('cerita memberi 1 bintang sekali per sesi (AC-07)', () => {
  const a = selesaiCerita(SESI_BARU, 'giliran')
  assert.equal(a.tambah, 1)
  assert.equal(selesaiCerita(a.sesi, 'giliran').tambah, 0)
})

test('latihan hanya menambah selisih bila lebih baik (AC-09)', () => {
  const a = selesaiLatihan(SESI_BARU, 2)
  assert.equal(a.tambah, 2)
  assert.equal(selesaiLatihan(a.sesi, 1).tambah, 0)
  const b = selesaiLatihan(a.sesi, 4)
  assert.equal(b.tambah, 2)
  assert.equal(b.sesi.latihanTerbaik, 4)
})

test('bintangSesi tidak pernah lebih dari 7 (AC-10)', () => {
  let s = SESI_BARU
  for (const id of ['giliran', 'berbagi', 'perubahan', 'giliran'] as const) s = selesaiCerita(s, id).sesi
  s = selesaiLatihan(s, 99).sesi
  assert.equal(bintangSesi(s), 7)
})

test('lencana mengikuti bintangSesi (AC-11)', () => {
  assert.deepEqual([0, 1, 3, 4, 6, 7].map(lencana), [
    null, 'pembelajarHebat', 'pembelajarHebat', 'rajinBelajar', 'rajinBelajar', 'semangatLuarBiasa',
  ])
})

