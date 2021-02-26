import { axios } from '../../libraries'
// import { getData } from '../masters/localStorage__Master'

// export const Api = axios.create({
//     baseURL: 'http://travel.codelabsproject.com/zeroxense-gateway/public/api',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-APP-TOKEN' : 'ogl9YPIdETLwXRaJIgpBIBrN7tHVOued'
//     }
// })

export const ApiTokenRedux = axios.create({
  baseURL: 'http://travel.codelabsproject.com/zeroxense-gateway/public/api',
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-APP-TOKEN' : 'ogl9YPIdETLwXRaJIgpBIBrN7tHVOued'
  }
})

// ApiTokenRedux.interceptors.request.use(
//     async config => {
//       const token = await "test"
//       console.log(token)
//       if (token) {
//         config.headers.Authorization = `Bearer ${'test'}`
//       }
//       return config
//     },
//     error => {
//       return Promise.reject(error)
//     }
//   )