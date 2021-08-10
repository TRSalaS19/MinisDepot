import React,{useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import { adminUserList, adminDeleteUser } from '../actions/userActions';

const UserListPage = ({history}) => {
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.login)
  const { userInfo } = userDetails

  const userList = useSelector((state) => state.adminUserList);
  const {loading, error, users} = userList;

  const deleteUser = useSelector((state) => state.adminDeleteUser);
  const {deleteSuccess} = deleteUser;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(adminUserList())
    } else {
      history.push('/login')
    }
  },[dispatch, history, userInfo, deleteSuccess]) 

  const deleteUserHandler = (id) => {
    if(window.confirm('Are you sure you want to delete account?')) {
      dispatch(adminDeleteUser(id))
    }
  }

  return (
    <div>
      <h1>
        <strong>USER LIST</strong>
      </h1>
      {loading ? (
        <LoadingSpinner />
        ) : error ? (
          <Alerts>{error}</Alerts>
        ) : (
        <Table striped bordered hover responsive className='table-sm'>
        <HelmetMeta title='Admin User List' />
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>DELETE/EDIT</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name.toUpperCase()}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? 
                    (<i className='fas fa-check-circle' style={{color: 'green'}}></i>) 
                    :  (<i className='fas fa-minus-circle' style={{color: 'red'}}></i>)
                  }
                </td>
                <td>
                  <LinkContainer to={`/aa/user/${user._id}/edit`}>
                    <Button 
                    variant='info' 
                    className='btn-sm'
                    >
                      <i className="fas fa-user-edit"></i>
                    </Button>
                  </LinkContainer>
                    <Button 
                    variant='danger' 
                    className='btn-sm' 
                    onClick={() => deleteUserHandler(user._id)}
                    >
                      <i className="fas fa-user-minus"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListPage
