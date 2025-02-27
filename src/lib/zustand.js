import { create } from 'zustand'
import { account } from '../lib/appwrite'

export const useStore = create(set => ({
	user: JSON.parse(localStorage.getItem('appwrite_user')) || null,
	sessionId: null,
	session: account
		.getSession('current')
		.then(currentSession => {
			set({ session: currentSession })
			set({ isValid: currentSession.$id })
		})
		.catch(() => {
			set({ session: null })
		}),
	setUser: current => set({ user: current }),
	setSession: current => set({ session: current }),
	setSessionId: current => set({ sessionId: current }),
}))
