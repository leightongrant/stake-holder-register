import Alert from '@mui/material/Alert'
import { useEffect } from 'react'
import { useAlertStore } from '../../lib/zustand'

export default function ErrorAlert() {
	const { openAlert, message, severity, closeAlert } = useAlertStore()

	useEffect(() => {
		if (openAlert) {
			setTimeout(() => {
				closeAlert()
			}, 5000)
		}
	}, [openAlert, closeAlert])

	return (
		<>
			{openAlert && (
				<Alert variant='filled' severity={severity} sx={{ margin: '1em' }}>
					{message}
				</Alert>
			)}
		</>
	)
}
