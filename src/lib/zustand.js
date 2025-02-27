import { create } from 'zustand'
import { account } from '../lib/appwrite'

export const useStore = create(set => ({
	user: JSON.parse(localStorage.getItem('appwrite_user')) || null,
	sessionId: JSON.parse(localStorage.getItem('session')) || null,
	session: account
		.getSession('current')
		.then(() => {
			Promise.resolve()
		})
		.catch(() => {
			localStorage.removeItem('session')
		}),
	setUser: current => set({ user: current }),
	setSession: current => set({ session: current }),
	setSessionId: current => set({ sessionId: current }),
}))
