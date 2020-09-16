import React from 'react'
import Sidebar from './Sidebar'
import { useConversations } from './Context/useConversations'
import  OpenConversation  from './OpenConversation'


const Dashboard = ({userName}) => {
    const {selectedConversation} = useConversations()
    return (
        <div className='d-flex' style={{height: '100vh'}}>
            <Sidebar></Sidebar>
            <OpenConversation></OpenConversation>
        </div>
    )
}

export default Dashboard