import { create } from 'zustand'
import { DumplingBase, DumplingRecipe } from '@/types/types'

type Toast = {
  variant: 'success' | 'error'
  msg: string
}

interface DumplingStore {
  toast: Toast | null
  refreshList: boolean
  dumplingBase: DumplingBase
  dumplingRecipe: DumplingRecipe | null
  setDumplingBase: (value: DumplingBase) => void
  setDumplingRecipe: (value: DumplingRecipe) => void
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
const initRecipe = {
  name: '',
  imageSrc: '',
  ingredients: { dough: [], filling: [] },
  instructions: {
    dough_preparation: [],
    filling_preparation: [],
    forming_and_cooking_dumplings: [],
    serving: [],
  },
}

export const useDumplingStore = create<DumplingStore>((set) => ({
  toast: null,
  refreshList: false,
  dumplingBase: initBase,
  dumplingRecipe: null,
  setDumplingBase: (value) => set({ dumplingBase: value }),
  setDumplingRecipe: (value) => set({ dumplingRecipe: value }),
  setRefreshList: () => {
    set((state) => ({
      refreshList: !state.refreshList,
    }))
  },
  resetBase: () => set({ dumplingBase: initBase }),
  setToast: (value) => set({ toast: value }),
}))

export default useDumplingStore
