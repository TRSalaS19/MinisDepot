import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { productInfo } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Alerts from '../components/Alerts';


const ProductPage = ({ match, history }) => {

  const [itemQty, setItemQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productInfo)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(productInfo(match.params.id))
  }, [dispatch,match])


  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?itemQty=${itemQty}`)
  }

  return (
    <>
      <Link className='btn btn-warning my-3' to='/'>
        Go Back
      </Link>
      {loading ? <LoadingSpinner /> : error ? <Alerts>{error}</Alerts> : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid rounded/>
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
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
            <Card className='bg-primary p-1'>
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
                      {product.unitsAvailable > 0 ? `${product.unitsAvailable} Available` : 'Sold Out'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.unitsAvailable > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control className='form-select' as="select" value={itemQty} onChange={(e) => setItemQty(e.target.value)}>
                          {
                            [...Array(product.unitsAvailable).keys()].map(num => (
                              <option key={num +1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                <Button
                    onClick={addToCartHandler}
                    className='btn-block addToCartBtn'
                    type='button'
                    disabled={product.unitsAvailable === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductPage
