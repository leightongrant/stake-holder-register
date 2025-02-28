import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin'

export const StakeholderCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source='firstname' />
			<TextInput source='lastname' />
			<SelectInput
				source='category'
				choices={['Stonewater', 'Suppliers', 'Finance', 'Partners', 'Other']}
				defaultValue='Stonewater'
			/>
			<SelectInput
				source='stakeholder_group'
				choices={['Keep Informed', 'Monitor', 'Other']}
				defaultValue='Keep Informed'
			/>
			<TextInput source='organisation' />
			<TextInput source='job_title' />
			<TextInput source='phone' />
			<TextInput source='email' />
		</SimpleForm>
	</Create>
)
