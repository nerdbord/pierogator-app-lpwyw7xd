import { DumplingBase } from '@/types/types'
import { create } from 'zustand'

interface DumplingStore {
  refreshList: boolean
  dumplingBase: DumplingBase
  setDumplingBase: (value: DumplingBase) => void
  setRefreshList: () => void
}


export const useDumplingStore = create<DumplingStore>((set) => ({
  refreshList: false,
  dumplingBase: {
    name: '',
    imgUrl: '',
    ingredients: '',
    dough: '',
    filling: '',
  },
  setDumplingBase: (value) => set({ dumplingBase: value }),
  setRefreshList: () => {
    set((state) => ({
      refreshList: !state.refreshList,
    }))
  },
}))

export default useDumplingStore
