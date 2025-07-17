import React, { useState } from "react";
import styled from "styled-components";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 100px;
  padding-bottom: 50px;
`;

const ProfileContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
  }
`;

const UserAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
`;

const ProfileForm = styled.form`
  display: grid;
  gap: 25px;
`;

const FormSection = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #e9ecef;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  gap: 20px;

  @media (max-width: 768px) {
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
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }

  &:disabled {
    background: #f8f9fa;
    color: #6c757d;
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border: none;
  padding: 18px 30px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  justify-self: center;
  min-width: 200px;

  &:hover {
    background: linear-gradient(135deg, #00a085 0%, #00937a 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 184, 148, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;

  .icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .value {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 4px;
  }

  .label {
    font-size: 12px;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

function ProfileContent() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    fflDealer: "Metro Gun Shop",
    fflAddress: "456 Gun Store Ave, New York, NY 10002",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Profile updated successfully!");
  };

  const userStats = [
    { icon: "🛒", value: "12", label: "Orders" },
    { icon: "💰", value: "$2,450", label: "Total Spent" },
    { icon: "⭐", value: "4.9", label: "Rating" },
    { icon: "📅", value: "2 Years", label: "Member Since" },
  ];

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileCard>
          <ProfileHeader>
            <UserAvatar>👤</UserAvatar>
            <h1>My Profile</h1>
            <p>Manage your account settings and preferences</p>
          </ProfileHeader>

          <StatsGrid>
            {userStats.map((stat, index) => (
              <StatCard key={index}>
                <div className="icon">{stat.icon}</div>
                <div className="value">{stat.value}</div>
                <div className="label">{stat.label}</div>
              </StatCard>
            ))}
          </StatsGrid>

          <ProfileForm onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>👤 Personal Information</SectionTitle>
              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionTitle>🏠 Address Information</SectionTitle>
              <FormGroup>
                <Label>Street Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormRow columns="1fr 1fr 1fr">
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>ZIP Code</Label>
                  <Input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionTitle>🔫 FFL Dealer Information</SectionTitle>
              <FormGroup>
                <Label>Preferred FFL Dealer</Label>
                <Input
                  type="text"
                  name="fflDealer"
                  value={formData.fflDealer}
                  onChange={handleChange}
                  placeholder="Enter your preferred FFL dealer name"
                />
              </FormGroup>
              <FormGroup>
                <Label>FFL Dealer Address</Label>
                <Input
                  type="text"
                  name="fflAddress"
                  value={formData.fflAddress}
                  onChange={handleChange}
                  placeholder="Enter FFL dealer address"
                />
              </FormGroup>
            </FormSection>

            <SaveButton type="submit">💾 Save Changes</SaveButton>
          </ProfileForm>
        </ProfileCard>
      </ProfileContent>
    </ProfileContainer>
  );
}

const ProfilePage = () => {
  return (
    <AppProvider>
      <Layout>
        <ProfileContent />
      </Layout>
    </AppProvider>
  );
};

export default ProfilePage;

export const Head = () => <title>Profile | Gun-k Pro</title>;
