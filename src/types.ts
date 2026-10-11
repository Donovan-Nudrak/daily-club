export const categoryIds = ['tops', 'layers', 'bottoms', 'accessories'] as const

export type CategoryId = (typeof categoryIds)[number]

export const filterIds = ['all', ...categoryIds] as const

export type FilterId = (typeof filterIds)[number]

export type LookId = '01' | '02' | '03'

export type Product = {
  id: string
  category: CategoryId
  price: number
  image: string | null
  alternateImage?: string
}

export type Look = {
  id: LookId
  image: string | null
  productIds: string[]
}
