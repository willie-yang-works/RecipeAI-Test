export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: string
  difficulty: string
  ingredients: {
    name: string
    amount: string
  }[]
  steps: string[]
  tips?: string
}
