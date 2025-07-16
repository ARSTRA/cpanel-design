import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const HandgunContainer = styled.div`
  padding: 0;
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
  animation: gradientShift 15s ease infinite;

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
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out;
`;

const MainTitle = styled.h1`
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #ff6b6b,
    #4ecdc4,
    #45b7d1,
    #96ceb4,
    #ffeaa7
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.1;
`;

const SubTitle = styled.p`
  font-size: clamp(18px, 3vw, 24px);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 40px auto;
  line-height: 1.6;
  font-weight: 500;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px 35px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 32px;
    font-weight: 800;
    color: #fff;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 700;
    color: #2c3e50;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SearchInput = styled.input`
  padding: 15px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
`;

const Select = styled.select`
  padding: 15px 20px;
  border: 2px solid #e1e8ed;
  border-radius: 15px;
  font-size: 16px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const ResultsCount = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
`;

const ViewToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 5px;
  backdrop-filter: blur(10px);
`;

const ViewButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  color: ${(props) => (props.active ? "#2c3e50" : "rgba(255, 255, 255, 0.8)")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.viewMode === "grid" ? "repeat(auto-fit, minmax(380px, 1fr))" : "1fr"};
  gap: 30px;
  animation: ${fadeIn} 1s ease-out 0.4s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  display: ${(props) => (props.viewMode === "list" ? "flex" : "block")};

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
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

const ProductImageContainer = styled.div`
  position: relative;
  width: ${(props) => (props.viewMode === "list" ? "300px" : "100%")};
  height: ${(props) => (props.viewMode === "list" ? "200px" : "280px")};
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductImagePlaceholder = styled.div`
  font-size: 64px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Badge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &.featured {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
  }

  &.sale {
    background: linear-gradient(135deg, #00b894, #00a085);
    color: white;
    animation: ${pulse} 2s infinite;
  }

  &.in-stock {
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
  }

  &.out-stock {
    background: linear-gradient(135deg, #636e72, #2d3436);
    color: white;
  }
`;

const PriceContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 10px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CurrentPrice = styled.div`
  color: #00b894;
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
`;

const OriginalPrice = styled.div`
  color: #b2bec3;
  font-size: 14px;
  text-decoration: line-through;
  margin-top: 2px;
`;

const ProductInfo = styled.div`
  padding: 30px;
  flex: 1;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 15px;
  gap: 15px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
`;

const Manufacturer = styled.div`
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

const Stars = styled.div`
  color: #f39c12;
  font-size: 16px;
`;

const ReviewCount = styled.div`
  color: #7f8c8d;
  font-size: 14px;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
`;

const SpecItem = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #e9ecef;

  .label {
    font-size: 11px;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .value {
    font-size: 13px;
    color: #2c3e50;
    font-weight: 700;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.9);
    color: #2c3e50;
    border: 2px solid #e9ecef;

    &:hover {
      background: #667eea;
      color: white;
      border-color: #667eea;
      transform: translateY(-2px);
    }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  h3 {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 15px 0;
    font-size: 28px;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 18px;
  }
`;

export default function HandgunCollection() {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Filter handgun products
  const handgunProducts = state.products.filter(
    (product) => product.category === "handguns",
  );

  const filteredProducts = handgunProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.caliber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "in-stock" && product.stock > 0) ||
      (filterBy === "featured" && product.featured) ||
      (filterBy === "on-sale" && product.onSale);

    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "manufacturer":
        return (a.manufacturer || "").localeCompare(b.manufacturer || "");
      default:
        return 0;
    }
  });

  const handleInquiry = (product) => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in learning more about the ${product.name} (${product.manufacturer}) - $${product.price}.\n\nPlease provide more details including:\n- Availability\n- Background check requirements\n- Transfer process\n- Additional accessories\n\nThank you!`;
    const mailtoLink = `mailto:${state.siteSettings.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const handleViewDetails = (productId) => {
    navigate(`/handgun-detail?id=${productId}`);
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

  const totalInStock = handgunProducts.filter((p) => p.stock > 0).length;
  const featuredCount = handgunProducts.filter((p) => p.featured).length;
  const onSaleCount = handgunProducts.filter((p) => p.onSale).length;

  return (
    <HandgunContainer>
      <Container>
        <HeroSection>
          <MainTitle>Premium Handgun Collection</MainTitle>
          <SubTitle>
            Discover our carefully curated selection of premium handguns from
            the world's most trusted manufacturers. Each firearm is backed by
            our commitment to quality, safety, and exceptional service.
          </SubTitle>
          <StatsContainer>
            <StatCard>
              <h3>{handgunProducts.length}</h3>
              <p>Total Models</p>
            </StatCard>
            <StatCard>
              <h3>{totalInStock}</h3>
              <p>In Stock</p>
            </StatCard>
            <StatCard>
              <h3>{featuredCount}</h3>
              <p>Featured</p>
            </StatCard>
            <StatCard>
              <h3>{onSaleCount}</h3>
              <p>On Sale</p>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        <FiltersSection>
          <FiltersGrid>
            <FilterGroup>
              <label>Search Handguns</label>
              <SearchInput
                type="text"
                placeholder="Search by name, manufacturer, caliber..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <label>Filter By</label>
              <Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Handguns</option>
                <option value="in-stock">In Stock</option>
                <option value="featured">Featured</option>
                <option value="on-sale">On Sale</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <label>Sort By</label>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name A-Z</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </Select>
            </FilterGroup>
          </FiltersGrid>
        </FiltersSection>

        <ResultsHeader>
          <ResultsCount>
            Showing {sortedProducts.length} of {handgunProducts.length} handguns
          </ResultsCount>
          <ViewToggle>
            <ViewButton
              active={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </ViewButton>
            <ViewButton
              active={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              List
            </ViewButton>
          </ViewToggle>
        </ResultsHeader>

        {sortedProducts.length === 0 ? (
          <EmptyState>
            <h3>No Handguns Found</h3>
            <p>
              Try adjusting your search or filter criteria to find the perfect
              handgun.
            </p>
          </EmptyState>
        ) : (
          <ProductsGrid viewMode={viewMode}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} viewMode={viewMode}>
                <ProductImageContainer viewMode={viewMode}>
                  {product.images &&
                  product.images[0] !== "/api/placeholder/400/300" ? (
                    <ProductImage src={product.images[0]} alt={product.name} />
                  ) : (
                    <ProductImagePlaceholder>🔫</ProductImagePlaceholder>
                  )}

                  <BadgeContainer>
                    {product.featured && (
                      <Badge className="featured">Featured</Badge>
                    )}
                    {product.onSale && <Badge className="sale">Sale</Badge>}
                    <Badge
                      className={product.stock > 0 ? "in-stock" : "out-stock"}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </BadgeContainer>

                  <PriceContainer>
                    <CurrentPrice>${product.price}</CurrentPrice>
                    {product.originalPrice && (
                      <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    )}
                  </PriceContainer>
                </ProductImageContainer>

                <ProductInfo>
                  <ProductHeader>
                    <div>
                      <Manufacturer>{product.manufacturer}</Manufacturer>
                      <ProductName>{product.name}</ProductName>
                    </div>
                  </ProductHeader>

                  {product.rating && (
                    <Rating>
                      <Stars>{renderStars(product.rating)}</Stars>
                      <ReviewCount>({product.reviews} reviews)</ReviewCount>
                    </Rating>
                  )}

                  <Description>{product.description}</Description>

                  <SpecsGrid>
                    <SpecItem>
                      <div className="label">Caliber</div>
                      <div className="value">{product.caliber || "N/A"}</div>
                    </SpecItem>
                    <SpecItem>
                      <div className="label">Capacity</div>
                      <div className="value">{product.capacity || "N/A"}</div>
                    </SpecItem>
                    <SpecItem>
                      <div className="label">Barrel</div>
                      <div className="value">
                        {product.barrelLength || "N/A"}
                      </div>
                    </SpecItem>
                    <SpecItem>
                      <div className="label">Weight</div>
                      <div className="value">{product.weight || "N/A"}</div>
                    </SpecItem>
                  </SpecsGrid>

                  <ActionButtons>
                    <ActionButton
                      className="primary"
                      onClick={() => handleInquiry(product)}
                    >
                      Inquire Now
                    </ActionButton>
                    <ActionButton className="secondary">
                      View Details
                    </ActionButton>
                  </ActionButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </Container>
    </HandgunContainer>
  );
}
