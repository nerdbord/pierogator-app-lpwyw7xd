'use client'
import React, { PropsWithChildren, useMemo } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'action'
  type?: 'button' | 'submit'
}

export const Button = ({
  onClick,
  children,
  variant,
  type = 'button',
}: PropsWithChildren<ButtonProps>) => {
  const buttonClassName = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary
      case 'action':
        return styles.buttonAction
      default:
        return styles.buttonPrimary
    }
  }, [variant])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={buttonClassName} onClick={handleClick} type={type}>
      {children}
    </button>
  )
}
