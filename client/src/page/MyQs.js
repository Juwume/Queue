import { observer } from 'mobx-react-lite'
import React, {useContext, useEffect} from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '..'
import { getQs } from '../http/userAPI'
import { FIND_ROUTE, QUEUE_ROUTE } from '../utils/consts'

const MyQs = observer(() => {

    const history = useHistory()
    const {queues,user} = useContext(Context)
    useEffect(() => {
        getQs(user.user.id).then((data)=>{
            try {
                queues.setQueues(data[0].queues)
                console.log(queues.queues)
            } catch (error) {
                
            }
            
        })
    }, [])

    return (
        <Container>
            <Card className='p-4 pt-2 mt-3'>
                <h1>Мои очереди</h1>
                {queues.queues.length > 0? queues.queues.map(data=>{
                    return(
                        <Card 
                        style={{cursor:'pointer'}}
                        className='m-1'
                        key={data.id} 
                        onClick={()=>history.push(QUEUE_ROUTE+ '/' + data.id)}
                        >
                            <h4 className='m-2 mt-0'>{data.name}</h4>
                            <h5 className='m-2 mt-0' style={{font:'italic 20px  Arial', opacity:'0.75'}}>{data.description}</h5>
                        </Card>
                    )
                }): <h3>У тебя нет очередей, попробуй 
                    <Button
                        onClick={() => history.push(FIND_ROUTE)}
                    >поискать</Button>
                        </h3>}
            </Card>
            
        </Container>
    )
})

export default MyQs
