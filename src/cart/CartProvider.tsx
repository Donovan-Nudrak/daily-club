import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products } from '../data/products.ts'
import { readCart, writeCart, type CartLine } from './storage.ts'

type CartContextValue = {
  lines: CartLine[]
  count: number
  add: (id: string) => number
  increase: (id: string) => void
  decrease: (id: string) => void
  remove: (id: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const knownIds = new Set(products.map((product) => product.id))

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readCart(knownIds))

  useEffect(() => {
    writeCart(lines)
  }, [lines])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0)

    return {
      lines,
      count,
      add(id) {
        if (!knownIds.has(id)) return 0
        const existing = lines.find((line) => line.id === id)
        const quantity = (existing?.quantity ?? 0) + 1
        setLines((current) => {
          const found = current.find((line) => line.id === id)
          if (!found) return [...current, { id, quantity: 1 }]
          return current.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
          )
        })
        return quantity
      },
      increase(id) {
        setLines((current) =>
          current.map((line) =>
            line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        )
      },
      decrease(id) {
        setLines((current) =>
          current.map((line) =>
            line.id === id && line.quantity > 1
              ? { ...line, quantity: line.quantity - 1 }
              : line,
          ),
        )
      },
      remove(id) {
        setLines((current) => current.filter((line) => line.id !== id))
      },
    }
  }, [lines])

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
