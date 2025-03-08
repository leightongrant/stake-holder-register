import { Typography, Link } from '@mui/material'
import Box from '@mui/material/Box'
const FooterNavigation = () => {
	return (
		<Box
			component={'footer'}
			py={2}
			mt={5}
			sx={{ backgroundColor: 'transparent' }}
		>
			<Typography variant='body2' align='center'>
				{'Copyright © '}
				<Link color='inherit' href='https://mui.com/'>
					Longleigh Foundation Stakeholder Register
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	)
}

export default FooterNavigation
