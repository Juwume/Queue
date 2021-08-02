import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect,useState} from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { addToQ, getUsers, leave } from '../http/queueAPI'
import { Context } from '../index'

const Queue = observer(() => {

    const {user, curUsers} = useContext(Context)
    const {id} = useParams()
    const update = async () => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'api/queue?id='+id)
        
        let parse = await response.json()
       
        if(!(parse[0].users.length == curUsers.users.length) || !(parse[0].users.every(function(element, index) {
            return curUsers.users.filter((data)=>{
                return data.id === element.id
            }).length > 0
        }))) {
            clearInterval(timerId);
            curUsers.setUsers(parse[0].users)
        }
        

        
    }
    
    const getIn = async () => {
        try {
            const res = await addToQ(user.user.id, id) 
            await update()
            return res
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }
    const getOut = async () => {
        try {
            const res = await leave(user.user.id, id) 
            await update()
            
            return res
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    let timerId = setInterval(update, 5000)
    useEffect(()=>{
        getUsers(id).then(data=>{
            try {
                curUsers.setUsers(data[0].users)
            } catch (error) {
                alert("Ошибка")
            }
            
            // curUsers.users.map(data=>console.log(data.username))
        })
    }, [curUsers,id])


    return (
        <Container>
            
                <Row>
                    <Col className='mt-4' sm={8}>
                        <Card className='p-4'>
                            <h2>Очередь</h2>
                            {curUsers.users.map((data)=>{
                                return(
                                    <Card 
                                    style={{height:'50px', background:'#212529', color:'white', textAlign:'center', fontSize:'20px', border:'2px solid white'}}
                                    >{data.username}</Card>
                                )
                            })}
                        </Card>
                    </Col>
                    <Col className='mt-4' sm={4}>
                        <Card className='p-2'>
                            {(() =>{
                                if(!user.isAuth) return <h4>Вы не можете встать в очередь, пожалуйста авторизуйтесь</h4>
                                else if(curUsers.users.filter((data)=>{
                                        return data.id === user.user.id
                                    }).length > 0)
                                    return( 
                                        <Button
                                            variant='outline-danger'
                                            onClick={getOut}
                                        >
                                            Выйти
                                        </Button>
                                    )
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
