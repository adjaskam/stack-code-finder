import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action, CodeFragmentState } from "../actions"

export const fetchCodeFragments = (codeFragments: CodeFragmentState) => {
    return (dispatch: Dispatch<Action>) => {    
        dispatch({
            type: ActionType.FETCH,
            payload: codeFragments
        })
    }
}