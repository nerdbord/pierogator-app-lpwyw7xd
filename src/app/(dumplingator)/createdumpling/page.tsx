/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState, useTransition } from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import { Accordion } from '@/components/Accordion/Accordion'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { generateRecipe } from '@/services/actions/generateRecipe/generateRecipe'
import Image from 'next/image'
import BigImage from '@/components/BigImage/BigImage'

const CreateDumpling = () => {
  const parseRecipeData = (doughData: string, fillingData: string) => {
    const formatText = (text: string) =>
      text
        .replace(/[$#]/g, ' ')
        .replace(/^[^:]*:/gm, '')
        .replace(/(\d+\.)\s/g, '|NEWLINE|$1 ')
        .trim()

    const splitDoughData = doughData.split('%')
    const ingredientsDough = formatText(splitDoughData[0])
    const preparationDough = formatText(splitDoughData[1])

    const splitFillingData = fillingData.split('%')
    const ingredientsFilling = formatText(splitFillingData[0])
    const preparationFilling = formatText(splitFillingData[1].split('&')[0])
    const cookingMethod = formatText(
      splitFillingData[1].split('&')[1].split('^')[0],
    )
    const servingMethod = formatText(splitFillingData[1].split('^')[1])

    return {
      ingredientsDough,
      preparationDough,
      ingredientsFilling,
      preparationFilling,
      cookingMethod,
      servingMethod,
    }
  }

  const createMarkup = (text: string) => {
    const newText = text.split('|NEWLINE|').map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
        <br />
      </React.Fragment>
    ))
    return newText
  }

  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }
  const handleNavigate = () => {
    router.push('/dumplinghub')
  }
  const [parsedRecipe, setParsedRecipe] = useState({
    ingredientsDough: '',
    preparationDough: '',
    ingredientsFilling: '',
    preparationFilling: '',
    cookingMethod: '',
    servingMethod: '',
  })
  const { dumplingBase } = useDumplingStore()

  const fetchRecipe = () => {
    startTransition(async () => {
      try {
        const { doughIngredients, fillingIngredients } = await generateRecipe({
          doughDescription: dumplingBase.dough,
          ingredientsDescription: dumplingBase.ingredients,
        })
        const parsedData = parseRecipeData(doughIngredients, fillingIngredients)
        setParsedRecipe(parsedData)
      } catch (error) {
        console.error('Error generating recipe:', error)
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Pieróg</SectionHeader>
        <Button onClick={handleBackClick}>Zmień</Button>
      </div>
      <BigImage src={dumplingBase.imgUrl} />
      <div className={styles.dumlingNameWrapper}>
        <TextFieldSingle value={dumplingBase.name} disabled={true} />
      </div>
      <div className={styles.headerWrapper}>
        <SectionHeader>Przepis</SectionHeader>
        <div className={styles.buttonWrapper}>
          {isPending && <Loader />}
          <Button onClick={fetchRecipe}>Generuj</Button>
        </div>
      </div>
      <TextField
        label="Uwagi do przepisu"
        placeholder="chrupiące pierogi bez pieczenia, bez użycia miksera"
        iconState="none"
        onChange={() => console.log('yumyum')}
      />
      <div className={styles.accordionsWrapper}>
        <Accordion
          header={'Składniki'}
          title1="Ciasto"
          title2="Farsz"
          item1={createMarkup(parsedRecipe.ingredientsDough)}
          item2={createMarkup(parsedRecipe.ingredientsFilling)}
        />
        <Accordion
          header={'Przygotowanie'}
          title1="Ciasto"
          title2="Farsz"
          title3="Formowanie i gotowanie pierogów:"
          item1={createMarkup(parsedRecipe.preparationDough)}
          item2={createMarkup(parsedRecipe.preparationFilling)}
          item3={createMarkup(parsedRecipe.cookingMethod)}
        />
        <div className={styles.servingWrapper}>
          <Accordion
            header={'Podawanie'}
            title1=""
            item1={createMarkup(parsedRecipe.servingMethod)}
          />
        </div>
      </div>
      <Button variant="action" onClick={handleNavigate}>
        Udostępnij pieroga
      </Button>
    </div>
  )
}

export default CreateDumpling
