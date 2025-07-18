import React from "react";
import styled, { keyframes } from "styled-components";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PolicyContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding: 0;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const PolicySection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 50px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 40px 30px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
    border-radius: 15px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1rem;
  margin-bottom: 40px;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  color: #4ecdc4;
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(78, 205, 196, 0.3);
  padding-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubSectionTitle = styled.h3`
  color: #f093fb;
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Content = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const List = styled.ul`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  padding-left: 30px;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding-left: 20px;
  }
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  margin-top: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const ContactTitle = styled.h3`
  color: #4ecdc4;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ContactDetail = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 10px;

  strong {
    color: #fff;
  }
`;

const PrivacyPolicyPage = () => {
  return (
    <AppProvider>
      <Layout>
        <PolicyContainer>
          <Container>
            <PolicySection>
              <Title>Privacy Policy</Title>
              <LastUpdated>Last Updated: January 2024</LastUpdated>

              <Content>
                Gun-k Pro ("we," "our," or "us") is committed to protecting your
                privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, make
                purchases, or engage with our services related to firearms and
                ammo retail.
              </Content>

              <SectionTitle>1. Information We Collect</SectionTitle>

              <SubSectionTitle>1.1 Personal Information</SubSectionTitle>
              <Content>
                We collect personal information that you voluntarily provide to
                us when:
              </Content>
              <List>
                <ListItem>
                  Creating an account or registering on our website
                </ListItem>
                <ListItem>Making a purchase or placing an order</ListItem>
                <ListItem>
                  Completing ATF Form 4473 for background checks
                </ListItem>
                <ListItem>
                  Requesting information about our products or services
                </ListItem>
                <ListItem>
                  Subscribing to our newsletter or marketing communications
                </ListItem>
                <ListItem>
                  Participating in surveys, contests, or promotions
                </ListItem>
                <ListItem>Contacting customer support</ListItem>
              </List>

              <SubSectionTitle>
                1.2 Types of Personal Information
              </SubSectionTitle>
              <Content>
                The personal information we may collect includes:
              </Content>
              <List>
                <ListItem>
                  <strong>Identity Information:</strong> Full name, date of
                  birth, Social Security Number (for background checks)
                </ListItem>
                <ListItem>
                  <strong>Contact Information:</strong> Email address, phone
                  number, mailing address, billing address
                </ListItem>
                <ListItem>
                  <strong>Government IDs:</strong> Driver's license, state ID,
                  passport (for age verification and legal compliance)
                </ListItem>
                <ListItem>
                  <strong>Payment Information:</strong> Credit card details,
                  billing information (processed securely)
                </ListItem>
                <ListItem>
                  <strong>Legal Information:</strong> FFL license numbers,
                  residency status, background check responses
                </ListItem>
                <ListItem>
                  <strong>Purchase History:</strong> Transaction records,
                  product preferences, order history
                </ListItem>
              </List>

              <SubSectionTitle>
                1.3 Automatic Information Collection
              </SubSectionTitle>
              <Content>
                We automatically collect certain information when you visit our
                website:
              </Content>
              <List>
                <ListItem>IP address and location information</ListItem>
                <ListItem>Browser type and version</ListItem>
                <ListItem>Device information and operating system</ListItem>
                <ListItem>Pages visited and time spent on our website</ListItem>
                <ListItem>Referring website information</ListItem>
                <ListItem>Search terms used on our website</ListItem>
              </List>

              <SectionTitle>2. How We Use Your Information</SectionTitle>

              <Content>
                We use your personal information for the following purposes:
              </Content>
              <List>
                <ListItem>
                  <strong>Legal Compliance:</strong> Conducting federally
                  required background checks through NICS
                </ListItem>
                <ListItem>
                  <strong>Order Processing:</strong> Processing purchases,
                  managing inventory, and fulfilling orders
                </ListItem>
                <ListItem>
                  <strong>Account Management:</strong> Creating and maintaining
                  your customer account
                </ListItem>
                <ListItem>
                  <strong>Customer Service:</strong> Responding to inquiries and
                  providing support
                </ListItem>
                <ListItem>
                  <strong>Marketing:</strong> Sending promotional materials and
                  product updates (with your consent)
                </ListItem>
                <ListItem>
                  <strong>Security:</strong> Protecting against fraud and
                  ensuring website security
                </ListItem>
                <ListItem>
                  <strong>Analytics:</strong> Improving our website and services
                  through usage analysis
                </ListItem>
                <ListItem>
                  <strong>Record Keeping:</strong> Maintaining legally required
                  records per ATF regulations
                </ListItem>
              </List>

              <SectionTitle>3. Information Sharing and Disclosure</SectionTitle>

              <Content>
                We may share your information in the following circumstances:
              </Content>
              <List>
                <ListItem>
                  <strong>Legal Requirements:</strong> With law enforcement,
                  ATF, or other government agencies as required by law
                </ListItem>
                <ListItem>
                  <strong>Background Checks:</strong> With the National Instant
                  Criminal Background Check System (NICS)
                </ListItem>
                <ListItem>
                  <strong>Service Providers:</strong> With trusted third-party
                  service providers who assist in business operations
                </ListItem>
                <ListItem>
                  <strong>FFL Dealers:</strong> With licensed firearms dealers
                  for transfer purposes
                </ListItem>
                <ListItem>
                  <strong>Payment Processors:</strong> With secure payment
                  processing companies
                </ListItem>
                <ListItem>
                  <strong>Legal Protection:</strong> When necessary to protect
                  our rights, property, or safety
                </ListItem>
              </List>

              <Content>
                <strong>
                  We do not sell, rent, or trade your personal information to
                  third parties for marketing purposes.
                </strong>
              </Content>

              <SectionTitle>4. Data Security</SectionTitle>

              <Content>
                We implement industry-standard security measures to protect your
                personal information:
              </Content>
              <List>
                <ListItem>SSL encryption for all data transmission</ListItem>
                <ListItem>Secure servers with firewall protection</ListItem>
                <ListItem>
                  Regular security audits and vulnerability assessments
                </ListItem>
                <ListItem>
                  Access controls limiting employee access to personal
                  information
                </ListItem>
                <ListItem>
                  Secure storage of physical documents per ATF requirements
                </ListItem>
                <ListItem>Regular data backups with encryption</ListItem>
              </List>

              <SectionTitle>5. Data Retention</SectionTitle>

              <Content>
                We retain your personal information for different periods
                depending on the type of information:
              </Content>
              <List>
                <ListItem>
                  <strong>ATF Records:</strong> Permanently retained as required
                  by federal law
                </ListItem>
                <ListItem>
                  <strong>Transaction Records:</strong> Minimum of 20 years per
                  ATF regulations
                </ListItem>
                <ListItem>
                  <strong>Account Information:</strong> Until account deletion
                  or as legally required
                </ListItem>
                <ListItem>
                  <strong>Marketing Data:</strong> Until you opt-out or request
                  deletion
                </ListItem>
                <ListItem>
                  <strong>Website Analytics:</strong> Typically 2-3 years for
                  business analysis
                </ListItem>
              </List>

              <SectionTitle>6. Your Rights and Choices</SectionTitle>

              <Content>
                Depending on your location, you may have the following rights:
              </Content>
              <List>
                <ListItem>
                  <strong>Access:</strong> Request access to your personal
                  information
                </ListItem>
                <ListItem>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </ListItem>
                <ListItem>
                  <strong>Deletion:</strong> Request deletion where legally
                  permissible
                </ListItem>
                <ListItem>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications
                </ListItem>
                <ListItem>
                  <strong>Data Portability:</strong> Request transfer of your
                  data
                </ListItem>
                <ListItem>
                  <strong>Restriction:</strong> Request limitation of processing
                </ListItem>
              </List>

              <Content>
                <strong>Note:</strong> Some information cannot be deleted due to
                federal firearms regulations and legal requirements for
                maintaining ATF records.
              </Content>

              <SectionTitle>7. Cookies and Tracking Technologies</SectionTitle>

              <Content>
                We use cookies and similar technologies to enhance your browsing
                experience:
              </Content>
              <List>
                <ListItem>
                  <strong>Essential Cookies:</strong> Required for website
                  functionality
                </ListItem>
                <ListItem>
                  <strong>Performance Cookies:</strong> Help us understand
                  website usage
                </ListItem>
                <ListItem>
                  <strong>Functional Cookies:</strong> Remember your preferences
                </ListItem>
                <ListItem>
                  <strong>Marketing Cookies:</strong> Deliver targeted
                  advertisements
                </ListItem>
              </List>

              <Content>
                You can control cookie settings through your browser
                preferences.
              </Content>

              <SectionTitle>8. Third-Party Links</SectionTitle>

              <Content>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to read their privacy policies before
                providing any personal information.
              </Content>

              <SectionTitle>9. Children's Privacy</SectionTitle>

              <Content>
                Our services are not intended for individuals under 18 years of
                age. We do not knowingly collect personal information from
                children under 18. If we become aware that we have collected
                such information, we will take steps to delete it promptly.
              </Content>

              <SectionTitle>10. State-Specific Rights</SectionTitle>

              <SubSectionTitle>
                10.1 California Residents (CCPA)
              </SubSectionTitle>
              <Content>
                California residents have additional rights under the California
                Consumer Privacy Act (CCPA):
              </Content>
              <List>
                <ListItem>
                  Right to know what personal information is collected
                </ListItem>
                <ListItem>
                  Right to delete personal information (subject to legal
                  exceptions)
                </ListItem>
                <ListItem>
                  Right to opt-out of the sale of personal information
                </ListItem>
                <ListItem>
                  Right to non-discrimination for exercising CCPA rights
                </ListItem>
              </List>

              <SectionTitle>11. International Users</SectionTitle>

              <Content>
                Our services are primarily intended for U.S. residents.
                International users should be aware that their information may
                be transferred to and processed in the United States, where
                privacy laws may differ from their home country.
              </Content>

              <SectionTitle>12. Changes to This Privacy Policy</SectionTitle>

              <Content>
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal requirements. We will notify
                you of material changes by posting the updated policy on our
                website and updating the "Last Updated" date. Your continued use
                of our services after such changes constitutes acceptance of the
                updated policy.
              </Content>

              <ContactInfo>
                <ContactTitle>Contact Information</ContactTitle>
                <Content>
                  If you have questions about this Privacy Policy or wish to
                  exercise your rights, please contact us:
                </Content>
                <ContactDetail>
                  <strong>Email:</strong> privacy@gun-k.com
                </ContactDetail>
                <ContactDetail>
                  <strong>Phone:</strong> (555) 123-GUNS
                </ContactDetail>
                <ContactDetail>
                  <strong>Address:</strong> Gun-k Pro, 123 Main Street, Gun
                  City, State 12345
                </ContactDetail>
                <ContactDetail>
                  <strong>Privacy Officer:</strong> Available Monday-Friday,
                  9:00 AM - 5:00 PM EST
                </ContactDetail>
              </ContactInfo>
            </PolicySection>
          </Container>
        </PolicyContainer>
      </Layout>
    </AppProvider>
  );
};

export default PrivacyPolicyPage;
