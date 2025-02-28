import { Datagrid, EmailField, List, TextField } from 'react-admin'
export const StakeholderList = () => (
	<List>
		<Datagrid>
			<TextField source='firstname' />
			<TextField source='lastname' />
			<TextField source='category' />
			<TextField source='stakeholder_group' />
			<TextField source='organisation' />
			<TextField source='job_title' />
			<TextField source='phone' />
			<EmailField source='email' />
		</Datagrid>
	</List>
)
