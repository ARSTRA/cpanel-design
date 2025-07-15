import React from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";

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
  background: #e74c3c;
  color: white;
  border: none;
  padding: 18px 36px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
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

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
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
`;

const CategoryName = styled.h3`
  padding: 20px;
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
`;

export default function HomePage() {
  const { state } = useApp();

  const featuredProducts = state.products.filter(
    (product) => product.featured && product.displayLocation.includes("home"),
  );

  const categories = [
    { name: "Handguns", icon: "🔫", path: "/handguns" },
    { name: "Rifles", icon: "🔫", path: "/rifles" },
    { name: "Shotguns", icon: "🔫", path: "/shotguns" },
    { name: "Accessories", icon: "🔧", path: "/accessories" },
  ];

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to {state.siteSettings.siteName}</HeroTitle>
          <HeroSubtitle>{state.siteSettings.headerText}</HeroSubtitle>
          <CTAButton>Browse Our Inventory</CTAButton>
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
                <ProductImage>🔫</ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductButton>View Details</ProductButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      <CategorySection>
        <Container>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name}>
                <CategoryImage>{category.icon}</CategoryImage>
                <CategoryName>{category.name}</CategoryName>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Container>
      </CategorySection>
    </>
  );
}
