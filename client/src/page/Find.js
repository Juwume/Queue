import { observer } from 'mobx-react-lite'
import React, {useContext, useState} from 'react'
import {Context} from '../index'
import { Button, Card, Container, Form} from 'react-bootstrap'
import { searchById, searchByName } from '../http/queueAPI'

const Find = observer(() => {
    const {queues} = useContext(Context)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const findByName = async () => {
        try {
            console.log(name)
            searchByName(name).then(data=>{
                queues.setQueues(data)
                console.log(queues.queues)
            })

        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const findByNumber = async () => {
        try {
            console.log(number)
            searchById(number).then(data=>{
                queues.setQueues(data)
                console.log(queues.queues)
            })

        } catch (error) {
            alert(error.response.data.message)
        }
    }
    

    return (
        <Container >
            <Card className='align-items-center mt-4 p-4'>
                <h4 className='ml-0'>Поиск по номеру очереди</h4>
                <Form style={{width:'75%'}}>
                    <Form.Control
                        id='number'
                        value={number}
                        onChange={str=>setNumber(str.target.value)}
                        placeholder='Введите номер'
                        style={{width:'98.5%'}}
                    />
                    <Container className='d-flex justify-content-end'>
                    <Button 
                            onClick={() => {setNumber('')}}
                            variant={'outline-secondary'} 
                            className='m-2'
                        >
                            Очистить
                    </Button>
                    <Button 
                            disabled={number? false : true}
                            onClick={findByNumber}
                            variant={'outline-success'} 
                            className='mt-2 mb-2'
                        >
                            Найти
                    </Button>
                    
                    </Container>
 
                </Form>

                <h4 className='ml-0'>Поиск по названию</h4>
                <Form style={{width:'75%'}}>
                    <Form.Control
                        value={name}
                        onChange={str=>setName(str.target.value)}
                        placeholder='Введите название'
                        style={{width:'98.5%'}}
                    />
                    <Container className='d-flex justify-content-end'>
                    <Button 
                            onClick={() => {setName('')}}
                            variant={'outline-secondary'} 
                            className='m-2'
                        >
                            Очистить
                    </Button>
                    <Button 
                            onClick={findByName}
                            disabled={name? false : true}
                            variant={'outline-success'} 
                            className='mt-2 mb-2'
                        >
                            Найти
                    </Button>
                    
                    </Container>
 
                </Form>

            </Card>
        </Container>
    )
})

export default Find
