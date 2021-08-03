import React, {useContext, useEffect, useState} from 'react'
import { Card, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '..'
import { getUser } from '../http/userAPI'

const Profile = () => {
    const {id} = useParams()
    const {curUsers} = useContext(Context)
    const [username, setUsername] = useState()

    useEffect(() => {
       getUser(id).then((data)=>{
        curUsers.setUsers(data)
        setUsername(curUsers.users.username)
        console.log(curUsers.users.username)
       })
    }, [curUsers, id])
    return (
        <Container>
            <Card className='mt-3 p-2'>
                <h1>Профиль пользователя</h1>
                <h2>{username}</h2>

            </Card>
        </Container>
    )
}

export default Profile
