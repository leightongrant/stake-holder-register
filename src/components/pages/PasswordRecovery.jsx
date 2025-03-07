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

const PasswordRecoveryContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: theme.palette.background.default,
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
			<Box component={'form'} onSubmit={handleSubmit}>
				<Stack gap={2} sx={{ width: { xs: '90%', sm: '400px' } }}>
					<Typography variant='h4' component='h1' align='center'>
						Reset Your Password
					</Typography>

					{success && (
						<Alert severity='success'>
							Password reset successfully! You will be redirected to login in 3
							seconds.
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
		</PasswordRecoveryContainer>
	)
}

export default PasswordRecovery
