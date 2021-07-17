import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Carousel} from 'react-bootstrap';
import Rating from './Rating';

const Product = ({product}) => {
  const imgOne = product.images.imgOne; 
  const imgTwo = product.images.imgTwo;

  return (
    <Card className='my-3 p-3 rounded'>
        <Carousel hover='true' interval={5000} >
          <Carousel.Item >
            <Link to={`/product/${product._id}`}>
              <img
                className="w-100 rounded"
                src={imgOne}
                style={{width:"200px", height:"200px"}}
                alt="First slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
          <Link to={`/product/${product._id}`}>
            <img
              className="w-100 rounded"
              src={imgTwo}
              style={{width:"200px", height:"200px"}}
              alt="Second slide"
            />
          </Link>
          </Carousel.Item>
        </Carousel>
      <Card.Body>
          <Card.Title as='div'>
          <a className='card-name-link' href={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </a>
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
  color: '#6DBAA3',
}

export default Product
