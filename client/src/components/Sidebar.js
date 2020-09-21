import React, {useState} from 'react'
import Contact from './Contacts'
import Conversations from './Conversations'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import {Tab, Button, Nav} from 'react-bootstrap'

const Sidebar = ({userId}) =>{
    const CONTACTS_KEY = 'contacts'
    const CONVERSATION_EKY = "conversations"
    const [isContactActive, setContactActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [activeKey, setActiveKey] = useState(CONTACTS_KEY)

    const openModal = () => {
        setShowModal(true)
    }

    const switchTabs = (key) => {
        setActiveKey(key)
        if(key == 'contacts'){
            setContactActive(true)
        } else {
            setContactActive(false)
        }
    }
    return (
        <div className="d-flex flex-column border-right">

            <Tab.Container activeKey={activeKey} >
                <Nav variant='tabs' className='justify-content-center' onSelect={switchTabs}>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_EKY}>Conversations</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className='flex-grow-1'>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contact/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONVERSATION_EKY}>
                        <Conversations/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        <div className='p2 border-top'>
            Your userId: {userId}
        </div>
        <Button onClick={openModal}>Create {isContactActive? "Contact":"Conversation"}</Button>

        <div>
            {isContactActive? <NewContactModal showModal={showModal} setShowModal={setShowModal}/>
            : <NewConversationModal userId={userId} showModal={showModal} setShowModal={setShowModal}/>}
        </div>
        </div>
    )
}

export default Sidebar
