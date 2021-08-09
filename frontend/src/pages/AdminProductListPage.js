import React,{useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import Paginate from '../components/Paginate';
import { 
  listAllProducts, 
  adminProductDelete, 
  adminProductCreate 
} from '../actions/productActions';
import {ADMIN_CREATE_NEW_PRODUCT_RESET} from '../const/productConst';


const AdminProductListPage = ({history, match}) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const listProducts = useSelector((state) => state.productList);
  const {loading, error, products, page, pages} = listProducts;

  const deleteProduct = useSelector((state) => state.adminDeleteProduct)
  const {loading: deleteLoading, deleteSuccess, deleteError} = deleteProduct

  const createNewProduct = useSelector((state) => state.adminCreateNewProduct)
  const {loading: createLoading, successCreate, errorCreate, product: createdProduct } = createNewProduct

  const userDetails = useSelector((state) => state.login);
  const {userInfo} = userDetails;

  useEffect(() => {
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_RESET
    })
    if(!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } 
    if(successCreate){
      history.push(`/aa/product/${createdProduct._id}/edit`)
    }else {
      dispatch(listAllProducts('', pageNumber));
    }
  },[
      dispatch, 
      userInfo, 
      history, 
      deleteSuccess, 
      successCreate, 
      createdProduct,
      pageNumber
    ])

  const deleteProductHandler = (id) => {
    if(window.confirm('Are you sure you want to DELETE this product?'))
    dispatch(adminProductDelete(id))
  }

  const adminCreateProductHandler = () => {
    dispatch(adminProductCreate())
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
      {createLoading && <LoadingSpinner />}
      {errorCreate && <Alerts>{errorCreate}</Alerts>}
      {deleteLoading && <LoadingSpinner/>}
      {deleteError && <Alerts>{deleteError}</Alerts>}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alerts>{error}</Alerts>
      ) : (
        <>
          <HelmetMeta title='Admin Product List' />
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
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default AdminProductListPage
