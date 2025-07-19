import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AppProvider } from "../context/AppContext.optimized";
import Layout from "../components/Layout";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const ApplicationContainer = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(30, 60, 114, 0.95), rgba(42, 82, 152, 0.95)),
    url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&auto=format&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
`;

const ApplicationContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: white;
`;

const MainTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const MainSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const SecurityBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .icon {
    font-size: 20px;
  }

  .text {
    font-weight: 600;
    font-size: 14px;
  }
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 15px;
`;

const Step = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => {
    if (props.completed)
      return "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)";
    if (props.active)
      return "linear-gradient(135deg, #3498db 0%, #2980b9 100%)";
    return "#e1e8ed";
  }};
  color: ${(props) => (props.completed || props.active ? "white" : "#7f8c8d")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  position: relative;

  &::after {
    content: "${(props) => props.label}";
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 600;
    color: #2c3e50;
    white-space: nowrap;
  }
`;

const FormSection = styled.div`
  margin-bottom: 35px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0 0 25px;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e1e8ed;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  padding: 18px 35px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(39, 174, 96, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &.secondary {
    background: #95a5a6;

    &:hover {
      background: #7f8c8d;
      box-shadow: 0 12px 30px rgba(149, 165, 166, 0.4);
    }
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%);
  border: 1px solid #bee5eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;

  h4 {
    color: #2c3e50;
    margin: 0 0 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

function FinancingApplicationContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",

    // Address Information
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    residenceType: "",
    monthsAtAddress: "",

    // Employment Information
    employmentStatus: "",
    employer: "",
    jobTitle: "",
    workPhone: "",
    monthsEmployed: "",
    annualIncome: "",

    // Financial Information
    bankName: "",
    accountType: "",
    monthlyRent: "",
    otherIncome: "",

    // Loan Information
    requestedAmount: "",
    loanPurpose: "",
    downPayment: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.ssn) newErrors.ssn = "SSN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert(
        "Application submitted successfully! You will receive a decision within 24 hours.",
      );
    }
  };

  const renderStep1 = () => (
    <FormSection>
      <SectionTitle>👤 Personal Information</SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>First Name *</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            style={{ borderColor: errors.firstName ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.firstName && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.firstName}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Last Name *</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            style={{ borderColor: errors.lastName ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.lastName && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.lastName}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email Address *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            style={{ borderColor: errors.email ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.email && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.email}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Phone Number *</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            style={{ borderColor: errors.phone ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.phone && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.phone}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Date of Birth *</Label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            style={{ borderColor: errors.dateOfBirth ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.dateOfBirth && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.dateOfBirth}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Social Security Number *</Label>
          <Input
            value={formData.ssn}
            onChange={(e) => handleInputChange("ssn", e.target.value)}
            placeholder="XXX-XX-XXXX"
            maxLength="11"
            style={{ borderColor: errors.ssn ? "#e74c3c" : "#e1e8ed" }}
          />
          {errors.ssn && (
            <div
              style={{ color: "#e74c3c", fontSize: "12px", marginTop: "5px" }}
            >
              {errors.ssn}
            </div>
          )}
        </FormGroup>
      </FormGrid>
    </FormSection>
  );

  const renderStep2 = () => (
    <FormSection>
      <SectionTitle>🏠 Address Information</SectionTitle>
      <FormGrid>
        <FormGroup style={{ gridColumn: "1 / -1" }}>
          <Label>Street Address *</Label>
          <Input
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            placeholder="123 Main Street"
          />
        </FormGroup>

        <FormGroup>
          <Label>City *</Label>
          <Input
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter city"
          />
        </FormGroup>

        <FormGroup>
          <Label>State *</Label>
          <Select
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          >
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            {/* Add more states as needed */}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>ZIP Code *</Label>
          <Input
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            placeholder="12345"
            maxLength="5"
          />
        </FormGroup>

        <FormGroup>
          <Label>Residence Type *</Label>
          <Select
            value={formData.residenceType}
            onChange={(e) => handleInputChange("residenceType", e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="own">Own</option>
            <option value="rent">Rent</option>
            <option value="family">Live with Family</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Months at Address *</Label>
          <Input
            type="number"
            value={formData.monthsAtAddress}
            onChange={(e) =>
              handleInputChange("monthsAtAddress", e.target.value)
            }
            placeholder="24"
            min="0"
          />
        </FormGroup>
      </FormGrid>
    </FormSection>
  );

  const renderStep3 = () => (
    <FormSection>
      <SectionTitle>💼 Employment Information</SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>Employment Status *</Label>
          <Select
            value={formData.employmentStatus}
            onChange={(e) =>
              handleInputChange("employmentStatus", e.target.value)
            }
          >
            <option value="">Select Status</option>
            <option value="employed">Employed Full-Time</option>
            <option value="part-time">Employed Part-Time</option>
            <option value="self-employed">Self-Employed</option>
            <option value="retired">Retired</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Employer Name *</Label>
          <Input
            value={formData.employer}
            onChange={(e) => handleInputChange("employer", e.target.value)}
            placeholder="Company Name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Job Title *</Label>
          <Input
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            placeholder="Your job title"
          />
        </FormGroup>

        <FormGroup>
          <Label>Work Phone</Label>
          <Input
            type="tel"
            value={formData.workPhone}
            onChange={(e) => handleInputChange("workPhone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </FormGroup>

        <FormGroup>
          <Label>Months Employed *</Label>
          <Input
            type="number"
            value={formData.monthsEmployed}
            onChange={(e) =>
              handleInputChange("monthsEmployed", e.target.value)
            }
            placeholder="24"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>Annual Income *</Label>
          <Input
            type="number"
            value={formData.annualIncome}
            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
            placeholder="75000"
            min="0"
          />
        </FormGroup>
      </FormGrid>
    </FormSection>
  );

  const renderStep4 = () => (
    <FormSection>
      <SectionTitle>💰 Financial & Loan Information</SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>Requested Loan Amount *</Label>
          <Input
            type="number"
            value={formData.requestedAmount}
            onChange={(e) =>
              handleInputChange("requestedAmount", e.target.value)
            }
            placeholder="5000"
            min="500"
            max="50000"
          />
        </FormGroup>

        <FormGroup>
          <Label>Loan Purpose *</Label>
          <Select
            value={formData.loanPurpose}
            onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
          >
            <option value="">Select Purpose</option>
            <option value="firearm-purchase">Firearm Purchase</option>
            <option value="accessories">Accessories & Equipment</option>
            <option value="training">Training & Education</option>
            <option value="collection">Collection Building</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Down Payment</Label>
          <Input
            type="number"
            value={formData.downPayment}
            onChange={(e) => handleInputChange("downPayment", e.target.value)}
            placeholder="1000"
            min="0"
          />
        </FormGroup>

        <FormGroup>
          <Label>Bank Name *</Label>
          <Input
            value={formData.bankName}
            onChange={(e) => handleInputChange("bankName", e.target.value)}
            placeholder="Your primary bank"
          />
        </FormGroup>

        <FormGroup>
          <Label>Account Type *</Label>
          <Select
            value={formData.accountType}
            onChange={(e) => handleInputChange("accountType", e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Monthly Housing Payment</Label>
          <Input
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
            placeholder="1200"
            min="0"
          />
        </FormGroup>
      </FormGrid>
    </FormSection>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <ApplicationContainer>
      <ApplicationContent>
        <HeaderSection>
          <MainTitle>🚀 Financing Application</MainTitle>
          <MainSubtitle>
            Get approved for your firearms purchase in minutes
          </MainSubtitle>

          <SecurityBadges>
            <SecurityBadge>
              <span className="icon">🔒</span>
              <span className="text">256-Bit SSL Encryption</span>
            </SecurityBadge>
            <SecurityBadge>
              <span className="icon">⚡</span>
              <span className="text">Instant Decision</span>
            </SecurityBadge>
            <SecurityBadge>
              <span className="icon">🛡️</span>
              <span className="text">Secure & Confidential</span>
            </SecurityBadge>
          </SecurityBadges>
        </HeaderSection>

        <FormCard>
          <StepIndicator>
            <Step
              completed={currentStep > 1}
              active={currentStep === 1}
              label="Personal"
            >
              {currentStep > 1 ? "✓" : "1"}
            </Step>
            <Step
              completed={currentStep > 2}
              active={currentStep === 2}
              label="Address"
            >
              {currentStep > 2 ? "✓" : "2"}
            </Step>
            <Step
              completed={currentStep > 3}
              active={currentStep === 3}
              label="Employment"
            >
              {currentStep > 3 ? "✓" : "3"}
            </Step>
            <Step
              completed={currentStep > 4}
              active={currentStep === 4}
              label="Financial"
            >
              {currentStep > 4 ? "✓" : "4"}
            </Step>
          </StepIndicator>

          <InfoBox>
            <h4>📋 Application Requirements</h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#7f8c8d" }}>
              <li>Must be 18 years or older</li>
              <li>Valid Social Security Number</li>
              <li>Verifiable income source</li>
              <li>U.S. citizen or permanent resident</li>
            </ul>
          </InfoBox>

          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}

            <ButtonGroup>
              {currentStep > 1 && (
                <Button type="button" className="secondary" onClick={prevStep}>
                  ← Previous Step
                </Button>
              )}

              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next Step →
                </Button>
              ) : (
                <Button type="submit">🚀 Submit Application</Button>
              )}
            </ButtonGroup>
          </form>
        </FormCard>
      </ApplicationContent>
    </ApplicationContainer>
  );
}

const FinancingApplicationPage = () => {
  return (
    <AppProvider>
      <Layout>
        <FinancingApplicationContent />
      </Layout>
    </AppProvider>
  );
};

export default FinancingApplicationPage;

export const Head = () => <title>Financing Application | Gun-k Pro</title>;
