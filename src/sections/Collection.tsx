import { useState } from 'react'
import ProductCard from '../components/ProductCard.tsx'
import { products } from '../data/products.ts'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import { useReveal } from '../motion/useReveal.ts'
import { filterIds, type FilterId } from '../types.ts'
import styles from './Collection.module.css'

type CollectionProps = {
  onOpenProduct: (productId: string) => void
}

function Collection({ onOpenProduct }: CollectionProps) {
  const { messages } = useLocale()
  const { ref: leadRef } = useReveal<HTMLDivElement>()
  const { ref: gridRef, settle: settleGrid } = useReveal<HTMLDivElement>('stagger')
  const [filter, setFilter] = useState<FilterId>('all')
  const [filterGeneration, setFilterGeneration] = useState(0)
  const visibleProducts = products.filter((product) =>
    filter === 'all' ? true : product.category === filter,
  )

  function chooseFilter(next: FilterId) {
    if (next === filter) return
    setFilter(next)
    setFilterGeneration((value) => value + 1)
    settleGrid()
  }

  return (
    <section id="collection" className={styles.section} aria-labelledby="collection-title">
      <div ref={leadRef}>
        <header className={styles.intro}>
          <h2 id="collection-title">{messages.collection.title}</h2>
          <p>{messages.collection.subtitle}</p>
        </header>
        <div className={styles.filters} role="group" aria-label={messages.collection.filterLabel}>
          {filterIds.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.filter}
              aria-pressed={filter === item}
              onClick={() => chooseFilter(item)}
            >
              {item === 'all' ? messages.collection.all : messages.categories[item]}
            </button>
          ))}
        </div>
      </div>
      <div ref={gridRef} data-stagger-group="">
        <div
          key={filter}
          className={styles.grid}
          data-results={filterGeneration > 0 ? '' : undefined}
        >
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              stagger={Math.min(index, 3)}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collection
