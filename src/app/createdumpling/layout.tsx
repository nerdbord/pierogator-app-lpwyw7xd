﻿import React, { PropsWithChildren } from 'react'
import InnerContainer from '@/components/Containers/InnerContainer/InnerContainer'
import Header from '@/components/Header/Header'

const CreateDumplingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header src="/Pierogator.png" alt="Dumpligator header" />
      <InnerContainer>{children}</InnerContainer>
    </>
  )
}

export default CreateDumplingLayout
