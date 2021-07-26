import { observer } from 'mobx-react-lite'
import React, {useState} from 'react'
import { Container,Form,Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { createQ } from '../http/queueAPI'
import { Context } from '../index'
import { QUEUE_ROUTE } from '../utils/consts'

const clearInput = (idElem) =>{
    try {
        document.getElementById(idElem).value = ""
    } catch (error) {
       console.log(error) 
    }
}

const Create = observer(() => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const history = useHistory()

    const checkInputs = () => {
        
        if (name && description) return false 
        else return true
    }

    const create = async () => {
        try {
            const res = await createQ(name,description)
            history.push(QUEUE_ROUTE + `/${res.id}`)
        } catch (error) {
            alert(error.response.data.message)
        }
     
    }

    return (
        <Container>
            <Card className='align-items-center mt-4 p-4'>
                <Form style={{width:'75%'}}>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={str=>setName(str.target.value)}
                        id='nameInput'
                        style={{width:'98.5%'}}
                        placeholder={'Введите название'}
                        className='mb-3'
                    />
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={str=>setDescription(str.target.value)}
                        id='descriptionInput'
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
                                clearInput('descriptionInput')
                                clearInput('nameInput')
                            }}
                        >
                            Очистить
                    </Button>
                    <Button
                            disabled={checkInputs()} 
                            onClick={create}
                            variant={'outline-success'} 
                            className='mt-2 mb-2'
                        >
                            Создать
                    </Button>
                    
                    </Container>
                </Form>
            </Card>
            
        </Container>
    )
})

export default Create
