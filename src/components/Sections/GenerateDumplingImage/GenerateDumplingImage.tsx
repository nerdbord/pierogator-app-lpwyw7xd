import React, { useState, useTransition } from 'react'
import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import Loader from '@/components/Loader/Loader'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { generateImage } from '@/services/actions/generateImage/generateImage'
import styles from './GenerateDumplingImage.module.scss'
import TextFieldSingle from '@/components/TextFieldSingle/TextFieldSingle'
import { useRouter } from 'next/navigation'
import { generateName } from '@/services/actions/generateName/generateName'
import useDumplingStore from '@/store/useDumplingStore'

interface Props {
  ingredients: string
  dough: string
  filling: string
}

function GenerateDumplingImage({ ingredients, dough, filling }: Props) {
  const { dumplingBase, setDumplingBase } = useDumplingStore()
  const [image, setImage] = useState(dumplingBase.imgUrl)
  const [name, setName] = useState(dumplingBase.name)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSaveAndNavigate = () => {
    const dumpling = {
      name: name,
      imgUrl: image,
      ingredients: ingredients,
      dough: dough,
      filling: filling,
    }
    setDumplingBase(dumpling)
    router.push('/createdumpling')
  }

  const getImage = () => {
    startTransition(async () => {
      const promptImage = `Pyszny pieróg zrobiony z ${ingredients}. id: ${Math.floor(
        Math.random() * 1000,
      )}`
      const promptName = `Podaj krótką oryginalną nazwę pieroga na bazie składników: ${ingredients}. Użyj w nazwie słowa pieróg id: ${Math.floor(
        Math.random() * 1000,
      )}`
      setImage(await generateImage(promptImage))
      setName(await generateName(promptName))
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SectionHeader>Pieróg</SectionHeader>
        <div className={styles.button}>
          {isPending && <Loader />}
          <Button onClick={getImage}>Generuj</Button>
        </div>
      </div>
      {image && name && (
        <>
          <Card
            item={{
              name: '',
              img: image,
              url: 'www.url-do-pieroga.ru',
            }}
            imageSize="big"
          />
          <TextFieldSingle onChange={() => null} label="Nazwa" value={name} />
          <Button variant="action" onClick={handleSaveAndNavigate}>
            Zapisz i przejdź do tworzenia przepisu
          </Button>
        </>
      )}
    </div>
  )
}

export default GenerateDumplingImage
