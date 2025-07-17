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

const RifleContainer = styled.div`
  padding: 0;
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

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding: 60px 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    padding: 40px 20px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
    border-radius: 15px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 40px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const SearchAndFilters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SearchInput = styled.input`
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
`;

const FilterSelect = styled.select`
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4ecdc4;
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #333;
    color: white;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
`;

const ViewControls = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ViewButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewButton = styled.button`
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: ${(props) =>
    props.$active ? "rgba(78, 205, 196, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: rgba(78, 205, 196, 0.2);
    border-color: #4ecdc4;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
`;

const SortSelect = styled(FilterSelect)`
  min-width: 200px;

  @media (max-width: 580px) {
    min-width: 150px;
    width: 100%;
  }
`;

const ProductsContainer = styled.div`
  animation: ${fadeIn} 1s ease-out 0.6s both;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$viewMode === "grid"
      ? "repeat(auto-fill, minmax(350px, 1fr))"
      : "1fr"};
  gap: ${(props) => (props.$viewMode === "grid" ? "30px" : "20px")};

  @media (max-width: 768px) {
    grid-template-columns: ${(props) =>
      props.$viewMode === "grid"
        ? "repeat(auto-fill, minmax(300px, 1fr))"
        : "1fr"};
    gap: ${(props) => (props.$viewMode === "grid" ? "20px" : "15px")};
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
  backdrop-filter: blur(15px);
  display: ${(props) => (props.$viewMode === "list" ? "flex" : "block")};
  align-items: ${(props) =>
    props.$viewMode === "list" ? "center" : "stretch"};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
    border-color: #4ecdc4;
  }

  @media (max-width: 580px) {
    display: block;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: ${(props) => (props.$viewMode === "list" ? "150px" : "250px")};
  width: ${(props) => (props.$viewMode === "list" ? "200px" : "100%")};
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 580px) {
    height: 200px;
    width: 100%;
  }
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
  top: 15px;
  right: 15px;
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff6b6b, #ff8e8e)"
      : props.type === "featured"
        ? "linear-gradient(135deg, #4ecdc4, #44a08d)"
        : "linear-gradient(135deg, #45b7d1, #3498db)"};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${pulse} 2s infinite;
`;

const ProductContent = styled.div`
  padding: 25px;
  flex: 1;

  @media (max-width: 580px) {
    padding: 20px;
  }
`;

const ProductName = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProductManufacturer = styled.div`
  color: #4ecdc4;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProductSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 6px 10px;
  }
`;

const SpecLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SpecValue = styled.div`
  font-size: 0.85rem;
  color: white;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #4ecdc4;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StockStatus = styled.div`
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #96ceb4, #52c234)"
      : "linear-gradient(135deg, #ff6b6b, #ff5252)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 0.75rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ViewDetailsButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #44a08d, #4ecdc4);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(78, 205, 196, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

const InquireButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff8e8e, #ff6b6b);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1rem;
`;

const RatingText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptyTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: white;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const RifleCollection = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const rifles = state.products.filter(
    (product) => product.category === "rifles",
  );

  const filteredRifles = rifles.filter((rifle) => {
    const matchesSearch =
      rifle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rifle.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rifle.caliber.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterOption === "all") return matchesSearch;
    if (filterOption === "inStock") return matchesSearch && rifle.inStock;
    if (filterOption === "featured") return matchesSearch && rifle.featured;
    if (filterOption === "onSale") return matchesSearch && rifle.onSale;
    return matchesSearch;
  });

  const sortedRifles = [...filteredRifles].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "manufacturer":
        return a.manufacturer.localeCompare(b.manufacturer);
      default:
        return 0;
    }
  });

  const handleViewDetails = (rifle) => {
    navigate(`/rifle-detail?id=${rifle.id}`);
  };

  const handleBuyNow = (rifle) => {
    navigate(
      `/contact?product=${encodeURIComponent(rifle.name)}&category=rifles`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const inStockCount = rifles.filter((r) => r.inStock).length;
  const avgRating =
    rifles.reduce((sum, r) => sum + (r.rating || 0), 0) / rifles.length;
  const featuredCount = rifles.filter((r) => r.featured).length;

  return (
    <RifleContainer>
      <Container>
        <HeroSection>
          <Title>Professional Rifle Collection</Title>
          <Subtitle>
            Discover America's finest rifles for hunting, sport shooting, and
            precision marksmanship. From classic bolt-actions to modern
            semi-automatics, we offer premium firearms from trusted
            manufacturers with professional guidance and competitive pricing.
          </Subtitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{rifles.length}</StatNumber>
              <StatLabel>Total Rifles</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{inStockCount}</StatNumber>
              <StatLabel>In Stock</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{avgRating.toFixed(1)}</StatNumber>
              <StatLabel>Avg Rating</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{featuredCount}</StatNumber>
              <StatLabel>Featured</StatLabel>
            </StatCard>
          </StatsGrid>
        </HeroSection>

        <ControlsSection>
          <SearchAndFilters>
            <SearchInput
              type="text"
              placeholder="Search rifles by name, manufacturer, or caliber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="rifle-search"
            />
            <FilterSelect
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              id="rifle-filter"
            >
              <option value="all">All Rifles</option>
              <option value="inStock">In Stock</option>
              <option value="featured">Featured</option>
              <option value="onSale">On Sale</option>
            </FilterSelect>
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              id="rifle-sort"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="manufacturer">Manufacturer</option>
            </SortSelect>
          </SearchAndFilters>

          <ViewControls>
            <ViewButtons>
              <ViewButton
                $active={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </ViewButton>
              <ViewButton
                $active={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                List View
              </ViewButton>
            </ViewButtons>
          </ViewControls>
        </ControlsSection>

        <ProductsContainer>
          {sortedRifles.length > 0 ? (
            <ProductsGrid $viewMode={viewMode}>
              {sortedRifles.map((rifle) => (
                <ProductCard
                  key={rifle.id}
                  $viewMode={viewMode}
                  onClick={() => handleViewDetails(rifle)}
                >
                  <ProductImageContainer $viewMode={viewMode}>
                    <ProductImage
                      src={rifle.images[0]}
                      alt={rifle.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                      }}
                    />
                    {rifle.onSale && (
                      <ProductBadge type="sale">Sale</ProductBadge>
                    )}
                    {rifle.featured && !rifle.onSale && (
                      <ProductBadge type="featured">Featured</ProductBadge>
                    )}
                    {!rifle.inStock && (
                      <ProductBadge type="stock">Out of Stock</ProductBadge>
                    )}
                  </ProductImageContainer>

                  <ProductContent>
                    <ProductManufacturer>
                      {rifle.manufacturer}
                    </ProductManufacturer>
                    <ProductName>{rifle.name}</ProductName>
                    <ProductDescription>{rifle.description}</ProductDescription>

                    <ProductSpecs>
                      <SpecItem>
                        <SpecLabel>Caliber</SpecLabel>
                        <SpecValue>{rifle.caliber}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Action</SpecLabel>
                        <SpecValue>{rifle.action}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Barrel</SpecLabel>
                        <SpecValue>{rifle.barrelLength}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Weight</SpecLabel>
                        <SpecValue>{rifle.weight}</SpecValue>
                      </SpecItem>
                    </ProductSpecs>

                    <ProductFooter>
                      <PriceContainer>
                        <Price>${rifle.price.toFixed(2)}</Price>
                        {rifle.originalPrice && (
                          <OriginalPrice>
                            ${rifle.originalPrice.toFixed(2)}
                          </OriginalPrice>
                        )}
                      </PriceContainer>
                      <StockStatus $inStock={rifle.inStock}>
                        {rifle.inStock
                          ? `${rifle.stock} In Stock`
                          : "Out of Stock"}
                      </StockStatus>
                    </ProductFooter>

                    {rifle.rating && (
                      <RatingContainer>
                        <Stars>{renderStars(rifle.rating)}</Stars>
                        <RatingText>
                          {rifle.rating} ({rifle.reviews} reviews)
                        </RatingText>
                      </RatingContainer>
                    )}

                    <ActionButtons>
                      <ViewDetailsButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(rifle);
                        }}
                      >
                        View Details
                      </ViewDetailsButton>
                      <InquireButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(rifle);
                        }}
                      >
                        Buy Now
                      </InquireButton>
                    </ActionButtons>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          ) : (
            <EmptyState>
              <EmptyTitle>No Rifles Found</EmptyTitle>
              <EmptyText>
                Try adjusting your search criteria or filters to find the rifle
                you're looking for.
              </EmptyText>
            </EmptyState>
          )}
        </ProductsContainer>
      </Container>
    </RifleContainer>
  );
};

export default RifleCollection;
