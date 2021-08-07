import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product'
import {listAllProducts} from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Alerts from '../components/Alerts';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(listAllProducts(keyword))
  }, [dispatch, keyword]);


  return (
    <div>
        {loading ? <LoadingSpinner /> : error ? <Alerts>{error}</Alerts> : (
        <>
        <h1>Our Current Styles</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  )
}

export default HomePage
