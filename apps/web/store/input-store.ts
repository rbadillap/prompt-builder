import { create } from 'zustand'

interface InputConfig {
  label: string
  placeholder: string
  description: string
}

interface InputStore {
  config: InputConfig | null
  value: string | null
  setConfig: (config: InputConfig) => void
  setValue: (value: string) => void
  clearConfig: () => void
  clearValue: () => void
  clear: () => void // Helper to clear both config and value
}

export const useInputStore = create<InputStore>((set) => ({
  config: null,
  value: null,
  setConfig: (config) => set({ config }),
  setValue: (value) => set({ value }),
  clearConfig: () => set({ config: null }),
  clearValue: () => set({ value: null }),
  clear: () => set({ config: null, value: null }),
})) 