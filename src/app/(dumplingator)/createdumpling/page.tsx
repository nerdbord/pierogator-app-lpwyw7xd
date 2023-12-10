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

const CreateDumpling = () => {
 
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }


  const { dumplingBase, resetBase, setDumplingRecipe, setToast } = useDumplingStore()

  const extractData = (apiResponse: string, key: string) => {
    const regex = new RegExp(`"${key}": \\[(.*?)\\]`, 's');
    const match = apiResponse.match(regex);
    return match && match[1] ? `[${match[1]}]` : null;
  };

  const fetchRecipe = async () => {
    startTransition(async () => {
      try {
        const { ingredients, preparation, cookingServing } = await generateRecipe({
          doughDescription: dumplingBase.dough,
          ingredientsDescription: dumplingBase.ingredients,
        });

        const updateData = (data: string | null, key: string) => {
          if (data) {
            return JSON.parse(data);
          } else {
            const options = fakeDatabase[key];
            const randomIndex = Math.floor(Math.random() * options.length);
            return options[randomIndex];
          }
        };
        const newDumplingRecipe = {
          name: dumplingBase.name,
          imageSrc: dumplingBase.imgUrl,
          ingredients: { 
            dough: updateData(extractData(ingredients, 'dough'), 'dough'),
            filling: updateData(extractData(ingredients, 'filling'), 'filling')
          },
          instructions: {
            dough_preparation: updateData(extractData(preparation, 'dough_preparation'), 'dough_preparation'),
            filling_preparation: updateData(extractData(preparation, 'filling_preparation'), 'filling_preparation'),
            forming_and_cooking_dumplings: updateData(extractData(cookingServing, 'cooking'), 'cooking'),
            serving: updateData(extractData(cookingServing, 'serving'), 'serving')
          }
        };

        setDumplingRecipe(newDumplingRecipe);
        console.log('Updated Dumpling Recipe:', newDumplingRecipe);
      } catch (error) {
        console.error('Error during ingredients generation:', error);
      }
    });
  };

// TO NIŻEJ JEST OD KUBY TEMPLATKI JAKIEŚ, AKORDEON ZAKOMENTOWAŁEM BO TERAZ DANE SIE NIE ZGADZAJĄ
  const addDumplingAndNavigate = () => {
    startTransition(async () => {
      try {
        await addDumpling(tmpPayload)
        resetBase()
        router.push('/dumplinghub')
        setToast({variant: "success", msg: "Yeah! Pieróg dodany ❤️‍🔥"})
      } catch (error) {
        console.error('Error adding dumpling:', error)
        setToast({variant: "error", msg: "Ups! Coś poszło nie tak 😳"})
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
{/*

        <>
          <div className={styles.accordionsWrapper}>
            <Accordion
              isAccordionOpen={true}
              header={'Składniki'}
              title1="Ciasto"
              title2="Farsz"
              item1={createMarkup(parsedRecipe.ingredientsDough)}
              item2={createMarkup(parsedRecipe.ingredientsFilling)}
            />
            <Accordion
              isAccordionOpen={true}
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
                isAccordionOpen={true}
                header={'Podawanie'}
                title1=""
                item1={createMarkup(parsedRecipe.servingMethod)}
              />
            </div>
          </div>
          <Button
            variant="action"
            onClick={addDumplingAndNavigate}
            disabled={isPending}
          >
            {isPending ? "Udostępnianie...":"Udostępnij pieroga"}
          </Button>
        </>
*/}
    </div>
  )
}

export default CreateDumpling
