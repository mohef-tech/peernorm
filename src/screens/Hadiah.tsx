import { Bintang } from '../components/Bintang'
import { Lencana } from '../components/Lencana'
import { TEKS } from '../data/teks'
import { lencana } from '../engine/bintang'

// S11: 7 slot terisi = bintangSesi, lencana aktif disorot (PRD §8 #6).
export function Hadiah({ bintangSesi }: { bintangSesi: number }) {
  return (
    <section className="layar">
      <h1>{TEKS.hadiah.judul}</h1>
      <Bintang terisi={bintangSesi} />
      <p>{TEKS.hadiah.pesan}</p>
      <Lencana aktif={lencana(bintangSesi)} />
    </section>
  )
}

