import React from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 40px 20px 20px;
  margin-top: 60px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
`;

const FooterSection = styled.div`
  h3 {
    color: #3498db;
    margin-bottom: 20px;
    font-size: 18px;
  }

  p,
  li {
    color: #bdc3c7;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #3498db;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  span {
    font-size: 18px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: #3498db;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  padding-top: 20px;
  text-align: center;

  p {
    color: #7f8c8d;
    margin: 0;
    font-size: 14px;
  }
`;

const LegalNotice = styled.div`
  background: rgba(231, 76, 60, 0.1);
  border-left: 4px solid #e74c3c;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;

  p {
    color: #ecf0f1;
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
`;

export default function Footer() {
  const { state } = useApp();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>🔫 {state.siteSettings.siteName}</h3>
          <p>{state.siteSettings.aboutUs}</p>
          <SocialLinks>
            <SocialLink href="#" title="Facebook">
              📘
            </SocialLink>
            <SocialLink href="#" title="Twitter">
              🐦
            </SocialLink>
            <SocialLink href="#" title="Instagram">
              📷
            </SocialLink>
            <SocialLink href="#" title="YouTube">
              📺
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/handguns">Handguns</a>
            </li>
            <li>
              <a href="/rifles">Rifles</a>
            </li>
            <li>
              <a href="/shotguns">Shotguns</a>
            </li>
            <li>
              <a href="/accessories">Accessories</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Information</h3>
          <ContactInfo>
            <span>📧</span>
            <a href={`mailto:${state.siteSettings.contactInfo.email}`}>
              {state.siteSettings.contactInfo.email}
            </a>
          </ContactInfo>
          <ContactInfo>
            <span>📞</span>
            <a href={`tel:${state.siteSettings.contactInfo.phone}`}>
              {state.siteSettings.contactInfo.phone}
            </a>
          </ContactInfo>
          <ContactInfo>
            <span>📍</span>
            <span>{state.siteSettings.contactInfo.address}</span>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Legal & Policies</h3>
          <ul>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/shipping">Shipping Policy</a>
            </li>
            <li>
              <a href="/returns">Return Policy</a>
            </li>
            <li>
              <a href="/ffl">FFL Transfer</a>
            </li>
          </ul>
        </FooterSection>
      </FooterContent>

      <LegalNotice>
        <p>
          ⚠️ IMPORTANT: All firearms sales are subject to federal, state, and
          local laws. Background checks required. Must be 18+ for long guns, 21+
          for handguns. We reserve the right to refuse any sale.
        </p>
      </LegalNotice>

      <FooterBottom>
        <p>{state.siteSettings.footerText}</p>
        <p>© 2024 {state.siteSettings.siteName}. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
}
