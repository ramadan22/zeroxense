export const PackageAction = (params) => {
    return dispatch => {
        dispatch(ModalDefaultToReducer(params))
    }
}

const ModalDefaultToReducer = (data) => ({
    type: "PACKAGE_PARAMS",
    load: data
})