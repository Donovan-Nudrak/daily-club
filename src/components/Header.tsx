import { useEffect, useRef, useState } from 'react'
import { useCart } from '../cart/CartProvider.tsx'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import { ProfileIcon, profiles } from './ProfileLinks.tsx'
import styles from './Header.module.css'

type HeaderProps = {
  onOpenCart: () => void
}

function Header({ onOpenCart }: HeaderProps) {
  const { locale, setLocale, messages } = useLocale()
  const { count } = useCart()
  const previousCount = useRef(count)
  const headerRef = useRef<HTMLElement>(null)
  const [pulse, setPulse] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (count > previousCount.current) setPulse((value) => value + 1)
    previousCount.current = count
  }, [count])

  useEffect(() => {
    if (!menuOpen) return

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className={styles.header}>
      <a className={styles.wordmark} href="#top">
        DAILY CLUB
      </a>
      <div className={styles.tools}>
        <div className={styles.languages} role="group" aria-label={messages.language.label}>
          <button
            type="button"
            lang="es"
            aria-pressed={locale === 'es'}
            onClick={() => setLocale('es')}
          >
            ES
          </button>
          <button
            type="button"
            lang="en"
            aria-pressed={locale === 'en'}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
        </div>
        <button
          type="button"
          className={styles.cartButton}
          data-hover="ghost"
          aria-haspopup="dialog"
          aria-controls="cart-panel"
          aria-label={messages.cart.open(count)}
          onClick={onOpenCart}
        >
          <span aria-hidden="true">{messages.cart.label}</span>
          <span
            key={pulse}
            className={styles.count}
            data-pulse={pulse > 0 ? '' : undefined}
            aria-hidden="true"
          >
            {count}
          </span>
        </button>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? messages.nav.closeMenu : messages.nav.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <nav
        id="site-nav"
        className={styles.nav}
        data-open={menuOpen ? '' : undefined}
        aria-label={messages.nav.label}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('a')) setMenuOpen(false)
        }}
      >
        <button
          type="button"
          className={styles.menuClose}
          aria-label={messages.nav.closeMenu}
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">×</span>
        </button>
        <ul className={styles.navList}>
          <li>
            <a href="#collection">{messages.nav.collection}</a>
          </li>
          <li>
            <a href="#looks">{messages.nav.looks}</a>
          </li>
          <li>
            <a href="#club">{messages.nav.club}</a>
          </li>
        </ul>
        <div className={styles.menuCredit}>
          <p className={styles.menuCreator}>{messages.footer.creator}</p>
          <p className={styles.menuPrompt}>{messages.footer.prompt}</p>
          <ul className={styles.menuProfiles}>
            {profiles.map((profile) => (
              <li key={profile.id}>
                <a href={profile.href} target="_blank" rel="noreferrer">
                  <ProfileIcon id={profile.id} className={styles.menuIcon} />
                  {messages.footer[profile.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
