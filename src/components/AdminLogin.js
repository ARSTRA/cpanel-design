import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useApp } from "../context/AppContext";

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 25% 25%,
        rgba(255, 107, 107, 0.2) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(253, 121, 168, 0.2) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(116, 185, 255, 0.1) 0%,
        transparent 70%
      );
    animation: float 8s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 450px;
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      #ff6b6b,
      #ee5a24,
      #fd79a8,
      #fdcb6e,
      #74b9ff
    );
    border-radius: 20px 20px 0 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
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
`;

const DemoCredentials = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;

  strong {
    color: #495057;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  font-weight: 600;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.2),
    rgba(116, 185, 255, 0.2)
  );
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 107, 107, 0.3);
`;

const IconSvg = styled.svg`
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

export default function AdminLogin() {
  const { dispatch } = useApp();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        dispatch({ type: "LOGIN_ADMIN" });
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <LoginContainer>
      <BackButton to="/">← Back to Site</BackButton>
      <LoginCard>
        <Title>
          <LogoIcon>
            <IconSvg viewBox="0 0 50 50" width="24" height="24">
              <defs>
                <linearGradient
                  id="gunGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#74b9ff" />
                  <stop offset="50%" stopColor="#fd79a8" />
                  <stop offset="75%" stopColor="#fdcb6e" />
                  <stop offset="100%" stopColor="#00b894" />
                </linearGradient>
                <linearGradient
                  id="kGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00b894" />
                  <stop offset="50%" stopColor="#74b9ff" />
                  <stop offset="100%" stopColor="#fd79a8" />
                </linearGradient>
              </defs>

              {/* Stylized Gun Shape */}
              <path
                d="M10 20 L35 20 L40 15 L45 15 L45 25 L40 25 L35 20 L35 30 L30 30 L30 25 L15 25 L15 30 L10 30 Z"
                fill="url(#gunGradient)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />

              {/* Letter K integrated */}
              <path
                d="M8 10 L8 35 M8 22 L20 10 M8 22 L20 35"
                stroke="url(#kGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </IconSvg>
          </LogoIcon>
          Gun-k Admin
        </Title>

        <DemoCredentials>
          <strong>Demo Credentials:</strong>
          <br />
          Username: <strong>admin</strong>
          <br />
          Password: <strong>admin123</strong>
        </DemoCredentials>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginCard>
    </LoginContainer>
  );
}
