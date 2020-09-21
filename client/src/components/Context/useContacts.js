import React, {useContext, useState, useEffect} from 'react'
import {useSocket} from './useSockets'

const ContactsContext = React.createContext()


export function useContacts(){
    return useContext(ContactsContext)
}


export function ContactsProvider({children}){

    const [contacts, setContacts] = useState([])
    const socket = useSocket()

    useEffect(() => {
        if (!socket) return

        socket.on('newContactAdded', ({userId}) => {
            createContact(userId)
        })  

        return () => socket.off('newContactAdded')
        
    }, [socket])

    const createContact = (email, name) => {
        setContacts(prevContacts => {
            return [...prevContacts, {email, name}]
        })
    }

    return (
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}



