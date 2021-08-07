import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap'

const ProductSearchBox = ({history}) => {
  const [keyword, setKeyword] = useState('')

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form className="d-flex search-box" onSubmit={submitSearchHandler}>
      <Form.Control 
        type='text' 
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        ></Form.Control>
      <Button
        type='submit'
        variant='danger'
        className='search-button'>
        Search
      </Button>
    </Form>
  )
}

export default ProductSearchBox
