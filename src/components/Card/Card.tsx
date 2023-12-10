import React, { useTransition } from 'react'
import styles from './Card.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import type { DumplingRecipe } from '@/types/types'
import { deleteDumpling } from '@/services/actions/deleteDumpling/deleteDumpling'
import useDumplingStore from '@/store/useDumplingStore'
import NavigateButton from '../NavigateButton/NavigateButton'
import { AppRoutes } from '@/utils/routes'

interface Props {
  item: DumplingRecipe
  withActions?: boolean
  imageSize?: 'big' | 'small'
}

export const Card = ({ item, withActions, imageSize }: Props) => {
  const [isPending, startTransition] = useTransition()
  const { setRefreshList } = useDumplingStore()

  const handleDelete = () => {
    console.log('Pieróg do kosza')

    startTransition(async () => {
      try {
        await deleteDumpling(item._id as string)
        setRefreshList()
      } catch (error) {
        console.error('Error getting public dumplings:', error)
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
          <NavigateButton url={`${AppRoutes.dumpling}/${item._id}`}>
            Otwórz
          </NavigateButton>
          <Button onClick={handleDelete} disabled={isPending}>
            Usuń
          </Button>
        </div>
      )}
    </div>
  )
}
