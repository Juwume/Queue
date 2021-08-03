import { observer } from 'mobx-react-lite'
import React, {useContext} from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Context } from '../index'
import { QUEUE_ROUTE } from '../utils/consts'

const Found = observer(({show, onHide}) => {

    const {queues} = useContext(Context)
    const history = useHistory()

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Найденные очереди
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
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
                }): <h3>Ничего не найдено, попробуй ещё раз!</h3>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
})

export default Found
