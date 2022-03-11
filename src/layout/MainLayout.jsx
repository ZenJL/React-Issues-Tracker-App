import { Container, Row, Col } from 'react-bootstrap';

function MainLayout({ children }) {
  return (
    <Container className='pt-5 pb-3 px-3'>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}

export default MainLayout;
