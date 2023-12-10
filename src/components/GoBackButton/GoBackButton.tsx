'use client'
import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../Button/Button'

export const GoBackButton = ({ children }: PropsWithChildren<object>) => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <div>
      <Button onClick={handleClick}>{children}</Button>
    </div>
  )
}

export default GoBackButton
