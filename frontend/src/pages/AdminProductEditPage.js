import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import FormFields from '../components/FormFields';
import { productInfo, adminProductUpdate } from '../actions/productActions';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../const/productConst';

const AdminProductEditPage = ({match, history}) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [unitsAvailable, setUnitsAvailable] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productId = match.params.id;
  
  const productDetails = useSelector((state) => state.productInfo)
  const {loading, error, product } = productDetails

  const updateProduct = useSelector((state) => state.adminUpdateProduct)
  const {loading: updateLoading, updateSuccess, updateError} = updateProduct

  useEffect(() => {
    if(updateSuccess){
      dispatch({
        type:ADMIN_UPDATE_PRODUCT_RESET
      })
      history.push('/aa/productlist')
    } else {
      if(!product.name || product._id !== productId) {
        dispatch(productInfo(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setUnitsAvailable(product.unitsAvailable)
        setDescription(product.description)
      }
    }
  },[dispatch,history,productId,product, updateSuccess])

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try{
      const config = {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }
      const { data } = await axios.post('/db/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch(error) {
      console.error(error)
      setUploading(false)
    }
  }

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(adminProductUpdate({
      _id: productId,
      name,
      price,
      image,
      brand,
      unitsAvailable,
      description
    }))
  }

  return (
    <div>
      <Link 
        to='/aa/productlist' 
        className='btn bg-danger my-3'
      >
        <i className="fas fa-hand-point-left"></i> Return
      </Link>
      <FormFields>
        <h1>Edit Product Details</h1>
        {updateLoading && <LoadingSpinner/>}
        {updateError && <Alerts>{updateError}</Alerts>}
        {loading ? (
          <LoadingSpinner/>
        ) : error ? (
          <Alerts>{error}</Alerts>
        ) : (
          <Form onSubmit={updateSubmitHandler}>
          <HelmetMeta title='Admin Product Edit Screen' />
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number' 
                placeholder="Enter Price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control 
                type='text' 
                placeholder="Upload Image" 
                value={image} 
                onChange={(e) => setImage(e.target.value)}>
              </Form.Control>
              <Form.File 
                id='image-file'
                label='Choose an Image' 
                custom
                onChange={imageUploadHandler}>
              </Form.File>
              {uploading && <LoadingSpinner />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control 
                type='text' 
                placeholder="Brand" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='unitsAvailable'>
              <Form.Label>Units in Stock</Form.Label>
              <Form.Control 
                type='number' 
                placeholder="Units in Stock" 
                value={unitsAvailable} 
                onChange={(e) => setUnitsAvailable(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type='text' 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Button 
              type='submit' 
              variant='danger' 
              className='m-3'
            >
              Update Product
            </Button>

          </Form>
        )}
      </FormFields>
    </div>
  )
}

export default AdminProductEditPage
