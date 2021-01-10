import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
  <Container fluid className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <Row className='preview'>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <Col sm={6} lg={4} xl={3} key={item.id}>
            <CollectionItem item={item} />
          </Col>
        ))}
    </Row>
  </Container>
);

export default CollectionPreview;
