import { DumplingBase } from '@/types/types'
import { create } from 'zustand'

interface DumplingStore {

  
  dumplingBase: DumplingBase
  setDumplingBase: (value: DumplingBase) => void
}

const useDumplingStore = create<DumplingStore>((set) => ({

  dumplingBase: {
    name: '',
    imgUrl: '',
    ingredients: '',
    dough: '',
    filling: '',
  },
  setDumplingBase: (value) => set({ dumplingBase: value }),
}))

export default useDumplingStore
