import React, { PropsWithChildren } from 'react'
import dumpligatorHeader from '../../assets/images/Pierogator.png'
import InnerContainer from '@/components/Containers/InnerContainer/InnerContainer'
import Header from '@/components/Header/Header'

const DumplingatorLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header src="/Pierogator.png" alt="Dumpligator header" />
      <InnerContainer>{children}</InnerContainer>
    </>
  )
}

export default DumplingatorLayout
