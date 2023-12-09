export interface DumplingBase {
  name: string
  imgUrl: string
  ingredients: string
  dough: string
  filling: string
}

export interface Ingredient {
  [key: string]: string
}

export interface DumplingRecipe {
  _id?: string
  __v?: number
  name: string
  imageSrc: string
  ingredients: {
    dough: Ingredient[]
    filling: Ingredient[]
  }
  instructions: {
    dough_preparation: string[]
    filling_preparation: string[]
    forming_and_cooking_dumplings: string[]
    serving: string[]
  }
}
