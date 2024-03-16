import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import axios from "axios";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  //
  //   useEffect(() => {
  //     if (status === "success") clearFields();
  //   }, [status]);
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
  };
  //
  //   const clearFields = () => {
  //     setEmail("");
  //   };

  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          {/* <Col lg={12} md={6} xl={5}>
            <h3 className="adviceTxt">Get an Advice </h3>
            {status === "sending" && <Alert>Sending...</Alert>}
            {status === "error" && <Alert variant="danger">{message}</Alert>}
            {status === "success" && <Alert variant="success">{message}</Alert>}
          </Col> */}
          <Col md={12} xl={12}>
            <div className="new-email-bx">
              <button
                className="newsletter-button"
                onClick={fetchAdvice}
                type="submit"
              >
                Get an Advice
              </button>

              <h5 className="newsletter-advice">{advice}</h5>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
