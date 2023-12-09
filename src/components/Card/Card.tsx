import React from 'react'
import styles from './Card.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import type { DumplingRecipe } from '@/types/types'

interface Props {
  item: DumplingRecipe
  withActions?: boolean
  imageSize?: 'big' | 'small'
}

export const Card = ({ item, withActions, imageSize }: Props) => {
  const router = useRouter()

  const handleOpen = () => {
    router.push('/dumpling')
  }

  const handleDelete = () => {
    console.log('Pieróg do kosza')
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
          <Button onClick={handleOpen}>Otwórz</Button>
          <Button onClick={handleDelete}>Usuń</Button>
        </div>
      )}
    </div>
  )
}
