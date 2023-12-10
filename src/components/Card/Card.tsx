import React, { useTransition } from 'react'
import styles from './Card.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import type { DumplingRecipe } from '@/types/types'
import { deleteDumpling } from '@/services/actions/deleteDumpling/deleteDumpling'
import useDumplingStore from '@/store/useDumplingStore'

interface Props {
  item: DumplingRecipe
  withActions?: boolean
  imageSize?: 'big' | 'small'
}

export const Card = ({ item, withActions, imageSize }: Props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { setRefreshList, setToast } = useDumplingStore()

  const handleOpen = () => {
    router.push('/dumpling')
  }

  const handleDelete = () => {
    console.log('Pieróg do kosza')

    startTransition(async () => {
      try {
        await deleteDumpling(item._id as string)
        setRefreshList()
        setToast({variant: "success", msg: "Pomyślnie usunięto pieroga 🥟 "})
      } catch (error) {
        console.error('Error getting public dumplings:', error)
        setToast({variant: "error", msg: "Ups! Coś poszło nie tak 😳"})
      }
    })
  }

  return (
    <div className={styles.container}>
      <div
        className={imageSize === 'big' ? styles.imageBig : styles.imageSmall}
      >
        <Image
          src={item.imageSrc}
          alt="Dumpling image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <p>{item.name}</p>

      {withActions && (
        <div className={styles.actions}>
          <Button onClick={handleOpen} disabled={isPending}>Otwórz</Button>
          <Button onClick={handleDelete} disabled={isPending}>
            Usuń
          </Button>
        </div>
      )}
    </div>
  )
}
