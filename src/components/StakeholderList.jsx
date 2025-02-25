import { Datagrid, DateField, EmailField, List, TextField } from 'react-admin'
export const StakeholderList = () => (
	<List>
		<Datagrid>
			<TextField source='stakeholderName' />
			<TextField source='category' />
			<TextField source='stakeholderAnalysisGroup' />
			<TextField source='organisation' />
			<TextField source='role' />
			<TextField source='phone' />
			<EmailField source='email' />
			<TextField source='address' />
			<DateField source='$createdAt' />
			<DateField source='$updatedAt' />
		</Datagrid>
	</List>
)
