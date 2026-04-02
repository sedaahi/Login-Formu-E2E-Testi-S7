import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const errors =
     {
      email:
        form.email && !emailRegex.test(form.email)
          ? "Geçerli bir email giriniz."
          : "",
      password:
        form.password && !passwordRegex.test(form.password)
          ? "Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf ve bir rakam içermelidir."
          : "",
      terms:
        touched.terms && !form.terms
          ? "Şartları kabul etmelisiniz."
          : "",
    };


  const isEmailValid = emailRegex.test(form.email);
  const isPasswordValid = passwordRegex.test(form.password);
  const isTermsValid = form.terms;

  const isFormValid = isEmailValid && isPasswordValid && isTermsValid;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
      terms: true,
    });

    if (!isFormValid) return;

    navigate("/success");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs="12" md="8" lg="5">
          <Card>
            <CardBody>
              <CardTitle tag="h1" className="mb-4 text-center">
                Login
              </CardTitle>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.email && !!errors.email}
                    valid={touched.email && form.email !== "" && !errors.email}
                    data-cy="email-input"
                  />
                  {errors.email && (
                    <FormFeedback data-cy="email-error">
                      {errors.email}
                    </FormFeedback>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="password">Şifre</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.password && !!errors.password}
                    valid={
                      touched.password &&
                      form.password !== "" &&
                      !errors.password
                    }
                    data-cy="password-input"
                  />
                  {errors.password && (
                    <FormFeedback data-cy="password-error">
                      {errors.password}
                    </FormFeedback>
                  )}
                </FormGroup>

                <FormGroup check className="mb-3">
                  <Input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={form.terms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    data-cy="terms-input"
                  />
                  <Label for="terms" check>
                    Şartları kabul ediyorum
                  </Label>
                  {errors.terms && (
                    <div
                      className="text-danger mt-1"
                      data-cy="terms-error"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {errors.terms}
                    </div>
                  )}
                </FormGroup>

                <Button
                  color="primary"
                  type="submit"
                  block="true"
                  disabled={!isFormValid}
                  data-cy="submit-button"
                >
                  Giriş Yap
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}