import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Rating from './Rating';

const Product = ({product}) => {

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' style={{height:'200px'}}/>
      </Link>
      <Card.Body>
          <Card.Title as='div'>
          <Link className='card-name-link' to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
          </Card.Title>
        <Card.Text as='div'>
          <Rating 
            value={product.rating} 
            text={`${product.numReviews} Reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Rating.defaultProps = {
  color: '#ffce67',
}

export default Product
