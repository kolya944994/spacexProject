import { SpacexContext } from '../../contexts/spacexContext/SpacexContext'
import MyButton from '../../ui/button/MyButton'
import MyCart from '../../ui/cart/MyCart'
import styles from './Content.module.css'
import { useContext } from 'react'

function Content() {
	const context = useContext(SpacexContext)
	if (!context) {
		throw new Error('Контекст не передали')
	}
	const { state, dispatch } = context

	return (
		<div className={styles.contentContainer}>
			{state.data.map(curObj => (
				<MyCart key={curObj.flight_number} className={styles.oneMyCart}>
					<img
						src={curObj.links?.mission_patch_small}
						alt={curObj.mission_name}
					/>

					<h4>{curObj.mission_name}</h4>
					<p className={styles.textColor}>{curObj.rocket?.rocket_name}</p>
					<MyButton
						onClick={() =>
							dispatch({ type: 'SET_SELECTED_ITEM', payload: curObj })
						}
					>
						<b>See more</b>
					</MyButton>
				</MyCart>
			))}
		</div>
	)
}

export default Content
