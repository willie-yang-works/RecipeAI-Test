import { useRecipes } from "./store"
import type { Recipe } from "../types"

// This is a mock implementation of AI recipe generation
// In a real app, you would connect to an AI service like OpenAI
export async function generateRecipe(ingredients: string[]): Promise<Recipe[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const { setRecipes } = useRecipes.getState()

  // Generate mock recipes based on ingredients
  const recipes = generateMockRecipes(ingredients)

  // Store recipes in global state
  setRecipes(recipes)

  return recipes
}

function generateMockRecipes(ingredients: string[]): Recipe[] {
  // This is where you would normally call an AI API
  // For now, we'll return mock data based on ingredients

  const recipes: Recipe[] = [
    {
      id: `recipe-${Date.now()}-1`,
      title: `${ingredients[0]} ${ingredients.length > 1 ? `& ${ingredients[1]}` : ""} Delight`,
      description: `A delicious recipe using ${ingredients.join(", ")} that's perfect for any occasion.`,
      image: "https://source.unsplash.com/random/400x300/?food",
      cookTime: "30 mins",
      difficulty: "Medium",
      ingredients: ingredients.map((ing) => ({
        name: ing,
        amount: `${Math.floor(Math.random() * 3) + 1} ${Math.random() > 0.5 ? "cups" : "tbsp"}`,
      })),
      steps: [
        `Prepare the ${ingredients[0]} by washing thoroughly.`,
        `Combine all ingredients in a large bowl.`,
        `Cook on medium heat for 15 minutes.`,
        `Serve hot and enjoy!`,
      ],
      tips: `For best results, use fresh ${ingredients[0]}.`,
    },
    {
      id: `recipe-${Date.now()}-2`,
      title: `Quick ${ingredients[Math.floor(Math.random() * ingredients.length)]} Bowl`,
      description: `A simple and nutritious meal using ingredients you already have.`,
      image: "https://source.unsplash.com/random/400x300/?bowl",
      cookTime: "15 mins",
      difficulty: "Easy",
      ingredients: ingredients.map((ing) => ({
        name: ing,
        amount: `${Math.floor(Math.random() * 3) + 1} ${Math.random() > 0.5 ? "oz" : "pieces"}`,
      })),
      steps: [
        `Chop all ingredients into bite-sized pieces.`,
        `Heat oil in a pan over medium heat.`,
        `Add ingredients and stir-fry for 10 minutes.`,
        `Season to taste and serve.`,
      ],
      tips: `This recipe is very flexible - feel free to substitute ingredients based on what you have.`,
    },
  ]

  return recipes
}
