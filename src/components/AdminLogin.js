import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import { useApp } from "../context/AppContext";

const glow = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #667eea 100%
  );
  background-size: 400% 400%;
  animation: ${glow} 8s ease-in-out infinite;
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
    animation: ${float} 8s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 10px;
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
  animation: ${(props) => (props.shakeAnimation ? shake : "none")} 0.5s
    ease-in-out;

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

  @media (max-width: 768px) {
    padding: 30px;
    margin: 10px;
    max-width: calc(100vw - 20px);
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
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid ${(props) => (props.error ? "#e74c3c" : "#e1e5e9")};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: ${(props) => (props.error ? "rgba(231, 76, 60, 0.05)" : "white")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#e74c3c" : "#667eea")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error ? "rgba(231, 76, 60, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 15px;
  background: ${(props) =>
    props.disabled
      ? "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "⚠️";
    font-size: 12px;
  }
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "✅";
    font-size: 12px;
  }
`;

const DemoCredentials = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #dee2e6;
  position: relative;

  &::before {
    content: "🔑";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .title {
    color: #495057;
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .credentials {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  .credential-item {
    background: white;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    flex: 1;

    .label {
      color: #6c757d;
      font-size: 12px;
      margin-bottom: 2px;
    }

    .value {
      color: #495057;
      font-weight: 600;
      font-family: monospace;
    }
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  font-weight: 600;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    color: white;
  }

  &::before {
    content: "←";
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
    top: 15px;
    left: 15px;
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.2),
    rgba(116, 185, 255, 0.2)
  );
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 107, 107, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const IconSvg = styled.svg`
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const PasswordStrengthIndicator = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 2px;
`;

const StrengthBar = styled.div`
  height: 3px;
  flex: 1;
  background: ${(props) => (props.active ? props.color : "#e1e5e9")};
  border-radius: 2px;
  transition: all 0.3s ease;
`;

const RememberMeContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  margin-top: -10px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #667eea;
  }
`;

export default function AdminLogin() {
  const { dispatch } = useApp();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Load remembered credentials on mount
  useEffect(() => {
    const rememberedUsername = localStorage.getItem("adminUsername");
    if (rememberedUsername) {
      setCredentials((prev) => ({ ...prev, username: rememberedUsername }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!credentials.username.trim()) {
      errors.username = "Username is required";
    } else if (credentials.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!credentials.password.trim()) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
      return;
    }

    setLoading(true);

    // Simulate API call with more realistic timing
    setTimeout(() => {
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        setSuccess("Login successful! Redirecting...");

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("adminUsername", credentials.username);
        } else {
          localStorage.removeItem("adminUsername");
        }

        // Delay before dispatching to show success message
        setTimeout(() => {
          dispatch({ type: "LOGIN_ADMIN" });
        }, 1000);
      } else {
        setError("Invalid username or password. Please try again.");
        setShakeAnimation(true);
        setTimeout(() => setShakeAnimation(false), 500);
      }
      setLoading(false);
    }, 1500);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return 4;
    return 3;
  };

  const getPasswordStrengthColor = (level) => {
    const colors = ["#e74c3c", "#e67e22", "#f39c12", "#27ae60"];
    return colors[level - 1] || "#e1e5e9";
  };

  const passwordStrength = getPasswordStrength(credentials.password);

  return (
    <LoginContainer>
      <BackButton to="/">Back to Site</BackButton>
      <LoginCard shakeAnimation={shakeAnimation}>
        <Title>
          <LogoIcon>
            <IconSvg viewBox="0 0 50 50" width="26" height="26">
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

              <path
                d="M10 20 L35 20 L40 15 L45 15 L45 25 L40 25 L35 20 L35 30 L30 30 L30 25 L15 25 L15 30 L10 30 Z"
                fill="url(#gunGradient)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />

              <path
                d="M8 10 L8 35 M8 22 L20 10 M8 22 L20 35"
                stroke="url(#kGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </IconSvg>
          </LogoIcon>
          Gun-k Admin Portal
        </Title>

        <DemoCredentials>
          <div className="title">Demo Credentials</div>
          <div className="credentials">
            <div className="credential-item">
              <div className="label">Username</div>
              <div className="value">admin</div>
            </div>
            <div className="credential-item">
              <div className="label">Password</div>
              <div className="value">admin123</div>
            </div>
          </div>
        </DemoCredentials>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
                if (validationErrors.username) {
                  setValidationErrors({ ...validationErrors, username: "" });
                }
              }}
              error={validationErrors.username}
              required
            />
            {validationErrors.username && (
              <ErrorMessage>{validationErrors.username}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
                if (validationErrors.password) {
                  setValidationErrors({ ...validationErrors, password: "" });
                }
              }}
              error={validationErrors.password}
              required
            />
            {credentials.password && (
              <PasswordStrengthIndicator>
                {[1, 2, 3, 4].map((level) => (
                  <StrengthBar
                    key={level}
                    active={passwordStrength >= level}
                    color={getPasswordStrengthColor(level)}
                  />
                ))}
              </PasswordStrengthIndicator>
            )}
            {validationErrors.password && (
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            )}
          </InputGroup>

          <RememberMeContainer>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember username
          </RememberMeContainer>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner />
                Authenticating...
              </>
            ) : (
              "Login to Admin Portal"
            )}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </LoginCard>
    </LoginContainer>
  );
}
