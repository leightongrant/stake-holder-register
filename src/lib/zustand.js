import { create } from 'zustand'
import { account } from '../lib/appwrite'

export const useStore = create(set => ({
	user: JSON.parse(localStorage.getItem('appwrite_user')) || null,
	session: account
		.getSession('current')
		.then(currentSession => {
			set({ session: currentSession })
		})
		.catch(() => {
			set({ session: null })
		}),
	setUser: current => set({ user: current }),
	setSession: current => set({ session: current }),
}))
