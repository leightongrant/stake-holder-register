import AppBar from '@mui/material/AppBar'
import { useStore } from '../lib/zustand'
import { useNavigate } from 'react-router'
import {
	Divider,
	ListItemIcon,
	MenuItem,
	Avatar,
	Menu,
	Box,
	Toolbar,
	Typography,
	IconButton,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import { StorageSharp } from '@mui/icons-material'
import { useState } from 'react'
import Theme from './Theme'
import { account } from '../lib/appwrite'

export default function ButtonAppBar() {
	const { user, setUser, setSession, setSessionId } = useStore()
	const [anchorEl, setAnchorEl] = useState(null)
	const navigate = useNavigate()
	const open = anchorEl
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleNavigate = () => {
		navigate('/admin')
	}

	const handleLogout = () => {
		const session = account.deleteSessions()
		session
			.then(() => {
				setUser(null)
				setSession(null)
				setSessionId(null)
				localStorage.removeItem('appwrite_user')
				localStorage.removeItem('session')
			})
			.catch(err => console.log(err))
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
						Longleigh Foundation
					</Typography>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar alt={user?.name} />
					</IconButton>

					<Menu
						anchorEl={anchorEl}
						id='account-menu'
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						slotProps={{
							paper: {
								elevation: 0,
								sx: {
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&::before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								},
							},
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						{user?.labels.includes('admin') && (
							<MenuItem onClick={handleNavigate}>
								<ListItemIcon>
									<StorageSharp fontSize='small' />
								</ListItemIcon>
								Admin
							</MenuItem>
						)}
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<Logout fontSize='small' />
							</ListItemIcon>
							Logout
						</MenuItem>
						<Divider />
						<MenuItem>
							<Theme />
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
