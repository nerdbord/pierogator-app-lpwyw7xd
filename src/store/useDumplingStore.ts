import { DumplingBase } from '@/types/types'
import { create } from 'zustand'

interface DumplingStore {
  refreshList: boolean
  dumplingBase: DumplingBase
  setDumplingBase: (value: DumplingBase) => void
  setRefreshList: () => void
  resetBase: () => void
}

const initBase = {
  name: '',
  imgUrl: '',
  ingredients: '',
  dough: '',
  filling: '',
}

export const useDumplingStore = create<DumplingStore>((set) => ({
  refreshList: false,
  dumplingBase: initBase,
  setDumplingBase: (value) => set({ dumplingBase: value }),
  setRefreshList: () => {
    set((state) => ({
      refreshList: !state.refreshList,
    }))
  },
  resetBase: () => set({ dumplingBase: initBase }),
}))

export default useDumplingStore
