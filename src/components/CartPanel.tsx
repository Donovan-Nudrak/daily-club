import { useEffect, useId, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react'
import { useCart } from '../cart/CartProvider.tsx'
import { products } from '../data/products.ts'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import { useModalDialog } from './useModalDialog.ts'
import styles from './CartPanel.module.css'

type CartPanelProps = {
  open: boolean
  onClose: () => void
}

function CartPanel({ open, onClose }: CartPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const noticeRef = useRef<HTMLDialogElement>(null)
  const buyRef = useRef<HTMLButtonElement>(null)
  const noticeOpenRef = useRef(false)
  const titleId = useId()
  const noticeTitleId = useId()
  const [noticeOpen, setNoticeOpen] = useState(false)
  const { lines, increase, decrease, remove } = useCart()
  const { messages, formatPrice } = useLocale()
  useModalDialog(dialogRef, open)
  useModalDialog(noticeRef, open && noticeOpen)

  useEffect(() => {
    if (open) return
    setNoticeOpen(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const frame = requestAnimationFrame(() => {
      if (noticeRef.current?.open) return
      dialog?.querySelector<HTMLElement>('button')?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open || !noticeOpen) return
    const notice = noticeRef.current
    const frame = requestAnimationFrame(() => {
      notice?.querySelector<HTMLElement>('button')?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open, noticeOpen])

  const subtotal = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id)
    return sum + (product ? product.price * line.quantity : 0)
  }, 0)

  function explore(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    dialogRef.current?.close()
    window.location.hash = 'collection'
    requestAnimationFrame(() => {
      document.getElementById('collection')?.scrollIntoView()
    })
  }

  function closeNotice() {
    if (noticeRef.current?.open) noticeRef.current.close()
  }

  function keepCartOpen(event: SyntheticEvent) {
    if (!noticeOpenRef.current && !noticeRef.current?.open) return
    event.preventDefault()
    closeNotice()
  }

  function removeLine(id: string) {
    const dialog = dialogRef.current
    remove(id)
    requestAnimationFrame(() => {
      if (!dialog?.contains(document.activeElement)) {
        dialog?.querySelector<HTMLElement>('button')?.focus()
      }
    })
  }

  return (
    <>
    <dialog
      ref={dialogRef}
      id="cart-panel"
      className={styles.dialog}
      data-motion="drawer"
      aria-labelledby={titleId}
      onCancel={keepCartOpen}
      onClose={onClose}
    >
      <div className={styles.panel} inert={noticeOpen}>
        <div className={styles.toolbar}>
          <h2 id={titleId} className={styles.title}>
            {messages.cart.title}
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialogRef.current?.close()}
          >
            {messages.cart.close}
          </button>
        </div>
        <div className={styles.body}>
        <p className={styles.note}>{messages.cart.demo}</p>
        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>{messages.cart.empty}</p>
            <a className={styles.explore} href="#collection" data-hover="solid" onClick={explore}>
              {messages.cart.explore}
            </a>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {lines.map((line) => {
                const product = products.find((item) => item.id === line.id)
                const copy = messages.products[line.id]
                if (!product || !copy) return null
                return (
                  <li key={line.id} className={styles.item}>
                    <div className={styles.thumb}>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={`${copy.name}, ${copy.color}`}
                          width={1086}
                          height={1448}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className={styles.placeholder}>{messages.card.photo}</span>
                      )}
                    </div>
                    <div className={styles.details}>
                      <p className={styles.name}>{copy.name}</p>
                      <p className={styles.meta}>{copy.color}</p>
                      <p className={styles.meta}>
                        <span className={styles.srOnly}>{messages.cart.unitPrice}: </span>
                        {formatPrice(product.price)}
                      </p>
                      <div className={styles.quantity}>
                        <button
                          type="button"
                          aria-label={messages.cart.decrease(copy.name)}
                          disabled={line.quantity === 1}
                          onClick={() => decrease(line.id)}
                        >
                          −
                        </button>
                        <span aria-live="polite" aria-atomic="true">
                          <span className={styles.srOnly}>
                            {messages.cart.quantity(copy.name, line.quantity)}
                          </span>
                          <span aria-hidden="true">{line.quantity}</span>
                        </span>
                        <button
                          type="button"
                          aria-label={messages.cart.increase(copy.name)}
                          onClick={() => increase(line.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        aria-label={messages.cart.remove(copy.name)}
                        onClick={() => removeLine(line.id)}
                      >
                        {messages.cart.removeLabel}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        </div>
        <div className={styles.footer}>
          <p className={styles.subtotal}>
            <span>{messages.cart.subtotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </p>
          <button
            ref={buyRef}
            type="button"
            className={styles.buy}
            data-hover="solid"
            disabled={lines.length === 0}
            aria-haspopup="dialog"
            aria-controls="purchase-notice"
            onClick={() => {
              noticeOpenRef.current = true
              setNoticeOpen(true)
            }}
          >
            {messages.cart.buy}
          </button>
        </div>
      </div>
    </dialog>
    <dialog
      ref={noticeRef}
      id="purchase-notice"
      className={styles.notice}
      data-motion="pop"
      aria-labelledby={noticeTitleId}
      onClose={() => {
        setNoticeOpen(false)
        requestAnimationFrame(() => {
          noticeOpenRef.current = false
          if (dialogRef.current?.open) buyRef.current?.focus()
        })
      }}
    >
      <h2 id={noticeTitleId} className={styles.noticeTitle}>
        {messages.cart.purchaseTitle}
      </h2>
      <p className={styles.noticeMessage}>{messages.cart.purchaseMessage}</p>
      <button
        type="button"
        className={styles.keep}
        data-hover="solid"
        onClick={closeNotice}
      >
        {messages.cart.keepExploring}
      </button>
    </dialog>
    </>
  )
}

export default CartPanel
