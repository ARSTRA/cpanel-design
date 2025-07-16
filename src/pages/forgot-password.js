import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";

const ForgotPasswordContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ForgotPasswordCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(20px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60, #3498db);
    border-radius: 20px 20px 0 0;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 35px;
  font-size: 16px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 30px;
  border: 1px solid #e1e8ed;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
        : "rgba(52, 152, 219, 0.1)"};
    color: ${(props) => (props.active ? "white" : "#3498db")};
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
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

  &::placeholder {
    color: #bdc3c7;
  }
`;

const Button = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
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
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
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
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #fecaca;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  background: #f0fdf4;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  line-height: 1.5;
`;

const InfoBox = styled.div`
  background: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #055160;

  strong {
    color: #0a3d62;
  }
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

const SecurityFeatures = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  font-size: 13px;
  color: #856404;

  h4 {
    margin: 0 0 8px 0;
    color: #6c5914;
    font-size: 14px;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 4px;
    }
  }
`;

function ForgotPasswordContent() {
  const [resetMethod, setResetMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate input based on reset method
    const value = resetMethod === "email" ? formData.email : formData.phone;

    if (!value) {
      setError(
        `Please enter your ${resetMethod === "email" ? "email address" : "phone number"}`,
      );
      setLoading(false);
      return;
    }

    // Email validation
    if (resetMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }
    }

    // Phone validation
    if (resetMethod === "phone") {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, "");
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        setError("Please enter a valid phone number (10+ digits)");
        setLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      if (resetMethod === "email") {
        setSuccess(
          `Password reset instructions have been sent to ${formData.email}. Please check your inbox and spam folder. The link will expire in 1 hour.`,
        );
      } else {
        setSuccess(
          `A verification code has been sent via SMS to ${formData.phone}. Click the button below to enter your code and reset your password. The code expires in 15 minutes.`,
        );

        // For SMS, redirect to reset password page after delay
        setTimeout(() => {
          navigate("/reset-password");
        }, 3000);
      }
      setLoading(false);

      // For email, redirect to login after longer delay
      if (resetMethod === "email") {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleTabChange = (method) => {
    setResetMethod(method);
    setError("");
    setSuccess("");
    setFormData({
      email: "",
      phone: "",
    });
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <Title>🔐 Reset Password</Title>
        <Subtitle>
          Choose how you'd like to reset your Gun-k Pro account password
        </Subtitle>

        <TabContainer>
          <Tab
            active={resetMethod === "email"}
            onClick={() => handleTabChange("email")}
            type="button"
          >
            📧 Email Reset
          </Tab>
          <Tab
            active={resetMethod === "phone"}
            onClick={() => handleTabChange("phone")}
            type="button"
          >
            📱 SMS Reset
          </Tab>
        </TabContainer>

        {resetMethod === "email" ? (
          <InfoBox>
            <strong>Email Reset:</strong> We'll send a secure reset link to your
            registered email address. Click the link to create a new password.
          </InfoBox>
        ) : (
          <InfoBox>
            <strong>SMS Reset:</strong> We'll send a verification code to your
            registered phone number. Use this code to verify your identity and
            reset your password.
          </InfoBox>
        )}

        <Form onSubmit={handleSubmit}>
          {resetMethod === "email" ? (
            <FormGroup>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your registered email address"
                required
              />
            </FormGroup>
          ) : (
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your registered phone number"
                required
              />
            </FormGroup>
          )}

          <Button type="submit" disabled={loading}>
            {loading
              ? "Sending..."
              : `Send Reset ${resetMethod === "email" ? "Link" : "Code"}`}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <SecurityFeatures>
          <h4>🛡️ Security Features</h4>
          <ul>
            <li>All reset links and codes expire automatically</li>
            <li>Password reset attempts are rate-limited</li>
            <li>Your account is protected by industry-standard encryption</li>
            <li>We never store your passwords in plain text</li>
          </ul>
        </SecurityFeatures>

        <LinksContainer>
          <p>
            Remember your password?{" "}
            <StyledLink to="/login">Sign in here</StyledLink>
          </p>
          <p>
            Need help? <StyledLink to="/contact">Contact Support</StyledLink>
          </p>
        </LinksContainer>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
}

const ForgotPasswordPage = () => {
  return (
    <AppProvider>
      <Layout>
        <ForgotPasswordContent />
      </Layout>
    </AppProvider>
  );
};

export default ForgotPasswordPage;

export const Head = () => <title>Reset Password | Gun-k Pro</title>;
