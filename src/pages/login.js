import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { AppProvider, useApp } from "../context/AppContext";
import Layout from "../components/Layout";

const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 450px;
  backdrop-filter: blur(20px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #27ae60, #f39c12, #e74c3c);
    border-radius: 20px 20px 0 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Button = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1f4e79 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  background: #fdf2f2;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #fecaca;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  background: #f0fdf4;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
`;

const LinksContainer = styled.div`
  text-align: center;
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #e1e8ed;
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;

const DemoCredentials = styled.div`
  background: #e8f5e8;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;

  strong {
    color: #27ae60;
  }
`;

const AdminCredentials = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);

  strong {
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const CredentialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

function LoginContent() {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        setSuccess("Login successful! Welcome back.");
        // In a real app, you'd handle authentication here
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Please fill in all fields");
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>🎯 Welcome Back</Title>
        <Subtitle>Sign in to your Gun-k Pro account</Subtitle>

        <DemoCredentials>
          <strong>Demo Account:</strong>
          <br />
          Email: demo@gunstore.com
          <br />
          Password: demo123
        </DemoCredentials>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <LinksContainer>
          <p>
            Don't have an account?{" "}
            <StyledLink to="/signup">Sign up here</StyledLink>
          </p>
          <p style={{ marginTop: "15px" }}>
            <StyledLink
              to="/forgot-password"
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#e74c3c",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #e74c3c",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e74c3c";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#e74c3c";
              }}
            >
              🔐 Forgot your password?
            </StyledLink>
          </p>
        </LinksContainer>
      </LoginCard>
    </LoginContainer>
  );
}

const LoginPage = () => {
  return (
    <AppProvider>
      <Layout>
        <LoginContent />
      </Layout>
    </AppProvider>
  );
};

export default LoginPage;

export const Head = () => <title>Login | Gun-k Pro</title>;
