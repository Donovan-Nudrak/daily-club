import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { useCart } from '../cart/CartProvider.tsx'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import type { Product } from '../types.ts'
import { useModalDialog } from './useModalDialog.ts'
import styles from './ProductDialog.module.css'

type ProductDialogProps = {
  product: Product | null
  onClose: () => void
}

function ProductDialog({ product, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { add } = useCart()
  const { messages, formatPrice } = useLocale()
  const [notice, setNotice] = useState('')
  const copy = product ? messages.products[product.id] : undefined
  const images = product
    ? [product.image, product.alternateImage].filter(
        (image): image is string => Boolean(image),
      )
    : []

  useModalDialog(dialogRef, product !== null)

  useEffect(() => {
    setNotice('')
  }, [product?.id])

  function addProduct() {
    if (!product || !copy) return
    const quantity = add(product.id)
    if (quantity > 0) setNotice(messages.dialog.added(copy.name, quantity))
  }

  function closeIfOutside(event: MouseEvent<HTMLDialogElement>) {
    const panel = event.currentTarget.querySelector(`.${styles.panel}`)
    if (panel instanceof HTMLElement && panel.contains(event.target as Node)) return
    event.currentTarget.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-motion="pop"
      aria-labelledby={product ? titleId : undefined}
      onClick={closeIfOutside}
      onClose={onClose}
    >
      {product && copy ? (
        <div className={styles.panel}>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialogRef.current?.close()}
          >
            {messages.dialog.close}
          </button>
          {images.length > 0 ? (
            <div className={styles.images}>
              {images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${copy.name}, ${copy.color}`}
                  width={1086}
                  height={1448}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          ) : (
            <div className={styles.placeholder}>{messages.dialog.photo}</div>
          )}
          <div className={styles.details}>
            <h2 id={titleId} className={styles.name}>
              {copy.name}
            </h2>
            <p className={styles.description}>{copy.description}</p>
            <p className={styles.color}>{copy.color}</p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.add} data-hover="solid" onClick={addProduct}>
                {messages.dialog.add}
              </button>
            </div>
            <p className={styles.status} role="status">
              {notice}
            </p>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

export default ProductDialog
