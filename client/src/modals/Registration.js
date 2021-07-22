import React, {useState, useContext} from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import {Context} from '../index'





const Registration = observer (({show,onHide}) => {
  const {user} = useContext(Context)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [okEmail, setOkEmail] = useState(true)

  const signUp = async () => {

    try {
      const data = await registration(username,email,password)
      user.setUser(data)
      user.setIsAuth(true)
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  const checkEmail = () => {
    setOkEmail(false)
    const mask = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    mask.test(document.getElementById('emailInput').value) ? setOkEmail(true) : setOkEmail(false)
    
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
        <h6>Логин</h6>
          <Form.Control
            placeholder={'Введите логин'}
            className='mb-3'
            value={username}
            onChange={str => setUsername(str.target.value)}

          />
          <h6>Пароль</h6>      
          <Form.Control
            placeholder={'Введите пароль'}
            type="password"
            className='mb-3'
            value={password}
            onChange={str => setPassword(str.target.value)}
          />
          <h6>Подтвердите пароль</h6>      
          <Form.Control
            placeholder={'Подтвердите пароль'}
            type="password"
            className='mb-3'
            
            
          />


          <div className='d-flex justify-content-between'>
            <h6>Email</h6>
            { okEmail? null:<h6 style={{color:'red'}}>*Введите правильный Email</h6> }
          </div>

          <Form.Control 
            id='emailInput'
            type="email" 
            placeholder="name@example.com" 
            className='mb-3'
            value={email}
            onChange={str => {
              setEmail(str.target.value);
              checkEmail()
              
            }}
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
