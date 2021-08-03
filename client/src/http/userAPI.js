import { $authHost, $host } from "./index"
import jwt_decode from 'jwt-decode'

export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/registration', {username,email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username,password})
    
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const getQs = async (id) => {
    const {data} = await $authHost.get('api/user/getAllQs',{
        params:{
            id
        }
    })
    return data
}

export const getUser = async (id) => {
    const {data} = await $host.get('api/user/getUser',{
        params:{
            id
        }
    })
    return data
}