import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AmmunitionDetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #e67e22;
  color: #e67e22;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #e67e22;
    color: white;
    transform: translateY(-2px);
  }
`;

const ProductSection = styled.section`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
`;

const ProductHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px 20px;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${(props) => (props.$active ? "#e67e22" : "transparent")};
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #e67e22;
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductBadges = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: ${(props) => {
    switch (props.$type) {
      case "featured":
        return "linear-gradient(135deg, #e67e22 0%, #d35400 100%)";
      case "sale":
        return "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
      default:
        return "linear-gradient(135deg, #27ae60 0%, #16a085 100%)";
    }
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductTitle = styled.h1`
  font-size: 32px;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Manufacturer = styled.div`
  font-size: 18px;
  color: #e67e22;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
`;

const CurrentPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #e67e22;
`;

const OriginalPrice = styled.div`
  font-size: 24px;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const Savings = styled.div`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #2c3e50;
  margin: 20px 0;
`;

const QuickSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const SpecItem = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
`;

const SpecLabel = styled.div`
  font-size: 12px;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const SpecValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(230, 126, 34, 0.3);
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  background: transparent;
  color: #e67e22;
  border: 2px solid #e67e22;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #e67e22;
    color: white;
    transform: translateY(-3px);
  }
`;

const DetailTabs = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TabsNav = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.$active ? "#e67e22" : "#7f8c8d")};
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid
    ${(props) => (props.$active ? "#e67e22" : "transparent")};

  &:hover {
    color: #e67e22;
    background: rgba(230, 126, 34, 0.05);
  }
`;

const TabContent = styled.div`
  padding: 40px;
`;

const FeaturesList = styled.div`
  display: grid;
  gap: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const FeatureText = styled.div`
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.4;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const SpecCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
`;

const SpecTitle = styled.h4`
  color: #e67e22;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
`;

const SpecDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SpecDetailLabel = styled.span`
  color: #7f8c8d;
  font-weight: 500;
`;

const SpecDetailValue = styled.span`
  color: #2c3e50;
  font-weight: 600;
`;

const RatingSection = styled.div`
  text-align: center;
`;

const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
`;

const Star = styled.span`
  font-size: 24px;
  color: #f39c12;
`;

const RatingText = styled.div`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const ReviewCount = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

export default function AmmunitionDetail() {
  const { state } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("features");
  const [ammunition, setAmmunition] = useState(null);

  useEffect(() => {
    // Get ammunition ID from URL params
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ammoId = urlParams.get("id");

      if (ammoId) {
        const foundAmmo = state.products.find(
          (product) =>
            product.id === parseInt(ammoId) &&
            product.category === "ammunition",
        );
        setAmmunition(foundAmmo);
      }
    }
  }, [state.products]);

  if (!ammunition) {
    return (
      <AmmunitionDetailContainer>
        <Container>
          <BackButton onClick={() => navigate("/ammunition")}>
            ← Back to Ammunition
          </BackButton>
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2>Ammunition not found</h2>
            <p>The requested ammunition product could not be found.</p>
          </div>
        </Container>
      </AmmunitionDetailContainer>
    );
  }

  const handleInquiry = () => {
    navigate(
      `/contact?product=${encodeURIComponent(ammunition.name)}&category=ammunition`,
    );
  };

  const handleQuickOrder = () => {
    // This would typically integrate with a shopping cart system
    alert(`Quick order request for ${ammunition.name} has been submitted!`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const savings = ammunition.originalPrice
    ? ammunition.originalPrice - ammunition.price
    : 0;

  return (
    <AmmunitionDetailContainer>
      <Container>
        <BackButton onClick={() => navigate("/ammunition")}>
          ← Back to Ammunition
        </BackButton>

        <ProductSection>
          <ProductHeader>
            <ImageGallery>
              <MainImage>
                {ammunition.images && ammunition.images[selectedImageIndex] ? (
                  <img
                    src={ammunition.images[selectedImageIndex]}
                    alt={ammunition.name}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
              </MainImage>

              {ammunition.images && ammunition.images.length > 1 && (
                <ThumbnailGrid>
                  {ammunition.images.map((image, index) => (
                    <Thumbnail
                      key={index}
                      $active={selectedImageIndex === index}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${ammunition.name} ${index + 1}`}
                      />
                    </Thumbnail>
                  ))}
                </ThumbnailGrid>
              )}
            </ImageGallery>

            <ProductInfo>
              <ProductBadges>
                {ammunition.featured && (
                  <Badge $type="featured">Featured</Badge>
                )}
                {ammunition.onSale && <Badge $type="sale">On Sale</Badge>}
                {ammunition.inStock && <Badge $type="stock">In Stock</Badge>}
              </ProductBadges>

              <Manufacturer>{ammunition.manufacturer}</Manufacturer>
              <ProductTitle>{ammunition.name}</ProductTitle>

              <PriceSection>
                <CurrentPrice>${ammunition.price}</CurrentPrice>
                {ammunition.originalPrice && (
                  <>
                    <OriginalPrice>${ammunition.originalPrice}</OriginalPrice>
                    <Savings>Save ${savings.toFixed(2)}</Savings>
                  </>
                )}
              </PriceSection>

              <Description>{ammunition.description}</Description>

              <QuickSpecs>
                <SpecItem>
                  <SpecLabel>Caliber</SpecLabel>
                  <SpecValue>{ammunition.caliber}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Type</SpecLabel>
                  <SpecValue>{ammunition.type}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Weight</SpecLabel>
                  <SpecValue>{ammunition.weight}</SpecValue>
                </SpecItem>
                <SpecItem>
                  <SpecLabel>Quantity</SpecLabel>
                  <SpecValue>{ammunition.quantity}</SpecValue>
                </SpecItem>
              </QuickSpecs>

              <ActionButtons>
                <PrimaryButton onClick={handleQuickOrder}>
                  Request Quote
                </PrimaryButton>
                <SecondaryButton onClick={handleInquiry}>
                  More Info
                </SecondaryButton>
              </ActionButtons>
            </ProductInfo>
          </ProductHeader>
        </ProductSection>

        <DetailTabs>
          <TabsNav>
            <TabButton
              $active={activeTab === "features"}
              onClick={() => setActiveTab("features")}
            >
              Features
            </TabButton>
            <TabButton
              $active={activeTab === "specifications"}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </TabButton>
            <TabButton
              $active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </TabButton>
          </TabsNav>

          <TabContent>
            {activeTab === "features" && (
              <FeaturesList>
                {ammunition.features &&
                  ammunition.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FeatureIcon>✓</FeatureIcon>
                      <FeatureText>{feature}</FeatureText>
                    </FeatureItem>
                  ))}
              </FeaturesList>
            )}

            {activeTab === "specifications" && (
              <SpecsGrid>
                <SpecCard>
                  <SpecTitle>Ballistics</SpecTitle>
                  {ammunition.velocity && (
                    <SpecDetail>
                      <SpecDetailLabel>Muzzle Velocity</SpecDetailLabel>
                      <SpecDetailValue>{ammunition.velocity}</SpecDetailValue>
                    </SpecDetail>
                  )}
                  {ammunition.energy && (
                    <SpecDetail>
                      <SpecDetailLabel>Muzzle Energy</SpecDetailLabel>
                      <SpecDetailValue>{ammunition.energy}</SpecDetailValue>
                    </SpecDetail>
                  )}
                  {ammunition.specifications &&
                    ammunition.specifications.muzzleVelocity && (
                      <SpecDetail>
                        <SpecDetailLabel>Muzzle Velocity</SpecDetailLabel>
                        <SpecDetailValue>
                          {ammunition.specifications.muzzleVelocity}
                        </SpecDetailValue>
                      </SpecDetail>
                    )}
                  {ammunition.specifications &&
                    ammunition.specifications.muzzleEnergy && (
                      <SpecDetail>
                        <SpecDetailLabel>Muzzle Energy</SpecDetailLabel>
                        <SpecDetailValue>
                          {ammunition.specifications.muzzleEnergy}
                        </SpecDetailValue>
                      </SpecDetail>
                    )}
                </SpecCard>

                <SpecCard>
                  <SpecTitle>Construction</SpecTitle>
                  {ammunition.specifications &&
                    ammunition.specifications.bulletType && (
                      <SpecDetail>
                        <SpecDetailLabel>Bullet Type</SpecDetailLabel>
                        <SpecDetailValue>
                          {ammunition.specifications.bulletType}
                        </SpecDetailValue>
                      </SpecDetail>
                    )}
                  {ammunition.specifications &&
                    ammunition.specifications.casing && (
                      <SpecDetail>
                        <SpecDetailLabel>Casing</SpecDetailLabel>
                        <SpecDetailValue>
                          {ammunition.specifications.casing}
                        </SpecDetailValue>
                      </SpecDetail>
                    )}
                  {ammunition.specifications &&
                    ammunition.specifications.primer && (
                      <SpecDetail>
                        <SpecDetailLabel>Primer</SpecDetailLabel>
                        <SpecDetailValue>
                          {ammunition.specifications.primer}
                        </SpecDetailValue>
                      </SpecDetail>
                    )}
                </SpecCard>
              </SpecsGrid>
            )}

            {activeTab === "reviews" && (
              <RatingSection>
                <RatingStars>{renderStars(ammunition.rating || 0)}</RatingStars>
                <RatingText>
                  {ammunition.rating ? ammunition.rating.toFixed(1) : "0.0"} out
                  of 5 stars
                </RatingText>
                <ReviewCount>
                  Based on {ammunition.reviews || 0} customer reviews
                </ReviewCount>
              </RatingSection>
            )}
          </TabContent>
        </DetailTabs>
      </Container>
    </AmmunitionDetailContainer>
  );
}
