import React from "react";
import styled from "styled-components";
import { Link, navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";
import TestimonialsPopup from "./TestimonialsPopup";

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 73, 94, 0.9)),
    linear-gradient(
      45deg,
      #2c3e50 0%,
      #34495e 25%,
      #2c3e50 50%,
      #34495e 75%,
      #2c3e50 100%
    );
  background-size:
    cover,
    40px 40px;
  background-position:
    center,
    0 0;
  background-attachment: fixed;
  padding: 140px 20px 100px;
  text-align: center;
  color: white;
  position: relative;

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
      rgba(255, 255, 255, 0.02) 50%,
      transparent 70%
    );
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    gap: 30px;
    padding: 0 10px;
  }
`;

const HeroTextContent = styled.div`
  z-index: 2;
  position: relative;

  @media (max-width: 1024px) {
    order: 2;
  }
`;

const HeroImageGallery = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 25px;
  z-index: 2;

  @media (max-width: 1024px) {
    order: 1;
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 280px;
  }
`;

const ImageSlider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const SlideImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 1.5s ease-in-out;
  background: linear-gradient(
    135deg,
    rgba(44, 62, 80, 0.3) 0%,
    rgba(231, 76, 60, 0.2) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1.1) contrast(1.1) saturate(1.05);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.2) 0%,
      rgba(231, 76, 60, 0.1) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    z-index: 1;
  }

  &::after {
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
    transform: translateX(-100%);
    animation: shimmer 4s infinite;
    z-index: 2;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  border-radius: 12px;
  color: white;
  z-index: 3;

  .title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 5px;
  }

  .description {
    font-size: 13px;
    opacity: 0.9;
    margin: 0;
  }
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.2);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  color: #ecf0f1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 18px 36px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 42px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 700;
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

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 20px;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const ProductsSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 25% 25%,
        rgba(52, 152, 219, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(155, 89, 182, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 2px solid rgba(231, 76, 60, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 25px 50px rgba(231, 76, 60, 0.2);
    border-color: rgba(231, 76, 60, 0.3);
  }

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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(231, 76, 60, 0.02) 0%,
      rgba(52, 152, 219, 0.02) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ProductImage = styled.div`
  height: 320px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: #7f8c8d;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    filter: brightness(1.05) contrast(1.05) saturate(1.1);
  }

  &:hover img {
    transform: scale(1.1);
    filter: brightness(1.1) contrast(1.1) saturate(1.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.1) 0%,
      rgba(231, 76, 60, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.15) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.8s;
    z-index: 2;
  }

  ${ProductCard}:hover &::after {
    transform: translateX(100%);
  }
`;

const ProductBadges = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
`;

const ManufacturerBadge = styled.div`
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 73, 94, 0.9));
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const CategoryTag = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
`;

const ProductInfo = styled.div`
  padding: 35px 30px 30px;
  position: relative;
  z-index: 1;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    color: #e74c3c;
    transition: color 0.3s ease;
  }
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #27ae60;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .original-price {
    font-size: 19px;
    color: #95a5a6;
    text-decoration: line-through;
    font-weight: 500;
  }

  .discount {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  }
`;

const ProductDescription = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  text-align: justify;
`;

const ProductSpecs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border: 1px solid rgba(231, 76, 60, 0.1);
`;

const SpecItem = styled.div`
  text-align: center;
  flex: 1;

  .spec-label {
    font-size: 11px;
    color: #7f8c8d;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .spec-value {
    font-size: 13px;
    color: #2c3e50;
    font-weight: 700;
  }
`;

const ProductButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #a93226 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 50%, #8e2d23 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(231, 76, 60, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const AboutSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 20% 20%,
        rgba(52, 152, 219, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(231, 76, 60, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
`;

const AboutTextContent = styled.div`
  @media (max-width: 1024px) {
    order: 2;
  }
`;

const AboutTitle = styled.h2`
  font-size: 42px;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 700;
  line-height: 1.2;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12);
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    text-align: center;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const AboutDescription = styled.div`
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;

  p {
    margin-bottom: 20px;
  }

  .highlight {
    color: #e74c3c;
    font-weight: 600;
  }

  .experience {
    background: linear-gradient(135deg, #e74c3c10, #f39c1210);
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #e74c3c;
    margin: 25px 0;
    font-style: italic;
  }
`;

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #e74c3c;
  margin-bottom: 10px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AboutImageContainer = styled.div`
  position: relative;
  @media (max-width: 1024px) {
    order: 1;
  }
`;

const AboutMainImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.1) 0%,
      rgba(231, 76, 60, 0.1) 100%
    );
  }
`;

const AboutSecondaryImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SecondaryImage = styled.div`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
`;

const ExpertiseCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  border: 1px solid rgba(231, 76, 60, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60);
  }
`;

const ExpertiseTitle = styled.h3`
  color: #2c3e50;
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ExpertiseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 8px 0;
    color: #555;
    position: relative;
    padding-left: 25px;

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
      font-size: 16px;
    }
  }
`;

const CategorySection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 30% 30%,
        rgba(231, 76, 60, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 70%,
        rgba(52, 152, 219, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const CategoryCard = styled(Link)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  border: 2px solid rgba(231, 76, 60, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 15px 40px rgba(231, 76, 60, 0.15);
    border-color: rgba(231, 76, 60, 0.2);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60, #3498db, #9b59b6);
    z-index: 1;
  }
`;

const CategoryImage = styled.div`
  height: 250px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    filter: brightness(1.1) contrast(1.1) saturate(1.05);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.4) 0%,
      rgba(231, 76, 60, 0.2) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.8s;
    z-index: 2;
  }

  ${CategoryCard}:hover &::before {
    opacity: 0.4;
  }

  ${CategoryCard}:hover &::after {
    transform: translateX(100%);
  }

  ${CategoryCard}:hover img {
    transform: scale(1.15);
    filter: brightness(1.2) contrast(1.2) saturate(1.1);
  }
`;

const CategoryName = styled.h3`
  padding: 25px 20px 12px;
  margin: 0;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;

  ${CategoryCard}:hover & {
    color: #e74c3c;
    transition: color 0.3s ease;
  }
`;

const CategoryDescription = styled.p`
  padding: 0 20px 25px;
  margin: 0;
  color: #7f8c8d;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  position: relative;
  z-index: 2;

  ${CategoryCard}:hover & {
    color: #555;
    transition: color 0.3s ease;
  }
`;

export default function HomePage() {
  const { state, dispatch } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    {
      src: "https://images.pexels.com/photos/3777562/pexels-photo-3777562.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Professional Training Excellence",
      description: "Expert firearms instruction by certified NRA professionals"
    },
    {
      src: "https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Team Collaboration",
      description: "Dedicated professionals working together for your safety"
    },
    {
      src: "https://images.pexels.com/photos/6121966/pexels-photo-6121966.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Premium Firearms Collection",
      description: "Curated selection from trusted manufacturers"
    },
    {
      src: "https://images.pexels.com/photos/3084333/pexels-photo-3084333.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Expert Gunsmith Services",
      description: "Precision craftsmanship and custom modifications"
    },
    {
      src: "https://images.pexels.com/photos/17266185/pexels-photo-17266185.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Tactical Equipment",
      description: "Professional-grade gear for law enforcement and civilians"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const featuredProducts = state.products.filter(
    (product) => product.featured && product.displayLocation.includes("home"),
  );

  const categories = [
    {
      name: "Handguns",
      icon: "https://images.pexels.com/photos/6121966/pexels-photo-6121966.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      path: "/handguns",
      color: "#e74c3c",
      description: "Pistols & Revolvers",
    },
    {
      name: "Rifles",
      icon: "https://images.pexels.com/photos/17266185/pexels-photo-17266185.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      path: "/rifles",
      color: "#3498db",
      description: "AR-15s & Hunting Rifles",
    },
    {
      name: "Shotguns",
      icon: "https://images.pexels.com/photos/6121966/pexels-photo-6121966.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      path: "/shotguns",
      color: "#f39c12",
      description: "Tactical & Sporting",
    },
    {
      name: "Accessories",
      icon: "https://images.pexels.com/photos/326316/pexels-photo-326316.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      path: "/accessories",
      color: "#9b59b6",
      description: "Optics & Gear",
    },
    {
      name: "Ammunition",
      icon: "https://images.pexels.com/photos/4689159/pexels-photo-4689159.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      path: "/ammunition",
      color: "#e67e22",
      description: "Premium Ammo",
    },
  ];

  const handleBrowseClick = () => {
    // Scroll to categories section
    const element = document.getElementById("categories-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBuyClick = (product) => {
    // Add product to cart
    dispatch({
      type: "ADD_TO_CART",
      payload: product
    });

    // Store product info in sessionStorage for after login
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedProduct', JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price
      }));
    }
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <TestimonialsPopup />
            <HeroSection>
        <HeroContent>
          <HeroTextContent>
            <HeroTitle>Welcome to {state.siteSettings.siteName}</HeroTitle>
            <HeroSubtitle>
              Your Premier Licensed FFL Dealer - Serving Professionals & Enthusiasts Since 2003
              <br />
              <span style={{ fontSize: '18px', marginTop: '10px', display: 'block', opacity: '0.9' }}>
                Specializing in Premium Firearms, Expert Gunsmithing & Professional Training Services
              </span>
            </HeroSubtitle>
            <CTAButton
              onClick={handleBrowseClick}
              aria-label="Explore our premium firearms collection - scroll to categories section"
            >
              Explore Our Premium Collection
            </CTAButton>
          </HeroTextContent>

          <HeroImageGallery>
            <ImageSlider>
              {heroImages.map((image, index) => (
                <SlideImage key={index} $active={index === currentImageIndex}>
                  <img
                    src={image.src}
                    alt={image.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <ImageCaption>
                    <div className="title">{image.title}</div>
                    <div className="description">{image.description}</div>
                  </ImageCaption>
                </SlideImage>
              ))}
            </ImageSlider>

            <SliderDots>
              {heroImages.map((image, index) => (
                <SliderDot
                  key={index}
                  $active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View ${image.title} image`}
                />
              ))}
            </SliderDots>
          </HeroImageGallery>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose Us?</SectionTitle>
          <FeaturesGrid>
                        <FeatureCard>
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>Licensed FFL Dealer</FeatureTitle>
              <FeatureDescription>
                Fully licensed Federal Firearms License dealer with 20+ years of experience.
                Authorized to handle all firearms transfers and compliance requirements.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Certified Training</FeatureTitle>
              <FeatureDescription>
                Professional firearms instruction and safety courses by certified NRA instructors.
                Concealed carry permits and advanced tactical training available.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔧</FeatureIcon>
              <FeatureTitle>Expert Gunsmithing</FeatureTitle>
              <FeatureDescription>
                In-house gunsmith services including custom modifications, repairs, and precision tuning.
                Factory-trained technicians for all major brands.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>Law Enforcement Supplier</FeatureTitle>
              <FeatureDescription>
                Trusted supplier to law enforcement agencies and military personnel.
                Specialized duty gear and tactical equipment from leading manufacturers.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📋</FeatureIcon>
              <FeatureTitle>Compliance Expertise</FeatureTitle>
              <FeatureDescription>
                Expert guidance on federal, state, and local firearms regulations.
                Complete background check services and legal transfer documentation.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Lifetime Support</FeatureTitle>
              <FeatureDescription>
                Ongoing customer relationships with lifetime support and service.
                Trade-in programs, maintenance services, and upgrade consultations.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
            </FeaturesSection>

      <AboutSection>
        <Container>
          <AboutContent>
            <AboutTextContent>
              <AboutTitle>About Gun-k Pro</AboutTitle>
              <AboutDescription>
                <p>
                  Welcome to <span className="highlight">Gun-k Pro</span>, your trusted partner in firearms excellence since 2003.
                  As a fully licensed Federal Firearms License (FFL) dealer, we bring over <span className="highlight">20 years of experience</span>
                  to the firearms industry, serving both law enforcement professionals and civilian enthusiasts across the nation.
                </p>

                <div className="experience">
                  "Our commitment goes beyond selling firearms – we're dedicated to promoting responsible ownership,
                  safety education, and providing expert guidance for every customer's unique needs."
                  <br /><br />
                  <strong>— Michael Thompson, Owner & Lead Firearms Instructor</strong>
                </div>

                <p>
                  Our team consists of certified firearms instructors, experienced gunsmiths, and knowledgeable sales professionals
                  who share a passion for quality craftsmanship and customer service. We maintain partnerships with industry-leading
                  manufacturers including <span className="highlight">Glock, Smith & Wesson, Sig Sauer, Daniel Defense, and Wilson Combat</span>,
                  ensuring our customers have access to the finest firearms and accessories available.
                </p>

                <p>
                  Whether you're a first-time buyer seeking guidance, a competitive shooter looking for precision equipment,
                  or a law enforcement agency requiring reliable duty gear, Gun-k Pro delivers personalized service backed by
                  decades of expertise and an unwavering commitment to excellence.
                </p>
              </AboutDescription>

              <AboutStats>
                <StatItem>
                  <StatNumber>20+</StatNumber>
                  <StatLabel>Years Experience</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>15K+</StatNumber>
                  <StatLabel>Satisfied Customers</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>500+</StatNumber>
                  <StatLabel>Products Available</StatLabel>
                </StatItem>
              </AboutStats>

              <ExpertiseCard>
                <ExpertiseTitle>Our Expertise</ExpertiseTitle>
                <ExpertiseList>
                  <li>Federal Firearms License (FFL) Transfer Services</li>
                  <li>Custom Gunsmithing & Weapon Modifications</li>
                  <li>Professional Firearms Training & Safety Courses</li>
                  <li>Law Enforcement & Military Equipment Supply</li>
                  <li>Competitive Shooting Gear & Precision Optics</li>
                  <li>Concealed Carry Consultation & Licensing</li>
                </ExpertiseList>
              </ExpertiseCard>
            </AboutTextContent>

            <AboutImageContainer>
              <AboutMainImage>
                <img
                  src="https://images.pexels.com/photos/3777562/pexels-photo-3777562.jpeg"
                  alt="Michael Thompson, Owner of Gun-k Pro - Professional firearms dealer with over 20 years of experience"
                  loading="lazy"
                />
              </AboutMainImage>

              <AboutSecondaryImages>
                <SecondaryImage>
                  <img
                    src="https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg"
                    alt="Professional team collaboration at Gun-k Pro"
                    loading="lazy"
                  />
                </SecondaryImage>
                <SecondaryImage>
                  <img
                    src="https://images.pexels.com/photos/3084333/pexels-photo-3084333.jpeg"
                    alt="Expert gunsmith working on precision firearms at Gun-k Pro"
                    loading="lazy"
                  />
                </SecondaryImage>
              </AboutSecondaryImages>
            </AboutImageContainer>
          </AboutContent>
        </Container>
      </AboutSection>

      <ProductsSection>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionSubtitle>
            Discover our carefully curated selection of premium firearms and
            accessories, featuring the latest innovations from trusted
            manufacturers.
          </SectionSubtitle>
          <ProductsGrid>
            {featuredProducts.map((product) => {
              const discountPercent = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )
                : 0;

              return (
                <ProductCard key={product.id}>
                  <ProductBadges>
                    <ManufacturerBadge>{product.manufacturer}</ManufacturerBadge>
                    <CategoryTag>{product.category}</CategoryTag>
                  </ProductBadges>
                  <ProductImage>
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={`${product.name} - ${product.manufacturer} ${product.caliber || product.type || ''}`}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage:
                            "url(https://images.pexels.com/photos/6091856/pexels-photo-6091856.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                      ${product.price}
                      {product.originalPrice && (
                        <>
                          <span className="original-price">
                            ${product.originalPrice}
                          </span>
                          {discountPercent > 0 && (
                            <span className="discount">
                              -{discountPercent}%
                            </span>
                          )}
                        </>
                      )}
                    </ProductPrice>

                    {(product.caliber || product.capacity || product.type) && (
                      <ProductSpecs>
                        {product.caliber && (
                          <SpecItem>
                            <div className="spec-label">Caliber</div>
                            <div className="spec-value">{product.caliber}</div>
                          </SpecItem>
                        )}
                        {product.capacity && (
                          <SpecItem>
                            <div className="spec-label">Capacity</div>
                            <div className="spec-value">{product.capacity}</div>
                          </SpecItem>
                        )}
                        {product.type && !product.caliber && (
                          <SpecItem>
                            <div className="spec-label">Type</div>
                            <div className="spec-value">{product.type}</div>
                          </SpecItem>
                        )}
                        {product.magnification && (
                          <SpecItem>
                            <div className="spec-label">Magnification</div>
                            <div className="spec-value">{product.magnification}</div>
                          </SpecItem>
                        )}
                      </ProductSpecs>
                    )}

                    <ProductDescription>
                      {product.description}
                    </ProductDescription>
                    <ProductButton
                      onClick={() => handleBuyClick(product)}
                      aria-label={`Buy ${product.name} for $${product.price}`}
                    >
                      BUY
                    </ProductButton>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      <CategorySection id="categories-section">
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name} to={category.path}>
                <CategoryImage>
                  <img
                    src={category.icon}
                    alt={`Professional ${category.name.toLowerCase()} - ${category.description}`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const parent = e.target.parentElement;
                      parent.style.background = `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`;
                      parent.innerHTML =
                        '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 48px; z-index: 3; position: relative;">🔫</div>';
                    }}
                  />
                </CategoryImage>
                <CategoryName>{category.name}</CategoryName>
                <CategoryDescription>
                  {category.description}
                </CategoryDescription>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Container>
      </CategorySection>
    </>
  );
}
