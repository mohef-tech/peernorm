// Pemuat aset dengan progres nyata untuk bilah muat Splash (PRD §10.4).
// Aset gagal dimuat tetap dihitung selesai agar aplikasi tidak macet.
const BASE = (import.meta.env?.BASE_URL ?? '/') + 'assets/'

// shortcut: kosong sampai gambar/musik pengganti masuk; isi path relatif terhadap public/assets/.
export const ASET_INTI: readonly string[] = []

function muatSatu(path: string): Promise<unknown> {
  if (path.endsWith('.mp3')) {
    return fetch(BASE + path).then((r) => (r.ok ? r.blob() : Promise.reject()))
  }
  const img = new Image()
  img.src = BASE + path
  return img.decode()
}

export function muat(paths: readonly string[], progres: (rasio: number) => void): Promise<void> {
  if (paths.length === 0) {
    progres(1)
    return Promise.resolve()
  }
  let selesai = 0
  return Promise.all(
    paths.map((p) =>
      muatSatu(p)
        .catch(() => {})
        .finally(() => progres(++selesai / paths.length)),
    ),
  ).then(() => {})
}
