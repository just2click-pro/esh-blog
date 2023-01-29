export enum ActionType {
    SET_LANG = "SET_LANG",
}

export interface Action {
    type: ActionType
    payload: string
}

export interface State {
    lang: string;
}

export const initialState: State = {
    lang: "en",
}

export const State: State = initialState

export function reducer(state: State, action: Action) {
    const { type, payload } = action

    switch (type) {
        case ActionType.SET_LANG:
            return { ...state, lang: payload }
        default:
            return state;
    }
}

export default reducer;
