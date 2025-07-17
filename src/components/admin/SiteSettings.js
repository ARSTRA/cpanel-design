import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 25px 30px;
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  padding: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SaveButton = styled.button`
  padding: 15px 30px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #229954;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
`;

export default function SiteSettings() {
  const { state, dispatch } = useApp();
  const [settings, setSettings] = useState(state.siteSettings);
  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_SITE_SETTINGS", payload: settings });
    setShowSuccess(true);
    timeoutRef.current = setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBankDetailsChange = (field, value) => {
    setSettings({
      ...settings,
      bankDetails: {
        ...settings.bankDetails,
        [field]: value,
      },
    });
  };

  const handleContactInfoChange = (field, value) => {
    setSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  return (
    <Container>
      <Header>
        <Title>Site Settings</Title>
      </Header>

      <Content>
        {showSuccess && (
          <SuccessMessage>Settings updated successfully!</SuccessMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>🏪 General Settings</SectionTitle>
            <FormGroup>
              <Label>Site Name</Label>
              <Input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Header Text</Label>
              <Input
                type="text"
                value={settings.headerText}
                onChange={(e) =>
                  setSettings({ ...settings, headerText: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Footer Text</Label>
              <Input
                type="text"
                value={settings.footerText}
                onChange={(e) =>
                  setSettings({ ...settings, footerText: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>About Us Content</Label>
              <TextArea
                value={settings.aboutUs}
                onChange={(e) =>
                  setSettings({ ...settings, aboutUs: e.target.value })
                }
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>🏦 Bank Details</SectionTitle>
            <TwoColumnGrid>
              <FormGroup>
                <Label>Bank Name</Label>
                <Input
                  type="text"
                  value={settings.bankDetails.bankName}
                  onChange={(e) =>
                    handleBankDetailsChange("bankName", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Account Number</Label>
                <Input
                  type="text"
                  value={settings.bankDetails.accountNumber}
                  onChange={(e) =>
                    handleBankDetailsChange("accountNumber", e.target.value)
                  }
                />
              </FormGroup>
            </TwoColumnGrid>
            <FormGroup>
              <Label>Routing Number</Label>
              <Input
                type="text"
                value={settings.bankDetails.routingNumber}
                onChange={(e) =>
                  handleBankDetailsChange("routingNumber", e.target.value)
                }
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>📞 Contact Information</SectionTitle>
            <TwoColumnGrid>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.contactInfo.email}
                  onChange={(e) =>
                    handleContactInfoChange("email", e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={settings.contactInfo.phone}
                  onChange={(e) =>
                    handleContactInfoChange("phone", e.target.value)
                  }
                />
              </FormGroup>
            </TwoColumnGrid>
            <FormGroup>
              <Label>Address</Label>
              <TextArea
                value={settings.contactInfo.address}
                onChange={(e) =>
                  handleContactInfoChange("address", e.target.value)
                }
              />
            </FormGroup>
          </Section>

          <SaveButton type="submit">Save Settings</SaveButton>
        </Form>
      </Content>
    </Container>
  );
}
