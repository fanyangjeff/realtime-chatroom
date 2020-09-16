import React , {useRef} from 'react'
import { Modal, Button, Form} from 'react-bootstrap'
import {useContacts} from './Context/useContacts'
const NewContactModal = ({showModal, setShowModal}) => {

    const emailRef = useRef()
    const nameRef = useRef()

    const {createContact} = useContacts()

    const handleClose = () => {
      setShowModal(false)
    }

    const addContact = () => {
      if (emailRef.current.value == '') return
      createContact(emailRef.current.value, nameRef.current.value)
      handleClose()
    }
  
    return (
      <Modal show={showModal}>
          <Modal.Header>
            <Modal.Title>Create New Contact</Modal.Title>
          </Modal.Header>
          <Form style={{marginLeft: "20px", marginRight: "20px"}}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='text' placeholder='email address' ref={emailRef}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='name' ref={nameRef}/>
            </Form.Group>
          </Form>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>close</Button>
            <Button variant='primary' onClick={addContact}>Add</Button>
          </Modal.Footer>
      </Modal>
    )
}

export default NewContactModal