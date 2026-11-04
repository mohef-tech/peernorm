// Label sementara sesuai PRD A1; nama final dari klien paling lambat 8 Nov. Ganti label di sini saja.
export const PROFIL = [
  { id: 'A', label: 'Anak A' },
  { id: 'B', label: 'Anak B' },
  { id: 'C', label: 'Anak C' },
] as const

export type ProfilId = (typeof PROFIL)[number]['id']

