import React from 'react'
import { Menu, Icon, Container, Dropdown } from 'semantic-ui-react'

const name = sessionStorage.getItem('name');

const MenuBar = props => (
    <Menu inverted>
        <Menu.Item header>
            <h3 style={{color:'Tomato'}}>MOZZHUB</h3>
        </Menu.Item>
        <Menu.Item href='dashboard' name='dashboard' fitted='vertically' active={props.activeItem === 'dashboard'}>
            <Icon name='dashboard' />
                Dashboard
        </Menu.Item>
        {/*<Menu.Item href='/map' name='map' fitted='vertically' active={props.activeItem === 'map'}>
            <Icon name='dashboard' />
                Map
</Menu.Item>*/}
    
        <Menu.Item href='form' name='new' fitted='vertically' active={props.activeItem === 'new'}>
            <Icon name='edit' />
                New Case
        </Menu.Item>
        <Menu.Item href='record' name='record' fitted='vertically' active={props.activeItem === 'record'}>
            <Icon name='table' />
                Case Record
        </Menu.Item>
        <Menu.Item position='right'>
            <Icon name='user' />
            <Dropdown style={{overflow: false}} floating direction='left' text= {name||props.name}>
                <Dropdown.Menu>
                   {/*  <Dropdown.Header>{area}</Dropdown.Header> */}
                    <Dropdown.Item href='userprofile' >Profile</Dropdown.Item>
                    <Dropdown.Item 
                        href='login' 
                        onClick={()=>{
                            sessionStorage.clear();
                            /* localStorage.clear();
                            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
                            document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
                            document.cookie = `name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
                            document.cookie = `area=; expires=Thu, 01 Jan 1970 00:00:01 GMT;` */
                            }}>
                        Log-out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    </Menu>
)

export default MenuBar