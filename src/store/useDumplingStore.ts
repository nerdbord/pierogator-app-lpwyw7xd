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
  dumplingRecipe: DumplingRecipe
  setDumplingBase: (value: DumplingBase) => void
  setDumplingRecipe: (value: DumplingRecipe) => void
  setRefreshList: () => void
  resetBase: () => void
  setToast: (value: Toast | null) => void
}
const LOCAL_STORAGE_KEY = 'dumplingStore'

const initBase = {
  name: '',
  imgUrl: '',
  ingredients: '',
  dough: '',
  filling: '',
}

const getInitialState = (): DumplingStore => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
  return savedState
    ? JSON.parse(savedState)
    : {
        toast: null,
        refreshList: false,
        dumplingBase: {
          name: '',
          imgUrl: '',
          ingredients: '',
          dough: '',
          filling: '',
        },
        dumplingRecipe: {
          name: '',
          imageSrc: '',
          ingredients: { dough: [], filling: [] },
          instructions: {
            dough_preparation: [],
            filling_preparation: [],
            forming_and_cooking_dumplings: [],
            serving: [],
          },
        },
      }
}

export const useDumplingStore = create<DumplingStore>((set) => ({
  ...getInitialState(),
  setDumplingBase: (value) =>
    set((state) => {
      const newState = { ...state, dumplingBase: value }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    }),
  setDumplingRecipe: (value) =>
    set((state) => {
      const newState = { ...state, dumplingRecipe: value }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    }),
  setRefreshList: () =>
    set((state) => {
      const newState = { ...state, refreshList: !state.refreshList }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    }),
  resetBase: () => set({ dumplingBase: initBase }),
  setToast: (value) => set({ toast: value }),
}))

export default useDumplingStore
