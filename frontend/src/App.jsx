import { useState } from 'react'
import TopNav from './components/TopNav/TopNav'
import Hero from './components/Hero/Hero'
import IngredientInput from './components/IngredientInput/IngredientInput'
import IngredientChip from './components/IngredientChip/IngredientChip'
import RecipeResults from './components/RecipeResults/RecipeResults'
import { fetchRecipeSuggestions } from './services/recipeService'
import './App.css'

// Mirrors the backend limit in AiController
const MAX_INGREDIENTS = 20

function App() {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  function handleAddIngredient(name) {
    setIngredients((prev) =>
      prev.length >= MAX_INGREDIENTS ||
      prev.some((ingredient) => ingredient.toLowerCase() === name.toLowerCase())
        ? prev
        : [...prev, name],
    )
  }

  function handleRemoveIngredient(name) {
    setIngredients((prev) => prev.filter((ingredient) => ingredient !== name))
  }

  async function handleGenerate() {
    if (ingredients.length === 0) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const results = await fetchRecipeSuggestions(ingredients)
      setRecipes(results)
      setStatus('success')
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      <TopNav />
      <Hero />
      <main className="content">
        <section className="ingredientPanel" aria-label="Your ingredients">
          <IngredientInput
            onAdd={handleAddIngredient}
            disabled={ingredients.length >= MAX_INGREDIENTS}
          />

          {ingredients.length > 0 && (
            <ul className="chipList" aria-label="Selected ingredients">
              {ingredients.map((ingredient) => (
                <li key={ingredient}>
                  <IngredientChip
                    label={ingredient}
                    onRemove={() => handleRemoveIngredient(ingredient)}
                  />
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="generateButton"
            disabled={ingredients.length === 0 || status === 'loading'}
            onClick={handleGenerate}
          >
            {status === 'loading' ? 'Cooking up ideas…' : 'Generate Recipes'}
          </button>
        </section>

        <section className="resultsSection" aria-label="Recipe suggestions">
          <RecipeResults status={status} recipes={recipes} errorMessage={errorMessage} />
        </section>
      </main>
    </>
  )
}

export default App
