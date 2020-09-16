import React, { useContext, useState, useEffect }from 'react'

const ConversationContext = React.createContext()


export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationProvider({children}) {

    const [conversations, setConversations] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const createConversation = (receipients, groupName) => {
        setConversations(prevConversations => {
            return [...prevConversations, {receipients, messages: [], groupName}]
        })
    }

    const changeSelectedIndex = (index) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        console.log(conversations)
    })

    const value = {conversations, selectedIndex, createConversation, changeSelectedIndex,
                    selectedConversation: conversations[selectedIndex]}


    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}
