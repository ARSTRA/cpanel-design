import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
`;

const PopupContent = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 0;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s ease-out;
`;

const PopupHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 25px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopupTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const PopupBody = styled.div`
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  max-height: 60vh;
  overflow-y: auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-left: 4px solid #667eea;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const CustomerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.h4`
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
`;

const CustomerLocation = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
`;

const Rating = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 15px;
`;

const Star = styled.span`
  color: ${(props) => (props.$filled ? "#f39c12" : "#e1e8ed")};
  font-size: 16px;
`;

const TestimonialText = styled.p`
  color: #34495e;
  line-height: 1.6;
  margin: 0 0 15px 0;
  font-style: italic;
`;

const TestimonialCategory = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
`;

const testimonials = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    location: "Texas",
    avatar: "MR",
    rating: 5,
    category: "Delivery",
    text: "Outstanding delivery service! My order arrived within 2 days, perfectly packaged and exactly as described. Gun-k Pro's shipping process is top-notch and very professional.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Florida",
    avatar: "SJ",
    rating: 5,
    category: "Records",
    text: "Impressed with their record keeping. All my purchase history is meticulously maintained, and they handle all FFL transfers with complete transparency and professionalism.",
  },
  {
    id: 3,
    name: "David Chen",
    location: "California",
    avatar: "DC",
    rating: 5,
    category: "Customer Service",
    text: "Exceptional customer service! The team is knowledgeable, responsive, and goes above and beyond to ensure customer satisfaction. Highly recommend Gun-k Pro.",
  },
  {
    id: 4,
    name: "Jennifer Miller",
    location: "Arizona",
    avatar: "JM",
    rating: 5,
    category: "Product Quality",
    text: "The quality of firearms and ammunition is exactly as advertised. Every product I've purchased has exceeded expectations. Their quality control is outstanding.",
  },
  {
    id: 5,
    name: "Robert Thompson",
    location: "Nevada",
    avatar: "RT",
    rating: 5,
    category: "Delivery",
    text: "Fast and secure delivery every time. Their packaging is professional and discreet. I've never had any issues with shipping or handling.",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    location: "Georgia",
    avatar: "LA",
    rating: 4,
    category: "Records",
    text: "Great attention to detail with documentation. All paperwork is handled professionally and they maintain excellent records for compliance purposes.",
  },
];

const stats = [
  { number: "4.9", label: "Average Rating" },
  { number: "10K+", label: "Happy Customers" },
  { number: "99.8%", label: "On-Time Delivery" },
  { number: "24/7", label: "Customer Support" },
];

export default function TestimonialsPopup({ isOpen, onClose }) {
  const currentTestimonials = testimonials.slice(0, 6);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <PopupHeader>
          <PopupTitle>⭐ Customer Testimonials</PopupTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </PopupHeader>

        <PopupBody>
          <TestimonialsGrid>
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id}>
                <CustomerInfo>
                  <CustomerAvatar>{testimonial.avatar}</CustomerAvatar>
                  <CustomerDetails>
                    <CustomerName>{testimonial.name}</CustomerName>
                    <CustomerLocation>{testimonial.location}</CustomerLocation>
                  </CustomerDetails>
                </CustomerInfo>

                <Rating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} $filled={star <= testimonial.rating}>
                      ⭐
                    </Star>
                  ))}
                </Rating>

                <TestimonialText>"{testimonial.text}"</TestimonialText>

                <TestimonialCategory>
                  {testimonial.category}
                </TestimonialCategory>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>

          <StatsSection>
            <h3
              style={{
                color: "#2c3e50",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Our Track Record
            </h3>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatItem key={index}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsGrid>
          </StatsSection>
        </PopupBody>
      </PopupContent>
    </PopupOverlay>
  );
}
