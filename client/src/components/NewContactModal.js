import React , {useRef, useEffect} from 'react'
import { Modal, Button, Form} from 'react-bootstrap'
import {useContacts} from './Context/useContacts'
import  {useSocket} from './Context/useSockets'
const NewContactModal = ({showModal, setShowModal}) => {

    const emailRef = useRef()
    const nameRef = useRef()
    const socket = useSocket()
    const {createContact} = useContacts()

    const handleClose = () => {
      setShowModal(false)
    }

    useEffect(() => {
      if (!socket) return

      socket.on('requestFeedback', ({succeed}) => {
        if (!succeed) {
          console.log('friend does not exist')
          
        } else {
          createContact(emailRef.current.value, nameRef.current.value)
        }
        handleClose()
      })
      return () => socket.off('requestFeedback')
    }, [socket])

    const addContact = () => {
      if (emailRef.current.value == '') return
      socket.emit("sendRequest", emailRef.current.value)
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