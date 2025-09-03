import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { SpacexProvider } from '../../contexts/spacexContext/SpacexContext'
import { StrictMode } from 'react'
import PageSpacex from '../../pages/pageSpacex/PageSpacex'
import '@testing-library/jest-dom'

describe('Content + ModalWindow component', () => {
	beforeEach(() => {
		const modalRoot = document.createElement('div')
		modalRoot.setAttribute('id', 'modal-root')
		document.body.appendChild(modalRoot)

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

	it('при нажатии на кнопку See more открывает и закрывает модальное окно', async () => {
		render(
			<StrictMode>
				<SpacexProvider>
					<MantineProvider>
						<PageSpacex />
					</MantineProvider>
				</SpacexProvider>
			</StrictMode>
		)

		const resultButtons = await screen.findAllByText(/See more/i)
		fireEvent.click(resultButtons[0])

		expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: '×' }))
		expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument()
	})
})
