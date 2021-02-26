import { ApiTokenRedux } from '../api'

export const TokenAction = () => {
    return dispatch => {
        ApiTokenRedux.post('/v1/auth/token', {client: 'app-web', secret: 'GpzE6kw3tWmgaGDEnjWdDh46j0waUV5z'})
        .then(res => {
            dispatch(TokenData(res.data.Data.token))
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

const TokenData = (data) => ({
    type: "TOKEN_DATA",
    load: data
})