/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useTransition } from 'react'
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
import BigImage from '@/components/BigImage/BigImage'
import fakeDatabase from '@/fakeData/fakeData'
import { addDumpling } from '@/services/actions/addDumpling/addDumpling'
import {
  ingredientsContent,
  instructionsContent,
} from '@/components/Accordion/AccordionContent/AccordionContent'
import NavigateButton from '@/components/NavigateButton/NavigateButton'
import { AppRoutes } from '@/utils/routes'

const extractData = (apiResponse: string, key: string) => {
  const regex = new RegExp(`"${key}": \\[(.*?)\\]`, 's')
  const match = apiResponse.match(regex)
  return match && match[1] ? `[${match[1]}]` : null
}

const CreateDumpling = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    dumplingBase,
    resetBase,
    dumplingRecipe,
    setDumplingRecipe,
    setToast,
  } = useDumplingStore()

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

  const addDumplingAndNavigate = () => {
    startTransition(async () => {
      if (dumplingRecipe) {
        try {
          await addDumpling(dumplingRecipe)
          resetBase()
          router.push('/dumplinghub')
          setToast({ variant: 'success', msg: 'Yeah! Pieróg dodany ❤️‍🔥' })
        } catch (error) {
          console.error('Error adding dumpling:', error)
          setToast({ variant: 'error', msg: 'Ups! Coś poszło nie tak 😳' })
        }
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Pieróg</SectionHeader>
        <NavigateButton url={AppRoutes.home}>Zmień</NavigateButton>
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
      {dumplingRecipe && (
        <>
          <div className={styles.accordionsWrapper}>
            <Accordion
              isAccordionOpen={true}
              header={'Składniki'}
              sections={ingredientsContent(dumplingRecipe.ingredients)}
            />
            <Accordion
              isAccordionOpen={true}
              header={'Przygotowanie'}
              sections={instructionsContent(
                dumplingRecipe.instructions,
                'dough_preparation',
                'filling_preparation',
                'forming_and_cooking_dumplings',
              )}
            />
            <Accordion
              isAccordionOpen={true}
              header={'Podawanie'}
              sections={instructionsContent(
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
      )}
    </div>
  )
}

export default CreateDumpling
