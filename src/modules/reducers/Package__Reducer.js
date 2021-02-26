const initialState = {
    params: {}
}

export const PackageReducer = (state = initialState, action) => {
    switch(action.type){
        case "PACKAGE_PARAMS":
            return {
                ...state,
                params: {...action.load}
            }
        default:
            return state
    }
}   