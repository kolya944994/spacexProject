import Content from '../../components/content/Content'
import ModalWindow from '../../components/modalWindow/ModalWindow'
import { SpacexContext } from '../../contexts/spacexContext/SpacexContext'
import styles from './PageSpacex.module.css'
import { useContext, useEffect } from 'react'

function PageSpacex() {
	const context = useContext(SpacexContext)

	if (!context) {
		throw new Error('контекст не передали')
	}
	const { dispatch } = context

	useEffect(() => {
		async function fetchSpacex() {
			try {
				const request = await fetch(
					'https://api.spacexdata.com/v3/launches?launch_year=2020'
				)
				const resultData = await request.json()
				dispatch({ type: 'REQUEST_FETCH', payload: resultData })
			} catch (err) {
				console.log('ошибка при запросе:', err)
			}
		}
		fetchSpacex()
	}, [])

	return (
		<>
			<h1>SpaceX Launches 2020</h1>
			<ModalWindow />
			<Content />
		</>
	)
}

export default PageSpacex
