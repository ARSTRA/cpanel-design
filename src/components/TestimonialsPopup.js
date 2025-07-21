import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideInUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: ${props => props.$isVisible ? '30px' : '-300px'};
  right: 30px;
  width: 380px;
  max-width: calc(100vw - 60px);
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${props => props.$isVisible ? slideInUp : slideOutDown} 0.6s ease-out;
  border: 2px solid rgba(231, 76, 60, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60, #3498db);
    z-index: 1;
  }

  @media (max-width: 768px) {
    right: 15px;
    bottom: ${props => props.isVisible ? '15px' : '-300px'};
    width: calc(100vw - 30px);
    max-width: 350px;
  }

  @media (max-width: 480px) {
    right: 10px;
    bottom: ${props => props.isVisible ? '10px' : '-300px'};
    width: calc(100vw - 20px);
    max-width: 320px;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px;
  border-bottom: 1px solid #e1e8ed;

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .live-indicator {
    width: 8px;
    height: 8px;
    background: #e74c3c;
    border-radius: 50%;
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: #7f8c8d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
`;

const TestimonialContent = styled.div`
  padding: 20px 25px;
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
  font-weight: 600;
  color: white;
  font-size: 18px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #e74c3c, #f39c12, #27ae60, #3498db);
    z-index: -1;
  }
`;

const CustomerDetails = styled.div`
  .name {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 4px;
  }

  .info {
    font-size: 13px;
    color: #7f8c8d;
    margin: 0;
  }
`;

const TestimonialText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 0 0 15px;
  font-style: italic;
  position: relative;

  &::before {
    content: """;
    font-size: 40px;
    position: absolute;
    top: -10px;
    left: -10px;
    color: #e74c3c;
    font-family: Georgia, serif;
  }

  &::after {
    content: """;
    font-size: 40px;
    position: absolute;
    bottom: -25px;
    right: -5px;
    color: #e74c3c;
    font-family: Georgia, serif;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 3px;
  margin-bottom: 12px;

  .star {
    color: #f39c12;
    font-size: 16px;
  }
`;

const PurchaseInfo = styled.div`
  background: #f8f9fa;
  padding: 12px 15px;
  border-radius: 10px;
  border-left: 4px solid #27ae60;

  .product {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 4px;
  }

  .timestamp {
    font-size: 12px;
    color: #7f8c8d;
    margin: 0;
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Michael Rodriguez",
    initials: "MR",
    location: "Houston, TX",
    rating: 5,
    text: "Outstanding service! Gun-k Pro helped me find the perfect Glock 19 for my concealed carry needs. Their expertise and professionalism made the entire process smooth.",
    product: "Glock 19 Gen 5",
    timestamp: "2 minutes ago",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Thompson",
    initials: "ST",
    location: "Dallas, TX",
    rating: 5,
    text: "Exceptional training program! The firearms safety course was comprehensive and the instructors were knowledgeable. Highly recommend Gun-k Pro.",
    product: "Basic Firearms Safety Course",
    timestamp: "5 minutes ago",
    verified: true
  },
  {
    id: 3,
    name: "David Chen",
    initials: "DC",
    location: "Austin, TX",
    rating: 5,
    text: "Best gunsmith services I've ever used. They customized my AR-15 perfectly and the craftsmanship is exceptional. Will definitely return for future needs.",
    product: "Custom AR-15 Build",
    timestamp: "8 minutes ago",
    verified: true
  },
  {
    id: 4,
    name: "Jennifer Wilson",
    initials: "JW",
    location: "San Antonio, TX",
    rating: 5,
    text: "Gun-k Pro's customer service is unmatched. They walked me through every step of my first firearm purchase and made sure I felt confident and informed.",
    product: "Smith & Wesson M&P Shield",
    timestamp: "12 minutes ago",
    verified: true
  },
  {
    id: 5,
    name: "Robert Garcia",
    initials: "RG",
    location: "Fort Worth, TX",
    rating: 5,
    text: "Professional, reliable, and trustworthy. Gun-k Pro has been my go-to FFL dealer for years. Their inventory is extensive and prices are competitive.",
    product: "Daniel Defense DDM4 V7",
    timestamp: "15 minutes ago",
    verified: true
  },
  {
    id: 6,
    name: "Amanda Foster",
    initials: "AF",
    location: "Plano, TX",
    rating: 5,
    text: "The tactical training course exceeded my expectations. Professional instructors and real-world scenarios helped improve my skills significantly.",
    product: "Advanced Tactical Training",
    timestamp: "18 minutes ago",
    verified: true
  }
];

export default function TestimonialsPopup() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Show first testimonial after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => {
        const next = (prev + 1) % testimonials.length;
        return next;
      });
    }, 8000); // Show each testimonial for 8 seconds

    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    // Don't show again for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('testimonialsPopupClosed', 'true');
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Check if user has already closed the popup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasClosed = sessionStorage.getItem('testimonialsPopupClosed');
      if (wasClosed) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible) return null;

  const testimonial = testimonials[currentTestimonial];

  return (
    <PopupContainer 
      isVisible={isVisible}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PopupHeader>
        <div className="title">
          <span className="live-indicator"></span>
          Live Customer Reviews
        </div>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </PopupHeader>

      <TestimonialContent>
        <CustomerInfo>
          <CustomerAvatar>{testimonial.initials}</CustomerAvatar>
          <CustomerDetails>
            <div className="name">{testimonial.name}</div>
            <div className="info">
              {testimonial.location} • Verified Customer
            </div>
          </CustomerDetails>
        </CustomerInfo>

        <RatingStars>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="star">⭐</span>
          ))}
        </RatingStars>

        <TestimonialText>{testimonial.text}</TestimonialText>

        <PurchaseInfo>
          <div className="product">✅ {testimonial.product}</div>
          <div className="timestamp">Purchased {testimonial.timestamp}</div>
        </PurchaseInfo>
      </TestimonialContent>
    </PopupContainer>
  );
}
