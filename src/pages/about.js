import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext.optimized";

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 80px;
  padding: 60px 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  color: #ecf0f1;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContentSection = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12);
    border-radius: 2px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 50px;
`;

const ContentCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;

const CardContent = styled.p`
  color: #7f8c8d;
  line-height: 1.8;
  text-align: center;
`;

const MainContent = styled.div`
  background: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 25px;
  text-align: justify;

  &:first-of-type {
    font-size: 20px;
    font-weight: 500;
    color: #2c3e50;
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid #3498db;
  padding: 30px;
  margin: 40px 0;
  border-radius: 8px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin: 50px 0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border-radius: 12px;
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export default function AboutPage() {
  const { state } = useApp();

  return (
    <Layout>
      <AboutContainer>
        <HeroSection>
          <HeroTitle>About {state.siteSettings.siteName}</HeroTitle>
          <HeroSubtitle>
            Excellence Through Experience, Trust Through Transparency
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <MainContent>
            <Paragraph>{state.siteSettings.aboutUs}</Paragraph>

            <Paragraph>
              Since our founding in 2004, Gun-k Pro has earned recognition as
              one of America's most trusted firearms retailers through an
              unwavering commitment to excellence, integrity, and customer
              satisfaction. Our state-of-the-art facility spans over 15,000
              square feet, featuring climate-controlled storage, advanced
              security systems, and dedicated areas for gunsmithing, training,
              and customer consultation.
            </Paragraph>

            <Paragraph>
              Our team of certified firearms specialists brings over 150 years
              of combined experience to every customer interaction. Each team
              member undergoes rigorous training in firearms safety, legal
              compliance, and product expertise, ensuring that every customer
              receives accurate information and professional guidance tailored
              to their specific needs and experience level.
            </Paragraph>

            <HighlightBox>
              <Paragraph
                style={{
                  marginBottom: 0,
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: "18px",
                }}
              >
                "At Gun-k Pro, we don't just sell firearms – we build
                relationships founded on trust, expertise, and shared respect
                for the Second Amendment. Every customer is treated as a valued
                member of our community."
              </Paragraph>
            </HighlightBox>
          </MainContent>

          <StatGrid>
            <StatCard>
              <StatNumber>20+</StatNumber>
              <StatLabel>Years of Excellence</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50K+</StatNumber>
              <StatLabel>Satisfied Customers</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>2,500+</StatNumber>
              <StatLabel>Products Available</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>99.8%</StatNumber>
              <StatLabel>Customer Satisfaction</StatLabel>
            </StatCard>
          </StatGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Our Core Values</SectionTitle>
          <ContentGrid>
            <ContentCard>
              <CardIcon>🛡️</CardIcon>
              <CardTitle>Safety First</CardTitle>
              <CardContent>
                Safety is paramount in everything we do. From secure storage
                protocols to comprehensive safety training, we maintain the
                highest standards to protect our customers, community, and team
                members.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>⚖️</CardIcon>
              <CardTitle>Legal Compliance</CardTitle>
              <CardContent>
                We strictly adhere to all federal, state, and local regulations.
                Our compliance team stays current with evolving legislation to
                ensure every transaction meets the highest legal standards.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>🎯</CardIcon>
              <CardTitle>Expert Knowledge</CardTitle>
              <CardContent>
                Our team's deep expertise spans hunting, competitive shooting,
                law enforcement, and military applications. We provide informed
                guidance to help customers make confident decisions.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>🤝</CardIcon>
              <CardTitle>Customer Service</CardTitle>
              <CardContent>
                Every customer receives personalized attention from
                knowledgeable professionals who take time to understand their
                unique needs and provide tailored solutions.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>🏆</CardIcon>
              <CardTitle>Quality Products</CardTitle>
              <CardContent>
                We partner exclusively with renowned manufacturers known for
                their commitment to quality, reliability, and innovation. Every
                product meets our stringent standards.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>🌟</CardIcon>
              <CardTitle>Community Focus</CardTitle>
              <CardContent>
                As active members of the firearms community, we support local
                shooting sports, hunter education programs, and Second Amendment
                advocacy initiatives.
              </CardContent>
            </ContentCard>
          </ContentGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Professional Services</SectionTitle>
          <ContentGrid>
            <ContentCard>
              <CardIcon>🔧</CardIcon>
              <CardTitle>Expert Gunsmithing</CardTitle>
              <CardContent>
                Our certified gunsmiths provide comprehensive services including
                custom builds, precision accurizing, restoration work, and
                routine maintenance to keep your firearms performing at their
                best.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>📋</CardIcon>
              <CardTitle>FFL Transfer Services</CardTitle>
              <CardContent>
                Streamlined FFL transfer services with competitive rates and
                expedited processing. We handle all paperwork and compliance
                requirements for hassle-free transactions.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>🎓</CardIcon>
              <CardTitle>Training & Education</CardTitle>
              <CardContent>
                Comprehensive training programs for all skill levels, from basic
                firearms safety to advanced tactical applications, led by
                certified instructors with real-world experience.
              </CardContent>
            </ContentCard>

            <ContentCard>
              <CardIcon>💰</CardIcon>
              <CardTitle>Financing Options</CardTitle>
              <CardContent>
                Flexible financing solutions to make quality firearms and
                equipment accessible. We offer competitive rates and streamlined
                approval processes for qualified customers.
              </CardContent>
            </ContentCard>
          </ContentGrid>
        </ContentSection>
      </AboutContainer>
    </Layout>
  );
}
