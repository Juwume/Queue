import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container,Form,Card, Button } from 'react-bootstrap'

const clearInput = (idElem) =>{
    try {
        document.getElementById(idElem).value = ""
    } catch (error) {
       console.log(error) 
    }
}

const Create = observer(() => {
    return (
        <Container>
            <Card className='align-items-center mt-4 p-4'>
                <Form style={{width:'75%'}}>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        id='name'
                        style={{width:'98.5%'}}
                        placeholder={'Введите название'}
                        className='mb-3'
                    />
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        id='description'
                        style={{width:'98.5%'}}
                        placeholder={'Напишите описание для вашей очереди'}
                        as="textarea"
                        className='mb-3'
                    />
                    <Container className='d-flex justify-content-end'>
                    <Button 
                            
                            variant={'outline-secondary'} 
                            className='m-2'
                            onClick={() => {
                                clearInput('description')
                                clearInput('name')
                            }}
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

export default Create
