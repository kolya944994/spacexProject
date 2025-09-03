import { Button } from '@mantine/core'
import styles from './MyButton.module.css'
import React from 'react'

type MyButtonProps = {
	children: React.ReactNode
	onClick: () => void
}

function MyButton({ children, onClick }: MyButtonProps) {
	return (
		<Button className={styles.myButtonContainer} onClick={onClick}>
			{children}
		</Button>
	)
}

export default MyButton
