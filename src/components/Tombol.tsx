import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & { varian?: 'utama' | 'kedua' | 'kecil' }

export function Tombol({ varian = 'utama', className = '', ...props }: Props) {
  return <button type="button" className={`tombol tombol-${varian} ${className}`.trim()} {...props} />
}
