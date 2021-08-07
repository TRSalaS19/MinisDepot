import React,{useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import {adminOrdersList} from '../actions/orderActions';


const AdminOrdersListPage = ({history}) => {
  const dispatch = useDispatch()

  const adminListOrders = useSelector((state) => state.adminOrdersList)
  const {loading, error, orders} = adminListOrders

  const userDetails = useSelector(state => state.login)
  const { userInfo } = userDetails

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(adminOrdersList())
    } else {
      history.push('/login')
    }
  },[dispatch, userInfo, history])

  return (
    <div>
      <h1>Admin Orders List</h1>
      {loading ? (
        <LoadingSpinner /> 
      ) : error ? (
        <Alerts>{error}</Alerts>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ):(
                    <i className='fas fa-ban' style={{color:'red'}}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='primary' className='btn-sm'>
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default AdminOrdersListPage
