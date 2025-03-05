import { Admin, Resource } from 'react-admin'
import { appWriteDataProvider } from 'ra-appwrite'
import { client } from '../lib/appwrite'
import { DATABASE_ID, COLLECTION_ID } from '../lib/appwrite'
import { StakeholderList } from './StakeholderList'
import { StakeholderShow } from './StakeholderShow'
import { StakeholderEdit } from './StakeholderEdit'
import { StakeholderCreate } from './StakeholderCreate'
import { Layout } from 'react-admin'
import { AppBar } from 'react-admin'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useStore } from '../lib/zustand'
import { account } from '../lib/appwrite'
import { ListItemIcon, MenuItem, Avatar, Menu, IconButton } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const dataProvider = new appWriteDataProvider({
	client,
	databaseId: DATABASE_ID,
	collectionIds: {
		stakeholders: COLLECTION_ID,
	},
})

const CustomAppBar = () => {
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
		navigate('/')
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
		<AppBar color='primary'>
			<Box sx={{ flex: '1' }} />
			Stakeholder Register Admin
			<Box sx={{ flex: '1' }} />
			<IconButton
				onClick={handleClick}
				size='large'
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
				<MenuItem onClick={handleNavigate}>
					<ListItemIcon>
						<ExitToAppIcon fontSize='small' />
					</ListItemIcon>
					Frontend
				</MenuItem>

				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</AppBar>
	)
}

const CustomLayout = ({ children }) => {
	return <Layout appBar={CustomAppBar}>{children}</Layout>
}

const AdminApp = () => {
	return (
		<Admin dataProvider={dataProvider} basename='/admin' layout={CustomLayout}>
			<Resource
				name='stakeholders'
				list={StakeholderList}
				edit={StakeholderEdit}
				show={StakeholderShow}
				create={StakeholderCreate}
			/>
		</Admin>
	)
}

CustomLayout.propTypes = {
	children: PropTypes.node,
}

export default AdminApp
