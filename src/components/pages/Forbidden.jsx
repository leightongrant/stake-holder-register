import { Box, Typography, Link } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const Forbidden = () => {
	return (
		<Box
			component={'main'}
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 3,
				}}
			>
				<WarningAmberIcon sx={{ fontSize: 60 }} color='warning' />
				{'     '}
				<Typography variant='h2' color='warning'>
					Forbidden
				</Typography>
			</Box>

			<Link href='/' color='inherit'>
				<Typography variant='h4'>Back to Frontend</Typography>
			</Link>
		</Box>
	)
}

export default Forbidden
