import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import {getProfileDetails, profileUpdate} from '../actions/userActions'


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

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    } else {
      if(!user.name) {
        dispatch(getProfileDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, profileDetails])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(profileUpdate({id: user._id, name, email, password}))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Your Profile Details</h2>
        {message && <Alerts variant='danger'>{message}</Alerts>}
        {success && <Alerts variant='info'>Profile Updated</Alerts>}
        {error && <Alerts>{error}</Alerts>}
        {loading && <LoadingSpinner/>}
        <Form onSubmit={submitHandler}>

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

          <Button className='my-3'type='submit' variant='primary'>
            Update Profile
          </Button>

        </Form>

      </Col>
      <Col md={9} >
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfilePage
