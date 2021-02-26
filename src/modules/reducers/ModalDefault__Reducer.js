const initialState = {
    data: {}
}

export const ModalDefaultReducer = (state = initialState, action) => {
    switch(action.type){
        case "MODAL_DEFAULT":
            return {
                ...state,
                data: { ...action.load }
            }
        default:
            return state
    }
}   