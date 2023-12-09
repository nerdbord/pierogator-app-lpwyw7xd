import { DumplingBase } from '@/types/types'
import { create } from 'zustand'

interface DumplingStore {
  // Remove this ->
  tmp: boolean
  setTmp: (value: boolean) => void
  // <- Remove this
  
  dumplingBase: DumplingBase
  setDumplingBase: (value: DumplingBase) => void
}

const useDumplingStore = create<DumplingStore>((set) => ({
  // Remove this ->
  tmp: false,
  setTmp: (value) => set({ tmp: value }),
  // <- Remove this

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
