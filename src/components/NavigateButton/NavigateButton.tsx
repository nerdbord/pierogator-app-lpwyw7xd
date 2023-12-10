import React, { PropsWithChildren } from 'react'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'

const NavigateButton = ({
  url,
  children,
}: PropsWithChildren<{ url: string }>) => {
  const router = useRouter()

  return <Button onClick={() => router.push(url)}>{children}</Button>
}

export default NavigateButton
