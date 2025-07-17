import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../components/Layout";

const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const LegalContainer = styled.div`
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
  animation: gradientShift 20s ease infinite;
  padding: 0;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  animation:
    ${fadeIn} 1s ease-out,
    ${float} 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 30px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #fff, #f0f0f0, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 40px;
  line-height: 1.7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroImageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
  position: relative;
  z-index: 2;
`;

const HeroImage = styled.div`
  width: 80px;
  height: 80px;
  background: ${(props) => props.bg || "rgba(255, 255, 255, 0.2)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto;
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const NavigationSection = styled.div`
  background: rgba(255, 255, 255, 0.12);
  padding: 30px;
  border-radius: 25px;
  margin-bottom: 40px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  animation: ${fadeIn} 1s ease-out 0.3s both;
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const NavButton = styled.button`
  padding: 20px 30px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #f093fb, #667eea)"
      : "rgba(255, 255, 255, 0.15)"};
  color: white;
  border: 2px solid
    ${(props) => (props.active ? "#f093fb" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: linear-gradient(135deg, #f093fb, #667eea);
    border-color: #f093fb;
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(240, 147, 251, 0.4);
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 50px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out 0.6s both;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(
      90deg,
      #667eea,
      #764ba2,
      #f093fb,
      #f5576c,
      #4facfe
    );
  }

  @media (max-width: 768px) {
    padding: 35px 25px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
`;

const SectionImage = styled.div`
  width: 120px;
  height: 120px;
  background: ${(props) => props.bg};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

const SectionInfo = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 15px;
  color: #2c3e50;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
  font-weight: 500;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ContentBlock = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 15px;
  border-left: 5px solid ${(props) => props.accent || "#3498db"};

  h3 {
    color: ${(props) => props.accent || "#3498db"};
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p,
  li {
    color: #2c3e50;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 20px;
  }

  strong {
    color: #e74c3c;
    font-weight: 700;
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, #f093fb, #667eea);
  color: white;
  padding: 25px;
  border-radius: 15px;
  margin: 30px 0;
  text-align: center;
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.3);

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    opacity: 0.95;
    line-height: 1.6;
  }
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, #00b894, #4facfe);
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin-top: 40px;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    opacity: 0.95;
  }

  a {
    color: #fdcb6e;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LegalPage = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "🔐",
      bg: "linear-gradient(135deg, #667eea, #764ba2)",
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: "📋",
      bg: "linear-gradient(135deg, #f093fb, #f5576c)",
    },
    {
      id: "shipping",
      title: "Shipping Policy",
      icon: "🚚",
      bg: "linear-gradient(135deg, #4facfe, #00f2fe)",
    },
    {
      id: "returns",
      title: "Return Policy",
      icon: "↩️",
      bg: "linear-gradient(135deg, #ff0844, #ff6b6b)",
    },
    {
      id: "ffl",
      title: "FFL Transfer",
      icon: "🏛️",
      bg: "linear-gradient(135deg, #00b894, #55a3ff)",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "privacy":
        return (
          <ContentSection>
            <SectionHeader>
              <SectionImage bg="linear-gradient(135deg, #667eea, #764ba2)">
                🔐
              </SectionImage>
              <SectionInfo>
                <SectionTitle>Privacy Policy</SectionTitle>
                <SectionSubtitle>
                  Your privacy is our priority. Learn how we protect and handle
                  your personal information.
                </SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <ContentGrid columns="1fr 1fr">
              <ContentBlock accent="#667eea">
                <h3>🛡️ Information We Collect</h3>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, address, phone
                    number, email, and date of birth
                  </li>
                  <li>
                    <strong>Background Check Data:</strong> Required for federal
                    compliance and FFL transfers
                  </li>
                  <li>
                    <strong>Purchase History:</strong> Transaction records for
                    warranty and compliance purposes
                  </li>
                  <li>
                    <strong>Website Usage:</strong> Cookies and analytics for
                    improved user experience
                  </li>
                </ul>
              </ContentBlock>

              <ContentBlock accent="#764ba2">
                <h3>🎯 How We Use Your Information</h3>
                <ul>
                  <li>Process firearm purchases and FFL transfers</li>
                  <li>Conduct required federal background checks</li>
                  <li>Provide customer support and order updates</li>
                  <li>Send promotional materials (with your consent)</li>
                  <li>Comply with federal and state regulations</li>
                </ul>
              </ContentBlock>
            </ContentGrid>

            <HighlightBox>
              <h4>🔒 Secure Data Protection</h4>
              <p>
                We use industry-standard encryption and security measures to
                protect your sensitive information. All background check data is
                handled in strict compliance with federal regulations.
              </p>
            </HighlightBox>

            <ContentGrid>
              <ContentBlock accent="#3498db">
                <h3>👥 Information Sharing</h3>
                <p>We share your information only when:</p>
                <ul>
                  <li>
                    <strong>Required by Law:</strong> ATF, FBI, and state
                    authorities for background checks
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Shipping companies,
                    payment processors (encrypted)
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Court orders, subpoenas,
                    or law enforcement requests
                  </li>
                  <li>
                    <strong>Never for Marketing:</strong> We do not sell
                    personal information to third parties
                  </li>
                </ul>
              </ContentBlock>
            </ContentGrid>
          </ContentSection>
        );

      case "terms":
        return (
          <ContentSection>
            <SectionHeader>
              <SectionImage bg="linear-gradient(135deg, #f093fb, #f5576c)">
                📋
              </SectionImage>
              <SectionInfo>
                <SectionTitle>Terms of Service</SectionTitle>
                <SectionSubtitle>
                  Legal terms and conditions governing your use of our services
                  and purchases.
                </SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <ContentGrid columns="1fr 1fr">
              <ContentBlock accent="#f093fb">
                <h3>✅ Eligibility Requirements</h3>
                <ul>
                  <li>
                    <strong>Age:</strong> 18+ for long guns, 21+ for handguns
                  </li>
                  <li>
                    <strong>Legal Status:</strong> Must pass federal background
                    check
                  </li>
                  <li>
                    <strong>Residency:</strong> Valid government-issued ID
                    required
                  </li>
                  <li>
                    <strong>Compliance:</strong> Must comply with all federal,
                    state, and local laws
                  </li>
                </ul>
              </ContentBlock>

              <ContentBlock accent="#f5576c">
                <h3>⚖️ Legal Obligations</h3>
                <ul>
                  <li>All sales subject to successful background check</li>
                  <li>Customer responsible for knowing local laws</li>
                  <li>False information on forms is a federal crime</li>
                  <li>Straw purchases are strictly prohibited</li>
                </ul>
              </ContentBlock>
            </ContentGrid>

            <HighlightBox>
              <h4>🚨 Important Legal Notice</h4>
              <p>
                Federal law requires all firearm purchasers to complete ATF Form
                4473. Providing false information is a felony punishable by up
                to 10 years in prison and $250,000 fine.
              </p>
            </HighlightBox>

            <ContentGrid>
              <ContentBlock accent="#e74c3c">
                <h3>🔄 Order Processing</h3>
                <p>Order acceptance is subject to:</p>
                <ul>
                  <li>Product availability and inventory verification</li>
                  <li>Successful payment processing</li>
                  <li>Compliance with all applicable laws</li>
                  <li>Completion of required background checks</li>
                  <li>Right to refuse any sale at our discretion</li>
                </ul>
              </ContentBlock>
            </ContentGrid>
          </ContentSection>
        );

      case "shipping":
        return (
          <ContentSection>
            <SectionHeader>
              <SectionImage bg="linear-gradient(135deg, #4facfe, #00f2fe)">
                🚚
              </SectionImage>
              <SectionInfo>
                <SectionTitle>Shipping Policy</SectionTitle>
                <SectionSubtitle>
                  Fast, secure, and compliant shipping to your chosen FFL
                  dealer.
                </SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <ContentGrid columns="1fr 1fr">
              <ContentBlock accent="#4facfe">
                <h3>📦 Firearm Shipping</h3>
                <ul>
                  <li>
                    <strong>FFL to FFL Only:</strong> All firearms shipped to
                    licensed dealers
                  </li>
                  <li>
                    <strong>Secure Packaging:</strong> Discreet, tamper-evident
                    packaging
                  </li>
                  <li>
                    <strong>Insured Shipping:</strong> Full value insurance
                    included
                  </li>
                  <li>
                    <strong>Tracking:</strong> Real-time tracking provided
                  </li>
                </ul>
              </ContentBlock>

              <ContentBlock accent="#00f2fe">
                <h3>⏱️ Processing Times</h3>
                <ul>
                  <li>
                    <strong>In-Stock Items:</strong> 1-2 business days
                  </li>
                  <li>
                    <strong>Special Orders:</strong> 5-10 business days
                  </li>
                  <li>
                    <strong>Custom Work:</strong> 2-4 weeks
                  </li>
                  <li>
                    <strong>Accessories:</strong> Same day (if ordered by 2 PM)
                  </li>
                </ul>
              </ContentBlock>
            </ContentGrid>

            <HighlightBox>
              <h4>🎯 Free Shipping Available</h4>
              <p>
                Enjoy free shipping on orders over $500. Express shipping
                available for urgent orders with additional fees.
              </p>
            </HighlightBox>

            <ContentGrid>
              <ContentBlock accent="#27ae60">
                <h3>🌎 Shipping Locations</h3>
                <p>We ship to all 50 states with the following requirements:</p>
                <ul>
                  <li>Must have valid FFL dealer in destination state</li>
                  <li>Compliance with state and local laws</li>
                  <li>Some items restricted in certain states</li>
                  <li>Customer responsible for state-specific requirements</li>
                </ul>
              </ContentBlock>
            </ContentGrid>
          </ContentSection>
        );

      case "returns":
        return (
          <ContentSection>
            <SectionHeader>
              <SectionImage bg="linear-gradient(135deg, #ff0844, #ff6b6b)">
                ↩️
              </SectionImage>
              <SectionInfo>
                <SectionTitle>Return Policy</SectionTitle>
                <SectionSubtitle>
                  Fair and transparent return policy to ensure your
                  satisfaction.
                </SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <ContentGrid columns="1fr 1fr">
              <ContentBlock accent="#ff0844">
                <h3>✅ Returnable Items</h3>
                <ul>
                  <li>
                    <strong>Unfired Firearms:</strong> 7-day return window
                  </li>
                  <li>
                    <strong>Accessories:</strong> 30-day return window
                  </li>
                  <li>
                    <strong>Unopened Ammunition:</strong> 30-day return window
                  </li>
                  <li>
                    <strong>Defective Items:</strong> Manufacturer warranty
                    applies
                  </li>
                </ul>
              </ContentBlock>

              <ContentBlock accent="#ff6b6b">
                <h3>❌ Non-Returnable Items</h3>
                <ul>
                  <li>Fired or used firearms</li>
                  <li>Custom or special order items</li>
                  <li>Opened ammunition or powder</li>
                  <li>Items damaged by customer misuse</li>
                </ul>
              </ContentBlock>
            </ContentGrid>

            <HighlightBox>
              <h4>📋 Return Process</h4>
              <p>
                Contact us within the return window for authorization. All
                returns must include original packaging and be in new, unfired
                condition.
              </p>
            </HighlightBox>

            <ContentGrid>
              <ContentBlock accent="#e67e22">
                <h3>💰 Refund Information</h3>
                <ul>
                  <li>
                    <strong>Refund Method:</strong> Original payment method
                  </li>
                  <li>
                    <strong>Processing Time:</strong> 5-7 business days
                  </li>
                  <li>
                    <strong>Return Shipping:</strong> Customer responsibility
                    (unless defective)
                  </li>
                  <li>
                    <strong>Restocking Fee:</strong> 15% on special orders
                  </li>
                  <li>
                    <strong>Transfer Fees:</strong> Non-refundable
                  </li>
                </ul>
              </ContentBlock>
            </ContentGrid>
          </ContentSection>
        );

      case "ffl":
        return (
          <ContentSection>
            <SectionHeader>
              <SectionImage bg="linear-gradient(135deg, #00b894, #55a3ff)">
                🏛️
              </SectionImage>
              <SectionInfo>
                <SectionTitle>FFL Transfer Services</SectionTitle>
                <SectionSubtitle>
                  Professional federal firearms license transfer services with
                  expert guidance.
                </SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <ContentGrid columns="1fr 1fr">
              <ContentBlock accent="#00b894">
                <h3>📄 Required Documents</h3>
                <ul>
                  <li>
                    <strong>Government ID:</strong> Valid driver's license or
                    state ID
                  </li>
                  <li>
                    <strong>ATF Form 4473:</strong> Completed at our location
                  </li>
                  <li>
                    <strong>Background Check:</strong> Processed through NICS
                    system
                  </li>
                  <li>
                    <strong>Proof of Residency:</strong> If required by state
                    law
                  </li>
                </ul>
              </ContentBlock>

              <ContentBlock accent="#55a3ff">
                <h3>💲 Transfer Fees</h3>
                <ul>
                  <li>
                    <strong>Standard Transfer:</strong> $25 per firearm
                  </li>
                  <li>
                    <strong>Multiple Items:</strong> $20 each (same transaction)
                  </li>
                  <li>
                    <strong>Background Check:</strong> State fees may apply
                  </li>
                  <li>
                    <strong>Storage:</strong> Free for 30 days, $5/day after
                  </li>
                </ul>
              </ContentBlock>
            </ContentGrid>

            <HighlightBox>
              <h4>⏰ Transfer Process Timeline</h4>
              <p>
                Most transfers completed in 15-30 minutes. Delays possible due
                to background check system load or incomplete information.
              </p>
            </HighlightBox>

            <ContentGrid>
              <ContentBlock accent="#9b59b6">
                <h3>🔍 Background Check Process</h3>
                <p>
                  Federal law requires background checks for all firearm
                  transfers:
                </p>
                <ul>
                  <li>Instant check through FBI NICS system</li>
                  <li>Possible outcomes: Proceed, Deny, or Delay</li>
                  <li>Delayed checks may take up to 3 business days</li>
                  <li>Customer notified of status updates</li>
                  <li>Denied transfers cannot be completed</li>
                </ul>
              </ContentBlock>
            </ContentGrid>
          </ContentSection>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <LegalContainer>
        <Container>
          <HeroSection>
            <Title>Legal & Policies</Title>
            <Subtitle>
              Comprehensive legal information, policies, and procedures to
              ensure transparent, compliant, and professional service for all
              our customers.
            </Subtitle>
            <HeroImageSection>
              <HeroImage
                bg="linear-gradient(135deg, #667eea, #764ba2)"
                delay="0s"
              >
                ⚖️
              </HeroImage>
              <HeroImage
                bg="linear-gradient(135deg, #f093fb, #f5576c)"
                delay="0.2s"
              >
                🛡️
              </HeroImage>
              <HeroImage
                bg="linear-gradient(135deg, #4facfe, #00f2fe)"
                delay="0.4s"
              >
                📋
              </HeroImage>
              <HeroImage
                bg="linear-gradient(135deg, #ff0844, #ff6b6b)"
                delay="0.6s"
              >
                🤝
              </HeroImage>
            </HeroImageSection>
          </HeroSection>

          <NavigationSection>
            <NavigationGrid>
              {sections.map((section) => (
                <NavButton
                  key={section.id}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span>{section.icon}</span>
                  {section.title}
                </NavButton>
              ))}
            </NavigationGrid>
          </NavigationSection>

          {renderContent()}

          <ContactInfo>
            <h3>📞 Questions About Our Policies?</h3>
            <p>
              Our knowledgeable team is here to help with any questions about
              our legal policies or procedures.
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:(555) 123-4567">(555) 123-4567</a> |
              <strong> Email:</strong>{" "}
              <a href="mailto:info@gun-k-pro.com">info@gun-k-pro.com</a>
            </p>
            <p>
              <strong>Hours:</strong> Monday-Friday 9AM-6PM, Saturday 9AM-5PM
            </p>
          </ContactInfo>
        </Container>
      </LegalContainer>
    </Layout>
  );
};

export default LegalPage;

export const Head = () => <title>Legal & Policies | Gun-k Pro</title>;
