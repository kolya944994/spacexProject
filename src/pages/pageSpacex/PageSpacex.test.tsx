import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { SpacexProvider } from '../../contexts/spacexContext/SpacexContext'
import { StrictMode } from 'react'
import PageSpacex from '../../pages/pageSpacex/PageSpacex'

describe('PageSpacex component', () => {
	beforeEach(() => {
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve([
						{
							flight_number: 1,
							mission_name: 'FalconSat',
							details: 'Demo details',
							rocket: { rocket_name: 'Falcon 1' },
							links: {
								mission_patch: 'test.png',
								mission_patch_small: 'test-small.png',
							},
						},
					]),
			})
		) as unknown as typeof fetch
	})

	it('при рендере страницы должен подгружаться массив данных от API', async () => {
		render(
			<StrictMode>
				<SpacexProvider>
					<MantineProvider>
						<PageSpacex />
					</MantineProvider>
				</SpacexProvider>
			</StrictMode>
		)
		expect(screen.queryByText(/See more/i)).not.toBeInTheDocument()
		const resultButtons = await screen.findAllByText(/See more/i)
		expect(resultButtons[0]).toBeInTheDocument()
		expect(await screen.findByText(/FalconSat/i)).toBeInTheDocument()
	})
})
