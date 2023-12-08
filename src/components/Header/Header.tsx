import React from 'react'
import Image, { StaticImageData } from 'next/image'
import styles from './Header.module.scss'

const Header = ({ src, alt }: { src: StaticImageData; alt: string }) => {
  return (
    <header className={styles.header}>
      <Image src={src} alt={alt} />
    </header>
  )
}

export default Header
