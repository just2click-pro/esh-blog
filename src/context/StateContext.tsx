import { createContext, Dispatch, useContext } from "react";
import { Action, State } from "../store"

interface ContextProps {
    state: State
    dispatch: Dispatch<Action>
}

const StateContext = createContext({} as ContextProps)

export function useStateContext() {
    return useContext(StateContext)
}

export default StateContext