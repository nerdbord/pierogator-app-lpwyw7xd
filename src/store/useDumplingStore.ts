import { DumplingBase } from '@/types/types'
import { create } from 'zustand'

type Toast = {
  variant: 'success' | 'error'
  msg: string
}

interface DumplingStore {
  toast: Toast | null
  refreshList: boolean
  dumplingBase: DumplingBase
  setDumplingBase: (value: DumplingBase) => void
  setRefreshList: () => void
  resetBase: () => void
  setToast: (value: Toast | null) => void
}

const initBase = {
  name: '',
  imgUrl: '',
  ingredients: '',
  dough: '',
  filling: '',
}

export const useDumplingStore = create<DumplingStore>((set) => ({
  toast: null,
  refreshList: false,
  dumplingBase: initBase,
  setDumplingBase: (value) => set({ dumplingBase: value }),
  setRefreshList: () => {
    set((state) => ({
      refreshList: !state.refreshList,
    }))
  },
  resetBase: () => set({ dumplingBase: initBase }),
  setToast: (value) => set({ toast: value }),
}))

export default useDumplingStore
