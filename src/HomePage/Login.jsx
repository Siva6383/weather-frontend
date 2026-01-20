import { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "./api";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/login", {
      email,
      password
    });

    alert(res.data.message);

    // Redirect to weather app with username
    navigate("/weather", {
      state: { username: res.data.user.username }
    });

  } catch (err) {
    alert(err.response.data.message);
  }
};

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="login-fullcard">
        <Row className="g-0 h-100">

          {/* Welcome Panel — TOP on mobile, RIGHT on desktop */}
          <Col
            md={6}
            className="login-right text-white d-flex flex-column justify-content-center align-items-center text-center p-5 order-1 order-md-2"
          >
            <h2 className="fw-bold">Welcome Back!</h2>
            <p className="mt-3">
              Login and continue your journey with us.
            </p>
          </Col>

          {/* Login Form — BOTTOM on mobile, LEFT on desktop */}
          <Col
            md={6}
            className="login-left p-5 d-flex flex-column justify-content-center order-2 order-md-1"
          >
            <h2 className="fw-bold mb-2">Hello!</h2>
            <p className="text-muted mb-4">Sign in to your account</p>

            <Form onSubmit={handleLogin}>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Control className="login-input" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Control
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  onChange={() => setShowPassword(!showPassword)}
                />
              </Form.Group>

              <Button type="submit" className="login-btn w-100 mb-3">
                SIGN IN
              </Button>

              <div className="text-center">
                <small>
                  Don't have an account?{" "}
                  <Link to="/signup" className="fw-semibold text-decoration-none">
                    Create
                  </Link>
                </small>
              </div>
            </Form>
          </Col>

        </Row>
      </Card>
    </motion.div>
  );
}

export default Login;
