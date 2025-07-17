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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const DetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #f093fb 20%,
    #f5576c 40%,
    #4facfe 60%,
    #00f2fe 80%,
    #ff0844 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  padding: 0;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
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
  gap: 12px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: #f093fb;
    transform: translateX(-8px);
    box-shadow: 0 10px 25px rgba(240, 147, 251, 0.3);
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 1rem;
  }
`;

const ProductSection = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  padding: 50px;
  backdrop-filter: blur(25px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation:
    ${fadeIn} 1s ease-out,
    ${float} 8s ease-in-out infinite;
  margin-bottom: 30px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 40px 30px;
    border-radius: 25px;
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
    border-radius: 20px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 1024px) {
    gap: 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 280px;
    border-radius: 20px;
  }
`;

const ImageBadges = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Badge = styled.div`
  background: ${(props) =>
    props.$type === "sale"
      ? "linear-gradient(135deg, #ff0844, #f5576c)"
      : props.$type === "featured"
        ? "linear-gradient(135deg, #f093fb, #667eea)"
        : "linear-gradient(135deg, #4facfe, #00f2fe)"};
  color: white;
  padding: 10px 18px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ${float} 3s ease-in-out infinite;
`;

const ProductInfo = styled.div`
  color: white;
`;

const Manufacturer = styled.div`
  color: #f093fb;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const ProductName = styled.h1`
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff, #f0f0f0, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #f093fb;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const SavingsAmount = styled.div`
  background: linear-gradient(135deg, #ff0844, #f5576c);
  color: white;
  padding: 8px 15px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;

  @media (max-width: 480px) {
    margin-left: 0;
  }
`;

const StockStatus = styled.div`
  padding: 12px 20px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #00f2fe, #4facfe)"
      : "linear-gradient(135deg, #ff0844, #f5576c)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 35px;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.4rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const RatingText = styled.div`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  font-weight: 600;
`;

const TabContainer = styled.div`
  margin-bottom: 50px;
`;

const TabHeaders = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const TabHeader = styled.button`
  flex: 1;
  padding: 18px 25px;
  background: ${(props) =>
    props.$active ? "rgba(240, 147, 251, 0.4)" : "transparent"};
  border: ${(props) =>
    props.$active ? "2px solid #f093fb" : "2px solid transparent"};
  border-radius: 15px;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.7)")};
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(240, 147, 251, 0.3);
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const TabContent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 35px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SpecCategory = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const CategoryTitle = styled.h3`
  color: #f093fb;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const SpecLabel = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  font-size: 1rem;
`;

const SpecValue = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;

  &::before {
    content: "✓";
    background: linear-gradient(135deg, #f093fb, #667eea);
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;

const WarrantyInfo = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  text-align: center;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const WarrantyTitle = styled.h3`
  color: #f093fb;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: 800;
`;

const WarrantyText = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 500;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 35px;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 20px 35px;
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    padding: 18px 25px;
    font-size: 1.1rem;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #f093fb, #667eea);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #667eea, #f093fb);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(240, 147, 251, 0.5);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff0844, #f5576c);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #f5576c, #ff0844);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(255, 8, 68, 0.5);
  }
`;

const ContactSection = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border-radius: 25px;
  padding: 40px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 480px) {
    padding: 30px 25px;
  }
`;

const ContactTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const ContactText = styled.p`
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  text-align: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContactItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 12px;
  color: #f093fb;
`;

const ContactLabel = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactValue = styled.div`
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
`;

const ShotgunDetail = ({ shotgunId }) => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("specifications");

  const shotgun = state.products.find(
    (p) => p.id === parseInt(shotgunId) && p.category === "shotguns",
  );

  if (!shotgun) {
    return (
      <DetailContainer>
        <Container>
          <BackButton onClick={() => navigate("/shotguns")}>
            ← Back to Shotguns
          </BackButton>
          <ProductSection>
            <ProductName>Shotgun Not Found</ProductName>
            <Description>
              The shotgun you're looking for could not be found. Please check
              the URL or browse our shotgun collection.
            </Description>
          </ProductSection>
        </Container>
      </DetailContainer>
    );
  }

  const handleInquiry = () => {
    navigate(
      `/contact?product=${encodeURIComponent(shotgun.name)}&category=shotguns`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const savings = shotgun.originalPrice
    ? shotgun.originalPrice - shotgun.price
    : 0;

  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate("/shotguns")}>
          ← Back to Shotguns
        </BackButton>

        <ProductSection>
          <ProductGrid>
            <ImageSection>
              <MainImage
                src={shotgun.images[0]}
                alt={shotgun.name}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                }}
              />
              <ImageBadges>
                {shotgun.onSale && <Badge $type="sale">On Sale</Badge>}
                {shotgun.featured && <Badge $type="featured">Featured</Badge>}
                {!shotgun.inStock && <Badge $type="stock">Out of Stock</Badge>}
              </ImageBadges>
            </ImageSection>

            <ProductInfo>
              <Manufacturer>{shotgun.manufacturer}</Manufacturer>
              <ProductName>{shotgun.name}</ProductName>
              <Description>{shotgun.description}</Description>

              <PriceSection>
                <PriceContainer>
                  <CurrentPrice>${shotgun.price.toFixed(2)}</CurrentPrice>
                  {shotgun.originalPrice && (
                    <>
                      <OriginalPrice>
                        ${shotgun.originalPrice.toFixed(2)}
                      </OriginalPrice>
                      <SavingsAmount>Save ${savings.toFixed(2)}</SavingsAmount>
                    </>
                  )}
                </PriceContainer>
                <StockInfo>
                  <StockStatus $inStock={shotgun.inStock}>
                    {shotgun.inStock
                      ? `${shotgun.stock} Available`
                      : "Out of Stock"}
                  </StockStatus>
                </StockInfo>
              </PriceSection>

              {shotgun.rating && (
                <RatingSection>
                  <Stars>{renderStars(shotgun.rating)}</Stars>
                  <RatingText>
                    {shotgun.rating} out of 5 ({shotgun.reviews} reviews)
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
                      <SpecLabel>Gauge</SpecLabel>
                      <SpecValue>{shotgun.gauge}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Action Type</SpecLabel>
                      <SpecValue>{shotgun.action}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Capacity</SpecLabel>
                      <SpecValue>{shotgun.capacity}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Weight</SpecLabel>
                      <SpecValue>{shotgun.weight}</SpecValue>
                    </SpecItem>
                  </SpecCategory>

                  <SpecCategory>
                    <CategoryTitle>Barrel & Dimensions</CategoryTitle>
                    <SpecItem>
                      <SpecLabel>Barrel Length</SpecLabel>
                      <SpecValue>{shotgun.barrelLength}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Overall Length</SpecLabel>
                      <SpecValue>{shotgun.overallLength}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Finish</SpecLabel>
                      <SpecValue>{shotgun.finish}</SpecValue>
                    </SpecItem>
                    <SpecItem>
                      <SpecLabel>Chokes</SpecLabel>
                      <SpecValue>{shotgun.chokes}</SpecValue>
                    </SpecItem>
                  </SpecCategory>

                  {shotgun.specifications && (
                    <SpecCategory>
                      <CategoryTitle>Advanced Specs</CategoryTitle>
                      {shotgun.specifications.chamberLength && (
                        <SpecItem>
                          <SpecLabel>Chamber Length</SpecLabel>
                          <SpecValue>
                            {shotgun.specifications.chamberLength}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {shotgun.specifications.triggerPull && (
                        <SpecItem>
                          <SpecLabel>Trigger Pull</SpecLabel>
                          <SpecValue>
                            {shotgun.specifications.triggerPull}
                          </SpecValue>
                        </SpecItem>
                      )}
                      {shotgun.specifications.magazines && (
                        <SpecItem>
                          <SpecLabel>Magazine Type</SpecLabel>
                          <SpecValue>
                            {shotgun.specifications.magazines}
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
                    {shotgun.features &&
                      shotgun.features.map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                    {shotgun.specifications?.safetyFeatures &&
                      shotgun.specifications.safetyFeatures.map(
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
                    {shotgun.specifications?.warranty ||
                      "Limited Manufacturer Warranty"}
                  </WarrantyText>
                  <WarrantyText>
                    This shotgun comes with full manufacturer support and
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
          <ContactTitle>Need Expert Advice?</ContactTitle>
          <ContactText>
            Our shotgun specialists are ready to help you choose the perfect
            firearm for hunting, sport shooting, or home defense. Contact us for
            personalized recommendations and expert guidance.
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
              <ContactValue>shotguns@gun-k.com</ContactValue>
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

export default ShotgunDetail;
