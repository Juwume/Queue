import React, {useState, useContext} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import {Context} from '../index'





const Registration = observer (({show,onHide}) => {
  const {user} = useContext(Context)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    try {
      const data = await registration(username,email,password)
      user.setUser(data)
      user.setIsAuth(true)
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }
    return (
        <Modal  
      size="md"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Регистрация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Label>Логин</Form.Label>
          <Form.Control
            placeholder={'Введите логин'}
            className='mb-3'
            value={username}
            onChange={str => setUsername(str.target.value)}

          />
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            placeholder={'Введите пароль'}
            type="password"
            className='mb-3'
            value={password}
            onChange={str => setPassword(str.target.value)}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            className='mb-3'
            value={email}
            onChange={str => setEmail(str.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={signUp}>Ок</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default Registration
