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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ShotgunContainer = styled.div`
  padding: 0;
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

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 30px;
  backdrop-filter: blur(25px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  animation:
    ${fadeIn} 1s ease-out,
    ${float} 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 30px;
    border-radius: 25px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
    border-radius: 20px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #fff, #f0f0f0, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 50px;
  line-height: 1.7;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.18);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.12);
  padding: 35px;
  border-radius: 25px;
  margin-bottom: 40px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  animation: ${fadeIn} 1s ease-out 0.3s both;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 30px 25px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const SearchAndFilters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const SearchInput = styled.input`
  padding: 18px 25px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #f093fb;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 25px rgba(240, 147, 251, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const FilterSelect = styled.select`
  padding: 18px 25px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #f093fb;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  option {
    background: #333;
    color: white;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const ViewControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ViewButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewButton = styled.button`
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  background: ${(props) =>
    props.$active ? "rgba(240, 147, 251, 0.4)" : "rgba(255, 255, 255, 0.15)"};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  font-size: 1rem;

  &:hover {
    background: rgba(240, 147, 251, 0.3);
    border-color: #f093fb;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

const SortSelect = styled(FilterSelect)`
  min-width: 220px;

  @media (max-width: 580px) {
    min-width: 180px;
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
      ? "repeat(auto-fill, minmax(380px, 1fr))"
      : "1fr"};
  gap: ${(props) => (props.$viewMode === "grid" ? "35px" : "25px")};

  @media (max-width: 768px) {
    grid-template-columns: ${(props) =>
      props.$viewMode === "grid"
        ? "repeat(auto-fill, minmax(320px, 1fr))"
        : "1fr"};
    gap: ${(props) => (props.$viewMode === "grid" ? "25px" : "20px")};
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.25);
  transition: all 0.5s ease;
  cursor: pointer;
  backdrop-filter: blur(20px);
  display: ${(props) => (props.$viewMode === "list" ? "flex" : "block")};
  align-items: ${(props) =>
    props.$viewMode === "list" ? "center" : "stretch"};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(240, 147, 251, 0.1),
      rgba(79, 172, 254, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.18);
    border-color: #f093fb;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 580px) {
    display: block;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: ${(props) => (props.$viewMode === "list" ? "180px" : "280px")};
  width: ${(props) => (props.$viewMode === "list" ? "220px" : "100%")};
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 580px) {
    height: 240px;
    width: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.15);
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff0844, #ff6b6b)"
      : props.type === "featured"
        ? "linear-gradient(135deg, #f093fb, #667eea)"
        : "linear-gradient(135deg, #4facfe, #00f2fe)"};
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${pulse} 2s infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProductContent = styled.div`
  padding: 30px;
  flex: 1;
  position: relative;
  z-index: 2;

  @media (max-width: 580px) {
    padding: 25px;
  }
`;

const ProductName = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.3;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ProductManufacturer = styled.div`
  color: #f093fb;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ProductSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin-bottom: 25px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 10px;
  }
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 15px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

const SpecLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const SpecValue = styled.div`
  font-size: 0.9rem;
  color: white;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Price = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  color: #f093fb;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StockStatus = styled.div`
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #00f2fe, #4facfe)"
      : "linear-gradient(135deg, #ff0844, #ff6b6b)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ViewDetailsButton = styled.button`
  flex: 1;
  padding: 15px 25px;
  background: linear-gradient(135deg, #f093fb, #667eea);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #667eea, #f093fb);
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(240, 147, 251, 0.4);
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
`;

const InquireButton = styled.button`
  flex: 1;
  padding: 15px 25px;
  background: linear-gradient(135deg, #ff0844, #f5576c);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #f5576c, #ff0844);
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(255, 8, 68, 0.4);
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const RatingText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptyTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
  font-weight: 800;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 500;
`;

const ShotgunCollection = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const shotguns = state.products.filter(
    (product) => product.category === "shotguns",
  );

  const filteredShotguns = shotguns.filter((shotgun) => {
    const matchesSearch =
      shotgun.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shotgun.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shotgun.gauge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shotgun.action.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterOption === "all") return matchesSearch;
    if (filterOption === "inStock") return matchesSearch && shotgun.inStock;
    if (filterOption === "featured") return matchesSearch && shotgun.featured;
    if (filterOption === "onSale") return matchesSearch && shotgun.onSale;
    return matchesSearch;
  });

  const sortedShotguns = [...filteredShotguns].sort((a, b) => {
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
      case "gauge":
        return a.gauge.localeCompare(b.gauge);
      default:
        return 0;
    }
  });

  const handleViewDetails = (shotgun) => {
    navigate(`/shotgun-detail?id=${shotgun.id}`);
  };

  const handleInquire = (shotgun) => {
    navigate(
      `/contact?product=${encodeURIComponent(shotgun.name)}&category=shotguns`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const inStockCount = shotguns.filter((s) => s.inStock).length;
  const avgRating =
    shotguns.reduce((sum, s) => sum + (s.rating || 0), 0) / shotguns.length;
  const featuredCount = shotguns.filter((s) => s.featured).length;
  const avgPrice =
    shotguns.reduce((sum, s) => sum + s.price, 0) / shotguns.length;

  return (
    <ShotgunContainer>
      <Container>
        <HeroSection>
          <Title>Premium Shotgun Arsenal</Title>
          <Subtitle>
            Explore America's finest shotgun collection featuring legendary
            pump-actions, smooth semi-automatics, elegant over/unders, and
            tactical defenders. From Remington's time-tested 870 to Benelli's
            cutting-edge inertia systems, discover the perfect shotgun for
            hunting, sport shooting, home defense, or competitive clay sports.
            Professional guidance and competitive pricing guaranteed.
          </Subtitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{shotguns.length}</StatNumber>
              <StatLabel>Total Shotguns</StatLabel>
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
              <StatNumber>${Math.round(avgPrice)}</StatNumber>
              <StatLabel>Avg Price</StatLabel>
            </StatCard>
          </StatsGrid>
        </HeroSection>

        <ControlsSection>
          <SearchAndFilters>
            <SearchInput
              type="text"
              placeholder="Search by name, manufacturer, gauge, or action type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="shotgun-search"
            />
            <FilterSelect
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              id="shotgun-filter"
            >
              <option value="all">All Shotguns</option>
              <option value="inStock">In Stock</option>
              <option value="featured">Featured</option>
              <option value="onSale">On Sale</option>
            </FilterSelect>
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              id="shotgun-sort"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="gauge">Gauge</option>
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
          {sortedShotguns.length > 0 ? (
            <ProductsGrid $viewMode={viewMode}>
              {sortedShotguns.map((shotgun) => (
                <ProductCard
                  key={shotgun.id}
                  $viewMode={viewMode}
                  onClick={() => handleViewDetails(shotgun)}
                >
                  <ProductImageContainer $viewMode={viewMode}>
                    <ProductImage
                      src={shotgun.images[0]}
                      alt={shotgun.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                      }}
                    />
                    {shotgun.onSale && (
                      <ProductBadge type="sale">Sale</ProductBadge>
                    )}
                    {shotgun.featured && !shotgun.onSale && (
                      <ProductBadge type="featured">Featured</ProductBadge>
                    )}
                    {!shotgun.inStock && (
                      <ProductBadge type="stock">Out of Stock</ProductBadge>
                    )}
                  </ProductImageContainer>

                  <ProductContent>
                    <ProductManufacturer>
                      {shotgun.manufacturer}
                    </ProductManufacturer>
                    <ProductName>{shotgun.name}</ProductName>
                    <ProductDescription>
                      {shotgun.description}
                    </ProductDescription>

                    <ProductSpecs>
                      <SpecItem>
                        <SpecLabel>Gauge</SpecLabel>
                        <SpecValue>{shotgun.gauge}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Action</SpecLabel>
                        <SpecValue>{shotgun.action}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Barrel</SpecLabel>
                        <SpecValue>{shotgun.barrelLength}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Capacity</SpecLabel>
                        <SpecValue>{shotgun.capacity}</SpecValue>
                      </SpecItem>
                    </ProductSpecs>

                    <ProductFooter>
                      <PriceContainer>
                        <Price>${shotgun.price.toFixed(2)}</Price>
                        {shotgun.originalPrice && (
                          <OriginalPrice>
                            ${shotgun.originalPrice.toFixed(2)}
                          </OriginalPrice>
                        )}
                      </PriceContainer>
                      <StockStatus $inStock={shotgun.inStock}>
                        {shotgun.inStock
                          ? `${shotgun.stock} In Stock`
                          : "Out of Stock"}
                      </StockStatus>
                    </ProductFooter>

                    {shotgun.rating && (
                      <RatingContainer>
                        <Stars>{renderStars(shotgun.rating)}</Stars>
                        <RatingText>
                          {shotgun.rating} ({shotgun.reviews} reviews)
                        </RatingText>
                      </RatingContainer>
                    )}

                    <ActionButtons>
                      <ViewDetailsButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(shotgun);
                        }}
                      >
                        View Details
                      </ViewDetailsButton>
                      <InquireButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInquire(shotgun);
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
              <EmptyTitle>No Shotguns Found</EmptyTitle>
              <EmptyText>
                Try adjusting your search criteria or filters to find the
                shotgun you're looking for.
              </EmptyText>
            </EmptyState>
          )}
        </ProductsContainer>
      </Container>
    </ShotgunContainer>
  );
};

export default ShotgunCollection;
