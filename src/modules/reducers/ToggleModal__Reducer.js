const initialState = {
    ToggleModalStatus: false
}

export const ToggleModalReducer = (state = initialState, action) => {
    switch(action.type){
        case "TOGGLE_MODAL":
            return {
                ...state,
                ToggleModalStatus: action.load
            }
        default:
            return state
    }
}   