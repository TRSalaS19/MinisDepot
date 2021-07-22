import React from 'react'
import {Spinner} from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <>
      <Spinner className='spinner' animation="border" role='status' variant='primary'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  )
}

export default LoadingSpinner
