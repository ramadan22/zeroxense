export const ModalDefaultAction = (params) => {
    return dispatch => {
        if(Object.keys(params).length > 0)
            dispatch(ModalDefaultToReducer(params));
        else 
            dispatch(ModalDefaultToReducer({}));
    }
}

const ModalDefaultToReducer = (data) => ({
    type: "MODAL_DEFAULT",
    load: data
})