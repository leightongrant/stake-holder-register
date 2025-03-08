import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import { account } from '../lib/appwrite'
import { useAlertStore } from '../lib/zustand'
import ErrorAlert from './alerts/ErrorAlert'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ColorModeSelect from './ColorModeSelect'

function ForgotPassword() {
	const { showAlert } = useAlertStore()
	const navigate = useNavigate()
	const handleRecovery = async (email, url) => {
		try {
			await account.createRecovery(email, url)
			showAlert('Please check your email for password reset link', 'success')
		} catch (e) {
			console.log(e.message)
			showAlert(`${email} not found`, 'error')
		}
	}
	const ForgotContainer = styled(Stack)(({ theme }) => ({
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

	return (
		<ForgotContainer>
			<ColorModeSelect
				sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
			/>
			<Dialog
				open
				slotProps={{
					paper: {
						variant: 'outlined',
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const email = event.target.email.value
							handleRecovery(
								email,
								'https://leightongrant.github.io/stake-holder-register/recovery'
							)
						},
						sx: { backgroundImage: 'none' },
					},
				}}
			>
				<ErrorAlert />
				<DialogTitle sx={{ textAlign: 'center' }}>Reset password</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: '100%',
					}}
				>
					<DialogContentText sx={{ textAlign: 'center', textWrap: 'balance' }}>
						Enter your account&apos;s email address, and we&apos;ll send you a
						link to reset your password.
					</DialogContentText>

					<OutlinedInput
						autoFocus
						required
						margin='dense'
						id='email'
						name='email'
						placeholder='Email address'
						type='email'
						fullWidth
					/>
				</DialogContent>
				<DialogActions sx={{ pb: 3, px: 3 }}>
					<Button onClick={() => navigate('/')}>Close</Button>
					<Button variant='contained' type='submit'>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</ForgotContainer>
	)
}

ForgotPassword.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
}

export default ForgotPassword
