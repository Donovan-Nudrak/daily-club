import { looks, portraitImage } from '../data/looks.ts'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import styles from './Hero.module.css'

function Hero() {
  const { messages } = useLocale()
  const mainImage = looks.find((look) => look.id === '01')?.image

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.edition}>THE DAILY EDIT / VOL. 01</p>
        <div className={styles.statement}>
          <h1 id="hero-title" className={styles.title} data-hero="title">
            <span>DAILY</span>
            <span>CLUB</span>
          </h1>
          <p className={styles.phrase} data-hero="phrase">
            <em>{messages.hero.phrase}</em>
          </p>
          <p className={styles.promise} data-hero="promise">
            {messages.hero.promise}
          </p>
          <a className={styles.cta} href="#collection" data-hero="cta" data-hover="solid">
            {messages.hero.cta}
          </a>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.frame}>
          <figure className={styles.mainPhoto} data-hero="photo">
            {mainImage ? (
              <img
                src={mainImage}
                alt={messages.hero.mainAlt}
                width={1086}
                height={1448}
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
          </figure>
          <figure className={styles.portrait} data-hero="portrait">
            <img
              src={portraitImage}
              alt={messages.hero.portraitAlt}
              width={1086}
              height={1448}
              decoding="async"
            />
            <span className={styles.badge}>NEW</span>
          </figure>
        </div>
        <svg className={styles.motif} viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <linearGradient
              id="hero-chrome"
              x1="18"
              y1="12"
              x2="142"
              y2="148"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#f7f8f8" />
              <stop offset="30%" stopColor="#c5ccd4" />
              <stop offset="48%" stopColor="#8d97a2" />
              <stop offset="64%" stopColor="#f3f5f7" />
              <stop offset="100%" stopColor="#a8b0b8" />
            </linearGradient>
          </defs>
          <ellipse
            cx="80"
            cy="80"
            rx="72"
            ry="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            transform="rotate(-28 80 80)"
          />
          <path
            fill="url(#hero-chrome)"
            d="M80 16 91 69 144 80 91 91 80 144 69 91 16 80 69 69 Z"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
