import { ProfileIcon, profiles } from '../components/ProfileLinks.tsx'
import { useLocale } from '../i18n/LocaleProvider.tsx'
import styles from './Footer.module.css'

function Footer() {
  const { messages } = useLocale()

  return (
    <footer className={styles.footer}>
      <a className={styles.wordmark} href="#top">
        DAILY CLUB
      </a>
      <nav aria-label={messages.nav.footer}>
        <ul className={styles.links}>
          <li>
            <a href="#top">{messages.nav.home}</a>
          </li>
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
      </nav>
      <p className={styles.note}>{messages.footer.note}</p>
      <div className={styles.credit}>
        <p className={styles.creator}>{messages.footer.creator}</p>
        <p className={styles.prompt}>{messages.footer.prompt}</p>
        <nav aria-label={messages.footer.linksLabel}>
          <ul className={styles.profiles}>
            {profiles.map((profile) => (
              <li key={profile.id}>
                <a href={profile.href} target="_blank" rel="noreferrer" data-hover="ghost">
                  <ProfileIcon id={profile.id} className={styles.icon} />
                  {messages.footer[profile.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
