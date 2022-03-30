import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action, CodeFragmentMeta } from "../actions"

export const fetchCodeFragments = (codeFragment: CodeFragmentMeta) => {
    return (dispatch: Dispatch<Action>) => {    
        dispatch({
            type: ActionType.FETCH,
            payload: codeFragment
        })
    }
}