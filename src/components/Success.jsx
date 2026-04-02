import { Container, Row, Col, Card, CardBody } from "reactstrap";

export default function Success() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs="12" md="8" lg="5">
          <Card>
            <CardBody className="text-center">
              <h1>Success</h1>
              <p data-cy="success-message">Başarıyla giriş yaptınız.</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}