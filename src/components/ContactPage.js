import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext.optimized";

const ContactContainer = styled.div`
  padding: 40px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #2c3e50;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 24px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
`;

const ContactIcon = styled.div`
  font-size: 24px;
  min-width: 40px;
`;

const ContactDetails = styled.div`
  h3 {
    margin: 0 0 5px 0;
    color: #2c3e50;
    font-size: 16px;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 14px;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

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
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 18px 36px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  text-align: center;
`;

const HoursInfo = styled.div`
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  h3 {
    margin: 0 0 15px 0;
    color: #27ae60;
    font-size: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    color: #2c3e50;
    font-size: 14px;
  }
`;

export default function ContactPage() {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add message to admin panel
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          ...formData,
          date: new Date().toISOString(),
        },
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <PageTitle>Contact Us</PageTitle>

        <ContactGrid>
          <ContactInfo>
            <SectionTitle>Get in Touch</SectionTitle>

            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <ContactDetails>
                <h3>Phone</h3>
                <p>
                  <a href={`tel:${state.siteSettings.contactInfo.phone}`}>
                    {state.siteSettings.contactInfo.phone}
                  </a>
                </p>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>📧</ContactIcon>
              <ContactDetails>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${state.siteSettings.contactInfo.email}`}>
                    {state.siteSettings.contactInfo.email}
                  </a>
                </p>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactDetails>
                <h3>Address</h3>
                <p>{state.siteSettings.contactInfo.address}</p>
              </ContactDetails>
            </ContactItem>

            <HoursInfo>
              <h3>⏰ Business Hours</h3>
              <ul>
                <li>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li>
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li>
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </HoursInfo>
          </ContactInfo>

          <ContactForm>
            <SectionTitle>Send us a Message</SectionTitle>

            {showSuccess && (
              <SuccessMessage>
                Thank you for your message! We'll get back to you within 24
                hours.
              </SuccessMessage>
            )}

            {showError && (
              <ErrorMessage>
                Sorry, there was an error sending your message. Please try
                again.
              </ErrorMessage>
            )}

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Subject *</Label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Message *</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </SubmitButton>
            </Form>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactContainer>
  );
}
