import { account } from '../../lib/appwrite'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
	FormControl,
	FormLabel,
	TextField,
	Box,
	Button,
	Typography,
	Stack,
	Alert,
} from '@mui/material'
import ColorModeSelect from '../ColorModeSelect'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
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

const PasswordRecoveryContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
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

const PasswordRecovery = () => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [recovery, setRecovery] = useState({
		userId: '',
		secret: '',
		password: '',
	})
	const [passwordError, setPasswordError] = useState(false)
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
	const [passwordTwoError, setPasswordTwoError] = useState(false)
	const [passwordTwoErrorMessage, setPasswordTwoErrorMessage] = useState('')
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		setRecovery(prev => ({
			...prev,
			userId: searchParams.get('userId'),
			secret: searchParams.get('secret'),
		}))
	}, [searchParams])

	const validateInputs = () => {
		const password = document.getElementById('password')
		const passwordTwo = document.getElementById('passwordTwo')

		let isValid = true

		if (!password.value || password.value.length < 8) {
			setPasswordError(true)
			setPasswordErrorMessage('Password must be at least 8 characters long.')
			isValid = false
		} else {
			setPasswordError(false)
			setPasswordErrorMessage('')
		}

		if (!passwordTwo.value || passwordTwo.value.length < 8) {
			setPasswordTwoError(true)
			setPasswordTwoErrorMessage('Password must be at least 8 characters long.')
			isValid = false
		} else if (password.value !== passwordTwo.value) {
			setPasswordTwoError(true)
			setPasswordTwoErrorMessage('Passwords do not match.')
			isValid = false
		} else {
			setPasswordTwoError(false)
			setPasswordTwoErrorMessage('')
		}
		return isValid
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!validateInputs()) return

		const password = document.getElementById('password').value

		try {
			await account.updateRecovery(recovery.userId, recovery.secret, password)
			setSuccess(true)
			setError(null)
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		} catch (err) {
			console.log(err)
			setError(err.message)
			setSuccess(false)
		}
	}

	return (
		<PasswordRecoveryContainer>
			<ColorModeSelect
				sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
			/>
			<Card variant='outlined'>
				<Box component={'form'} onSubmit={handleSubmit}>
					<Stack gap={2} sx={{ width: { xs: '90%', sm: '400px' } }}>
						<Typography variant='h4' component='h1' align='center'>
							Reset Your Password
						</Typography>

						{success && (
							<Alert severity='success'>
								Password reset successfully! You will be redirected to login in
								3 seconds.
							</Alert>
						)}
						{error && <Alert severity='error'>{error}</Alert>}

						<FormControl>
							<FormLabel htmlFor='password'>New Password</FormLabel>
							<TextField
								error={passwordError}
								helperText={passwordErrorMessage}
								name='password'
								placeholder='••••••'
								type='password'
								id='password'
								autoComplete='new-password'
								required
								fullWidth
								variant='outlined'
								color={passwordError ? 'error' : 'primary'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='passwordTwo'>Confirm New Password</FormLabel>
							<TextField
								error={passwordTwoError}
								helperText={passwordTwoErrorMessage}
								name='passwordTwo'
								placeholder='••••••'
								type='password'
								id='passwordTwo'
								autoComplete='new-password'
								required
								fullWidth
								variant='outlined'
								color={passwordTwoError ? 'error' : 'primary'}
							/>
						</FormControl>

						<Button type='submit' variant='contained' fullWidth>
							Submit
						</Button>
					</Stack>
				</Box>
			</Card>
		</PasswordRecoveryContainer>
	)
}

export default PasswordRecovery
