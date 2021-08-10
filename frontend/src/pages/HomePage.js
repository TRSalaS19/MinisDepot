import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import ProductItem from '../components/ProductItem'
import {listAllProducts} from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Alerts from '../components/Alerts';
import Paginate from '../components/Paginate';
import HelmetMeta from '../components/HelmetMeta'
import TopRatedProductsCarousel from '../components/TopRatedProductsCarousel';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products, page, pages} = productList;

  useEffect(() => {
    dispatch(listAllProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber]);


  return (
    <div>
      <HelmetMeta />
      {!keyword ? (
        <TopRatedProductsCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Alerts>{error}</Alerts>
        ) : (
        <div>
          <h1>Check out our Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      )}
    </div>
  )
}

export default HomePage
