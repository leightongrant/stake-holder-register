import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './index.css'

import '@fontsource-variable/quicksand'
import { palletteDark, palletteLight } from './theme/pallette.js'
import { typography } from './theme/typography.js'

const theme = createTheme({
	colorSchemes: {
		dark: { palette: palletteDark },
		light: { palette: palletteLight },
	},
	typography: typography,
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
)
