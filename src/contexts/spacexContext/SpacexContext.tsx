import { createContext, useReducer } from 'react'

type FetchType = {
	flight_number: number
	links: {
		mission_patch_small: string
		mission_patch: string
	}
	mission_name: string
	rocket: {
		rocket_name: string
	}
	details: string
}

export type State = {
	data: FetchType[]
	selectedCard: null | FetchType
}
type Action =
	| { type: 'REQUEST_FETCH'; payload: FetchType[] }
	| { type: 'SET_SELECTED_ITEM'; payload: FetchType }
	| { type: 'CLEAR_SELECTED_ITEM' }

export type SpacexContextType = {
	state: State
	dispatch: React.Dispatch<Action>
}

const initialState = {
	data: [],
	selectedCard: null,
}

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'REQUEST_FETCH':
			return { ...state, data: action.payload }
		case 'SET_SELECTED_ITEM':
			return { ...state, selectedCard: action.payload }
		case 'CLEAR_SELECTED_ITEM':
			return { ...state, selectedCard: null }
		default:
			return state
	}
}

export const SpacexContext = createContext<SpacexContextType | null>(null)

export function SpacexProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<SpacexContext.Provider value={{ state, dispatch }}>
			{children}
		</SpacexContext.Provider>
	)
}
