import styles from './IngredientChip.module.css'

function IngredientChip({ label, onRemove }) {
  return (
    <span className={styles.chip}>
      {label}
      <button
        type="button"
        className={styles.remove}
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        &times;
      </button>
    </span>
  )
}

export default IngredientChip
