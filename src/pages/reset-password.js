import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";

const ResetPasswordContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const ResetPasswordCard = styled.div`
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
    background: linear-gradient(90px, #27ae60, #2ecc71, #58d68d);
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

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
`;

const Step = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
      : "#e1e8ed"};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
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
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const CodeInput = styled.input`
  padding: 20px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 24px;
  text-align: center;
  letter-spacing: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
  font-family: "Courier New", monospace;

  &:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
  }

  &::placeholder {
    color: #bdc3c7;
    letter-spacing: normal;
    font-family: inherit;
    font-size: 16px;
  }
`;

const PasswordRequirements = styled.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  font-size: 13px;

  h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 14px;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 5px;
      color: #7f8c8d;

      &.valid {
        color: #27ae60;
      }

      &.invalid {
        color: #e74c3c;
      }
    }
  }
`;

const Button = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
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
    background: linear-gradient(135deg, #229954 0%, #27ae60 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3498db;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

const Timer = styled.div`
  text-align: center;
  color: #e74c3c;
  font-weight: 600;
  margin-top: 10px;
  font-size: 14px;
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

function ResetPasswordContent() {
  const [step, setStep] = useState(1); // 1: Enter code, 2: New password
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [codeResent, setCodeResent] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return requirements;
  };

  const passwordReqs = validatePassword(formData.newPassword);
  const allPasswordReqsMet = Object.values(passwordReqs).every((req) => req);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (step === 1) {
      // Validate verification code
      if (!formData.code || formData.code.length !== 6) {
        setError("Please enter the 6-digit verification code");
        setLoading(false);
        return;
      }

      if (timeLeft <= 0) {
        setError("Verification code has expired. Please request a new one.");
        setLoading(false);
        return;
      }

      // Simulate code verification
      setTimeout(() => {
        if (formData.code === "123456") {
          // Demo code
          setStep(2);
          setSuccess("Code verified! Please enter your new password.");
        } else {
          setError("Invalid verification code. Please try again.");
        }
        setLoading(false);
      }, 1500);
    } else {
      // Validate new password
      if (!allPasswordReqsMet) {
        setError("Please ensure your password meets all requirements");
        setLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Simulate password reset
      setTimeout(() => {
        setSuccess(
          "Password reset successful! You can now sign in with your new password.",
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setLoading(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
    if (success && step === 1) setSuccess("");
  };

  const handleResendCode = async () => {
    setCodeResent(true);
    setTimeLeft(15 * 60); // Reset timer
    setSuccess("New verification code sent!");
    setTimeout(() => {
      setCodeResent(false);
      setSuccess("");
    }, 3000);
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordCard>
        <Title>🔑 Reset Password</Title>
        <Subtitle>
          {step === 1
            ? "Enter the verification code sent to your phone"
            : "Choose a strong new password for your account"}
        </Subtitle>

        <StepIndicator>
          <Step active={step >= 1}>1</Step>
          <Step active={step >= 2}>2</Step>
        </StepIndicator>

        <Form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <FormGroup>
                <Label>Verification Code</Label>
                <CodeInput
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </FormGroup>

              {timeLeft > 0 ? (
                <Timer>Code expires in {formatTime(timeLeft)}</Timer>
              ) : (
                <Timer>Code has expired</Timer>
              )}

              <Button type="submit" disabled={loading || timeLeft <= 0}>
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              {timeLeft <= 300 &&
                timeLeft > 0 && ( // Show resend when 5 minutes or less
                  <SecondaryButton
                    type="button"
                    onClick={handleResendCode}
                    disabled={codeResent}
                  >
                    {codeResent ? "Code Sent!" : "Resend Code"}
                  </SecondaryButton>
                )}
            </>
          ) : (
            <>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  required
                />

                <PasswordRequirements>
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li className={passwordReqs.length ? "valid" : "invalid"}>
                      ✓ At least 8 characters long
                    </li>
                    <li
                      className={passwordReqs.uppercase ? "valid" : "invalid"}
                    >
                      ✓ Contains uppercase letter (A-Z)
                    </li>
                    <li
                      className={passwordReqs.lowercase ? "valid" : "invalid"}
                    >
                      ✓ Contains lowercase letter (a-z)
                    </li>
                    <li className={passwordReqs.number ? "valid" : "invalid"}>
                      ✓ Contains number (0-9)
                    </li>
                    <li className={passwordReqs.special ? "valid" : "invalid"}>
                      ✓ Contains special character (!@#$%^&*)
                    </li>
                  </ul>
                </PasswordRequirements>
              </FormGroup>

              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  required
                />
              </FormGroup>

              <Button type="submit" disabled={loading || !allPasswordReqsMet}>
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </>
          )}
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <LinksContainer>
          <p>
            Remember your password?{" "}
            <StyledLink to="/login">Sign in here</StyledLink>
          </p>
          <p>
            Need help? <StyledLink to="/contact">Contact Support</StyledLink>
          </p>
        </LinksContainer>
      </ResetPasswordCard>
    </ResetPasswordContainer>
  );
}

const ResetPasswordPage = () => {
  return (
    <AppProvider>
      <Layout>
        <ResetPasswordContent />
      </Layout>
    </AppProvider>
  );
};

export default ResetPasswordPage;

export const Head = () => <title>Reset Password | Gun-k Pro</title>;
