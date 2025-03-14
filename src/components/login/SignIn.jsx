import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import ColorModeSelect from '../ColorModeSelect'
import { account } from '../../lib/appwrite'
import { useStore } from '../../lib/zustand'
import logo from '../../assets/longleigh-logo.svg'
import ErrorAlert from '../alerts/ErrorAlert'
import { useAlertStore } from '../../lib/zustand'
import { useNavigate } from 'react-router-dom'

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px',
	},
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
	height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
	minHeight: '100%',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4),
	},
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		inset: 0,
		backgroundImage:
			'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage:
				'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
		}),
	},
}))

export default function SignIn() {
	const [emailError, setEmailError] = React.useState(false)
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
	const [passwordError, setPasswordError] = React.useState(false)
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
	const { setUser, setSession, setSessionId } = useStore()
	const { showAlert } = useAlertStore()
	const navigate = useNavigate()

	const handleSubmit = event => {
		if (emailError || passwordError) {
			event.preventDefault()
			return
		}
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const email = data.get('email')
		const password = data.get('password')

		const session = account.createEmailPasswordSession(email, password)

		session
			.then(currentSession => {
				setSession(
					localStorage.setItem('session', JSON.stringify(currentSession))
				)
				setSession(currentSession)
				setSessionId(currentSession.$id)
				const user = account.get()
				user.then(currentUser => {
					localStorage.setItem('appwrite_user', JSON.stringify(currentUser))
					setUser(currentUser)
				})
				return Promise.resolve()
			})
			.catch(err => {
				console.log('Error:', err.message)
				showAlert(err.message, 'error')
			})
	}

	const validateInputs = () => {
		const email = document.getElementById('email')
		const password = document.getElementById('password')

		let isValid = true

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true)
			setEmailErrorMessage('Please enter a valid email address.')
			isValid = false
		} else {
			setEmailError(false)
			setEmailErrorMessage('')
		}

		if (!password.value || password.value.length < 8) {
			setPasswordError(true)
			setPasswordErrorMessage('Password must be at least 6 characters long.')
			isValid = false
		} else {
			setPasswordError(false)
			setPasswordErrorMessage('')
		}

		return isValid
	}

	return (
		<SignInContainer direction='column' justifyContent='space-between'>
			<Box
				component={'div'}
				sx={{ position: 'fixed', top: '1rem', left: '1rem' }}
			>
				<Box component='img' src={logo} width={150} height={100} />
			</Box>
			<ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
			<Card variant='outlined'>
				<ErrorAlert />
				<Typography
					component='h1'
					variant='h4'
					sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
				>
					Sign in
				</Typography>

				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						gap: 2,
					}}
				>
					<FormControl>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<TextField
							error={emailError}
							helperText={emailErrorMessage}
							id='email'
							type='email'
							name='email'
							placeholder='your@email.com'
							autoComplete='email'
							autoFocus
							required
							fullWidth
							variant='outlined'
							color={emailError ? 'error' : 'primary'}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<TextField
							error={passwordError}
							helperText={passwordErrorMessage}
							name='password'
							placeholder='••••••'
							type='password'
							id='password'
							autoComplete='current-password'
							autoFocus
							required
							fullWidth
							variant='outlined'
							color={passwordError ? 'error' : 'primary'}
						/>
					</FormControl>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						onClick={validateInputs}
					>
						Sign in
					</Button>
				</Box>
				<Link
					component='button'
					type='button'
					onClick={() => navigate('/forgot')}
					variant='body2'
					sx={{ alignSelf: 'center' }}
				>
					Forgot your password?
				</Link>
			</Card>
		</SignInContainer>
	)
}
