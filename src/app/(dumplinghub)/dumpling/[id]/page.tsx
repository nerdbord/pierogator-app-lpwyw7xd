import React from 'react'

import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import styles from './page.module.scss'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { Accordion } from '@/components/Accordion/Accordion'
import BigImage from '@/components/BigImage/BigImage'
import { getRecipe } from '@/services/actions/getRecipe/getRecipe'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import { DumplingRecipe } from '@/types/types'

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
        <Accordion header={'Składniki'} isAccordionOpen={false}/>
        <Accordion header={'Przygotowanie'} isAccordionOpen={false}/>
        <Accordion header={'Podawanie'} isAccordionOpen={false}/>
      </div>
    </div>
  )
}

export default Dumpling
