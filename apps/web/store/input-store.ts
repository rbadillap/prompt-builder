import { create } from 'zustand'

interface InputConfig {
  label: string
  placeholder: string
  description: string
}

interface InputStore {
  config: InputConfig | null
  setConfig: (config: InputConfig) => void
  clearConfig: () => void
}

export const useInputStore = create<InputStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
  clearConfig: () => set({ config: null }),
})) 