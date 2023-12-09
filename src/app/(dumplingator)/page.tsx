'use client'
import React, { useState, useTransition } from 'react'
import TextField from '@/components/TextField/TextField'
import { Button } from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import useDumplingStore from '@/store/useDumplingStore'
import styles from './page.module.scss'
import GenerateDumplingImage from '@/components/Sections/GenerateDumplingImage/GenerateDumplingImage'
import { generateIngredients } from '../../services/actions/generateIngredients/generateIngredients'

const Dumplingator = () => {
  const { dumplingBase } = useDumplingStore()
  const [dough, setDough] = useState(dumplingBase.dough)
  const [filling, setFilling] = useState(dumplingBase.filling)
  const [ingredients, setIngredients] = useState(dumplingBase.ingredients)
  const [isDoughLocked, setIsDoughLocked] = useState(false)
  const [isFillingLocked, setIsFillingLocked] = useState(false)
  const [isIngredientsLocked, setIsIngredientsLocked] = useState(false)
  const [isPending, startTransition] = useTransition()

  const generateAllIngredients = () => {
    startTransition(async () => {
      try {
        const { dough, filling, ingredients } = await generateIngredients()
        if (!isDoughLocked) setDough(dough)
        if (!isFillingLocked) setFilling(filling)
        if (!isIngredientsLocked) setIngredients(ingredients)
      } catch (error) {
        console.error('Error during ingredients generation:', error)
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <SectionHeader>Składniki</SectionHeader>
        <div className={styles.buttonWrapper}>
          {isPending && <Loader />}
          <Button onClick={generateAllIngredients} disabled={isPending}>
            Generuj
          </Button>
        </div>
      </div>
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Ciasto"
        onChange={(e) => setDough(e.target.value)}
        value={dough}
        locked={isDoughLocked}
        onLockChange={setIsDoughLocked}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Nadzienie"
        onChange={(e) => setFilling(e.target.value)}
        value={filling}
        locked={isFillingLocked}
        onLockChange={setIsFillingLocked}
      />
      <TextField
        placeholder="wpisz, wygeneruj lub zostaw puste"
        label="Składniki"
        onChange={(e) => setIngredients(e.target.value)}
        value={ingredients}
        locked={isIngredientsLocked}
        onLockChange={setIsIngredientsLocked}
      />

      {/* Generate dumpling image and name */}
      <GenerateDumplingImage
        ingredients={ingredients}
        dough={dough}
        filling={filling}
      />
    </div>
  )
}

export default Dumplingator
