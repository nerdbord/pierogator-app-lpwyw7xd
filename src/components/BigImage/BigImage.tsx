import React from 'react'
import Image from 'next/image'
import styles from './BigImage.module.scss'

function BigImage({ src }: { src: string }) {
  return (
    <div className={styles.image}>
      <Image
        src={src}
        alt="Dumpling image"
        fill
        style={{ objectFit: 'cover' }}
        sizes="400px"
      />
    </div>
  )
}

export default BigImage
