import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/db/products/${match.params.id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [match])

  return (
    <>
      <Link className='btn btn-warning my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid rounded/>
        </Col>
        <Col md={4}>
          <ListGroup >
            <ListGroup.Item>
              <h3>{product.name}</h3>
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
            <ListGroup>
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
              <Button
                  className='btn-block addToCartBtn'
                  type='button'
                  disabled={product.countInStock === 0}
                >
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
