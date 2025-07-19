import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useApp } from "../context/AppContext.optimized";
import TestimonialPopup from "./TestimonialPopup";

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
  max-width: 800px;
  margin: 0 auto;
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60, #3498db);
    z-index: 1;
  }
`;

const ProductImage = styled.div`
  height: 280px;
  background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
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
    transition: transform 0.4s ease;
    filter: brightness(1.1) contrast(1.1);
  }

  &:hover img {
    transform: scale(1.08);
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
    transition: transform 0.6s;
  }

  ${ProductCard}:hover &::after {
    transform: translateX(100%);
  }
`;

const ProductInfo = styled.div`
  padding: 30px;
  position: relative;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
`;

const ProductPrice = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  .original-price {
    font-size: 18px;
    color: #95a5a6;
    text-decoration: line-through;
    font-weight: 400;
  }

  .discount {
    background: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  width: 100%;
  transition: all 0.3s ease;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const CategorySection = styled.section`
  padding: 80px 20px;
  background: #f8f9fa;
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
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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
    transition: transform 0.3s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
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
      rgba(255, 255, 255, 0.2) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
    z-index: 2;
  }

  ${CategoryCard}:hover &::after {
    transform: translateX(100%);
  }

  ${CategoryCard}:hover img {
    transform: scale(1.1);
  }
`;

const CategoryName = styled.h3`
  padding: 20px 20px 10px;
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  padding: 0 20px 20px;
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
  font-style: italic;
`;

const AboutSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const AboutMainText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #34495e;
  text-align: justify;
`;

const AboutFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const AboutFeature = styled.div`
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FeatureNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 8px;
`;

const FeatureLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AboutImageSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const TeamImage = styled.div`
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
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
      rgba(52, 73, 94, 0.3) 0%,
      rgba(44, 62, 80, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ValuesSection = styled.div`
  text-align: center;
`;

const ValuesTitle = styled.h3`
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 50px;
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

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ValueCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ValueIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ValueTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
`;

const ValueDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 16px;
`;

const FloatingTestimonialButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(231, 76, 60, 0.6);
  }

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    border: 2px solid rgba(231, 76, 60, 0.3);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

export default function HomePage() {
  const { state } = useApp();
  const [showTestimonial, setShowTestimonial] = useState(false);

  useEffect(() => {
    // Auto-trigger testimonial popup after 20 seconds
    const timer = setTimeout(() => {
      setShowTestimonial(true);
    }, 20000);

    // Additional trigger when user scrolls to featured products
    const handleScroll = () => {
      const featuredSection = document.querySelector(
        '[data-section="featured-products"]',
      );
      if (featuredSection) {
        const rect = featuredSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
          // Trigger testimonial after 10 seconds of viewing featured products
          setTimeout(() => {
            if (!showTestimonial) {
              setShowTestimonial(true);
            }
          }, 10000);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showTestimonial]);

  const featuredProducts = state.products.filter(
    (product) => product.featured && product.displayLocation.includes("home"),
  );

  const categories = [
    {
      name: "Handguns",
      icon: "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=200&h=200&fit=crop&auto=format&q=80",
      path: "/handguns",
      color: "#e74c3c",
      description: "Pistols & Revolvers",
    },
    {
      name: "Rifles",
      icon: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&auto=format&q=80",
      path: "/rifles",
      color: "#3498db",
      description: "AR-15s & Hunting Rifles",
    },
    {
      name: "Shotguns",
      icon: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop&auto=format&q=80",
      path: "/shotguns",
      color: "#f39c12",
      description: "Tactical & Sporting",
    },
    {
      name: "Accessories",
      icon: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=200&h=200&fit=crop&auto=format&q=80",
      path: "/accessories",
      color: "#9b59b6",
      description: "Optics & Gear",
    },
    {
      name: "Ammunition",
      icon: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&auto=format&q=80",
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

  const handleProductInquiry = (product) => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in learning more about the ${product.name} (Price: $${product.price}).\n\nPlease provide more details.\n\nThank you!`;
    const mailtoLink = `mailto:${state.siteSettings.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to {state.siteSettings.siteName}</HeroTitle>
          <HeroSubtitle>{state.siteSettings.headerText}</HeroSubtitle>
          <CTAButton onClick={handleBrowseClick}>
            Browse Our Inventory
          </CTAButton>
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
                Fully licensed and authorized federal firearms dealer with years
                of experience
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🚚</FeatureIcon>
              <FeatureTitle>Fast Shipping</FeatureTitle>
              <FeatureDescription>
                Quick and secure shipping to your local FFL dealer with tracking
                included
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>Quality Products</FeatureTitle>
              <FeatureDescription>
                Only the finest firearms and accessories from trusted
                manufacturers
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Secure Transactions</FeatureTitle>
              <FeatureDescription>
                Safe and secure payment processing with complete buyer
                protection
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📞</FeatureIcon>
              <FeatureTitle>Expert Support</FeatureTitle>
              <FeatureDescription>
                Knowledgeable staff ready to help with all your firearms needs
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Competitive Prices</FeatureTitle>
              <FeatureDescription>
                Best prices guaranteed with regular promotions and discounts
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <ProductsSection data-section="featured-products">
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
                  <ProductImage>
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          const parent = e.target.parentElement;
                          parent.style.background =
                            "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)";
                          parent.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white; text-align: center;"><div style="font-size: 48px; margin-bottom: 10px;">🔫</div><div style="font-size: 14px; font-weight: 600;">Product Image</div></div>`;
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                          🔫
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>
                          Product Image
                        </div>
                      </div>
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
                    <ProductDescription>
                      {product.description}
                    </ProductDescription>
                    <ProductButton
                      onClick={() => handleProductInquiry(product)}
                    >
                      BUY NOW
                    </ProductButton>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      <AboutSection>
        <Container>
          <SectionTitle>About Gun-k Pro</SectionTitle>
          <SectionSubtitle>
            Excellence Through Experience, Trust Through Transparency
          </SectionSubtitle>

          <AboutContent>
            <AboutTextSection>
              <AboutMainText>{state.siteSettings.aboutUs}</AboutMainText>

              <AboutFeatures>
                <AboutFeature>
                  <FeatureNumber>20+</FeatureNumber>
                  <FeatureLabel>Years of Excellence</FeatureLabel>
                </AboutFeature>
                <AboutFeature>
                  <FeatureNumber>50K+</FeatureNumber>
                  <FeatureLabel>Satisfied Customers</FeatureLabel>
                </AboutFeature>
                <AboutFeature>
                  <FeatureNumber>99.8%</FeatureNumber>
                  <FeatureLabel>Customer Satisfaction</FeatureLabel>
                </AboutFeature>
              </AboutFeatures>
            </AboutTextSection>

            <AboutImageSection>
              <TeamImage>
                <img
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600&h=400&fit=crop&auto=format&q=80"
                  alt="Professional team member at Gun-k Pro"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    parent.style.background =
                      "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)";
                    parent.innerHTML =
                      '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 24px; text-align: center;"><div>Professional<br/>Firearms Team</div></div>';
                  }}
                />
              </TeamImage>
              <TeamImage>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop&auto=format&q=80"
                  alt="Expert gunsmith at work"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    parent.style.background =
                      "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)";
                    parent.innerHTML =
                      '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 24px; text-align: center;"><div>Expert<br/>Gunsmith Services</div></div>';
                  }}
                />
              </TeamImage>
            </AboutImageSection>
          </AboutContent>

          <ValuesSection>
            <ValuesTitle>Our Core Values</ValuesTitle>
            <ValuesGrid>
              <ValueCard>
                <ValueIcon>🛡️</ValueIcon>
                <ValueTitle>Safety First</ValueTitle>
                <ValueDescription>
                  Safety is paramount in everything we do. From secure storage
                  protocols to comprehensive safety training.
                </ValueDescription>
              </ValueCard>
              <ValueCard>
                <ValueIcon>⚖️</ValueIcon>
                <ValueTitle>Legal Compliance</ValueTitle>
                <ValueDescription>
                  We strictly adhere to all federal, state, and local
                  regulations with full legal compliance.
                </ValueDescription>
              </ValueCard>
              <ValueCard>
                <ValueIcon>🎯</ValueIcon>
                <ValueTitle>Expert Knowledge</ValueTitle>
                <ValueDescription>
                  Our team's expertise spans hunting, competitive shooting, law
                  enforcement, and military applications.
                </ValueDescription>
              </ValueCard>
            </ValuesGrid>
          </ValuesSection>
        </Container>
      </AboutSection>

      <CategorySection id="categories-section">
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name} to={category.path}>
                <CategoryImage>
                  <img
                    src={category.icon}
                    alt={category.name}
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

      <FloatingTestimonialButton
        onClick={() => setShowTestimonial(true)}
        title="Read Customer Testimonials"
      >
        💬
      </FloatingTestimonialButton>

      <TestimonialPopup
        isVisible={showTestimonial}
        onClose={() => setShowTestimonial(false)}
      />
    </>
  );
}
