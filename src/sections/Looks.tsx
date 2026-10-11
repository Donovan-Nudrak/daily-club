import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { looks } from '../data/looks.ts'
import { products } from '../data/products.ts'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import { useReveal } from '../motion/useReveal.ts'
import type { Look, LookId, Product } from '../types.ts'
import styles from './Looks.module.css'

type LooksProps = {
  onOpenProduct: (productId: string) => void
}

function productsFor(look: Look): Product[] {
  return look.productIds.flatMap((id) => {
    const product = products.find((item) => item.id === id)
    return product ? [product] : []
  })
}

function Looks({ onOpenProduct }: LooksProps) {
  const { messages } = useLocale()
  const { ref: introRef } = useReveal<HTMLDivElement>()
  const { ref: layoutRef } = useReveal<HTMLDivElement>()
  const swapTimer = useRef(0)
  const [selectedId, setSelectedId] = useState<LookId>(looks[0].id)
  const [displayedId, setDisplayedId] = useState<LookId>(looks[0].id)
  const [phase, setPhase] = useState<'idle' | 'out'>('idle')
  const [expanded, setExpanded] = useState(false)
  const [piecesEnter, setPiecesEnter] = useState(false)
  const displayed = looks.find((look) => look.id === displayedId) ?? looks[0]
  const lookProducts = productsFor(displayed)
  const displayedCopy = messages.looks.items[displayed.id]
  const lookPhase = phase === 'out' ? 'out' : undefined

  useEffect(() => () => window.clearTimeout(swapTimer.current), [])

  function selectLook(id: LookId) {
    if (id === selectedId) return
    setPiecesEnter(false)
    setSelectedId(id)
    window.clearTimeout(swapTimer.current)
    let reduce = true
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      reduce = true
    }
    if (reduce) {
      setDisplayedId(id)
      setPhase('idle')
      return
    }
    setPhase('out')
    swapTimer.current = window.setTimeout(() => {
      setDisplayedId(id)
      setPhase('idle')
    }, 140)
  }

  function toggleExpanded() {
    setPiecesEnter(!expanded)
    setExpanded((open) => !open)
  }

  return (
    <section id="looks" className={styles.section} aria-labelledby="looks-title">
      <div ref={introRef}>
        <header className={styles.intro}>
          <h2 id="looks-title">{messages.looks.title}</h2>
          <p>{messages.looks.subtitle}</p>
        </header>
      </div>
      <div
        ref={layoutRef}
        className={styles.layout}
        data-delay="1"
      >
        <div className={styles.details}>
          <div className={styles.choices} role="group" aria-label={messages.looks.choose}>
            {looks.map((look) => (
              <button
                key={look.id}
                type="button"
                className={styles.choice}
                data-hover="ghost"
                aria-pressed={look.id === selectedId}
                onClick={() => selectLook(look.id)}
              >
                {look.id} — {messages.looks.items[look.id].title}
              </button>
            ))}
          </div>
          <h3 className={styles.lookTitle} data-look-fade="" data-look-phase={lookPhase}>
            {displayed.id} — {displayedCopy.title}
          </h3>
          <button
            type="button"
            className={styles.explore}
            data-hover="ghost"
            aria-expanded={expanded}
            aria-controls="look-pieces"
            onClick={toggleExpanded}
          >
            {messages.looks.explore}
          </button>
          {expanded ? (
            <ul
              id="look-pieces"
              className={styles.pieces}
              data-pieces-enter={piecesEnter ? '' : undefined}
              data-look-fade=""
              data-look-phase={piecesEnter ? undefined : lookPhase}
            >
              {lookProducts.map((product, index) => (
                <li
                  key={product.id}
                  style={{ '--stagger': String(index) } as CSSProperties}
                >
                  <button
                    type="button"
                    data-hover="ghost"
                    onClick={() => onOpenProduct(product.id)}
                  >
                    {messages.products[product.id]?.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <figure className={styles.photo} data-look-fade="" data-look-phase={lookPhase}>
          {looks.some((look) => look.image) ? (
            looks.map((look) =>
              look.image ? (
                <img
                  key={look.id}
                  src={look.image}
                  alt={look.id === displayed.id ? messages.looks.items[look.id].alt : ''}
                  width={1086}
                  height={1448}
                  loading="lazy"
                  decoding="async"
                  data-active={look.id === displayed.id ? 'true' : 'false'}
                  aria-hidden={look.id === displayed.id ? undefined : true}
                />
              ) : null,
            )
          ) : (
            <figcaption>{messages.looks.photo}</figcaption>
          )}
          <ul className={styles.points}>
            {lookProducts.map((product, index) => (
              <li key={product.id}>
                <button
                  type="button"
                  data-hover="circle"
                  onClick={() => onOpenProduct(product.id)}
                >
                  <span aria-hidden="true">{index + 1}</span>
                  <span className={styles.srOnly}>
                    {messages.products[product.id]?.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  )
}

export default Looks
