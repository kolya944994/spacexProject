import styles from './MyCart.module.css'
import React from 'react'
import { Card } from '@mantine/core'

type MyCartProps = {
	children?: React.ReactNode
	className?: string
}

function MyCart({ children, className }: MyCartProps) {
	return (
		<Card
			className={`${styles.myCartContainer} ${className}`}
			shadow='sm'
			padding='md'
			radius='md'
			withBorder
		>
			{children}
		</Card>
	)
}

export default MyCart
