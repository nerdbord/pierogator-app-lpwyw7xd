import React from 'react'
import styles from './Card.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'

interface Props {
  item: { name: string; img: string; url: string } //tmp interface
  withActions?: boolean
}

export const Card = ({ item, withActions }: Props) => {
  const handleOpen = () => {
    console.log('Otwórz pieroga')
  }

  const handleDelete = () => {
    console.log('Pieróg do kosza')
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={item.img}
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