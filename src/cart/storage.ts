export type CartLine = {
  id: string
  quantity: number
}

const STORAGE_KEY = 'daily-club-cart'

function isLine(value: unknown): value is { id: unknown; quantity: unknown } {
  return typeof value === 'object' && value !== null
}

export function readCart(knownIds: ReadonlySet<string>): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const merged = new Map<string, number>()
    for (const item of parsed) {
      if (!isLine(item)) continue
      const { id, quantity } = item
      if (typeof id !== 'string' || !knownIds.has(id)) continue
      if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) continue
      merged.set(id, (merged.get(id) ?? 0) + quantity)
    }

    return [...merged.entries()].map(([id, quantity]) => ({ id, quantity }))
  } catch {
    return []
  }
}

export function writeCart(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Keep the in-memory cart if storage is unavailable.
  }
}
