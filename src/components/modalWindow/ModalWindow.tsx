import { SpacexContext } from '../../contexts/spacexContext/SpacexContext'
import styles from './ModalWindow.module.css'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

function ModalWindow() {
	const context = useContext(SpacexContext)
	if (!context) {
		throw new Error('контекст не передался')
	}

	const { state, dispatch } = context
	const curObj = state.selectedCard

	if (!curObj) return null

	const modalRoot = document.getElementById('modal-root')
	if (!modalRoot) return null

	return ReactDOM.createPortal(
		<div className={styles.modalWindowContainer}>
			<div className={styles.curObjContainer}>
				<div className={styles.containerHeaderModalWindow}>
					<h4>{curObj.mission_name}</h4>
					<button
						className={styles.spanClose}
						onClick={() => dispatch({ type: 'CLEAR_SELECTED_ITEM' })}
					>
						&times;
					</button>
				</div>

				<img
					src={curObj.links?.mission_patch}
					alt={curObj.mission_name}
					className={styles.modalWindowImg}
				/>
				<div className={styles.containerContentModalWindow}>
					<div className={styles.missionName}>
						<h4>Mission name:</h4>
						<p className={styles.textColorModalWindow}>{curObj.mission_name}</p>
					</div>
					<div className={styles.rocketName}>
						<h4>Rocket name:</h4>
						<p className={styles.textColorModalWindow}>
							{curObj.rocket?.rocket_name}
						</p>
					</div>
					<div className={styles.details}>
						<h4>Details:</h4>
						<p className={styles.textColorModalWindow}>{curObj.details}</p>
					</div>
				</div>
			</div>
		</div>,
		modalRoot
	)
}

export default ModalWindow
