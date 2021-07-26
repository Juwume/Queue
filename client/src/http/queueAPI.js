import { $authHost, $host } from "./index"


export const getUsers = async (id) => {
    const {data} = await $host.get('api/queue',{
        params:{
            id
        }
    })
    return data
    
}
export const searchById = async (id) => {
    const {data} = await $host.get('api/queue/searchById',{
        params:{
            id
        }
    })
    return data
    
}
export const searchByName = async (name) => {
    const {data} = await $host.get('api/queue/searchByName',{
        params:{
            name
        }
    })
    return data
    
}

export const addToQ = async (userId, queueId) => {
    const {data} = await $authHost.post('api/queue/addToQ',{
            userId,
            queueId
        })
    return data
    
}
export const createQ = async (name, description) => {
    const {data} = await $authHost.post('api/queue/create',{
            name,
            description
        })
    return data
    
}
export const deleteQ = async (id) => {
    const {data} = await $authHost.post('api/queue/delete',{
            id
        })
    return data
    
}

export const leave = async (userId, queueId) => {
    const {data} = await $authHost.post('api/queue/leave', {userId, queueId})
    return data
}
