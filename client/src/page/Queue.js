import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect,useState} from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { addToQ, getUsers, leave } from '../http/queueAPI'
import { Context } from '../index'
import { PROFILE_ROUTE } from '../utils/consts'

const Queue = observer(() => {

    const [nameQueue, setNameQueue] = useState('')
    const [descQueue, setDescQueue] = useState('')
    const {user, curUsers} = useContext(Context)
    const {id} = useParams()
    const history = useHistory()
    const update = async () => {
        let response = await fetch(process.env.REACT_APP_API_URL + 'api/queue?id='+id)
        
        let parse = await response.json()
       try {
           console.log(parse)
           if(!parse.message){
            document.getElementById('nobody').innerHTML =''
            if(!(parse[0].users.length === curUsers.users.length) || !(parse[0].users.every(function(element, index) {
                return curUsers.users.filter((data)=>{
                    return data.id === element.id
                }).length > 0
            }))) {
                clearInterval(timerId);
                curUsers.setUsers(parse[0].users)
            }
           } else {
               document.getElementById('nobody').innerHTML = "В очереди никого нет, станьте первым!" 
               clearInterval(timerId);
                curUsers.setUsers([])
            }    
       } catch (error) {
           return
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
                console.log(data)
                setNameQueue(data[0].name)
                setDescQueue(data[0].description) 
                curUsers.setUsers(data[0].users)
            } catch (error) {
                document.getElementById('nobody').innerHTML = "В очереди никого нет, станьте первым!"
                setNameQueue(data.queueName)
                setDescQueue(data.queueDesc)
                curUsers.setUsers([])
            }
            
           
        })
    }, [curUsers,id])
    


    return (
        <Container>
            
                <Row>
                    <Col className='mt-4' sm={9}>
                        <Card className='p-4'>
                            <h2 >{nameQueue}</h2>
                            <h3>Уникальный номер: {id}</h3>
                            {descQueue? <p style={{font:'italic 20px  Arial', opacity:'0.75'}}>"{descQueue}"</p> : null}
                            
                            {curUsers.users? curUsers.users.map((data,index)=>{
                                return(
                                    <Card 
                                    onClick={()=>history.push(PROFILE_ROUTE+'/'+data.id)}
                                    key={index}
                                    style={{height:'50px', background:'#212529', color:'white', textAlign:'center', fontSize:'20px', border:'2px solid white', cursor:'pointer'}}
                                    >{`${index+1}. ${data.username}`}</Card>
                                )
                            }) : null}
                            <h4 id='nobody'></h4>
                        </Card>
                    </Col>
                    <Col className='mt-4' sm={3}>
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
