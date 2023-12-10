import React from 'react'
import { Ingredient } from '@/types/types'
import styles from './AccordionContent.module.scss'

interface Ingredients {
  dough: Ingredient[]
  filling: Ingredient[]
}

interface Instructions {
  dough_preparation: string[]
  filling_preparation: string[]
  forming_and_cooking_dumplings: string[]
  serving: string[]
}

export const ingredientsContent = (ingredients: Ingredients) => {
  return Object.keys(ingredients).map((category) => {
    return (
      <React.Fragment key={category}>
        <h3 className={styles.sectionTitle}>{category}:</h3>
        <ul className={styles.sectionItems}>
          {ingredients[category as keyof Ingredients].map((item, index) => (
            <li key={index}>{`${index + 1}. ${item.name} ${item.quantity}`}</li>
          ))}
        </ul>
      </React.Fragment>
    )
  })
}

export const instructionsContent = (
  instructions: Instructions,
  ...sections: string[]
) => {
  return sections.map((category) => (
    <React.Fragment key={category}>
      <h3 className={styles.sectionTitle}>{category.replace(/_/g, ' ')}:</h3>
      <ul className={styles.sectionItems}>
        {instructions[category as keyof Instructions].map((step, index) => (
          <li key={index}>{`${index + 1}. ${step}`}</li>
        ))}
      </ul>
    </React.Fragment>
  ))
}
