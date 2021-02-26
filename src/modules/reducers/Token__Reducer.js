const initialState = {
    token: null
}

export const TokenReducer = (state = initialState, action) => {
    switch(action.type){
        case "TOKEN_DATA":
            return {
                ...state,
                token: action.load
            }
        default:
            return state
    }
}   