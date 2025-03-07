import MainLayout from './components/layouts/MainLayout'
import AdminLayout from './components/layouts/AdminLayout'
import Home from '@/components/pages/Home.jsx'
import { Routes, Route } from 'react-router'
import AdminApp from './components/AdminApp'
import SignIn from './components/login/SignIn'
import { useStore } from './lib/zustand'
import Forbidden from './components/pages/Forbidden'
import PasswordRecovery from './components/pages/PasswordRecovery'

function App() {
	const { sessionId, user } = useStore()

	if (sessionId) {
		return (
			<Routes>
				<Route element={<MainLayout />}>
					<Route path='*' element={<Home />} />
				</Route>

				<Route element={<AdminLayout />}>
					<Route
						path='/admin/*'
						element={
							user?.labels.includes('admin') ? <AdminApp /> : <Forbidden />
						}
					/>
				</Route>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route element={<AdminLayout />}>
				<Route path='*' element={<SignIn />} />
				<Route path='/recovery' element={<PasswordRecovery />} />
			</Route>
		</Routes>
	)
}

export default App
