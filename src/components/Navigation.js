import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Container} from 'react-bootstrap'
import Logo from '../img/logo.png'

const Navigation = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container className="justify-content-center">
            <Navbar.Brand href="#home">
                <img
                alt=""
                src={Logo}
                width="220"
                height="50"
                className="d-inline-block align-top justify-content-center"
                />{' '}
            </Navbar.Brand>
            </Container>
        </Navbar>
        </>
    )
}

export default Navigation
