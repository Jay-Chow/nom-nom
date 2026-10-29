import styles from './RecipeCard.module.css'

// Warm product-card tones matching the logo, cycled across the results grid
const TONES = ['orange', 'amber', 'terracotta', 'olive']

function RecipeCard({ recipe, index = 0 }) {
  const { name, description, ingredients = [], steps = [], cookingTimeMinutes } = recipe
  const tone = TONES[index % TONES.length]

  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        {typeof cookingTimeMinutes === 'number' && (
          <span className={styles.time}>{cookingTimeMinutes} min</span>
        )}
      </div>

      {description && <p className={styles.description}>{description}</p>}

      {ingredients.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Ingredients</h4>
          <ul className={styles.ingredientList}>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {steps.length > 0 && (
        <details className={styles.steps}>
          <summary className={styles.sectionTitle}>Steps</summary>
          <ol className={styles.stepList}>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </details>
      )}
    </article>
  )
}

export default RecipeCard
