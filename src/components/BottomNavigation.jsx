import { Typography, Link } from '@mui/material'
import Box from '@mui/material/Box'
const FooterNavigation = () => {
	return (
		<Box component={'footer'} py={2} mt={2}>
			<Typography variant='body2' align='center'>
				{'Copyright © '}
				<Link color='inherit' href='https://longleigh.org'>
					Longleigh Foundation
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	)
}

export default FooterNavigation
