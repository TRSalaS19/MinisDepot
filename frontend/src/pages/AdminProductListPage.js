import React,{useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import { listAllProducts, adminProductDelete } from '../actions/productActions';

const AdminProductListPage = ({history, match}) => {
  const dispatch = useDispatch()

  const listProducts = useSelector((state) => state.productList);
  const {loading, error, products} = listProducts;

  const deleteProduct = useSelector((state) => state.adminDeleteProduct)
  const {loading: deleteLoading, deleteSuccess, deleteError} = deleteProduct

  const userDetails = useSelector((state) => state.login);
  const {userInfo} = userDetails;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listAllProducts())
    } else {
      history.push('/login');
    }
  },[dispatch, userInfo, history, deleteSuccess])

  const deleteProductHandler = (id) => {
    if(window.confirm('Are you sure you want to DELETE this product?'))
    dispatch(adminProductDelete(id))
  }

  const adminCreateProductHandler = () => {
    console.log("created");
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right new-product-button'>
          <Button variant='danger' onClick={adminCreateProductHandler}>
            <i className='fas fa-plus'></i> Add New Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <LoadingSpinner/>}
      {deleteError && <Alerts>{deleteError}</Alerts>}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alerts>{error}</Alerts>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/aa/product/${product._id}/edit`} className='link-container-icon'>
                    <Button variant='info' className='btn-sm link-container-icon'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button 
                    variant='danger' 
                    className='btn-sm link-container-icon' 
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className='fas fa-trash-alt'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default AdminProductListPage
