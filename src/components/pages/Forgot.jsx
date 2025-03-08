import { Box } from '@mui/material'
import ForgotPassword from '../ForgotPassword'

const Forgot = () => {
	return (
		<Box
			component={'main'}
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ForgotPassword />
		</Box>
	)
}

export default Forgot
