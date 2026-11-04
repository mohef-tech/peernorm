import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CERITA, ceritaBerikutnya } from '../data/cerita.ts'
import { LATIHAN, acakOpsi } from '../data/latihan.ts'
import { PANDUAN } from '../data/panduan.ts'
import { TEKS } from '../data/teks.ts'
import { cekSuara, hentikanNarasi, musikHidup, putarNarasi } from './audio.ts'
import { SESI_BARU, bintangSesi, lencana, selesaiCerita, selesaiLatihan } from './bintang.ts'

test('cerita memberi +1 bintang sekali per cerita per sesi (AC-07)', () => {
  let s = SESI_BARU
  for (const id of ['giliran', 'berbagi', 'perubahan'] as const) {
    const a = selesaiCerita(s, id)
    assert.equal(a.tambah, 1)
    assert.equal(selesaiCerita(a.sesi, id).tambah, 0)
    s = a.sesi
  }
  assert.equal(bintangSesi(s), 3)
})

test('alur cerita 2 (berbagi) dan cerita 3 (perubahan) sesuai PRD §6 & I2 (AC-05)', () => {
  const berbagi = CERITA.find((c) => c.id === 'berbagi')!
  assert.deepEqual(
    berbagi.langkah.map((l) => [l.jenis, l.id, l.hal]),
    [
      ['narasi', 'berbagi-01', '1/6'],
      ['narasi', 'berbagi-02', '2/6'],
      ['narasi', 'berbagi-03', '3/6'],
      ['narasi', 'berbagi-04', '4/6'],
      ['pilihan', 'berbagi-pilih', '5/6'],
      ['hebat', 'berbagi-hebat', '6/6'],
      ['selesai', 'berbagi-selesai', undefined],
    ],
  )
  const pilihBerbagi = berbagi.langkah[4]
  assert.equal(pilihBerbagi.jenis, 'pilihan')
  assert.equal(pilihBerbagi.ulang.id, 'berbagi-ulang')
  assert.equal(pilihBerbagi.ulang.hal, '6/6')

  const perubahan = CERITA.find((c) => c.id === 'perubahan')!
  assert.deepEqual(
    perubahan.langkah.map((l) => [l.jenis, l.id, l.hal]),
    [
      ['narasi', 'perubahan-01', '1/6'],
      ['narasi', 'perubahan-02', '2/6'],
      ['narasi', 'perubahan-03', '3/6'],
      ['pilihan', 'perubahan-pilih', '4/6'],
      ['hebat', 'perubahan-hebat', undefined],
      ['narasi', 'perubahan-terima', '5/6'],
      ['narasi', 'perubahan-pelajaran', '6/6'],
      ['selesai', 'perubahan-selesai', undefined],
    ],
  )
  const pilihPerubahan = perubahan.langkah[3]
  assert.equal(pilihPerubahan.jenis, 'pilihan')
  assert.equal(pilihPerubahan.ulang.id, 'perubahan-ulang')
  assert.equal(pilihPerubahan.ulang.hal, '5/6')

  assert.equal(ceritaBerikutnya('giliran'), 'berbagi')
  assert.equal(ceritaBerikutnya('berbagi'), 'perubahan')
  assert.equal(ceritaBerikutnya('perubahan'), 'giliran')
})

test('latihan memiliki 4 soal (L1-L4) dan mengacak posisi opsi (AC-08)', () => {
  assert.deepEqual(LATIHAN.map((s) => s.id), ['L1', 'L2', 'L3', 'L4'])
  const kiriBenar = acakOpsi(LATIHAN[0], () => 0.1)
  const kananBenar = acakOpsi(LATIHAN[0], () => 0.9)
  assert.equal(kiriBenar[0].benar, true)
  assert.equal(kiriBenar[1].benar, false)
  assert.equal(kananBenar[0].benar, false)
  assert.equal(kananBenar[1].benar, true)
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

test('petunjuk, panduan, dan fallback audio tidak macet tanpa file fisik (AC-14, AC-15)', async () => {
  assert.equal(TEKS.petunjuk.butir.length, 5)
  assert.ok(PANDUAN.length > 0)
  assert.equal(await cekSuara('petunjuk'), false)
  let berhenti = false
  putarNarasi('petunjuk', () => {
    berhenti = true
  })
  assert.equal(berhenti, true)
  musikHidup(true)
  musikHidup(false)
  hentikanNarasi()
})

