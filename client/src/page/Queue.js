import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect,useState} from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { addToQ, getUsers } from '../http/queueAPI'
import { Context } from '../index'

const Queue = observer(() => {

    const {user, curUsers} = useContext(Context)
    const {id} = useParams()
    
    
    const getIn = async () => {
        try {
            console.log(user.user.id + ' ' + id)
            const res = await addToQ(user.user.id, id) 
            return res
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }

    useEffect(()=>{
        getUsers(id).then(data=>{
            console.log(data)
            curUsers.setUsers(data)
            console.log(curUsers.users.id)
        })
    }, [curUsers,id])


    return (
        <Container>
            
                <Row>
                    <Col className='mt-4' sm={8}>
                        <Card>
                            <h2>Очередь</h2>
                        </Card>
                    </Col>
                    <Col className='mt-4' sm={4}>
                        <Card>
                            {(() =>{
                                if(!user.isAuth) return <h4>Вы не можете встать в очередь, пожалуйста авторизуйтесь</h4>
                                else if (curUsers.users.id){
                                    if(curUsers.users.id.indexOf(user.user.id) !== -1)
                                    return( 
                                        <Button
                                            variant='outline-danger'
                                            // onClick={}
                                        >
                                            Выйти
                                        </Button>
                                    )
                                }
                                
                                else return( 
                                    <Button
                                        variant='outline-success'
                                        onClick={getIn}
                                    >
                                        Встать в очередь
                                    </Button>
                                )
                            
                            })()}
                        </Card>
                    </Col>
                </Row>
           
        </Container>
    )
})

export default Queue
