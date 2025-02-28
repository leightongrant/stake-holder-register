import { EmailField, Show, SimpleShowLayout, TextField } from 'react-admin'

export const StakeholderShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField source='firstname' />
			<TextField source='lastname' />
			<TextField source='category' />
			<TextField source='stakeholder_group' />
			<TextField source='organisation' />
			<TextField source='job_title' />
			<TextField source='phone' />
			<EmailField source='email' />
		</SimpleShowLayout>
	</Show>
)
