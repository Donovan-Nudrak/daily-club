import type { CSSProperties } from 'react'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import type { Product } from '../types.ts'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  stagger?: number
  onOpen: (productId: string) => void
}

function ProductCard({ product, stagger = 0, onOpen }: ProductCardProps) {
  const { messages } = useLocale()
  const copy = messages.products[product.id]

  return (
    <article
      className={styles.card}
      data-stagger=""
      style={{ '--stagger': String(stagger) } as CSSProperties}
    >
      <button
        type="button"
        className={styles.mediaButton}
        data-zoom=""
        onClick={() => onOpen(product.id)}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={copy ? `${copy.name}, ${copy.color}` : messages.card.photo}
            width={1086}
            height={1448}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.placeholder}>{messages.card.photo}</span>
        )}
      </button>
      <div className={styles.body}>
        <h3 className={styles.name}>{copy?.name}</h3>
        <p className={styles.meta}>{messages.categories[product.category]}</p>
        <p className={styles.meta}>{copy?.color}</p>
      </div>
      <button
        type="button"
        className={styles.open}
        data-hover="circle"
        aria-label={messages.card.open(copy?.name ?? product.id)}
        onClick={() => onOpen(product.id)}
      >
        <span aria-hidden="true">+</span>
      </button>
    </article>
  )
}

export default ProductCard
