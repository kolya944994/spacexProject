import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { SpacexProvider } from './contexts/spacexContext/SpacexContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SpacexProvider>
			<MantineProvider defaultColorScheme='light'>
				<App />
			</MantineProvider>
		</SpacexProvider>
	</StrictMode>
)
