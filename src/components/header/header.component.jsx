import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => (
	<Navbar
		collapseOnSelect
		expand='md'
		fixed='top'
		className='header'
		bg='light'
		variant='light'>
		<Container fluid>
			<Navbar.Brand href='/'>
				<Logo className='logo' />
			</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse
					id='responsive-navbar-nav'
					className='mr-auto justify-content-end'>
					<Nav className=''>
						<Nav.Link href='/shop' className='d-flex align-items-center mt-2'>
							Shop
						</Nav.Link>
						{currentUser ? (
							<Nav.Link
								className='d-flex align-items-center mt-2'
								onClick={() => auth.signOut()}>
								Sign Out
							</Nav.Link>
						) : (
							<Nav.Link
								className='d-flex align-items-center mt-2'
								href='/signin'>
								Sign In
							</Nav.Link>
						)}
						<Nav.Link>
							<CartIcon />
							{hidden ? null : <CartDropdown />}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
		</Container>
	</Navbar>
)

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)
