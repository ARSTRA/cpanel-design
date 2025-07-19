import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AccessoryContainer = styled.div`
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #1a1a1a 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 25% 25%,
        rgba(52, 152, 219, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(46, 204, 113, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 80px 50px;
  background: linear-gradient(
    135deg,
    rgba(44, 62, 80, 0.95) 0%,
    rgba(52, 73, 94, 0.95) 50%,
    rgba(44, 62, 80, 0.95) 100%
  );
  border-radius: 20px;
  color: white;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(
        45deg,
        transparent 30%,
        rgba(52, 152, 219, 0.1) 50%,
        transparent 70%
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 100px,
        rgba(255, 255, 255, 0.02) 100px,
        rgba(255, 255, 255, 0.02) 101px
      );
    animation: shimmer 4s infinite linear;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 40px;
  }

  @media (max-width: 480px) {
    padding: 50px 30px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 3;
  letter-spacing: -0.5px;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #bdc3c7;
  margin-bottom: 50px;
  line-height: 1.7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
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
  background: rgba(52, 73, 94, 0.8);
  padding: 30px 25px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
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
      rgba(52, 152, 219, 0.1),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(52, 73, 94, 0.9);
    border-color: #3498db;
    box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #ecf0f1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ControlsSection = styled.div`
  background: rgba(44, 62, 80, 0.9);
  padding: 35px;
  border-radius: 16px;
  margin-bottom: 40px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(52, 152, 219, 0.2);
  animation: ${fadeIn} 1s ease-out 0.3s both;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

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
  padding: 16px 20px;
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 8px;
  background: rgba(52, 73, 94, 0.8);
  color: #ecf0f1;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &::placeholder {
    color: #bdc3c7;
  }

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(52, 73, 94, 0.9);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  @media (max-width: 480px) {
    padding: 14px 18px;
    font-size: 0.95rem;
  }
`;

const FilterSelect = styled.select`
  padding: 16px 20px;
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 8px;
  background: rgba(52, 73, 94, 0.8);
  color: #ecf0f1;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(52, 73, 94, 0.9);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  option {
    background: #2c3e50;
    color: #ecf0f1;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    padding: 14px 18px;
    font-size: 0.95rem;
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
  padding: 14px 20px;
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 8px;
  background: ${(props) =>
    props.$active ? "rgba(52, 152, 219, 0.8)" : "rgba(52, 73, 94, 0.8)"};
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${(props) =>
      props.$active ? "rgba(52, 152, 219, 0.9)" : "rgba(52, 152, 219, 0.6)"};
    border-color: #3498db;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.85rem;
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
  background: rgba(44, 62, 80, 0.9);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(52, 152, 219, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(15px);
  display: ${(props) => (props.$viewMode === "list" ? "flex" : "block")};
  align-items: ${(props) =>
    props.$viewMode === "list" ? "center" : "stretch"};
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(52, 152, 219, 0.1),
      rgba(46, 204, 113, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    background: rgba(52, 73, 94, 0.95);
    border-color: #3498db;

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
  top: 15px;
  right: 15px;
  background: ${(props) =>
    props.type === "sale"
      ? "#e74c3c"
      : props.type === "featured"
        ? "#f39c12"
        : "#7f8c8d"};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
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
  color: #ecf0f1;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProductManufacturer = styled.div`
  color: #3498db;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductType = styled.div`
  color: #2ecc71;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductDescription = styled.p`
  color: #bdc3c7;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.9rem;
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
  background: rgba(52, 73, 94, 0.8);
  padding: 10px 14px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(52, 152, 219, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

const SpecLabel = styled.div`
  font-size: 0.7rem;
  color: #95a5a6;
  margin-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const SpecValue = styled.div`
  font-size: 0.8rem;
  color: #ecf0f1;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.75rem;
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
  font-size: 1.4rem;
  font-weight: 700;
  color: #2ecc71;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: #95a5a6;
  text-decoration: line-through;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StockStatus = styled.div`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => (props.$inStock ? "#27ae60" : "#e74c3c")};
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.7rem;
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
  padding: 12px 20px;
  background: rgba(52, 152, 219, 0.8);
  color: white;
  border: 1px solid #3498db;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.85rem;
  }
`;

const InquireButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: rgba(46, 204, 113, 0.8);
  color: white;
  border: 1px solid #2ecc71;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #2ecc71;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.3);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.85rem;
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
  padding: 80px 20px;
  color: #bdc3c7;
`;

const EmptyTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ecf0f1;
  font-weight: 600;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 400;
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
          <Title>Tactical Accessories & Optics</Title>
          <Subtitle>
            Professional-grade firearm accessories for law enforcement,
            military, competitive shooters, and hunters. From precision optics
            and tactical lighting to advanced ergonomic enhancements - we
            provide mission-critical gear from industry leaders like Vortex,
            Aimpoint, EOTech, and Magpul.
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
              <option key="all" value="all">
                All Accessories
              </option>
              <option key="inStock" value="inStock">
                In Stock
              </option>
              <option key="featured" value="featured">
                Featured
              </option>
              <option key="onSale" value="onSale">
                On Sale
              </option>
            </FilterSelect>
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              id="accessory-sort"
            >
              <option key="name" value="name">
                Sort by Name
              </option>
              <option key="price-low" value="price-low">
                Price: Low to High
              </option>
              <option key="price-high" value="price-high">
                Price: High to Low
              </option>
              <option key="rating" value="rating">
                Highest Rated
              </option>
              <option key="manufacturer" value="manufacturer">
                Manufacturer
              </option>
              <option key="type" value="type">
                Type
              </option>
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
