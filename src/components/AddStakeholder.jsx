import { Button, Container } from '@material-ui/core'
import { databases } from '@/lib/appwrite'
import { ID } from 'appwrite'
import { DATABASE_ID, COLLECTION_ID } from '@/lib/appwrite'
import { Typography } from '@mui/material/'
const addStakeHolder = () => {
	const res = databases.createDocument(
		DATABASE_ID,
		COLLECTION_ID,
		ID.unique(),
		{
			stakeholderName: 'Jane Doe',
			category: 'Primary',
			stakeholderAnalysisGroup: 'Secondary',
			organisation: 'Acme Inc',
			role: 'CTO',
			email: 'jane@doe.com',
			phone: '987-654-3210',
			address: JSON.stringify({
				street: '321 Jane St',
				city: 'Doeville',
				state: 'AS',
				zip: '54321',
			}),
		}
	)

	res
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
}

export const AddStakeholder = () => {
	return (
		<Container maxWidth='lg'>
			<Typography variant='h1'>Add Stakeholder</Typography>
			<Button onClick={addStakeHolder} variant='contained'>
				add stake holder
			</Button>
		</Container>
	)
}
