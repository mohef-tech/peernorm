import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const LEBAR = 1920
const TINGGI = 1080

// Panggung virtual 1920x1080 diskalakan pas layar dengan letterbox (PRD §11.2).
// Ukuran diambil dari elemen luar (100dvh), bukan window, agar bilah alamat mobile ikut terhitung.
export function Stage({ children }: { children: ReactNode }) {
  const luar = useRef<HTMLDivElement>(null)
  const [skala, setSkala] = useState(1)

  useLayoutEffect(() => {
    const el = luar.current
    if (!el) return
    const ukur = () => setSkala(Math.min(el.clientWidth / LEBAR, el.clientHeight / TINGGI))
    ukur()
    const ro = new ResizeObserver(ukur)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={luar} className="layar-luar">
      <div className="panggung" style={{ transform: `scale(${skala})` }}>
        {children}
      </div>
    </div>
  )
}

