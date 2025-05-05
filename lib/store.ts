import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Recipe } from "../types"

interface IngredientsState {
  ingredients: string[]
  addIngredient: (ingredient: string) => void
  removeIngredient: (ingredient: string) => void
  clearIngredients: () => void
}

interface RecipesState {
  recipes: Recipe[]
  setRecipes: (recipes: Recipe[]) => void
  clearRecipes: () => void
}

interface FavoritesState {
  favorites: Recipe[]
  addFavorite: (recipe: Recipe) => void
  removeFavorite: (id: string) => void
  clearFavorites: () => void
}

export const useIngredients = create<IngredientsState>()(
  persist(
    (set) => ({
      ingredients: [],
      addIngredient: (ingredient) =>
        set((state) => ({
          ingredients: state.ingredients.includes(ingredient) ? state.ingredients : [...state.ingredients, ingredient],
        })),
      removeIngredient: (ingredient) =>
        set((state) => ({
          ingredients: state.ingredients.filter((i) => i !== ingredient),
        })),
      clearIngredients: () => set({ ingredients: [] }),
    }),
    {
      name: "ingredients-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useRecipes = create<RecipesState>()(
  persist(
    (set) => ({
      recipes: [],
      setRecipes: (recipes) => set({ recipes }),
      clearRecipes: () => set({ recipes: [] }),
    }),
    {
      name: "recipes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (recipe) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === recipe.id)
            ? state.favorites
            : [...state.favorites, recipe],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((recipe) => recipe.id !== id),
        })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
