import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin'

export const StakeholderEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source='id' />
			<TextInput source='stakeholderName' />
			<TextInput source='category' />
			<TextInput source='stakeholderAnalysisGroup' />
			<TextInput source='organisation' />
			<TextInput source='role' />
			<TextInput source='phone' />
			<TextInput source='email' />
			<TextInput source='address' />
			<DateInput source='$createdAt' />
			<DateInput source='$updatedAt' />
		</SimpleForm>
	</Edit>
)
