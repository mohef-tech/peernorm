import { useEffect, useState } from 'react'
import { cekSuara, hentikanNarasi, putarNarasi } from '../engine/audio'

// Diputar hanya saat ditekan; berhenti saat pindah layar/langkah; tersembunyi bila file belum ada (PRD §10.2).
export function IkonSuara({ id, label }: { id: string; label?: string }) {
  const [ada, setAda] = useState(false)
  const [main, setMain] = useState(false)

  useEffect(() => {
    let hidup = true
    cekSuara(id).then((ok) => hidup && setAda(ok))
    return () => {
      hidup = false
      hentikanNarasi()
    }
  }, [id])

  if (!ada) return null

  const tekan = () => {
    if (main) return hentikanNarasi()
    setMain(true)
    putarNarasi(id, () => setMain(false))
  }

  return (
    <button
      type="button"
      className={`ikon-suara ${label ? 'dengan-label' : ''}`}
      aria-label={label ? undefined : main ? 'Hentikan suara' : 'Dengarkan'}
      aria-pressed={main}
      onClick={tekan}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {main ? (
          <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
        ) : (
          <path
            d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"
            fill="currentColor"
          />
        )}
      </svg>
      {label && <span>{label}</span>}
    </button>
  )
}

