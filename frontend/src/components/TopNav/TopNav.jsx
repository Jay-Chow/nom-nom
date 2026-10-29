import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './TopNav.module.css'

function TopNav() {
  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={styles.inner}>
        <a href="/" className={styles.brand}>
          <img src="/nom-nom.png" alt="" className={styles.logo} width="40" height="40" />
          <span className={styles.wordmark}>Nom Nom</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default TopNav
