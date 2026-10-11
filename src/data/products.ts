import type { Product } from '../types.ts'

function publicImage(file: string) {
  return `${import.meta.env.BASE_URL}images/${encodeURIComponent(file)}`
}

/** Precios de demostración en MXN. Cambiarlos aquí actualiza ficha y carrito. */
export const products: Product[] = [
  {
    id: 'P01',
    category: 'tops',
    price: 890,
    image: publicImage('P01—camiseta-boxy.webp'),
  },
  {
    id: 'P02',
    category: 'tops',
    price: 790,
    image: publicImage('P02—camiseta-ringer.webp'),
  },
  {
    id: 'P03',
    category: 'tops',
    price: 1290,
    image: publicImage('P03-polo-knit.webp'),
  },
  {
    id: 'P04',
    category: 'layers',
    price: 2490,
    image: publicImage('P04-chaqueta-denim-crop.webp'),
  },
  {
    id: 'P05',
    category: 'layers',
    price: 1690,
    image: publicImage('P05-camisa-stripe.webp'),
  },
  {
    id: 'P06',
    category: 'layers',
    price: 1890,
    image: publicImage('P06-sudadera-zip.webp'),
  },
  {
    id: 'P07',
    category: 'bottoms',
    price: 2190,
    image: publicImage('P07-denim-wide.webp'),
  },
  {
    id: 'P08',
    category: 'bottoms',
    price: 1990,
    image: publicImage('P08-pantalon-parachute.webp'),
  },
  {
    id: 'P09',
    category: 'bottoms',
    price: 1490,
    image: publicImage('P09-bermuda-pleat.webp'),
  },
  {
    id: 'P10',
    category: 'accessories',
    price: 1290,
    image: publicImage('P10-bolsa-bubble.webp'),
  },
  {
    id: 'P11',
    category: 'accessories',
    price: 690,
    image: publicImage('P11-gorra-daily.webp'),
  },
  {
    id: 'P12',
    category: 'accessories',
    price: 890,
    image: publicImage('P12-cinturon-loop.webp'),
  },
]
