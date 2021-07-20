import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Card, Container, Form} from 'react-bootstrap'

const Find = observer(() => {
    return (
        <Container >
            <Card className='align-items-center mt-4 p-4'>
                <h4 className='ml-0'>Поиск номеру очереди</h4>
                <Form style={{width:'75%'}}>
                    <Form.Control
                        placeholder='Введите номер'
                        style={{width:'98.5%'}}
                    />
                    <Container className='d-flex justify-content-end'>
                    <Button 
                            
                            variant={'outline-secondary'} 
                            className='m-2'
                        >
                            Очистить
                    </Button>
                    <Button 
                            
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
                        placeholder='Введите название'
                        style={{width:'98.5%'}}
                    />
                    <Container className='d-flex justify-content-end'>
                    <Button 
                            
                            variant={'outline-secondary'} 
                            className='m-2'
                        >
                            Очистить
                    </Button>
                    <Button 
                            
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
