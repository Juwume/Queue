import { observer } from 'mobx-react-lite'
import React, {useState, useContext} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { login } from '../http/userAPI'
import {Context} from '../index'



const Login = observer(({show, onHide}) => {

  const {user} = useContext(Context)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
      
      try {
        const data = await login(username,password)
        user.setUser(true)
        user.setIsAuth(true)
        onHide()
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
          Вход
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
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={signIn}>Войти</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default Login
