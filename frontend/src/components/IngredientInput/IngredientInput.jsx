import { useState } from 'react'
import styles from './IngredientInput.module.css'

// Mirrors the backend limit in AiController
const MAX_INGREDIENT_LENGTH = 50

function IngredientInput({ onAdd, disabled = false }) {
  const [value, setValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="ingredient-input" className={styles.label}>
        Add an ingredient
      </label>
      <div className={styles.field}>
        <input
          id="ingredient-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="e.g. chicken, tomato, basil"
          className={styles.input}
          autoComplete="off"
          maxLength={MAX_INGREDIENT_LENGTH}
          disabled={disabled}
        />
        <button type="submit" className={styles.addButton} disabled={disabled || !value.trim()}>
          Add
        </button>
      </div>
    </form>
  )
}

export default IngredientInput
