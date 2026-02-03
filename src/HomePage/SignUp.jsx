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
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");

        try {
            const res = await API.post("/signup", {
                username,
                email,
                password
            });

            setSuccessMsg("Signup successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (err) {
            alert(err.response?.data?.message || "Server not reachable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="signup-bg"
        >
            <div className="signup-glass">

                <h2 className="text-center mb-4 text-white">Create Account</h2>

                <Form onSubmit={handleSignup}>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            className="text-white"
                            type="checkbox"
                            label="Show Password"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                    </Form.Group>

                    {successMsg && (
                        <div className="text-success text-center mb-2 fw-semibold">
                            {successMsg}
                        </div>
                    )}

                    <Button className="w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <div className="text-center mt-3 text-white">
                        Already have account?{" "}
                        <Link to="/" className="text-info text-decoration-none">
                            Login
                        </Link>
                    </div>

                </Form>
            </div>
        </motion.div>

    );
}

export default Signup;