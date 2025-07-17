import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, navigate } from "gatsby";
import { useApp } from "../context/AppContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const HeroSection = styled.section`
  background:
    linear-gradient(135deg, rgba(44, 62, 80, 0.85), rgba(52, 73, 94, 0.85)),
    url("https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 140px 20px 100px;
  text-align: center;
  color: white;
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
      rgba(255, 255, 255, 0.05) 50%,
      transparent 70%
    );
    animation: ${shimmer} 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
    padding: 120px 20px 80px;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 25px;
  font-weight: 900;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  background: linear-gradient(135deg, #fff, #e8e8e8, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 40px;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 500;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 20px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
  position: relative;
  overflow: hidden;

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
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(231, 76, 60, 0.6);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 35px;
    font-size: 1rem;
  }
`;

const FeaturesSection = styled.section`
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
    background: url("data:image/svg+xml,${encodeURIComponent(`
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <g fill="#000000" fill-opacity="0.02">
            <circle cx="30" cy="30" r="1"/>
          </g>
        </g>
      </svg>
    `)}");
    opacity: 0.5;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 25px;
  color: #2c3e50;
  font-weight: 900;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #e74c3c, #3498db);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 40px 35px;
  border-radius: 20px;
  text-align: left;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(52, 152, 219, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(135deg, #3498db, #e74c3c, #f39c12, #27ae60);
    background-size: 300% 300%;
    animation: ${shimmer} 2s linear infinite;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: 35px 30px;
  }
`;

const FeatureImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 25px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 18px;
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  color: #5a6c7d;
  line-height: 1.7;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const FeatureButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #2980b9, #1f4e79);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
  }
`;

const ProductsSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 35px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  height: 280px;
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${pulse} 2s infinite;
`;

const ProductInfo = styled.div`
  padding: 30px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  color: #27ae60;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: #bdc3c7;
  text-decoration: line-through;
  font-weight: 500;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ProductButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  flex: 1;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #2980b9 0%, #1f4e79 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
  }
`;

const SecondaryButton = styled(ProductButton)`
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);

  &:hover {
    background: linear-gradient(135deg, #7f8c8d 0%, #5d6d7e 100%);
    box-shadow: 0 8px 20px rgba(127, 140, 141, 0.4);
  }
`;

const CategorySection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80");
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }
`;

const CategoryTitle = styled(SectionTitle)`
  color: white;
  margin-bottom: 25px;

  &::after {
    background: linear-gradient(135deg, #e74c3c, #f39c12);
  }
`;

const CategorySubtitle = styled(SectionSubtitle)`
  color: rgba(255, 255, 255, 0.8);
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 35px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 25px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CategoryCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 1);
  }
`;

const CategoryImageContainer = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryOverlay = styled.div`
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

  ${CategoryCard}:hover & {
    transform: translateX(100%);
  }
`;

const CategoryInfo = styled.div`
  padding: 25px;
`;

const CategoryName = styled.h3`
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
`;

const CategoryDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CategoryButton = styled.div`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(135deg, #2980b9, #1f4e79);
    transform: translateY(-2px);
  }
`;

export default function HomePage() {
  const { state } = useApp();

  const featuredProducts = state.products.filter(
    (product) => product.featured && product.displayLocation.includes("home"),
  );

  const features = [
    {
      title: "Licensed FFL Dealer",
      description:
        "We are a federally licensed firearms dealer (FFL) with all required federal, state, and local permits. Our compliance with ATF regulations ensures every transaction meets the highest legal standards, providing you with complete confidence and peace of mind.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/legal"),
    },
    {
      title: "Fast & Secure Shipping",
      description:
        "Experience lightning-fast processing with secure FFL-to-FFL shipping nationwide. All firearms are professionally packaged and shipped with full tracking and insurance, ensuring safe delivery to your chosen FFL dealer within 1-3 business days.",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/legal#shipping"),
    },
    {
      title: "Premium Quality Products",
      description:
        "Every firearm in our inventory undergoes rigorous quality inspection. We partner exclusively with renowned manufacturers like Glock, Smith & Wesson, Sig Sauer, and Remington to offer only authentic, factory-new products with full manufacturer warranties.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/contact"),
    },
    {
      title: "Secure Transactions",
      description:
        "Your security is our priority. We utilize bank-level SSL encryption, secure payment processing, and comply with all PCI DSS standards. Every transaction is protected with fraud monitoring and buyer protection guarantees for complete peace of mind.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/legal#privacy"),
    },
    {
      title: "Expert Support",
      description:
        "Our team consists of certified firearms specialists with decades of combined experience. From selecting the right firearm for your needs to answering technical questions, our experts provide personalized guidance throughout your entire purchase journey.",
      image:
        "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/contact"),
    },
    {
      title: "Competitive Pricing",
      description:
        "We guarantee competitive pricing on all products with our price match policy. Enjoy regular sales events, volume discounts, and exclusive member pricing. If you find a lower price elsewhere, we'll match it and add an additional 5% discount.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      action: () => navigate("/contact"),
    },
  ];

  const categories = [
    {
      name: "Handguns",
      path: "/handguns",
      description:
        "Pistols and revolvers for personal defense, sport shooting, and law enforcement",
      image:
        "https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Rifles",
      path: "/rifles",
      description:
        "Precision rifles for hunting, sport shooting, and tactical applications",
      image:
        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shotguns",
      path: "/shotguns",
      description:
        "Versatile shotguns perfect for hunting, sport, and home defense",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Accessories",
      path: "/accessories",
      description:
        "Premium optics, accessories, and gear to enhance your firearms",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleBrowseClick = () => {
    const element = document.getElementById("categories-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductInquiry = (product) => {
    navigate(
      `/contact?product=${encodeURIComponent(product.name)}&category=${product.category}`,
    );
  };

  const handleViewProduct = (product) => {
    const detailPath =
      product.category === "handguns"
        ? `/handgun-detail?id=${product.id}`
        : product.category === "rifles"
          ? `/rifle-detail?id=${product.id}`
          : product.category === "shotguns"
            ? `/shotgun-detail?id=${product.id}`
            : `/accessory-detail?id=${product.id}`;

    navigate(detailPath);
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to {state.siteSettings.siteName}</HeroTitle>
          <HeroSubtitle>
            Your trusted partner for premium firearms, accessories, and expert
            service. Licensed FFL dealer with nationwide shipping and
            competitive pricing.
          </HeroSubtitle>
          <CTAButton onClick={handleBrowseClick}>
            Explore Our Collection
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose Gun-k Pro?</SectionTitle>
          <SectionSubtitle>
            Experience the difference of working with a professional, licensed
            firearms dealer committed to quality, security, and exceptional
            customer service.
          </SectionSubtitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureImageContainer>
                  <FeatureImage
                    src={feature.image}
                    alt={feature.title}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </FeatureImageContainer>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <FeatureButton onClick={feature.action}>
                  Learn More
                </FeatureButton>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <ProductsSection>
        <Container>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionSubtitle>
            Discover our handpicked selection of premium firearms from trusted
            manufacturers, each backed by full warranties and expert support.
          </SectionSubtitle>
          <ProductsGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImageContainer>
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  {product.onSale && <ProductBadge>Sale</ProductBadge>}
                  {product.featured && !product.onSale && (
                    <ProductBadge>Featured</ProductBadge>
                  )}
                </ProductImageContainer>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    ${product.price.toFixed(2)}
                    {product.originalPrice && (
                      <OriginalPrice>
                        ${product.originalPrice.toFixed(2)}
                      </OriginalPrice>
                    )}
                  </ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductButtons>
                    <ProductButton onClick={() => handleViewProduct(product)}>
                      View Details
                    </ProductButton>
                    <SecondaryButton
                      onClick={() => handleProductInquiry(product)}
                    >
                      Inquire Now
                    </SecondaryButton>
                  </ProductButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </Container>
      </ProductsSection>

      <CategorySection id="categories-section">
        <Container>
          <CategoryTitle>Shop by Category</CategoryTitle>
          <CategorySubtitle>
            Browse our comprehensive selection organized by firearm type. Each
            category features top-quality products from industry-leading
            manufacturers.
          </CategorySubtitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.name} to={category.path}>
                <CategoryImageContainer>
                  <CategoryImage
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <CategoryOverlay />
                </CategoryImageContainer>
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
                  <CategoryButton>Browse {category.name}</CategoryButton>
                </CategoryInfo>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </Container>
      </CategorySection>
    </>
  );
}
