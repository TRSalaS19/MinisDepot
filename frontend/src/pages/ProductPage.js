import React from 'react';
import { Link} from 'react-router-dom';
import { 
  Row, 
  Col, 
  ListGroup, 
  Card, 
  Button, 
  Carousel
} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductPage = ({match}) => {
  const product = products.find((p) => p._id === match.params.id)
  return (
    <>
      <Link className='btn btn-warning my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="w-100 rounded"
                src={product.images.imgOne}
                alt={product.name}
                style={{height:"400px"}}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-100 rounded"
                src={product.images.imgTwo}
                alt={product.name}
                style={{height:"400px"}}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name.toUpperCase()}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating 
                value={product.rating} 
                text={`${product.numReviews} Reviews`} 
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:{product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Available:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? `${product.countInStock} Available` : 'Sold Out'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' rounded disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
