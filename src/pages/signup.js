import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { AppProvider, useApp } from "../context/AppContext";
import Layout from "../components/Layout";

const SignupContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const SignupCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.2),
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
    background: linear-gradient(90deg, #27ae60, #3498db, #f39c12, #e74c3c);
    border-radius: 20px 20px 0 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
`;

const Select = styled.select`
  padding: 15px;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #2c3e50;
  line-height: 1.5;

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  padding: 18px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
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
    background: linear-gradient(135deg, #229954 0%, #1e8449 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
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

const LegalNotice = styled.div`
  background: #fff8dc;
  border: 1px solid #ffd700;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #8b4513;

  strong {
    color: #d2691e;
  }
`;

function SignupContent() {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    state: "",
    agreeToTerms: false,
    ageVerification: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (!formData.ageVerification) {
      setError("You must confirm you are at least 18 years old");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (
        formData.email &&
        formData.password &&
        formData.firstName &&
        formData.lastName
      ) {
        setSuccess("Account created successfully! Welcome to Gun-k Pro.");
        // Add user to context
        dispatch({
          type: "ADD_USER",
          payload: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            registrationDate: new Date().toISOString(),
          },
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Please fill in all required fields");
      }
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <SignupContainer>
      <SignupCard>
        <Title>🔫 Join Gun-k Pro</Title>
        <Subtitle>Create your account to access our firearms catalog</Subtitle>

        <LegalNotice>
          <strong>⚠️ Legal Notice:</strong> By creating an account, you confirm
          that you are legally eligible to purchase firearms in your state and
          will comply with all federal, state, and local laws. Background checks
          are required for all firearm purchases.
        </LegalNotice>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Email Address *</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </FormGroup>

            <FormGroup>
              <Label>State *</Label>
              <Select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select your state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Date of Birth *</Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Password *</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password *</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </FormGroup>
          </FormRow>

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="ageVerification"
              checked={formData.ageVerification}
              onChange={handleChange}
              required
            />
            <CheckboxLabel>
              I confirm that I am at least 18 years old and legally eligible to
              purchase firearms.
            </CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <CheckboxLabel>
              I agree to the <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </CheckboxLabel>
          </CheckboxContainer>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <LinksContainer>
          <p>
            Already have an account?{" "}
            <StyledLink to="/login">Sign in here</StyledLink>
          </p>
        </LinksContainer>
      </SignupCard>
    </SignupContainer>
  );
}

const SignupPage = () => {
  return (
    <AppProvider>
      <Layout>
        <SignupContent />
      </Layout>
    </AppProvider>
  );
};

export default SignupPage;

export const Head = () => <title>Sign Up | Gun-k Pro</title>;
