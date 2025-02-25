import ButtonAppBar from '@/components/ButtonAppBar'
import FooterNavigation from '../BottomNavigation'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'
const MainLayout = () => {
	return (
		<>
			<ButtonAppBar />
			<Box component='main'>
				<Outlet />
			</Box>
			<FooterNavigation />
		</>
	)
}

export default MainLayout
