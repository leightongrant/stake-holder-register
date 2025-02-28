import { useEffect, useState } from 'react'
import { databases } from '../../lib/appwrite'
import { Box, Container } from '@mui/material'
import { DATABASE_ID, COLLECTION_ID } from '../../lib/appwrite'
import Typography from '@mui/material/Typography'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import StakeholderSkeleton from '../Skeleton'
import { Link } from '@mui/material'
import {
	Mail,
	Phone,
	Person,
	Category,
	Business,
	Work,
	Groups,
} from '@mui/icons-material'

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'name',
		headerName: 'Name',
		width: 200,
		renderCell: params => (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Person />
				<b>{params.value}</b>
			</Box>
		),
	},
	{
		field: 'category',
		headerName: 'Category',
		width: 150,
		renderCell: params => (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Category />
				{params.value}
			</Box>
		),
	},
	{
		field: 'stakeholder_group',
		headerName: 'Stakeholder Group',
		width: 150,
		renderCell: params => (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				{params.value && <Groups />}
				{params.value}
			</Box>
		),
	},
	{
		field: 'organisation',
		headerName: 'Organisation',
		width: 150,
		renderCell: params => (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Business />
				{params.value}
			</Box>
		),
	},
	{
		field: 'job_title',
		headerName: 'Job Title',
		width: 250,
		renderCell: params => (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Work />
				{params.value}
			</Box>
		),
	},
	{
		field: 'phone',
		headerName: 'Contact Number',
		type: 'number',
		width: 150,
		renderCell: params => (
			<Link href={'tel:' + params.value}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					{params.value && <Phone />}
					{params.value}
				</Box>
			</Link>
		),
	},
	{
		field: 'email',
		headerName: 'Email Address',
		type: 'email',
		width: 250,
		renderCell: params => (
			<Link
				href={'mailto:' + params.value}
				target='_blank'
				rel='noopener noreferrer'
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Mail />
					{params.value}
				</Box>
			</Link>
		),
	},
]

const paginationModel = { page: 0, pageSize: 10 }

const Home = () => {
	const [rows, setRows] = useState([])

	useEffect(() => {
		const res = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [])
		res
			.then(res => {
				const data = res.documents.map((doc, idx) => {
					return {
						id: idx + 1,
						name: `${doc.firstname || ''} ${doc.lastname || ''}`,
						category: doc.category || '',
						stakeholder_group: doc.stakeholder_group || '',
						organisation: doc.organisation || '',
						job_title: doc.job_title || '',
						phone: doc.phone || '',
						email: doc.email || '',
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
			<Container maxWidth={'xl'} sx={{ height: '100vh' }}>
				<Typography variant='h1' py={5}>
					Stakeholder Register
				</Typography>
				<StakeholderSkeleton />
			</Container>
		)
	}

	return (
		<Container maxWidth='xl' sx={{ height: '100vh' }}>
			<Typography variant='h1' py={5}>
				Stakeholder Register
			</Typography>
			<Paper variant='elevation' elevation={5}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					sx={{ border: 'none' }}
					density='comfortable'
				/>
			</Paper>
		</Container>
	)
}

export default Home
