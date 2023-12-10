import React from 'react'

import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { Accordion } from '@/components/Accordion/Accordion'
import BigImage from '@/components/BigImage/BigImage'
import { getRecipe } from '@/services/actions/getRecipe/getRecipe'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { DumplingRecipe } from '@/types/types'
import {
  ingredientsContent,
  instructionsContent,
} from '@/components/Accordion/AccordionContent/AccordionContent'

const Dumpling = async ({ params }: { params: { id: string } }) => {
  const { recipe }: { recipe: DumplingRecipe } = await getRecipe(params.id)

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <GoBackButton>Wróć</GoBackButton>
        <SectionHeader>Pieróg</SectionHeader>
      </div>
      <div className={styles.myDumplingsContainer}>
        <BigImage src={recipe.imageSrc} />
        <TextFieldSingle value={recipe.name} disabled={true} />
      </div>
      <div className={styles.headerWrapperFlexEnd}>
        <SectionHeader>Przepis</SectionHeader>
      </div>
      <div className={styles.accordionsWrapper}>
        <Accordion
          header={'Składniki'}
          isAccordionOpen={true}
          sections={ingredientsContent(recipe.ingredients)}
        />
        <Accordion
          header={'Przygotowanie'}
          isAccordionOpen={true}
          sections={instructionsContent(
            recipe.instructions,
            'dough_preparation',
            'filling_preparation',
            'forming_and_cooking_dumplings',
          )}
        />
        <Accordion
          header={'Podawanie'}
          isAccordionOpen={true}
          sections={instructionsContent(recipe.instructions, 'serving')}
        />
      </div>
    </div>
  )
}

export default Dumpling
