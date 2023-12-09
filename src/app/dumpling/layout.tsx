import React, { PropsWithChildren } from 'react'
import dumplinghubHeader from '../../assets/images/Pierogarnia.png'
import InnerContainer from '@/components/Containers/InnerContainer/InnerContainer'
import Header from '@/components/Header/Header'

const DumplingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header src="/Pierogarnia.png" alt="Dumplinghub header" />
      <InnerContainer>{children}</InnerContainer>
    </>
  )
}

export default DumplingLayout
