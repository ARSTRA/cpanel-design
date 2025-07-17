import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const DetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #ff6b6b 0%,
    #4ecdc4 25%,
    #45b7d1 50%,
    #96ceb4 75%,
    #ffeaa7 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding: 0;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #4ecdc4;
    transform: translateX(-5px);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

const ProductSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 40px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 30px 25px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 15px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
    border-radius: 15px;
  }
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Badge = styled.div`
  background: ${(props) =>
    props.$type === "sale"
      ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)"
      : props.$type === "featured"
        ? "linear-gradient(135deg, #4ecdc4, #44a08d)"
        : "linear-gradient(135deg, #45b7d1, #3498db)"};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ProductInfo = styled.div`
  color: white;
`;

const Manufacturer = styled.div`
  color: #4ecdc4;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 15px;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 15px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CurrentPrice = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #4ecdc4;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const SavingsAmount = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;

  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

const StockStatus = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: 600;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #96ceb4, #52c234)"
      : "linear-gradient(135deg, #ff6b6b, #ff5252)"};
  color: white;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.3rem;
`;

const RatingText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
`;

const TabContainer = styled.div`
  margin-bottom: 40px;
`;

const TabHeaders = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 3px;
  }
`;

const TabHeader = styled.button`
  flex: 1;
  padding: 15px 20px;
  background: ${(props) =>
    props.$active ? "rgba(78, 205, 196, 0.3)" : "transparent"};
  border: ${(props) =>
    props.$active ? "2px solid #4ecdc4" : "2px solid transparent"};
  border-radius: 10px;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.7)")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(78, 205, 196, 0.2);
    color: white;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const SpecCategory = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const CategoryTitle = styled.h3`
  color: #4ecdc4;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const SpecValue = styled.span`
  color: white;
  font-weight: 600;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;

  &::before {
    content: "✓";
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
    flex-shrink: 0;
  }
`;

const WarrantyInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const WarrantyTitle = styled.h3`
  color: #4ecdc4;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const WarrantyText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 18px 30px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #44a08d, #4ecdc4);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(78, 205, 196, 0.4);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #ff8e8e, #ff6b6b);
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
  }
`;

const ContactSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const ContactTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ContactText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  text-align: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ContactItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #4ecdc4;
`;

const ContactLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const ContactValue = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const RifleDetail = ({ rifleId }) => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("specifications");

  const rifle = state.products.find(
    (p) => p.id === parseInt(rifleId) && p.category === "rifles",
  );

  if (!rifle) {
    return (
      <DetailContainer>
        <Container>
          <BackButton onClick={() => navigate("/rifles")}>
            ← Back to Rifles
          </BackButton>
          <ProductSection>
            <ProductName>Rifle Not Found</ProductName>
            <Description>
              The rifle you're looking for could not be found. Please check the
              URL or browse our rifle collection.
            </Description>
          </ProductSection>
        </Container>
      </DetailContainer>
    );
  }

  const handleInquiry = () => {
    navigate(
      `/contact?product=${encodeURIComponent(rifle.name)}&category=rifles`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const savings = rifle.originalPrice ? rifle.originalPrice - rifle.price : 0;

  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate("/rifles")}>
          ← Back to Rifles
        </BackButton>

        <ProductSection>
          <ProductGrid>
            <ImageSection>
              <MainImage
                src={rifle.images[0]}
                alt={rifle.name}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                }}
              />
              <ImageBadges>
                {rifle.onSale && <Badge type="sale">On Sale</Badge>}
                {rifle.featured && <Badge type="featured">Featured</Badge>}
                {!rifle.inStock && <Badge type="stock">Out of Stock</Badge>}
              </ImageBadges>
            </ImageSection>

            <ProductInfo>
              <Manufacturer>{rifle.manufacturer}</Manufacturer>
              <ProductName>{rifle.name}</ProductName>
              <Description>{rifle.description}</Description>

              <PriceSection>
                <PriceContainer>
                  <CurrentPrice>${rifle.price.toFixed(2)}</CurrentPrice>
                  {rifle.originalPrice && (
                    <>
                      <OriginalPrice>
                        ${rifle.originalPrice.toFixed(2)}
                      </OriginalPrice>
                      <SavingsAmount>Save ${savings.toFixed(2)}</SavingsAmount>
                    </>
                  )}
                </PriceContainer>
                <StockInfo>
                  <StockStatus $inStock={rifle.inStock}>
                    {rifle.inStock
                      ? `${rifle.stock} Available`
                      : "Out of Stock"}
                  </StockStatus>
                </StockInfo>
              </PriceSection>

              {rifle.rating && (
                <RatingSection>
                  <Stars>{renderStars(rifle.rating)}</Stars>
                  <RatingText>
                    {rifle.rating} out of 5 ({rifle.reviews} reviews)
                  </RatingText>
                </RatingSection>
              )}

              <ActionSection>
                <PrimaryButton onClick={handleInquiry}>
                  Request Quote
                </PrimaryButton>
                <SecondaryButton onClick={handleInquiry}>
                  Contact Expert
                </SecondaryButton>
              </ActionSection>
            </ProductInfo>
          </ProductGrid>
        </ProductSection>

        <ProductSection>
          <TabContainer>
            <TabHeaders>
              <TabHeader
                $active={activeTab === "specifications"}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </TabHeader>
              <TabHeader
                $active={activeTab === "features"}
                onClick={() => setActiveTab("features")}
              >
                Features
              </TabHeader>
              <TabHeader
                $active={activeTab === "warranty"}
                onClick={() => setActiveTab("warranty")}
              >
                Warranty
              </TabHeader>
            </TabHeaders>

            <TabContent>
              {activeTab === "specifications" && (
                <SpecsGrid>
                  <SpecCategory>
                    <CategoryTitle>Basic Specifications</CategoryTitle>
                    <SpecItem>
                      <SpecLabel>Caliber</SpecLabel>
                      <SpecValue>{rifle.caliber}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Action Type</SpecLabel>
                      <SpecValue>{rifle.action}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Capacity</SpecLabel>
                      <SpecValue>{rifle.capacity}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Weight</SpecLabel>
                      <SpecValue>{rifle.weight}</SpecValue>
                    </SpecItem>
                  </SpecCategory>

                  <SpecCategory>
                    <CategoryTitle>Barrel & Dimensions</CategoryTitle>
                    <SpecItem>
                      <SpecLabel>Barrel Length</SpecLabel>
                      <SpecValue>{rifle.barrelLength}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Overall Length</SpecLabel>
                      <SpecValue>{rifle.overallLength}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Finish</SpecLabel>
                      <SpecValue>{rifle.finish}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Sights</SpecLabel>
                      <SpecValue>{rifle.sights}</SpecValue>
                    </SpecItem>
                  </SpecCategory>

                  {rifle.specifications && (
                    <SpecCategory>
                      <CategoryTitle>Advanced Specs</CategoryTitle>
                      {rifle.specifications.triggerPull && (
                        <SpecItem>
                          <SpecLabel>Trigger Pull</SpecLabel>
                          <SpecValue>
                            {rifle.specifications.triggerPull}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {rifle.specifications.magazines && (
                        <SpecItem>
                          <SpecLabel>Magazines</SpecLabel>
                          <SpecValue>
                            {rifle.specifications.magazines}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {rifle.specifications.frameSize && (
                        <SpecItem>
                          <SpecLabel>Frame Size</SpecLabel>
                          <SpecValue>
                            {rifle.specifications.frameSize}
                          </SpecValue>
                        </SpecItem>
                      )}
                    </SpecCategory>
                  )}
                </SpecsGrid>
              )}

              {activeTab === "features" && (
                <div>
                  <FeaturesList>
                    {rifle.features &&
                      rifle.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                    {rifle.specifications?.safetyFeatures &&
                      rifle.specifications.safetyFeatures.map(
                        (safety, index) => (
                          <FeatureItem key={`safety-${index}`}>
                            {safety}
                          </FeatureItem>
                        ),
                      )}
                  </FeaturesList>
                </div>
              )}

              {activeTab === "warranty" && (
                <WarrantyInfo>
                  <WarrantyTitle>Manufacturer Warranty</WarrantyTitle>
                  <WarrantyText>
                    {rifle.specifications?.warranty ||
                      "Limited Manufacturer Warranty"}
                  </WarrantyText>
                  <WarrantyText>
                    This rifle comes with full manufacturer support and warranty
                    coverage. All repairs and maintenance should be performed by
                    authorized service centers. Warranty coverage includes
                    manufacturing defects and material failures under normal
                    use.
                  </WarrantyText>
                </WarrantyInfo>
              )}
            </TabContent>
          </TabContainer>
        </ProductSection>

        <ContactSection>
          <ContactTitle>Need More Information?</ContactTitle>
          <ContactText>
            Our firearm experts are ready to help you with any questions about
            this rifle, specifications, availability, or purchasing options.
          </ContactText>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>(555) 123-GUNS</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactIcon>✉️</ContactIcon>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>sales@gun-k.com</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactLabel>Visit Us</ContactLabel>
              <ContactValue>123 Main St, Gun City</ContactValue>
            </ContactItem>
          </ContactInfo>
        </ContactSection>
      </Container>
    </DetailContainer>
  );
};

export default RifleDetail;
