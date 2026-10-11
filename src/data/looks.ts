import type { Look } from '../types.ts'

export function publicImage(file: string) {
  return `${import.meta.env.BASE_URL}images/${encodeURIComponent(file)}`
}

export const portraitImage = publicImage('retrato.webp')

export const looks: Look[] = [
  {
    id: '01',
    image: publicImage('Look-01-cafe-de-paso.webp'),
    productIds: ['P01', 'P04', 'P07', 'P10'],
  },
  {
    id: '02',
    image: publicImage('Look-02-lado-B.webp'),
    productIds: ['P02', 'P05', 'P08', 'P11'],
  },
  {
    id: '03',
    image: publicImage('Look-03-sin-prisa.webp'),
    productIds: ['P03', 'P06', 'P09', 'P12'],
  },
]
