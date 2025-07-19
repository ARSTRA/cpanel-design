import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s ease-out;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.4s ease-out;
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
    max-width: 350px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const TestimonialImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TestimonialQuote = styled.blockquote`
  font-size: 18px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 0 0 25px 0;
  font-style: italic;
  position: relative;

  &::before {
    content: ""
      ";
    font-size: 48px;
    color: #e74c3c;
    position: absolute;
    top: -10px;
    left: -20px;
    font-family: Georgia, serif;
  }

  &::after {
    content: "
      "";
    font-size: 48px;
    color: #e74c3c;
    position: absolute;
    bottom: -20px;
    right: -10px;
    font-family: Georgia, serif;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 16px;
`;

const TestimonialTitle = styled.div`
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 20px;
`;

const RatingStars = styled.div`
  color: #f39c12;
  font-size: 20px;
  margin-bottom: 15px;
`;

const testimonials = [
  {
    id: 1,
    name: "Marcus Thompson",
    title: "Law Enforcement Officer",
    image: "https://images.pexels.com/photos/7714703/pexels-photo-7714703.jpeg",
    quote:
      "Gun-k Pro has been my go-to source for duty weapons and training equipment for over 5 years. Their expertise in law enforcement needs is unmatched, and their customer service is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    title: "Competitive Shooter",
    image:
      "https://images.pexels.com/photos/33002840/pexels-photo-33002840.jpeg",
    quote:
      "As a competitive shooter, precision is everything. Gun-k Pro consistently delivers top-quality firearms and accessories that give me the edge I need in competition. Their knowledge of the sport is incredible.",
    rating: 5,
  },
  {
    id: 3,
    name: "James Rodriguez",
    title: "Military Veteran",
    image: "https://images.pexels.com/photos/7468241/pexels-photo-7468241.jpeg",
    quote:
      "After serving 15 years in the military, I know quality when I see it. Gun-k Pro's selection of tactical equipment and their understanding of military standards sets them apart from the competition.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    title: "Hunting Enthusiast",
    image:
      "https://images.pexels.com/photos/30767572/pexels-photo-30767572.jpeg",
    quote:
      "I've been hunting for 20 years, and Gun-k Pro has everything I need for successful hunts. From rifles to optics, their products are reliable and their staff knows hunting inside and out.",
    rating: 5,
  },
  {
    id: 5,
    name: "Robert Anderson",
    title: "Firearms Instructor",
    image:
      "https://images.pexels.com/photos/32145233/pexels-photo-32145233.jpeg",
    quote:
      "I recommend Gun-k Pro to all my students. Their commitment to safety, legal compliance, and quality education makes them the perfect partner for responsible firearms ownership.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emily Foster",
    title: "Sport Shooter",
    image: "https://images.pexels.com/photos/6620343/pexels-photo-6620343.jpeg",
    quote:
      "Whether I'm practicing archery or firearms, Gun-k Pro has the equipment I need. Their sports division understands the precision requirements of competitive shooting sports.",
    rating: 5,
  },
];

export default function TestimonialPopup({ isVisible, onClose }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const testimonial = testimonials[currentTestimonial];

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <TestimonialImage>
          <img
            src={testimonial.image}
            alt={testimonial.name}
            onError={(e) => {
              e.target.style.display = "none";
              const parent = e.target.parentElement;
              parent.style.background =
                "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)";
              parent.innerHTML =
                '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 24px;">👤</div>';
            }}
          />
        </TestimonialImage>

        <RatingStars>{"★".repeat(testimonial.rating)}</RatingStars>

        <TestimonialQuote>{testimonial.quote}</TestimonialQuote>

        <TestimonialAuthor>{testimonial.name}</TestimonialAuthor>
        <TestimonialTitle>{testimonial.title}</TestimonialTitle>
      </PopupContainer>
    </PopupOverlay>
  );
}
