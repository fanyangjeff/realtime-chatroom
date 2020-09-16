import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './Context/useConversations'

const testingConversations = ["Group1", "Group2", "Group3", "Group4"]
const Conversations = () => {

    const {conversations, selectedIndex, changeSelectedIndex} = useConversations()

    const handleClick = (index) => {
        changeSelectedIndex(index)
    }
    
    return (
        <ListGroup>
            {conversations.map((conversation, index) => {
                return (
                    <ListGroup.Item
                    key={index}
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
