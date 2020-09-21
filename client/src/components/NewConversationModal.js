import React, { useState, useRef, useEffect} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {useContacts} from './Context/useContacts'
import {useConversations} from './Context/useConversations'
import {useSocket} from './Context/useSockets'
import uuid from 'react-uuid'
const NewConversationModal = ({showModal, setShowModal, userId}) => {

    const {contacts} = useContacts()
    const {createConversation} = useConversations()
    const [selectedContacts, setSelectedContacts] = useState([])
    const [groupId, setGroupId] = useState(uuid())
    const groupNameRef = useRef()
    const socket = useSocket()

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


    useEffect(() => {
        //console.log(groupId)
    }, [groupId])

    const handleSubmit = () => {
        if (selectedContacts.length == 0 || groupNameRef.current.value == ""){
            handleClose()
        }

        if (socket) {
            //console.log([...selectedContacts, userId])
            socket.emit('createChat', {members: [...selectedContacts, userId], groupName: groupNameRef.current.value, groupId})
        }

        handleClose()

        createConversation(selectedContacts, groupNameRef.current.value, groupId)

        //for future use
        setGroupId(uuid())
    }

    
    

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
