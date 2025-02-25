import { Admin, Resource } from 'react-admin'
import {
	appWriteDataProvider,
	// appWriteAuthProvider,
	// LoginForm,
} from 'ra-appwrite'

import { client } from '../lib/appwrite'
import { DATABASE_ID, COLLECTION_ID } from '../lib/appwrite'
import { StakeholderList } from './StakeholderList'
import { StakeholderShow } from './StakeholderShow'
import { StakeholderEdit } from './StakeholderEdit'

const dataProvider = new appWriteDataProvider({
	client,
	databaseId: DATABASE_ID,
	collectionIds: {
		stakeholders: COLLECTION_ID,
	},
})

// class custAppWriteAuthProvider extends appWriteAuthProvider {
// 	logout() {
// 		super.logout()
// 		localStorage.removeItem('cookieFallback')
// 	}
// }

// const authProvider = new custAppWriteAuthProvider({
// 	client,
// 	account,
// })

// const SignIn = () => {
// 	return (
// 		<Login>
// 			<LoginForm />
// 		</Login>
// 	)
// }

const AdminApp = () => {
	return (
		<Admin
			dataProvider={dataProvider}
			// authProvider={authProvider}
			basename='/admin'

			// loginPage={<SignIn />}
		>
			<Resource
				name='stakeholders'
				list={StakeholderList}
				edit={StakeholderEdit}
				show={StakeholderShow}
			/>
		</Admin>
	)
}

export default AdminApp
