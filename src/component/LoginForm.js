import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import LoginFailedMessage from './Alert.js'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        username: '',
        password: '',
        status: true
    }

    render() {
        const { username, password } = this.state
        //console.log(this.props.location.state.status)
        //const {loginStatus} = this.props.loginStatus
        //console.log(props.user.login)
        return (
            <div className='login-form'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                } 
            `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >


                    <Grid.Column style={{ maxWidth: 450 }} >
                        <LoginFailedMessage status={this.state.status} />
                        <Header as='h1' color='red'>MOZZHUB</Header>

                        <Form size='large'
                            onSubmit={event => {
                                event.preventDefault()
                                this.props.login(username, password)
                            }}>
                            <Segment stacked color='black' inverted>
                                <Header as='h2' color='black' textAlign='center'>
                                    Log-in to your account
                                </Header>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='User ID'
                                    onChange={event => this.setState({ username: event.target.value })}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={event => this.setState({ password: event.target.value })}
                                />

                                <Button fluid size='large' inverted>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
const mapState = state => ({
    loginStatus: state.user.login,
    nodes: state.nodes,
    status: state.user.status
})



const mapDispatch = dispatch => ({
    login: (username, password) => dispatch.user.login({ username, password }),
    //getNodes: dispatch.nodes.getNodes()

})
export default connect(mapState, mapDispatch)(LoginForm)