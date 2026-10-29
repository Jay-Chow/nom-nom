import RecipeCard from '../RecipeCard/RecipeCard'
import styles from './RecipeResults.module.css'

function RecipeResults({ status, recipes, errorMessage }) {
  if (status === 'loading') {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <p>Cooking up some ideas&hellip;</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.error} role="alert">
        <p className={styles.errorTitle}>Couldn&rsquo;t fetch recipes</p>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    )
  }

  if (status === 'success') {
    if (!recipes || recipes.length === 0) {
      return (
        <p className={styles.empty}>
          No recipes came back for those ingredients. Try adding a few more.
        </p>
      )
    }

    return (
      <div className={styles.grid}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.name ?? index} recipe={recipe} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.idle}>
      <p className={styles.idleEyebrow}>Next step</p>
      <p className={styles.idleText}>
        Add a few ingredients above, then hit &ldquo;Generate Recipes&rdquo; to see what you
        can make.
      </p>
    </div>
  )
}

export default RecipeResults
