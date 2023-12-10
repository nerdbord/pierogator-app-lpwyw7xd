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
import fakeDatabase from '@/fakeData/fakeData'
import { addDumpling } from '@/services/actions/addDumpling/addDumpling'
import { Ingredient } from '@/types/types'
import { format } from 'path'

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

const CreateDumpling = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  const {
    dumplingBase,
    resetBase,
    dumplingRecipe,
    setDumplingRecipe,
    setToast,
  } = useDumplingStore()

  const extractData = (apiResponse: string, key: string) => {
    const regex = new RegExp(`"${key}": \\[(.*?)\\]`, 's')
    const match = apiResponse.match(regex)
    return match && match[1] ? `[${match[1]}]` : null
  }

  const fetchRecipe = async () => {
    startTransition(async () => {
      try {
        const { ingredients, preparation, cookingServing } =
          await generateRecipe({
            doughDescription: dumplingBase.dough,
            ingredientsDescription: dumplingBase.ingredients,
          })

        const updateData = (data: string | null, key: string) => {
          if (data) {
            return JSON.parse(data)
          } else {
            const options = fakeDatabase[key]
            const randomIndex = Math.floor(Math.random() * options.length)
            return options[randomIndex]
          }
        }
        const newDumplingRecipe = {
          name: dumplingBase.name,
          imageSrc: dumplingBase.imgUrl,
          ingredients: {
            dough: updateData(extractData(ingredients, 'dough'), 'dough'),
            filling: updateData(extractData(ingredients, 'filling'), 'filling'),
          },
          instructions: {
            dough_preparation: updateData(
              extractData(preparation, 'dough_preparation'),
              'dough_preparation',
            ),
            filling_preparation: updateData(
              extractData(preparation, 'filling_preparation'),
              'filling_preparation',
            ),
            forming_and_cooking_dumplings: updateData(
              extractData(cookingServing, 'cooking'),
              'cooking',
            ),
            serving: updateData(
              extractData(cookingServing, 'serving'),
              'serving',
            ),
          },
        }

        setDumplingRecipe(newDumplingRecipe)
        console.log('Updated Dumpling Recipe:', newDumplingRecipe)
      } catch (error) {
        console.error('Error during ingredients generation:', error)
      }
    })
  }

  // TO NIŻEJ JEST OD KUBY TEMPLATKI JAKIEŚ, AKORDEON ZAKOMENTOWAŁEM BO TERAZ DANE SIE NIE ZGADZAJĄ
  const addDumplingAndNavigate = () => {
    startTransition(async () => {
      try {
        await addDumpling(tmpPayload)
        resetBase()
        router.push('/dumplinghub')
        setToast({ variant: 'success', msg: 'Yeah! Pieróg dodany ❤️‍🔥' })
      } catch (error) {
        console.error('Error adding dumpling:', error)
        setToast({ variant: 'error', msg: 'Ups! Coś poszło nie tak 😳' })
      }
    })
  }

  const tmpPayload = {
    name: dumplingBase.name,
    imageSrc: dumplingBase.imgUrl,
    ingredients: {
      dough: [
        { name: 'Flour', quantity: '2 cups' },
        { name: 'Water', quantity: '1 cup' },
      ],
      filling: [
        { name: 'Potatoes', quantity: '3 cups' },
        { name: 'Onion', quantity: '1 cup' },
      ],
    },
    instructions: {
      dough_preparation: ['Mix flour and water', 'Knead the dough'],
      filling_preparation: ['Cook potatoes', 'Chop onions'],
      forming_and_cooking_dumplings: [
        'Roll the dough',
        'Add filling and shape dumplings',
      ],
      serving: ['Boil dumplings', 'Serve hot'],
    },
  }

  const formatIngredients = (ingredients: Ingredients) => {
    return Object.keys(ingredients).map((category) => {
      return (
        <React.Fragment key={category}>
          <h3 className={styles.sectionTitle}>{category}:</h3>
          <ul className={styles.sectionItems}>
            {ingredients[category as keyof Ingredients].map((item, index) => (
              <li key={index}>{`${index + 1}. ${item.name} ${
                item.quantity
              }`}</li>
            ))}
          </ul>
        </React.Fragment>
      )
    })
  }

  const formatInstructions = (
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

  console.log(formatInstructions(dumplingRecipe.instructions))

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

      <>
        <div className={styles.accordionsWrapper}>
          <Accordion
            isAccordionOpen={true}
            header={'Składniki'}
            sections={formatIngredients(dumplingRecipe.ingredients)}
          />
          <Accordion
            isAccordionOpen={true}
            header={'Przygotowanie'}
            sections={formatInstructions(
              dumplingRecipe.instructions,
              'dough_preparation',
              'filling_preparation',
              'forming_and_cooking_dumplings',
            )}
          />

          <Accordion
            isAccordionOpen={true}
            header={'Podawanie'}
            sections={formatInstructions(
              dumplingRecipe.instructions,
              'serving',
            )}
          />
        </div>
        <Button
          variant="action"
          onClick={addDumplingAndNavigate}
          disabled={isPending}
        >
          {isPending ? 'Udostępnianie...' : 'Udostępnij pieroga'}
        </Button>
      </>
    </div>
  )
}

export default CreateDumpling
