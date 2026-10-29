<p align="center">
  <img src="frontend/public/nom-nom.png" alt="Nom Nom logo" width="140" />
</p>

# Nom Nom

Nom Nom is an AI-powered recipe suggester that answers the question *"what can I cook with what's already in my kitchen?"*

## What it does

1. **You list your ingredients.** Type them in one at a time (e.g. *chicken, tomato, basil*). Each one appears as a removable chip, and duplicates are ignored.
2. **You ask for recipes.** Clicking **Generate Recipes** sends the ingredient list to the backend.
3. **An AI model creates the recipes.** The backend asks an OpenAI model for up to three recipes that mainly use your ingredients. It assumes common pantry staples such as salt, oil and spices. The model replies in a fixed structure, so every recipe has the same fields.
4. **You browse the results.** Each recipe is shown as a colour-coded card with:
   - the recipe name and total cooking time
   - a short description
   - the full ingredient list
   - step-by-step instructions you can expand

The interface has a light and a dark theme. It follows your system setting by default, and the toggle in the top bar lets you switch and remembers your choice.

### Built-in safeguards

The app calls a paid AI API, so the backend protects it from misuse:

- **Input validation:** at most 20 ingredients, each up to 50 characters, allowing only letters, digits and basic punctuation.
- **Prompt-injection hardening:** your ingredients are passed to the model strictly as data, never as instructions.
- **Rate limiting:** each client can make a limited number of recipe requests per minute.
- **No secrets in code:** the API key is read from an environment variable and never stored in the repository.

## Tools and technologies

### Backend
- **Java 21**
- **Spring Boot 4** (Spring Web MVC), which provides the REST API at `/api/recipes/suggestions`
- **Spring AI 2**, using its `ChatClient` and structured output to turn the model's reply directly into Java objects
- **OpenAI**, the language model that writes the recipes
- **Lombok**, to cut boilerplate in the request and response data classes
- **Maven**, for the build and dependency management

### Frontend
- **React 19**, for the single-page user interface
- **Vite 8**, the dev server and build tool; in development it also forwards API calls to the backend
- **CSS Modules**, with styles scoped to each component and shared design tokens (CSS custom properties) for colours, type and shapes
- **DM Sans** (Google Fonts), the single typeface used across the UI
- **Oxlint**, for linting

