import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AccessoryContainer = styled.div`
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  padding: 100px 50px;
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: conic-gradient(
      from 0deg,
      rgba(255, 154, 158, 0.1),
      rgba(254, 207, 239, 0.1),
      rgba(168, 237, 234, 0.1),
      rgba(254, 214, 227, 0.1),
      rgba(255, 154, 158, 0.1)
    );
    animation: ${rotate} 30s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
  }

  @media (max-width: 768px) {
    padding: 80px 40px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 60px 30px;
    border-radius: 25px;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 30px;
  background: linear-gradient(
    135deg,
    #ff9a9e,
    #fecfef,
    #a8edea,
    #fed6e3,
    #667eea
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbow 8s ease infinite;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 60px;
  line-height: 1.8;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  margin-top: 50px;
  position: relative;
  z-index: 3;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 35px 30px;
  border-radius: 25px;
  text-align: center;
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
  backdrop-filter: blur(20px);
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
    transition: left 0.8s;
  }

  &:hover {
    transform: translateY(-12px) scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 12px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    font-size: 2.3rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ControlsSection = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 30px;
  margin-bottom: 40px;
  backdrop-filter: blur(25px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 1s ease-out 0.3s both;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 35px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
  }
`;

const SearchAndFilters = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 30px;
  margin-bottom: 35px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SearchInput = styled.input`
  padding: 20px 30px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.4s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: none;
    border-color: #ff9a9e;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 30px rgba(255, 154, 158, 0.5);
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    padding: 18px 25px;
    font-size: 1.1rem;
  }
`;

const FilterSelect = styled.select`
  padding: 20px 30px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;

  &:focus {
    outline: none;
    border-color: #ff9a9e;
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }

  option {
    background: #333;
    color: white;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    padding: 18px 25px;
    font-size: 1.1rem;
  }
`;

const ViewControls = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ViewButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ViewButton = styled.button`
  padding: 18px 25px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background: ${(props) =>
    props.$active ? "rgba(255, 154, 158, 0.5)" : "rgba(255, 255, 255, 0.2)"};
  color: white;
  cursor: pointer;
  transition: all 0.4s ease;
  font-weight: 800;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 154, 158, 0.4);
    border-color: #ff9a9e;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 154, 158, 0.3);
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 1rem;
  }
`;

const SortSelect = styled(FilterSelect)`
  min-width: 240px;

  @media (max-width: 580px) {
    min-width: 200px;
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
      ? "repeat(auto-fill, minmax(400px, 1fr))"
      : "1fr"};
  gap: ${(props) => (props.$viewMode === "grid" ? "40px" : "30px")};

  @media (max-width: 768px) {
    grid-template-columns: ${(props) =>
      props.$viewMode === "grid"
        ? "repeat(auto-fill, minmax(340px, 1fr))"
        : "1fr"};
    gap: ${(props) => (props.$viewMode === "grid" ? "30px" : "25px")};
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.6s ease;
  cursor: pointer;
  backdrop-filter: blur(25px);
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
      rgba(255, 154, 158, 0.1),
      rgba(254, 207, 239, 0.1),
      rgba(168, 237, 234, 0.1)
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 35px 70px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.22);
    border-color: #ff9a9e;

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
  height: ${(props) => (props.$viewMode === "list" ? "200px" : "300px")};
  width: ${(props) => (props.$viewMode === "list" ? "250px" : "100%")};
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 580px) {
    height: 260px;
    width: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ProductCard}:hover & {
    transform: scale(1.2);
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff9a9e, #fecfef)"
      : props.type === "featured"
        ? "linear-gradient(135deg, #a8edea, #fed6e3)"
        : "linear-gradient(135deg, #667eea, #764ba2)"};
  color: white;
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${pulse} 2s infinite;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const ProductContent = styled.div`
  padding: 35px;
  flex: 1;
  position: relative;
  z-index: 2;

  @media (max-width: 580px) {
    padding: 30px;
  }
`;

const ProductName = styled.h3`
  color: white;
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 15px;
  line-height: 1.3;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const ProductManufacturer = styled.div`
  color: #ff9a9e;
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const ProductType = styled.div`
  color: #a8edea;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }
`;

const SpecItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 18px;
  border-radius: 15px;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);

  @media (max-width: 480px) {
    padding: 10px 15px;
  }
`;

const SpecLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

const SpecValue = styled.div`
  font-size: 0.95rem;
  color: white;
  font-weight: 800;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  color: #ff9a9e;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StockStatus = styled.div`
  padding: 10px 18px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 800;
  background: ${(props) =>
    props.$inStock
      ? "linear-gradient(135deg, #a8edea, #fed6e3)"
      : "linear-gradient(135deg, #ff9a9e, #fecfef)"};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 0.85rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ViewDetailsButton = styled.button`
  flex: 1;
  padding: 18px 30px;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #fecfef, #ff9a9e);
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(255, 154, 158, 0.5);
  }

  @media (max-width: 480px) {
    padding: 15px 25px;
    font-size: 1rem;
  }
`;

const InquireButton = styled.button`
  flex: 1;
  padding: 18px 30px;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, #fed6e3, #a8edea);
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(168, 237, 234, 0.5);
  }

  @media (max-width: 480px) {
    padding: 15px 25px;
    font-size: 1rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

const RatingText = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  font-weight: 700;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 120px 20px;
  color: rgba(255, 255, 255, 0.9);
`;

const EmptyTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: white;
  font-weight: 900;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  font-weight: 600;
`;

const AccessoryCollection = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const accessories = state.products.filter(
    (product) => product.category === "accessories",
  );

  const filteredAccessories = accessories.filter((accessory) => {
    const matchesSearch =
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterOption === "all") return matchesSearch;
    if (filterOption === "inStock") return matchesSearch && accessory.inStock;
    if (filterOption === "featured") return matchesSearch && accessory.featured;
    if (filterOption === "onSale") return matchesSearch && accessory.onSale;
    return matchesSearch;
  });

  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
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
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const handleViewDetails = (accessory) => {
    navigate(`/accessory-detail?id=${accessory.id}`);
  };

  const handleInquire = (accessory) => {
    navigate(
      `/contact?product=${encodeURIComponent(accessory.name)}&category=accessories`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const inStockCount = accessories.filter((a) => a.inStock).length;
  const avgRating =
    accessories.reduce((sum, a) => sum + (a.rating || 0), 0) /
    accessories.length;
  const featuredCount = accessories.filter((a) => a.featured).length;

  return (
    <AccessoryContainer>
      <Container>
        <HeroSection>
          <Title>Premium Firearm Accessories</Title>
          <Subtitle>
            Enhance your shooting experience with our comprehensive collection
            of premium firearm accessories. From precision optics and tactical
            lights to ergonomic stocks and professional-grade cases, we offer
            the finest accessories from trusted manufacturers like Vortex,
            Aimpoint, Surefire, Magpul, and Trijicon. Whether you're upgrading
            for competition, hunting, or tactical applications, find the perfect
            accessories to maximize your firearm's potential and performance.
          </Subtitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{accessories.length}</StatNumber>
              <StatLabel>Total Accessories</StatLabel>
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
              placeholder="Search by name, manufacturer, or accessory type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="accessory-search"
            />
            <FilterSelect
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              id="accessory-filter"
            >
              <option value="all">All Accessories</option>
              <option value="inStock">In Stock</option>
              <option value="featured">Featured</option>
              <option value="onSale">On Sale</option>
            </FilterSelect>
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              id="accessory-sort"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="type">Type</option>
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
          {sortedAccessories.length > 0 ? (
            <ProductsGrid $viewMode={viewMode}>
              {sortedAccessories.map((accessory) => (
                <ProductCard
                  key={accessory.id}
                  $viewMode={viewMode}
                  onClick={() => handleViewDetails(accessory)}
                >
                  <ProductImageContainer $viewMode={viewMode}>
                    <ProductImage
                      src={accessory.images[0]}
                      alt={accessory.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=400&h=300&fit=crop";
                      }}
                    />
                    {accessory.onSale && (
                      <ProductBadge type="sale">Sale</ProductBadge>
                    )}
                    {accessory.featured && !accessory.onSale && (
                      <ProductBadge type="featured">Featured</ProductBadge>
                    )}
                    {!accessory.inStock && (
                      <ProductBadge type="stock">Out of Stock</ProductBadge>
                    )}
                  </ProductImageContainer>

                  <ProductContent>
                    <ProductManufacturer>
                      {accessory.manufacturer}
                    </ProductManufacturer>
                    <ProductType>{accessory.type}</ProductType>
                    <ProductName>{accessory.name}</ProductName>
                    <ProductDescription>
                      {accessory.description}
                    </ProductDescription>

                    <ProductSpecs>
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
                      {accessory.material && (
                        <SpecItem>
                          <SpecLabel>Material</SpecLabel>
                          <SpecValue>{accessory.material}</SpecValue>
                        </SpecItem>
                      )}
                      <SpecItem>
                        <SpecLabel>Weight</SpecLabel>
                        <SpecValue>{accessory.weight}</SpecValue>
                      </SpecItem>
                    </ProductSpecs>

                    <ProductFooter>
                      <PriceContainer>
                        <Price>${accessory.price.toFixed(2)}</Price>
                        {accessory.originalPrice && (
                          <OriginalPrice>
                            ${accessory.originalPrice.toFixed(2)}
                          </OriginalPrice>
                        )}
                      </PriceContainer>
                      <StockStatus $inStock={accessory.inStock}>
                        {accessory.inStock
                          ? `${accessory.stock} In Stock`
                          : "Out of Stock"}
                      </StockStatus>
                    </ProductFooter>

                    {accessory.rating && (
                      <RatingContainer>
                        <Stars>{renderStars(accessory.rating)}</Stars>
                        <RatingText>
                          {accessory.rating} ({accessory.reviews} reviews)
                        </RatingText>
                      </RatingContainer>
                    )}

                    <ActionButtons>
                      <ViewDetailsButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(accessory);
                        }}
                      >
                        View Details
                      </ViewDetailsButton>
                      <InquireButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInquire(accessory);
                        }}
                      >
                        BUY
                      </InquireButton>
                    </ActionButtons>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
          ) : (
            <EmptyState>
              <EmptyTitle>No Accessories Found</EmptyTitle>
              <EmptyText>
                Try adjusting your search criteria or filters to find the
                accessories you're looking for.
              </EmptyText>
            </EmptyState>
          )}
        </ProductsContainer>
      </Container>
    </AccessoryContainer>
  );
};

export default AccessoryCollection;
