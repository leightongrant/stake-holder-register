import { useEffect, useState } from 'react'
import { databases } from '../../lib/appwrite'
import { Container } from '@mui/material'
import { DATABASE_ID, COLLECTION_ID } from '../../lib/appwrite'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import StakeholderSkeleton from '../Skeleton'

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'name', headerName: 'Name', width: 130 },
	{
		field: 'phone',
		headerName: 'Phone',
		type: 'phone',
		width: 150,
	},
	{
		field: 'email',
		headerName: 'Email',
		type: 'email',
		width: 150,
	},
]

const paginationModel = { page: 0, pageSize: 5 }

const Home = () => {
	const [rows, setRows] = useState([])

	useEffect(() => {
		const res = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [])
		res
			.then(res => {
				const data = res.documents.map((doc, idx) => {
					return {
						id: idx + 1,
						name: doc.stakeholderName,
						phone: doc.phone,
						email: doc.email,
					}
				})
				setRows(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	if (rows.length === 0) {
		return (
			<Container maxWidth='lg'>
				<Typography variant='h1' py={5}>
					Stakeholder Register - Longleigh Foundation
				</Typography>
				<StakeholderSkeleton />
			</Container>
		)
	}

	return (
		<Container maxWidth='lg'>
			<Typography variant='h1' py={5}>
				Stakeholder Register - Longleigh Foundation
			</Typography>
			<Paper>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					sx={{ border: 2 }}
				/>
			</Paper>
		</Container>
	)
}

export default Home
