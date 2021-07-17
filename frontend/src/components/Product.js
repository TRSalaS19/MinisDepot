import React from 'react'
import {Card,Carousel} from 'react-bootstrap'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images.imgOne}
                style={{width:"200px", height:"200px"}}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={product.images.imgTwo}
                style={{width:"200px", height:"200px"}}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} From {product.numReviews} Reviews
          </div>
        </Card.Text>
        <Card.Text as='h3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
