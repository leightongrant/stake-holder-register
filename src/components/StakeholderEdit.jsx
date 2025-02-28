import { Edit, SimpleForm, TextInput } from 'react-admin'

export const StakeholderEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source='firstname' />
			<TextInput source='lastname' />
			<TextInput source='category' />
			<TextInput source='stakeholder_group' />
			<TextInput source='organisation' />
			<TextInput source='job_title' />
			<TextInput source='phone' />
			<TextInput source='email' />
		</SimpleForm>
	</Edit>
)
