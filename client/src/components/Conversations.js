import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './Context/useConversations'

const Conversations = () => {

    const {conversations, selectedIndex, changeSelectedIndex} = useConversations()

    const handleClick = (index) => {
        changeSelectedIndex(index)
    }
    
    return (
        <ListGroup>
            {conversations.map((conversation, index) => {
                //console.log(conversation.groupId)
                return (
                    <ListGroup.Item
                    key={conversation.groupId}
                    active={index == selectedIndex}
                    onClick={() => handleClick(index)}
                    >
                        {conversation.groupName}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default Conversations
