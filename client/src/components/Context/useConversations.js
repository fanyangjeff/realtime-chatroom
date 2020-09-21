import React, { useContext, useState, useEffect, useCallback }from 'react'
import {useSocket} from './useSockets'

const ConversationContext = React.createContext()


export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationProvider({children, userId}) {

    const [conversations, setConversations] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const socket = useSocket()

    const createConversation = useCallback((receipients, groupName, groupId) => {
        setConversations(prevConversations => {
            return [...prevConversations, {receipients, messages: [], groupName, groupId}]
        })
    }, [setConversations])


    const addMessageToConversation = useCallback(({text, sender, time, groupId}) => {
       setConversations(prevConversations => {
           return prevConversations.map((conversation) => {
               if (conversation.groupId === groupId) {
                   conversation.messages = [...conversation.messages, {text, sender, time}]
               }
               return conversation
           })
       })
    }, [setConversations])


    const getCurrentConversationMessages = () => {
        if (conversations.length == 0) return []

        return conversations[selectedIndex].messages
    }

    const getCurrentGroupId = () => {
        if (conversations.length == 0) return null

        return conversations[selectedIndex].groupId
    }


    const changeSelectedIndex = (index) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        if (!socket) return
        socket.on('conversationCreated', ({members, groupName, groupId}) => {
            //create a new list of reciepients, since members include everyone
            const receipients = members.filter(member => {
                if (member != userId) return member
            })
            createConversation(receipients, groupName, groupId)
        })

        socket.on('receiveMessage', ({text, sender, time, groupId}) => {
            addMessageToConversation({text, sender, time, groupId})
        })

    
        return () => {
            socket.off('conversationCreated')
            socket.off('receiveMessage')}
    }, [socket, userId])

    const value = {conversations, selectedIndex, createConversation, changeSelectedIndex,
                   addMessageToConversation,
                    messages: getCurrentConversationMessages(), 
                    groupId: getCurrentGroupId()}


    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}
