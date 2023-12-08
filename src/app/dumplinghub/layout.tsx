import React, { PropsWithChildren } from 'react'
import dumplinghubHeader from '../../assets/images/Pierogarnia.png'
import InnerContainer from '@/components/Containers/InnerContainer/InnerContainer'
import Header from '@/components/Header/Header'

const DumplinghubLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header src={dumplinghubHeader} alt="Dumplinghub header" />
      <InnerContainer>{children}</InnerContainer>
    </>
  )
}

export default DumplinghubLayout
