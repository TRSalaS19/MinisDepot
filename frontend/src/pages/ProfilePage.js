import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import {getProfileDetails, profileUpdate} from '../actions/userActions';
import {getUserOrdersList} from '../actions/orderActions';
import { PROFILE_UPDATE_RESET } from '../const/userConst';


const ProfilePage = ({location, history}) => {
  const [name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const profileDetails = useSelector((state) => state.profileDetails);
  const {loading, error, user} = profileDetails;

  const userDetails = useSelector((state) => state.login);
  const { userInfo } = userDetails;

  const updateProfile = useSelector((state) => state.updateProfile);
  const {success} = updateProfile

  const userOrderList = useSelector((state) => state.userOrderList);
  const { loading: OrderListLoading, error: orderListError, orders } = userOrderList;

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    } else {
      if(!user || !user.name || success) {
        dispatch({
          type: PROFILE_UPDATE_RESET
        })
        dispatch(getProfileDetails('profile'))
        dispatch(getUserOrdersList())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [
      dispatch, 
      history, 
      userInfo, 
      user, 
      profileDetails,
      orders, 
      success
    ]
  )

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(profileUpdate({id: user._id, name, email, password}))
    }
  }

return (
  <div>
    <Link 
      to='/profilepage' 
      className='btn bg-danger my-3'
    >
      <i className="fas fa-hand-point-left"></i> Return
    </Link>
    <Row>
      <Col md={3}>
        <h2>Your Profile Details</h2>
        {message && <Alerts variant='danger'>{message}</Alerts>}
        {success && <Alerts variant='info'>Profile Updated</Alerts>}
        {loading ? (
          <LoadingSpinner />
          ) : error ? (
          <Alerts>{error}</Alerts>
          ) : (
            <Form onSubmit={submitHandler}>
            <HelmetMeta title='User Profile' />

              <Form.Group controlId='name'>
                <Form.Label className='m-1'>Name</Form.Label>
                <Form.Control 
                  type='name' 
                  value={name} onChange={(e) => setName(e.target.value)
                }></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label className='m-1'>Email</Form.Label>
                <Form.Control 
                  type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)
                }></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label className='m-1'>Password</Form.Label>
                <Form.Control 
                  type='password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)
                }></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label className='m-1'>Confirm Password</Form.Label>
                <Form.Control 
                  type='password' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)
                }></Form.Control>
              </Form.Group>

              <Button className='my-3'type='submit' variant='danger'>
                Update Profile
              </Button>

            </Form>
          )
        }

      </Col>
      <Col md={9} >
        <h2>My Orders</h2>
        {OrderListLoading ? (
          <LoadingSpinner />
        ) : orderListError ? (
          <Alerts>{orderListError}</Alerts>
        ) : (
          <Table bordered striped hover responsive rounded="true" className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                      <i className='fas fa-times' style={{color: 'red'}}></i>
                  )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>DETAILS</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  </div>
  )
}

export default ProfilePage
