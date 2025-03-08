import ButtonAppBar from '@/components/ButtonAppBar'
import FooterNavigation from '../BottomNavigation'
import { Outlet } from 'react-router'
import styled from '@emotion/styled'
import { Stack } from '@mui/system'

const MainLayout = () => {
	const MainContainer = styled(Stack)(({ theme }) => ({
		display: 'grid',
		gridTemplateRows: 'auto 1fr auto',
		gridTemplateColumns: '1fr',
		minHeight: '100dvh',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundImage:
			'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		...theme.applyStyles('dark', {
			backgroundImage:
				'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
		}),
	}))
	return (
		<>
			<MainContainer>
				<ButtonAppBar />
				<Outlet />
				<FooterNavigation />
			</MainContainer>
		</>
	)
}

export default MainLayout
