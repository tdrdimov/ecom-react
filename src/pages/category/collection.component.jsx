import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
	const { title, items } = collection
	return (
		<Container className='collection-page'>
			<h2 className='title'>{title}</h2>
			<Row>
				{items.map((item) => (
					<Col sm={6} lg={4} key={item.id}>
						<CollectionItem item={item} />
					</Col>
				))}
			</Row>
		</Container>
	)
}

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state),
})

export default connect(mapStateToProps)(CollectionPage)
