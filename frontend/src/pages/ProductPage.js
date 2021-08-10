import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image, Form} from 'react-bootstrap';
import HelmetMeta from '../components/HelmetMeta';
import Rating from '../components/Rating';
import { productInfo, reviewCreate } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Alerts from '../components/Alerts';
import { CREATE_PRODUCT_REVIEW_RESET } from '../const/productConst';



const ProductPage = ({ match, history }) => {
  const [itemQty, setItemQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(' ');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productInfo);
  const {loading, error, product} = productDetails;

  const userDetails = useSelector((state) => state.login);
  const {userInfo} = userDetails;

  const createUserReview = useSelector((state) => state.createNewReview);
  const { loading: createReviewLoading, errorReview, successReviewCreate, } = createUserReview;

  useEffect(() => {
    if(successReviewCreate){
      alert('Your Review has been submitted. Thank you!')
      setRating(0)
      setComment('')
    }
    if(!product._id || product._id !== match.params.id){
      dispatch(productInfo(match.params.id))
      dispatch({
        type: CREATE_PRODUCT_REVIEW_RESET
      })
    }
  }, [dispatch,match, successReviewCreate,product._id])


  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?itemQty=${itemQty}`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(reviewCreate(match.params.id, {
      rating, 
      comment
    }))
  }

  return (
    <div>
      <Link className='btn btn-danger my-3' to='/'>
        <i className="fas fa-hand-point-left"></i> Go Back
      </Link>
      {loading ? (
        <LoadingSpinner />
        ) : error ? (
          <Alerts>{error}</Alerts>
        ) : (
        <div>
        <HelmetMeta title='Product Page' />
          <Row>
            <Col md={5}>
              <Image 
                src={product.image} 
                alt={product.name} 
                fluid 
                rounded
              />
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
              <Card className='border-primary p-1'>
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
                      Add To Cart <i className="fas fa-cart-plus"></i>
                    </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>CUSTOMER REVIEWS</h2>
                {
                product.reviews.length === 0 && 
                <Alerts variant='info'>
                    BE THE <strong>FIRST</strong> TO LEAVE A REVIEW!
                </Alerts>
                }
                <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
									))}
									<ListGroup.Item>
										<h2>Submit Your Review Here</h2>
                    {successReviewCreate && <Alerts vairant="info">Review Submitted</Alerts>}
                    {createReviewLoading && <LoadingSpinner />}
										{errorReview && <Alerts vairant='warning'>{errorReview}</Alerts>}
										{userInfo ? (
											<Form onSubmit={submitReviewHandler}>
												<Form.Group controlId='rating'>
													<Form.Label>Rating</Form.Label>
													<Form.Control 
                            as='select' 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)}
                          >
														<option value=''>Select...</option>
														<option value='1'>1 - Poor</option>
														<option value='2'>2 - Fair</option>
														<option value='3'>3 - Good</option>
														<option value='4'>4 - Very Good</option>
														<option value='5'>5 - Excellent</option>
													</Form.Control>
												</Form.Group>
												<Form.Group controlId='comment'>
													<Form.Label>Comment</Form.Label>
													<Form.Control 
                            as='textarea' 
                            row='3' 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
												</Form.Group>
												<Button 
                          className='my-3'
                          type='submit' 
                          variant='primary'
                        >
                          Submit
                        </Button>
											</Form>
											) : (
												<Alerts>Please <Link to='/login'>Login</Link> to your account to write a review
													{''}
												</Alerts>
											)}
									</ListGroup.Item>
								</ListGroup>
							</Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductPage
