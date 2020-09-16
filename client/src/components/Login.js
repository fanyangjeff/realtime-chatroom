import React, {useRef} from 'react'
import {Container, Form, Button} from 'react-bootstrap'

const Login = ({onSubmitUserName}) => {
    const inputRef = useRef()

    const submitUserName = () => {
        onSubmitUserName(inputRef.current.value)
    }
    return (<Container style={{height: '100vh'}} className="align-items-center d-flex">
        <Form className="w-100" onSubmit={submitUserName}>
            <Form.Group>
                <Form.Label>username</Form.Label>
                <Form.Control ref={inputRef} type='text' placeholder='enter username' required></Form.Control>
            </Form.Group>
            <Button type='submit'>Log in</Button>
            <Button variant='secondary' style={{marginLeft: "5px"}}>Create Account</Button>
        </Form>
    </Container>)
}


export default Login