import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const DetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  padding: 20px 0;

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
  padding: 0 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  animation: ${slideIn} 0.8s ease-out;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-5px);
    color: white;
  }
`;

const ProductContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const ProductHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 600px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Badge = styled.div`
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &.featured {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    animation: ${pulse} 2s infinite;
  }

  &.sale {
    background: linear-gradient(135deg, #00b894, #00a085);
    color: white;
  }

  &.in-stock {
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
  }
`;

const InfoSection = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Manufacturer = styled.div`
  color: #667eea;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const ProductName = styled.h1`
  color: #2c3e50;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 900;
  margin: 0 0 20px 0;
  line-height: 1.1;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const Stars = styled.div`
  color: #f39c12;
  font-size: 24px;
`;

const ReviewCount = styled.div`
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 500;
`;

const PriceContainer = styled.div`
  margin-bottom: 30px;
`;

const CurrentPrice = styled.div`
  color: #00b894;
  font-size: 36px;
  font-weight: 900;
  line-height: 1;
`;

const OriginalPrice = styled.div`
  color: #b2bec3;
  font-size: 20px;
  text-decoration: line-through;
  margin-top: 5px;
`;

const SaveAmount = styled.div`
  color: #e74c3c;
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const QuickSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin-bottom: 40px;
`;

const QuickSpecItem = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }

  .label {
    font-size: 12px;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .value {
    font-size: 16px;
    color: #2c3e50;
    font-weight: 800;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 18px 30px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.9);
    color: #2c3e50;
    border: 2px solid #e9ecef;

    &:hover {
      background: #e74c3c;
      color: white;
      border-color: #e74c3c;
      transform: translateY(-2px);
    }
  }
`;

const DetailSections = styled.div`
  padding: 50px;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const SectionTabs = styled.div`
  display: flex;
  background: #fff;
  border-radius: 15px;
  padding: 8px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "rgba(102, 126, 234, 0.1)"};
    color: ${(props) => (props.active ? "white" : "#667eea")};
  }
`;

const TabContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
`;

const SpecsCard = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border: 2px solid #e9ecef;

  h3 {
    color: #2c3e50;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 800;
  }
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 600;
    color: #495057;
  }

  .value {
    font-weight: 700;
    color: #2c3e50;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  color: #495057;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: "✓";
    color: #00b894;
    font-weight: 900;
    font-size: 18px;
  }
`;

const WarrantyInfo = styled.div`
  background: linear-gradient(135deg, #e8f5e8, #f0fff4);
  border: 2px solid #c3e6cb;
  border-radius: 15px;
  padding: 30px;
  text-align: center;

  h3 {
    color: #155724;
    margin: 0 0 15px 0;
    font-size: 20px;
  }

  p {
    color: #155724;
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
  }
`;

export default function HandgunDetail({ productId }) {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("specs");

  // Find the product by ID
  const product = state.products.find(
    (p) => p.id === parseInt(productId) && p.category === "handguns",
  );

  if (!product) {
    return (
      <DetailContainer>
        <Container>
          <BackButton to="/handguns">← Back to Handguns</BackButton>
          <ProductContainer>
            <div style={{ padding: "100px", textAlign: "center" }}>
              <h2>Product not found</h2>
              <p>The handgun you're looking for could not be found.</p>
            </div>
          </ProductContainer>
        </Container>
      </DetailContainer>
    );
  }

  const handleInquiry = () => {
    const subject = `Detailed Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm very interested in the ${product.name} by ${product.manufacturer}.\n\nProduct Details:\n- Price: $${product.price}\n- Caliber: ${product.caliber}\n- Capacity: ${product.capacity}\n- Stock: ${product.stock > 0 ? "In Stock" : "Out of Stock"}\n\nI would like to know more about:\n- Availability and delivery timeline\n- Required documentation and background check process\n- Payment options and financing\n- Included accessories and additional options\n- Transfer procedures\n\nPlease contact me at your earliest convenience.\n\nThank you!`;
    const mailtoLink = `mailto:${state.siteSettings.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const savings = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : 0;

  return (
    <DetailContainer>
      <Container>
        <BackButton to="/handguns">← Back to Handguns</BackButton>

        <ProductContainer>
          <ProductHeader>
            <ImageSection>
              <ProductImageContainer>
                {product.images &&
                product.images[0] !== "/api/placeholder/400/300" ? (
                  <ProductImage src={product.images[0]} alt={product.name} />
                ) : (
                  <ProductImagePlaceholder
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=600&h=400&fit=crop&auto=format&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "transparent",
                    }}
                  >
                    Image not available
                  </ProductImagePlaceholder>
                )}

                <BadgeContainer>
                  {product.featured && (
                    <Badge className="featured">Featured</Badge>
                  )}
                  {product.onSale && <Badge className="sale">On Sale</Badge>}
                  <Badge className="in-stock">
                    {product.stock > 0
                      ? `${product.stock} In Stock`
                      : "Out of Stock"}
                  </Badge>
                </BadgeContainer>
              </ProductImageContainer>
            </ImageSection>

            <InfoSection>
              <Manufacturer>{product.manufacturer}</Manufacturer>
              <ProductName>{product.name}</ProductName>

              {product.rating && (
                <Rating>
                  <Stars>{renderStars(product.rating)}</Stars>
                  <ReviewCount>({product.reviews} reviews)</ReviewCount>
                </Rating>
              )}

              <PriceContainer>
                <CurrentPrice>${product.price}</CurrentPrice>
                {product.originalPrice && (
                  <>
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    <SaveAmount>Save ${savings}</SaveAmount>
                  </>
                )}
              </PriceContainer>

              <Description>{product.description}</Description>

              <QuickSpecs>
                <QuickSpecItem>
                  <div className="label">Caliber</div>
                  <div className="value">{product.caliber}</div>
                </QuickSpecItem>
                <QuickSpecItem>
                  <div className="label">Capacity</div>
                  <div className="value">{product.capacity}</div>
                </QuickSpecItem>
                <QuickSpecItem>
                  <div className="label">Barrel</div>
                  <div className="value">{product.barrelLength}</div>
                </QuickSpecItem>
                <QuickSpecItem>
                  <div className="label">Weight</div>
                  <div className="value">{product.weight}</div>
                </QuickSpecItem>
              </QuickSpecs>

              <ActionButtons>
                <ActionButton className="primary" onClick={handleInquiry}>
                  Contact for Purchase
                </ActionButton>
                <ActionButton className="secondary">
                  Add to Wishlist
                </ActionButton>
              </ActionButtons>
            </InfoSection>
          </ProductHeader>

          <DetailSections>
            <SectionTabs>
              <Tab
                active={activeTab === "specs"}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </Tab>
              <Tab
                active={activeTab === "features"}
                onClick={() => setActiveTab("features")}
              >
                Features
              </Tab>
              <Tab
                active={activeTab === "warranty"}
                onClick={() => setActiveTab("warranty")}
              >
                Warranty
              </Tab>
            </SectionTabs>

            <TabContent>
              {activeTab === "specs" && (
                <SpecsGrid>
                  <SpecsCard>
                    <h3>Physical Specifications</h3>
                    <SpecItem>
                      <span className="label">Overall Length</span>
                      <span className="value">{product.overallLength}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Barrel Length</span>
                      <span className="value">{product.barrelLength}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Weight</span>
                      <span className="value">{product.weight}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Frame Size</span>
                      <span className="value">
                        {product.specifications?.frameSize}
                      </span>
                    </SpecItem>
                  </SpecsCard>

                  <SpecsCard>
                    <h3>Performance</h3>
                    <SpecItem>
                      <span className="label">Caliber</span>
                      <span className="value">{product.caliber}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Capacity</span>
                      <span className="value">{product.capacity}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Action</span>
                      <span className="value">{product.action}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Trigger Pull</span>
                      <span className="value">
                        {product.specifications?.triggerPull}
                      </span>
                    </SpecItem>
                  </SpecsCard>

                  <SpecsCard>
                    <h3>Construction</h3>
                    <SpecItem>
                      <span className="label">Finish</span>
                      <span className="value">{product.finish}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Sights</span>
                      <span className="value">{product.sights}</span>
                    </SpecItem>
                    <SpecItem>
                      <span className="label">Magazines</span>
                      <span className="value">
                        {product.specifications?.magazines}
                      </span>
                    </SpecItem>
                  </SpecsCard>
                </SpecsGrid>
              )}

              {activeTab === "features" && (
                <FeaturesList>
                  {product.features?.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeaturesList>
              )}

              {activeTab === "warranty" && (
                <WarrantyInfo>
                  <h3>🛡️ Warranty Coverage</h3>
                  <p>
                    {product.specifications?.warranty} - This firearm is covered
                    against defects in materials and workmanship. Contact the
                    manufacturer for specific warranty terms and service
                    procedures.
                  </p>
                </WarrantyInfo>
              )}
            </TabContent>
          </DetailSections>
        </ProductContainer>
      </Container>
    </DetailContainer>
  );
}
