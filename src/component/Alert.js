import React from 'react'
import { Message } from 'semantic-ui-react'

const LoginFailedMessage = (props) =>(
    <Message 
        error 
        hidden={props.status}
        header='Username or password is incorrect'
    />
)

export default LoginFailedMessage