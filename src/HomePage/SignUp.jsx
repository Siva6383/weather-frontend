import { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "./api";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/signup", {
                username,
                email,
                password
            });

            alert(res.data.message);
            navigate("/"); // go to login

        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
                hidden: { x: 300, opacity: 0 },
                visible: { x: 0, opacity: 1 },
                exit: { x: -300, opacity: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <Card className="signup-fullcard">
                <Row className="g-0 h-100">

                    {/* Left Image Panel */}
                    <Col
                        md={6}
                        className="signup-left d-flex flex-column justify-content-center align-items-center text-center p-5 text-white"
                    >
                        <h1 className="fw-bold">Create your Account</h1>
                        <p className="fs-5">Share your artwork and get projects!</p>
                    </Col>

                    {/* Right Form Panel */}
                    <Col md={6} className="d-flex align-items-center justify-content-center p-4">
                        <div className="signup-form">

                            <h2 className="text-center mb-4">Sign Up</h2>

                            <Form onSubmit = {handleSignup}>
                                {/* Username */}
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </Form.Group>

                                {/* Email */}
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </Form.Group>

                                {/* Password */}
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Confirm Password */}
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                    />
                                </Form.Group>

                                {/* Show Password */}
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                </Form.Group>

                                {/* Button */}
                                <Button variant="dark" type="submit" className="w-100 mb-3">
                                    Join us →
                                </Button>

                                {/* Login Link */}
                                <div className="text-center">
                                    <small>
                                        Already have an account?{" "}
                                        <Link to="/" className="fw-semibold text-decoration-none">
                                            Login
                                        </Link>
                                    </small>
                                </div>

                            </Form>
                        </div>
                    </Col>

                </Row>
            </Card>
        </motion.div>
    );
}

export default Signup;