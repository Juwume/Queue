import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const Login = ({show, onHide}) => {
    return (
        <Modal
      size="lg"
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
          <Form.Control
            placeholder={'Введите username'}
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

export default Login
