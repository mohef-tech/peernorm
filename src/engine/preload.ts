// Pemuat aset dengan progres nyata untuk bilah muat Splash (PRD §10.4).
// Aset gagal dimuat tetap dihitung selesai agar aplikasi tidak macet.
const BASE = (import.meta.env?.BASE_URL ?? '/') + 'assets/'

// Aset visual inti yang dimuat saat layar Splash (S01).
export const ASET_INTI: readonly string[] = [
  'img/splash/latar-sekolah.webp',
  'img/splash/logo-peernorm.webp',
  'img/splash/karakter-anak.webp',
  'img/splash/kapsul-loading.webp',
]

async function muatSatu(path: string): Promise<unknown> {
  if (path.endsWith('.mp3')) {
    const r = await fetch(BASE + path)
    return r.ok ? r.blob() : Promise.reject()
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
