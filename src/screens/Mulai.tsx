import { TEKS } from '../data/teks'

// S02: sentuhan pada play adalah sentuhan pertama yang boleh memulai musik (PRD A15, AC-02).
export function Mulai({ onPlay }: { onPlay: () => void }) {
  return (
    <section className="layar">
      <h1 className="logo">PeerNorm</h1>
      <p className="tagline">{TEKS.tagline}</p>
      <button type="button" className="tombol-play" aria-label="Mulai" onClick={onPlay}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </button>
    </section>
  )
}

