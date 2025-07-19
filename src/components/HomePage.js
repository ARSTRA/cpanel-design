import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 73, 94, 0.9)),
    url("/api/placeholder/1200/600");
  background-size: cover;
  background-position: center;
  padding: 120px 20px 80px;
  text-align: center;
  color: white;
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
  font-size: 36px;
  margin-bottom: 50px;
  color: #2c3e50;
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
  padding: 80px 20px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 250px;
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
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 15px;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const ProductButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1f4e79 100%);
    transform: translateY(-2px);
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

  ${CategoryCard}:hover &::after {
    transform: translateX(100%);
  }
`;

const CategoryName = styled.h3`
  padding: 20px;
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
`;

export default function HomePage() {
  const { state } = useApp();

  const featuredProducts = state.products.filter(
    (product) => product.featured && product.displayLocation.includes("home"),
  );

  const categories = [
    { name: "Handguns", icon: "🔫", path: "/handguns", color: "#e74c3c" },
    { name: "Rifles", icon: "🔫", path: "/rifles", color: "#3498db" },
    { name: "Shotguns", icon: "🔫", path: "/shotguns", color: "#f39c12" },
    { name: "Accessories", icon: "🔧", path: "/accessories", color: "#9b59b6" },
    { name: "Ammunition", icon: "💥", path: "/ammunition", color: "#e67e22" },
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

      <ProductsSection>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductsGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage
                  style={{
                    backgroundImage: `url(${product.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductButton onClick={() => handleProductInquiry(product)}>
                    Inquire Now
                  </ProductButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      <CategorySection id="categories-section">
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name} to={category.path}>
                <CategoryImage
                  style={{
                    background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                  }}
                >
                  {category.icon}
                </CategoryImage>
                <CategoryName>{category.name}</CategoryName>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Container>
      </CategorySection>
    </>
  );
}
