import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import FormFields from '../components/FormFields'
import { getProfileDetails, adminUpdateUserDetails } from '../actions/userActions';
import { ADMIN_UPDATE_USER_DETAILS_RESET } from '../const/userConst';

const AdminUserEditPage = ({match, history}) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userProfileDetails = useSelector((state) => state.profileDetails)
  const { loading, error, user } = userProfileDetails

  const adminUpdateDetails = useSelector((state) => state.adminUpdateUser)
  const { loading: updateLoading, error: updateError, success: updateSuccess } = adminUpdateDetails

  useEffect(() => {
    if(updateSuccess) {
      dispatch({
        type: ADMIN_UPDATE_USER_DETAILS_RESET
      })
      history.push('/aa/userlist')
    } else {
      if(!user || user._id !== userId) {
        dispatch(getProfileDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, user, userId, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adminUpdateUserDetails({_id: userId, name, email, isAdmin}))
  }

  return (
    <>
      <Link to='/aa/userlist' className='btn btn-danger my-3'>
      <i className="fas fa-hand-point-left"></i> Return
      </Link>
      <FormFields>
          <h1>Edit User Details</h1>
          {updateLoading && <LoadingSpinner />}
          {updateError && <Alerts>{error}</Alerts>}
          {loading ? (
            <LoadingSpinner/>
          ) : error ? (
            <Alerts>{error}</Alerts>
          ) : (
            <Form onSubmit={submitHandler}>
            <HelmetMeta title='Admin User Edit' />
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

              <Form.Group controlId='isAdmin' className='m-2'>
                <Form.Check 
                  type='checkbox'
                  label='Admin' 
                  checked={isAdmin} 
                  onChange={(e) => setIsAdmin(e.target.checked)
                }></Form.Check>
              </Form.Group>

              <Button className='my-2'type='submit' variant='primary'>
                Update User Account
              </Button>

            </Form>
          )}
      </FormFields>
    </>
  )
}

export default AdminUserEditPage
