import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useStore } from '../lib/zustand'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'

// import Theme from './Theme'
import { account } from '../lib/appwrite'

export default function ButtonAppBar() {
	const { user, setUser } = useStore()
	const handleLogout = () => {
		account.deleteSessions()
		localStorage.removeItem('appwrite_user')
		setUser(null)
	}
	return (
		<Box sx={{ flexGrow: 1 }} component={'header'}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						color='inherit'
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						Home
					</Typography>

					{/* <Theme /> */}
					<Button color='inherit' onClick={handleLogout}>
						Logout
					</Button>
					<Typography color='inherit' variant='h6' component='div'>
						{user?.name}
					</Typography>
					{/* <IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton> */}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
//hsl(8.51,77.9%,64.51%)
