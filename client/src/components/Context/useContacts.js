import React, {useContext, useState} from 'react'

const ContactsContext = React.createContext()


export function useContacts(){
    return useContext(ContactsContext)
}

const testContacts = [{email: '1', name: 'Fan Yang'}, {email: '2', name: 'Jeff'}, {email: '3', name: "xiaowang"}]
export function ContactsProvider({children}){

    const [contacts, setContacts] = useState(testContacts)

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



