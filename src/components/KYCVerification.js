import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const KYCContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
`;

const KYCStep = styled.div`
  background: white;
  border: 2px solid
    ${(props) => {
      if (props.status === "completed") return "#27ae60";
      if (props.status === "current") return "#3498db";
      return "#e1e8ed";
    }};
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => {
    if (props.status === "completed")
      return "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)";
    if (props.status === "current")
      return "linear-gradient(135deg, #3498db 0%, #2980b9 100%)";
    return "#95a5a6";
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const StepTitle = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const StepContent = styled.div`
  margin-left: 55px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #3498db;
    background: #f8f9fa;
  }

  &.active {
    border-color: #27ae60;
    background: #f0fdf4;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.approved {
    background: #d4edda;
    color: #155724;
  }

  &.rejected {
    background: #f8d7da;
    color: #721c24;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e1e8ed;
  border-radius: 3px;
  overflow: hidden;
  margin: 20px 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3498db, #27ae60);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    ssn: "",
    phoneNumber: "",

    // Address Information
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",

    // Identity Documents
    idType: "drivers_license",
    idNumber: "",
    idExpiryDate: "",

    // Employment Information
    employmentStatus: "",
    occupation: "",
    annualIncome: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    frontId: null,
    backId: null,
    proofOfAddress: null,
    incomeProof: null,
  });

  const steps = [
    { id: 1, title: "Personal Information", status: "completed" },
    { id: 2, title: "Address Verification", status: "completed" },
    { id: 3, title: "Identity Documents", status: "current" },
    { id: 4, title: "Background Check", status: "pending" },
    { id: 5, title: "Final Review", status: "pending" },
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type, file) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file }));
  };

  const renderStep1 = () => (
    <KYCStep status="completed">
      <StepHeader>
        <StepNumber status="completed">✓</StepNumber>
        <StepTitle>Personal Information</StepTitle>
        <StatusBadge className="approved">Verified</StatusBadge>
      </StepHeader>
      <StepContent>
        <FormGrid>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              value={formData.firstName || "John"}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              value={formData.lastName || "Doe"}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={formData.dateOfBirth || "1990-01-01"}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              value={formData.phoneNumber || "(555) 123-4567"}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              disabled
            />
          </FormGroup>
        </FormGrid>
      </StepContent>
    </KYCStep>
  );

  const renderStep2 = () => (
    <KYCStep status="completed">
      <StepHeader>
        <StepNumber status="completed">✓</StepNumber>
        <StepTitle>Address Verification</StepTitle>
        <StatusBadge className="approved">Verified</StatusBadge>
      </StepHeader>
      <StepContent>
        <FormGrid>
          <FormGroup>
            <Label>Street Address</Label>
            <Input
              value={formData.streetAddress || "123 Main Street"}
              onChange={(e) =>
                handleInputChange("streetAddress", e.target.value)
              }
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input
              value={formData.city || "Gunsmith City"}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>State</Label>
            <Select
              value={formData.state || "GC"}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled
            >
              <option value="GC">Gunsmith City</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>ZIP Code</Label>
            <Input
              value={formData.zipCode || "12345"}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              disabled
            />
          </FormGroup>
        </FormGrid>
      </StepContent>
    </KYCStep>
  );

  const renderStep3 = () => (
    <KYCStep status="current">
      <StepHeader>
        <StepNumber status="current">3</StepNumber>
        <StepTitle>Identity Documents</StepTitle>
        <StatusBadge className="pending">Under Review</StatusBadge>
      </StepHeader>
      <StepContent>
        <FormGrid>
          <FormGroup>
            <Label>ID Type</Label>
            <Select
              value={formData.idType}
              onChange={(e) => handleInputChange("idType", e.target.value)}
            >
              <option value="drivers_license">Driver's License</option>
              <option value="passport">Passport</option>
              <option value="state_id">State ID</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>ID Number</Label>
            <Input
              value={formData.idNumber}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              placeholder="Enter ID number"
            />
          </FormGroup>
          <FormGroup>
            <Label>Expiry Date</Label>
            <Input
              type="date"
              value={formData.idExpiryDate}
              onChange={(e) =>
                handleInputChange("idExpiryDate", e.target.value)
              }
            />
          </FormGroup>
        </FormGrid>

        <FormGrid>
          <FormGroup>
            <Label>Front of ID</Label>
            <FileUpload className={uploadedFiles.frontId ? "active" : ""}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>📄</div>
              <div>
                {uploadedFiles.frontId
                  ? "ID Front Uploaded"
                  : "Click to upload front of ID"}
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileUpload("frontId", e.target.files[0])}
              />
            </FileUpload>
          </FormGroup>
          <FormGroup>
            <Label>Back of ID</Label>
            <FileUpload className={uploadedFiles.backId ? "active" : ""}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>📄</div>
              <div>
                {uploadedFiles.backId
                  ? "ID Back Uploaded"
                  : "Click to upload back of ID"}
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => handleFileUpload("backId", e.target.files[0])}
              />
            </FileUpload>
          </FormGroup>
        </FormGrid>

        <Button>Submit Documents for Review</Button>
      </StepContent>
    </KYCStep>
  );

  const renderStep4 = () => (
    <KYCStep status="pending">
      <StepHeader>
        <StepNumber status="pending">4</StepNumber>
        <StepTitle>Background Check</StepTitle>
        <StatusBadge className="pending">Pending</StatusBadge>
      </StepHeader>
      <StepContent>
        <div style={{ textAlign: "center", padding: "30px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔍</div>
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
            Background Check in Progress
          </h3>
          <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
            We are conducting a federal background check as required by law.
            This process typically takes 1-3 business days.
          </p>
          <div
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              padding: "15px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <strong>What we check:</strong>
            <ul
              style={{
                textAlign: "left",
                margin: "10px 0 0",
                paddingLeft: "20px",
              }}
            >
              <li>Criminal history</li>
              <li>Federal database records</li>
              <li>State prohibited persons list</li>
              <li>Mental health records</li>
            </ul>
          </div>
        </div>
      </StepContent>
    </KYCStep>
  );

  const renderStep5 = () => (
    <KYCStep status="pending">
      <StepHeader>
        <StepNumber status="pending">5</StepNumber>
        <StepTitle>Final Review</StepTitle>
        <StatusBadge className="pending">Pending</StatusBadge>
      </StepHeader>
      <StepContent>
        <div style={{ textAlign: "center", padding: "30px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>📋</div>
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
            Manual Review Required
          </h3>
          <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
            Your application will be manually reviewed by our compliance team to
            ensure all requirements are met.
          </p>
        </div>
      </StepContent>
    </KYCStep>
  );

  return (
    <KYCContainer>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "10px" }}>
          🔐 Identity Verification Process
        </h2>
        <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
          Complete verification to access all features and make purchases
        </p>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <div
          style={{ textAlign: "center", color: "#7f8c8d", fontSize: "14px" }}
        >
          Step {currentStep} of {steps.length} - {Math.round(progress)}%
          Complete
        </div>
      </div>

      {renderStep1()}
      {renderStep2()}
      {renderStep3()}
      {renderStep4()}
      {renderStep5()}
    </KYCContainer>
  );
};

export default KYCVerification;
