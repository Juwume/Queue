import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const Registration = ({show,onHide}) => {
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
          />
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            placeholder={'Введите пароль'}
            type="password"
            className='mb-3'
          />
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            className='mb-3'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={onHide}>Войти</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default Registration
