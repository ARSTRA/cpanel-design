import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const DetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #ff9a9e 0%,
    #fecfef 15%,
    #fecfef 25%,
    #a8edea 35%,
    #fed6e3 45%,
    #a8edea 55%,
    #d299c2 65%,
    #fef9d7 75%,
    #667eea 85%,
    #764ba2 100%
  );
  background-size: 600% 600%;
  animation: rainbow 25s ease infinite;
  padding: 0;
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
  gap: 15px;
  padding: 18px 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.2rem;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(20px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: #ff9a9e;
    transform: translateX(-10px);
    box-shadow: 0 15px 35px rgba(255, 154, 158, 0.4);
  }

  @media (max-width: 480px) {
    padding: 15px 25px;
    font-size: 1.1rem;
  }
`;

const ProductSection = styled.div`
  background: rgba(255, 255, 255, 0.18);
  border-radius: 35px;
  padding: 60px;
  backdrop-filter: blur(30px);
  border: 3px solid rgba(255, 255, 255, 0.35);
  animation:
    ${fadeIn} 1s ease-out,
    ${float} 10s ease-in-out infinite;
  margin-bottom: 30px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 50px 40px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 30px;
    border-radius: 25px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: start;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 30px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 320px;
    border-radius: 25px;
  }
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Badge = styled.div`
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff9a9e, #fecfef)"
      : props.type === "featured"
        ? "linear-gradient(135deg, #a8edea, #fed6e3)"
        : "linear-gradient(135deg, #667eea, #764ba2)"};
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.4);
  animation: ${float} 4s ease-in-out infinite;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const ProductInfo = styled.div`
  color: white;
`;

const Manufacturer = styled.div`
  color: #ff9a9e;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProductType = styled.div`
  color: #a8edea;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductName = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 25px;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff, #f0f0f0, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 35px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 35px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 25px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CurrentPrice = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #ff9a9e;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    font-size: 2.3rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const SavingsAmount = styled.div`
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  color: white;
  padding: 10px 18px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-left: auto;

  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

const StockStatus = styled.div`
  padding: 15px 25px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.2rem;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #a8edea, #fed6e3)"
      : "linear-gradient(135deg, #ff9a9e, #fecfef)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Stars = styled.div`
  display: flex;
  gap: 5px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

const RatingText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 700;
`;

const TabContainer = styled.div`
  margin-bottom: 60px;
`;

const TabHeaders = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 35px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const TabHeader = styled.button`
  flex: 1;
  padding: 20px 30px;
  background: ${(props) =>
    props.$active ? "rgba(255, 154, 158, 0.5)" : "transparent"};
  border: ${(props) =>
    props.$active ? "3px solid #ff9a9e" : "3px solid transparent"};
  border-radius: 20px;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  font-weight: 800;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 154, 158, 0.4);
    color: white;
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    padding: 18px 25px;
    font-size: 1.1rem;
  }
`;

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 40px;
  border-radius: 25px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(20px);

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const SpecCategory = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const CategoryTitle = styled.h3`
  color: #ff9a9e;
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.25);

  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  font-size: 1.1rem;
`;

const SpecValue = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  font-weight: 600;

  &::before {
    content: "✓";
    background: linear-gradient(135deg, #ff9a9e, #fecfef);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
`;

const WarrantyInfo = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const WarrantyTitle = styled.h3`
  color: #ff9a9e;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 900;
`;

const WarrantyText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.7;
  font-weight: 600;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 25px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 22px 40px;
  border: none;
  border-radius: 20px;
  font-size: 1.3rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    padding: 20px 30px;
    font-size: 1.2rem;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #fecfef, #ff9a9e);
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(255, 154, 158, 0.6);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #fed6e3, #a8edea);
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(168, 237, 234, 0.6);
  }
`;

const ContactSection = styled.div`
  background: rgba(255, 255, 255, 0.18);
  border-radius: 30px;
  padding: 50px;
  backdrop-filter: blur(25px);
  border: 3px solid rgba(255, 255, 255, 0.35);
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 480px) {
    padding: 40px 30px;
  }
`;

const ContactTitle = styled.h2`
  color: white;
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`;

const ContactText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 35px;
  font-weight: 600;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  text-align: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ContactItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
  color: #ff9a9e;
`;

const ContactLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactValue = styled.div`
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
`;

const AccessoryDetail = ({ accessoryId }) => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("specifications");

  const accessory = state.products.find(
    (p) => p.id === parseInt(accessoryId) && p.category === "accessories",
  );

  if (!accessory) {
    return (
      <DetailContainer>
        <Container>
          <BackButton onClick={() => navigate("/accessories")}>
            ← Back to Accessories
          </BackButton>
          <ProductSection>
            <ProductName>Accessory Not Found</ProductName>
            <Description>
              The accessory you're looking for could not be found. Please check
              the URL or browse our accessories collection.
            </Description>
          </ProductSection>
        </Container>
      </DetailContainer>
    );
  }

  const handleInquiry = () => {
    navigate(
      `/contact?product=${encodeURIComponent(accessory.name)}&category=accessories`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const savings = accessory.originalPrice
    ? accessory.originalPrice - accessory.price
    : 0;

  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate("/accessories")}>
          ← Back to Accessories
        </BackButton>

        <ProductSection>
          <ProductGrid>
            <ImageSection>
              <MainImage
                src={accessory.images[0]}
                alt={accessory.name}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                }}
              />
              <ImageBadges>
                {accessory.onSale && <Badge type="sale">On Sale</Badge>}
                {accessory.featured && <Badge type="featured">Featured</Badge>}
                {!accessory.inStock && <Badge type="stock">Out of Stock</Badge>}
              </ImageBadges>
            </ImageSection>

            <ProductInfo>
              <Manufacturer>{accessory.manufacturer}</Manufacturer>
              <ProductType>{accessory.type}</ProductType>
              <ProductName>{accessory.name}</ProductName>
              <Description>{accessory.description}</Description>

              <PriceSection>
                <PriceContainer>
                  <CurrentPrice>${accessory.price.toFixed(2)}</CurrentPrice>
                  {accessory.originalPrice && (
                    <>
                      <OriginalPrice>
                        ${accessory.originalPrice.toFixed(2)}
                      </OriginalPrice>
                      <SavingsAmount>Save ${savings.toFixed(2)}</SavingsAmount>
                    </>
                  )}
                </PriceContainer>
                <StockInfo>
                  <StockStatus $inStock={accessory.inStock}>
                    {accessory.inStock
                      ? `${accessory.stock} Available`
                      : "Out of Stock"}
                  </StockStatus>
                </StockInfo>
              </PriceSection>

              {accessory.rating && (
                <RatingSection>
                  <Stars>{renderStars(accessory.rating)}</Stars>
                  <RatingText>
                    {accessory.rating} out of 5 ({accessory.reviews} reviews)
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
                      <SpecLabel>Type</SpecLabel>
                      <SpecValue>{accessory.type}</SpecValue>
                    </SpecItem>
                    {accessory.magnification && (
                      <SpecItem>
                        <SpecLabel>Magnification</SpecLabel>
                        <SpecValue>{accessory.magnification}</SpecValue>
                      </SpecItem>
                    )}
                    {accessory.output && (
                      <SpecItem>
                        <SpecLabel>Output</SpecLabel>
                        <SpecValue>{accessory.output}</SpecValue>
                      </SpecItem>
                    )}
                    <SpecItem>
                      <SpecLabel>Weight</SpecLabel>
                      <SpecValue>{accessory.weight}</SpecValue>
                    </SpecItem>
                  </SpecCategory>

                  <SpecCategory>
                    <CategoryTitle>Physical Dimensions</CategoryTitle>
                    <SpecItem>
                      <SpecLabel>Length</SpecLabel>
                      <SpecValue>{accessory.length}</SpecValue>
                    </SpecItem>
                    {accessory.material && (
                      <SpecItem>
                        <SpecLabel>Material</SpecLabel>
                        <SpecValue>{accessory.material}</SpecValue>
                      </SpecItem>
                    )}
                    {accessory.reticle && (
                      <SpecItem>
                        <SpecLabel>Reticle</SpecLabel>
                        <SpecValue>{accessory.reticle}</SpecValue>
                      </SpecItem>
                    )}
                    {accessory.tubeSize && (
                      <SpecItem>
                        <SpecLabel>Tube Size</SpecLabel>
                        <SpecValue>{accessory.tubeSize}</SpecValue>
                      </SpecItem>
                    )}
                  </SpecCategory>

                  {accessory.specifications && (
                    <SpecCategory>
                      <CategoryTitle>Advanced Specs</CategoryTitle>
                      {accessory.specifications.eyeRelief && (
                        <SpecItem>
                          <SpecLabel>Eye Relief</SpecLabel>
                          <SpecValue>
                            {accessory.specifications.eyeRelief}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {accessory.specifications.batteryLife && (
                        <SpecItem>
                          <SpecLabel>Battery Life</SpecLabel>
                          <SpecValue>
                            {accessory.specifications.batteryLife}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {accessory.specifications.waterproof && (
                        <SpecItem>
                          <SpecLabel>Waterproof</SpecLabel>
                          <SpecValue>
                            {accessory.specifications.waterproof}
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
                    {accessory.features &&
                      accessory.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                  </FeaturesList>
                </div>
              )}

              {activeTab === "warranty" && (
                <WarrantyInfo>
                  <WarrantyTitle>Manufacturer Warranty</WarrantyTitle>
                  <WarrantyText>
                    {accessory.specifications?.warranty ||
                      "Limited Manufacturer Warranty"}
                  </WarrantyText>
                  <WarrantyText>
                    This accessory comes with full manufacturer support and
                    warranty coverage. All repairs and maintenance should be
                    performed by authorized service centers. Warranty coverage
                    includes manufacturing defects and material failures under
                    normal use.
                  </WarrantyText>
                </WarrantyInfo>
              )}
            </TabContent>
          </TabContainer>
        </ProductSection>

        <ContactSection>
          <ContactTitle>Need Expert Guidance?</ContactTitle>
          <ContactText>
            Our accessories specialists are ready to help you choose the perfect
            upgrades for your firearm. Get professional recommendations and
            expert installation advice from our knowledgeable team.
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
              <ContactValue>accessories@gun-k.com</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactLabel>Visit Store</ContactLabel>
              <ContactValue>123 Main St, Gun City</ContactValue>
            </ContactItem>
          </ContactInfo>
        </ContactSection>
      </Container>
    </DetailContainer>
  );
};

export default AccessoryDetail;
