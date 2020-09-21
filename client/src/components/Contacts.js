import React, {useEffect} from 'react'
import {ListGroup} from 'react-bootstrap'
import {useContacts} from './Context/useContacts'
const Contacts = () => {
    const {contacts} = useContacts()

    return (
        <div>
            <ListGroup>
               {contacts.map(contact => {
                   return (
                       <ListGroup.Item key={contact.email}>{contact.name? contact.name: contact.email}</ListGroup.Item>
                   )
               })}
            </ListGroup>
        </div>
    )
}

export default Contacts
