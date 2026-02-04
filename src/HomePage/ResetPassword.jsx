import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";
import { Card, Form, Button } from "react-bootstrap";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post(
        `/reset-password/${token}`,
        { password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Password updated successfully!");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "320px" }}>
        <h4 className="mb-3 text-center">Reset Password</h4>

        <Form onSubmit={handleReset}>
          <Form.Control
            type="password"
            placeholder="New password"
            className="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button className="w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPassword;
