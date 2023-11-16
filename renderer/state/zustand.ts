import { create } from 'zustand'

interface LoginState {
    logined: boolean,
    setLogined: (currentState: boolean) => void
}

export const loginSlice = create<LoginState>()((set) => ({
    logined: false,
    setLogined: (currentState) => set(() => ({ logined: currentState}))
}))
