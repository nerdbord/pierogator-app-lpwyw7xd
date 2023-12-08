import { create } from 'zustand'

interface DumplingStore {
  tmp: boolean
  setTmp: (value: boolean) => void
}

const useDumplingStore = create<DumplingStore>((set) => ({
  tmp: false,
  setTmp: (value) => set({ tmp: value }),
}))

export default useDumplingStore
