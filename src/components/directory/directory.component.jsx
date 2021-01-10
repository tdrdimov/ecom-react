import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MenuItem from '../menu-item/menu-item.component'

import './directory.styles.scss'

const Directory = ({ sections }) => (
	<Container fluid>
    <Row className='directory-menu'>
		{sections.map(({ id, ...otherSectionProps }) => (
			<Col xs={id == 4 || id == 5 ? 6 : 4} key={id}>
				<MenuItem {...otherSectionProps} />
			</Col>
		))}
	</Row>
  </Container>
)

const mapStateToProprs = createStructuredSelector({
	sections: selectDirectorySections,
})

export default connect(mapStateToProprs)(Directory)
