import styles from './Hero.module.css'

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Cook something good with what&rsquo;s already in your kitchen.
        </h1>
        <p className={styles.subtitle}>
          List out your ingredients and get recipe ideas built around them &mdash; no
          grocery run required.
        </p>
      </div>
    </header>
  )
}

export default Hero
