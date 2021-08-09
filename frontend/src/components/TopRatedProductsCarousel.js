import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import { listProductsTopRated } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, topProducts } = productTopRated

  useEffect(() => {
    dispatch(listProductsTopRated())
  }, [dispatch])

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Alerts variant='danger'>{error}</Alerts>
  ) : (
    <Carousel pause='hover' className='bg-secondary my-4 rounded'>
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image className='top-products-image' src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel