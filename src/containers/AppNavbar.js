import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'

function UserDropdown({ user }) {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {user?.name}
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    Profile
                </DropdownItem>
                <DropdownItem>
                    Settings
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

function AppNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.auth.user);
    
    console.log(user);

    const toggle = () => setIsOpen(!isOpen);
    const isLoggedIn = user !== null;

    return (
        <Navbar light expand="md">
            <NavbarBrand href="/">MyDashboard</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar si>
                <Nav className="ml-auto" navbar>
                    {
                        isLoggedIn ? <UserDropdown user={user}/>
                        :
                        <NavItem>
                            <Link component={NavLink} to="/login">Login</Link>
                        </NavItem>
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default AppNavbar
