import { create } from 'zustand'
import { DumplingBase, DumplingRecipe } from '@/types/types'

interface DumplingStore {
  refreshList: boolean
  dumplingBase: DumplingBase
  dumplingRecipe: DumplingRecipe
  setDumplingBase: (value: DumplingBase) => void
  setDumplingRecipe: (value: DumplingRecipe) => void
  setRefreshList: () => void
  resetBase: () => void
}

const LOCAL_STORAGE_KEY = 'dumplingStore'
const isBrowser = typeof window !== 'undefined'

const getSavedState = () => {
  if (isBrowser) {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedState) return JSON.parse(savedState)
  }
  return null
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
  ...getSavedState(),
  setDumplingBase: (value) =>
    set((state) => {
      const newState = { ...state, dumplingBase: value }
      if (isBrowser) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      }
      return newState
    }),
  setDumplingRecipe: (value) =>
    set((state) => {
      const newState = { ...state, dumplingRecipe: value }
      if (isBrowser) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      }
      return newState
    }),
  setRefreshList: () =>
    set((state) => ({
      ...state,
      refreshList: !state.refreshList,
    })),
  resetBase: () =>
    set({
      dumplingBase: {
        name: '',
        imgUrl: '',
        ingredients: '',
        dough: '',
        filling: '',
      },
    }),
}))

export default useDumplingStore
