import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { useAlertStore } from '../../lib/zustand'

export default function ErrorAlert() {
	const { open, message, severity, closeAlert } = useAlertStore()

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				closeAlert()
			}, 5000)
		}
	}, [open, closeAlert])

	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			{open && (
				<Alert variant='filled' severity={severity}>
					{message}
				</Alert>
			)}
		</Stack>
	)
}
