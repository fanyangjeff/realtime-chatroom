import React, { useState, useRef} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {useContacts} from './Context/useContacts'
import {useConversations} from './Context/useConversations'
const NewConversationModal = ({showModal, setShowModal}) => {

    const {contacts} = useContacts()
    const {createConversation} = useConversations()
    const [selectedContacts, setSelectedContacts] = useState([])
    const groupNameRef = useRef()

    const handleClose = () => {
        setShowModal(false)
        setSelectedContacts([])
    }

    const handleChangeCheckBox = (selectedUserEmail) => {
        if (selectedContacts.includes(selectedUserEmail)){
            setSelectedContacts(prevContacts => {
                return prevContacts.filter(contact => contact != selectedUserEmail)
            })
        } else {
            setSelectedContacts(prevContacts => {
                return [...prevContacts, selectedUserEmail]
            })
        }
    }

    const handleSubmit = () => {
        if (selectedContacts.length == 0 || groupNameRef.current.value == ""){
            handleClose()
        }
        handleClose()
        createConversation(selectedContacts, groupNameRef.current.value)
    }

    /*
    useEffect(() => {
        console.log(selectedContacts)
    }, [selectedContacts])
    */

    return (
        <Modal show={showModal}>
            <Modal.Header>
                <Modal.Title>Crate New Conversation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        {contacts.map(contact => {
                            return (
                                <Form.Check 
                                type='checkbox' 
                                label={contact.name? contact.name: contact.email} 
                                key={contact.email}
                                onChange={() => {handleChangeCheckBox(contact.email)}}
                                >
                                </Form.Check>
                            )
                        })}
                    </Form.Group>
                    <Form.Control type='text' ref={groupNameRef} placeholder='Enter Group Name'/>

               
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>close</Button>
                <Button variant='primary' onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewConversationModal
