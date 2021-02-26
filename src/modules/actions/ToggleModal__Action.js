export const ToggleModalAction = (status) => {
    return dispatch => {
        dispatch(ToggleActionReducer(status))
    }
}

const ToggleActionReducer = (data) => ({
    type: "TOGGLE_MODAL",
    load: data
})