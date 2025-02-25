import {
	DateField,
	EmailField,
	Show,
	SimpleShowLayout,
	TextField,
} from 'react-admin'

export const StakeholderShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField source='id' />
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
		</SimpleShowLayout>
	</Show>
)
