import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center'>
            <p>Copyright &copy; {new Date().getFullYear()} Mini's Depot</p>
            <a className='footer-icon' href='https://www.Facebook.com'> <i className="fab fa-facebook"> </i></a>
            <a className='footer-icon' href='https://www.Twitter.com'> <i className="fab fa-twitter"> </i></a>
            <a className='footer-icon' href='https://www.Instagram.com'> <i className="fab fa-instagram"> </i></a>
            <a className='footer-icon' href='https://www.Tiktok.com/'> <i className="fab fa-tiktok"> </i></a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
