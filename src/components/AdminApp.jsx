import { Admin, Resource } from 'react-admin'
import { appWriteDataProvider } from 'ra-appwrite'

import { client } from '../lib/appwrite'
import { DATABASE_ID, COLLECTION_ID } from '../lib/appwrite'
import { StakeholderList } from './StakeholderList'
import { StakeholderShow } from './StakeholderShow'
import { StakeholderEdit } from './StakeholderEdit'
import { StakeholderCreate } from './StakeholderCreate'

const dataProvider = new appWriteDataProvider({
	client,
	databaseId: DATABASE_ID,
	collectionIds: {
		stakeholders: COLLECTION_ID,
	},
})

const AdminApp = () => {
	return (
		<Admin dataProvider={dataProvider} basename='/admin'>
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

export default AdminApp
