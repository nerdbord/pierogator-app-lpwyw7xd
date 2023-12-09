import React, { PropsWithChildren } from 'react'
import dumpligatorHeader from '../../assets/images/Pierogator.png'
import InnerContainer from '@/components/Containers/InnerContainer/InnerContainer'
import Header from '@/components/Header/Header'

const DumplingatorLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header src={dumpligatorHeader} alt="Dumpligator header" />
      <InnerContainer>{children}</InnerContainer>
    </>
  )
}

export default DumplingatorLayout
