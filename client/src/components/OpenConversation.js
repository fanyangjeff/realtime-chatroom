import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

const OpenConversation = () => {
    const [text, setText] = useState('')

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text == '') return

        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>

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
