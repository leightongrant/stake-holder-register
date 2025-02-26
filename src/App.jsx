import MainLayout from './components/layouts/MainLayout'
import AdminLayout from './components/layouts/AdminLayout'
import Home from '@/components/pages/Home.jsx'
import { Routes, Route } from 'react-router'
import AdminApp from './components/AdminApp'
import SignIn from './components/login/SignIn'
import { useStore } from './lib/zustand'

function App() {
	const session = useStore(state => state.session)

	if (session) {
		return (
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
				</Route>

				<Route element={<AdminLayout />}>
					<Route path='/admin/*' element={<AdminApp />} />
				</Route>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route element={<AdminLayout />}>
				<Route path='*' element={<SignIn />} />
			</Route>
		</Routes>
	)
}

export default App
