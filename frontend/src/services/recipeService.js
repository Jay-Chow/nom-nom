const SUGGESTIONS_ENDPOINT = '/api/recipes/suggestions'

/**
 * Requests recipe suggestions for a list of ingredients.
 * @param {string[]} ingredients
 * @returns {Promise<Array<{name: string, description: string, ingredients: string[], steps: string[], cookingTimeMinutes: number}>>}
 */
export async function fetchRecipeSuggestions(ingredients) {
  const response = await fetch(SUGGESTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  })

  if (response.status === 429) {
    throw new Error('Too many requests. Please wait a minute and try again.')
  }
  if (response.status === 400) {
    throw new Error('Please check your ingredients: use plain food names (letters, numbers, basic punctuation).')
  }
  if (!response.ok) {
    throw new Error(`Recipe request failed (status ${response.status})`)
  }

  const data = await response.json()
  return data.recipes ?? []
}
