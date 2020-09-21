import React from 'react'
import Sidebar from './Sidebar'
import { useConversations } from './Context/useConversations'
import  OpenConversation  from './OpenConversation'


const Dashboard = ({userId}) => {
    const {selectedConversation} = useConversations()
    return (
        <div className='d-flex' style={{height: '100vh'}}>
            <Sidebar userId={userId}></Sidebar>
            <OpenConversation userId={userId}></OpenConversation>
        </div>
    )
}

export default Dashboard