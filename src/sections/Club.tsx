import { looks } from '../data/looks.ts'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import { useReveal } from '../motion/useReveal.ts'
import type { LookId } from '../types.ts'
import styles from './Club.module.css'

const sceneFrames: Record<LookId, string> = {
  '01': styles.cafe,
  '02': styles.records,
  '03': styles.walk,
}

function Club() {
  const { messages } = useLocale()
  const { ref: leadRef } = useReveal<HTMLDivElement>()
  const { ref: bodyRef } = useReveal<HTMLDivElement>()

  return (
    <section id="club" className={styles.section} aria-labelledby="club-title">
      <div ref={leadRef}>
        <header className={styles.intro}>
          <h2 id="club-title">{messages.club.title}</h2>
          <p>{messages.club.subtitle}</p>
        </header>
        <p className={styles.story}>{messages.club.story}</p>
      </div>
      <div ref={bodyRef} data-delay="1">
        <div className={styles.photos}>
          {looks.map((look) => {
            const scene = messages.club.scenes[look.id]
            return (
              <figure key={look.id} className={styles.photo}>
                {look.image ? (
                  <img
                    className={sceneFrames[look.id]}
                    src={look.image}
                    alt={scene.alt}
                    width={1086}
                    height={1448}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <figcaption className={styles.srOnly}>{scene.label}</figcaption>
              </figure>
            )
          })}
        </div>
        <p className={styles.closing}>{messages.club.closing}</p>
        <a className={styles.back} href="#collection" data-hover="solid">
          {messages.club.back}
        </a>
      </div>
    </section>
  )
}

export default Club
