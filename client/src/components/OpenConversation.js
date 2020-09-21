import React, { useState, useEffect, useCallback, useRef} from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from './Context/useConversations'
import { useSocket} from './Context/useSockets'

const OpenConversation = ({userId}) => {
    const [text, setText] = useState('')
    const {messages, groupId} = useConversations()
    const lastMessageRef = useRef()
    const socket = useSocket()

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        if (lastMessageRef.current)
            lastMessageRef.current.scrollIntoView()
    }, [messages])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (text == '') return

        socket.emit('sendMessage', {text, sender: userId, time :new Date(), groupId})

        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {
                    messages.map((message, index) => {
                        return (
                            <div 
                            key={index}
                            ref={index == messages.length - 1? lastMessageRef: null}
                            className={userId == message.sender? 'align-self-end': ''}>
                            
                                <div
                                className={`rounded px-2 py-1 text-white ${userId == message.sender? 'bg-primary' :'bg-warning'}`}>
                                    {message.text}
                                </div>
                                <div
                                className={'text-right small text-muted'}
                                >{userId == message.sender? "you":message.sender}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                        as='textarea'
                        required
                        style={{height: '75px', resize: 'none'}}
                        onChange={handleInputChange}
                        value={text}
                        />
                        <InputGroup.Append>
                            <Button type='submit'>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}


export default OpenConversation
