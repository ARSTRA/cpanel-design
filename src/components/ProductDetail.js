import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const DetailContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.6s ease-out;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  height: 400px;
  background: ${(props) =>
    props.image
      ? `url(${props.image}) center/cover`
      : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  }
`;

const ImageThumbnails = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 60px;
  background: ${(props) =>
    props.image
      ? `url(${props.image}) center/cover`
      : "linear-gradient(135deg, #ddd 0%, #bbb 100%)"};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "transparent")};

  &:hover {
    transform: scale(1.05);
    border-color: #667eea;
  }
`;

const ProductInfo = styled.div``;

const ProductBadges = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Badge = styled.span`
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
      : props.type === "featured"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

const ProductCategory = styled.div`
  color: #667eea;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const ProductName = styled.h1`
  color: #2c3e50;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const PriceSection = styled.div`
  margin-bottom: 25px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const CurrentPrice = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #00b894;
`;

const OriginalPrice = styled.div`
  font-size: 24px;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const SavingsAmount = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
`;

const Stars = styled.div`
  color: #f39c12;
  font-size: 18px;
`;

const RatingText = styled.span`
  color: #7f8c8d;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : props.variant === "secondary"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"};
  color: white;
  border: none;
  padding: 18px 30px;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const SpecificationTabs = styled.div`
  margin-top: 40px;
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
  border-bottom: 1px solid #e1e8ed;
`;

const TabButton = styled.button`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#7f8c8d")};
  border: none;
  padding: 12px 20px;
  border-radius: 10px 10px 0 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "rgba(102, 126, 234, 0.1)"};
    color: ${(props) => (props.active ? "white" : "#667eea")};
  }
`;

const TabContent = styled.div`
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #e9ecef;
`;

const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SpecItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e9ecef;

  .label {
    color: #7f8c8d;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
  }

  .value {
    color: #2c3e50;
    font-size: 16px;
    font-weight: 600;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    background: white;
    padding: 12px 15px;
    margin-bottom: 8px;
    border-radius: 8px;
    border-left: 4px solid #00b894;
    color: #2c3e50;
    font-weight: 500;

    &::before {
      content: "✓";
      color: #00b894;
      font-weight: 700;
      margin-right: 10px;
    }
  }
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border-radius: 10px;
  background: ${(props) =>
    props.inStock
      ? "linear-gradient(135deg, rgba(0, 184, 148, 0.1), rgba(0, 184, 148, 0.05))"
      : "linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05))"};
  border: 1px solid ${(props) => (props.inStock ? "#00b894" : "#ff6b6b")};
  color: ${(props) => (props.inStock ? "#00b894" : "#ff6b6b")};
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProductDetail = ({ product, onAddToCart, onBuyNow }) => {
  const [activeTab, setActiveTab] = useState("specifications");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (hasHalfStar) {
      stars.push("��");
    }
    return stars.join("");
  };

  const savings = product.originalPrice
    ? (product.originalPrice - product.price).toFixed(2)
    : 0;

  return (
    <DetailContainer>
      <ProductHeader>
        <ImageSection>
          <MainImage image={product.images?.[selectedImage]} />
          {product.images && product.images.length > 1 && (
            <ImageThumbnails>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  image={image}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ImageThumbnails>
          )}
        </ImageSection>

        <ProductInfo>
          <ProductBadges>
            {product.onSale && <Badge type="sale">On Sale</Badge>}
            {product.featured && <Badge type="featured">Featured</Badge>}
            {product.inStock && <Badge type="stock">In Stock</Badge>}
          </ProductBadges>

          <ProductCategory>
            {product.category.replace(/([A-Z])/g, " $1").trim()}
          </ProductCategory>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>

          <PriceSection>
            <PriceContainer>
              <CurrentPrice>${product.price}</CurrentPrice>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    <SavingsAmount>Save ${savings}</SavingsAmount>
                  </>
                )}
            </PriceContainer>
            {product.msrp && (
              <div style={{ color: "#7f8c8d", fontSize: "14px" }}>
                MSRP: {product.msrp}
              </div>
            )}
          </PriceSection>

          {product.rating && (
            <Rating>
              <Stars>{renderStars(product.rating)}</Stars>
              <RatingText>
                {product.rating} ({product.reviews} reviews)
              </RatingText>
            </Rating>
          )}

          <StockStatus inStock={product.inStock}>
            <span>{product.inStock ? "✓" : "✗"}</span>
            <span>
              {product.inStock
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </StockStatus>

          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              🛒 Add to Cart
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => onBuyNow(product)}
              disabled={!product.inStock}
            >
              💳 Buy Now
            </ActionButton>
            <ActionButton variant="tertiary">❤️ Add to Wishlist</ActionButton>
          </ActionButtons>
        </ProductInfo>
      </ProductHeader>

      <SpecificationTabs>
        <TabNavigation>
          <TabButton
            active={activeTab === "specifications"}
            onClick={() => setActiveTab("specifications")}
          >
            📋 Specifications
          </TabButton>
          <TabButton
            active={activeTab === "features"}
            onClick={() => setActiveTab("features")}
          >
            ⭐ Features
          </TabButton>
          <TabButton
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            💬 Reviews ({product.reviews || 0})
          </TabButton>
        </TabNavigation>

        <TabContent>
          {activeTab === "specifications" && (
            <SpecGrid>
              {product.manufacturer && (
                <SpecItem>
                  <div className="label">Manufacturer</div>
                  <div className="value">{product.manufacturer}</div>
                </SpecItem>
              )}
              {product.caliber && (
                <SpecItem>
                  <div className="label">Caliber</div>
                  <div className="value">{product.caliber}</div>
                </SpecItem>
              )}
              {product.capacity && (
                <SpecItem>
                  <div className="label">Capacity</div>
                  <div className="value">{product.capacity}</div>
                </SpecItem>
              )}
              {product.barrelLength && (
                <SpecItem>
                  <div className="label">Barrel Length</div>
                  <div className="value">{product.barrelLength}</div>
                </SpecItem>
              )}
              {product.overallLength && (
                <SpecItem>
                  <div className="label">Overall Length</div>
                  <div className="value">{product.overallLength}</div>
                </SpecItem>
              )}
              {product.weight && (
                <SpecItem>
                  <div className="label">Weight</div>
                  <div className="value">{product.weight}</div>
                </SpecItem>
              )}
              {product.action && (
                <SpecItem>
                  <div className="label">Action</div>
                  <div className="value">{product.action}</div>
                </SpecItem>
              )}
              {product.finish && (
                <SpecItem>
                  <div className="label">Finish</div>
                  <div className="value">{product.finish}</div>
                </SpecItem>
              )}
              {product.sights && (
                <SpecItem>
                  <div className="label">Sights</div>
                  <div className="value">{product.sights}</div>
                </SpecItem>
              )}
              {product.upc && (
                <SpecItem>
                  <div className="label">UPC</div>
                  <div className="value">{product.upc}</div>
                </SpecItem>
              )}
            </SpecGrid>
          )}

          {activeTab === "features" && product.features && (
            <FeaturesList>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          )}

          {activeTab === "reviews" && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}
            >
              <h3>Customer Reviews Coming Soon</h3>
              <p>
                We're working on implementing a comprehensive review system.
              </p>
            </div>
          )}
        </TabContent>
      </SpecificationTabs>
    </DetailContainer>
  );
};

export default ProductDetail;
