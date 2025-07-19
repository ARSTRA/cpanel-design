import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { navigate } from "gatsby";
import { useApp } from "../context/AppContext.optimized";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AmmunitionContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  padding: 100px 20px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="2" height="2"><circle cx="1" cy="1" r="0.3" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 40px;
  position: relative;
  z-index: 1;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FilterSection = styled.section`
  background: white;
  padding: 30px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 80px;
  z-index: 100;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e67e22;
    box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
  }

  &:hover {
    border-color: #bdc3c7;
  }
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #e67e22;
    box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
  }

  &::placeholder {
    color: #7f8c8d;
  }
`;

const ProductsSection = styled.section`
  padding: 60px 0;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 240px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductImagePlaceholder = styled.div`
  font-size: 64px;
  color: #bdc3c7;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${(props) =>
    props.$featured
      ? "linear-gradient(135deg, #e67e22 0%, #d35400 100%)"
      : "linear-gradient(135deg, #27ae60 0%, #16a085 100%)"};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductInfo = styled.div`
  padding: 24px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

const ProductPrice = styled.div`
  color: #e67e22;
  font-size: 20px;
  font-weight: 700;
  margin-left: 12px;
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  background: #f8f9fa;
  color: #6c757d;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductDescription = styled.p`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductFeatures = styled.div`
  margin-bottom: 16px;
`;

const Feature = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
  color: #2c3e50;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  margin: 2px 4px 2px 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #ecf0f1;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span`
  color: #f39c12;
  font-size: 14px;
`;

const ReviewCount = styled.span`
  color: #7f8c8d;
  font-size: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 126, 34, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #e67e22;
  border: 2px solid #e67e22;

  &:hover {
    background: #e67e22;
    color: white;
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;

  h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #2c3e50;
  }

  p {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const ClearFiltersButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  }
`;

export default function AmmunitionCollection() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [filterCaliber, setFilterCaliber] = useState("");
  const [filterManufacturer, setFilterManufacturer] = useState("");
  const [filterType, setFilterType] = useState("");

  const ammunition = state.products.filter(
    (product) => product.category === "ammunition",
  );

  const filteredAmmunition = ammunition.filter((ammo) => {
    const matchesSearch =
      ammo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ammo.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCaliber = !filterCaliber || ammo.caliber === filterCaliber;
    const matchesManufacturer =
      !filterManufacturer || ammo.manufacturer === filterManufacturer;
    const matchesType = !filterType || ammo.type === filterType;

    return (
      matchesSearch && matchesCaliber && matchesManufacturer && matchesType
    );
  });

  const sortedAmmunition = [...filteredAmmunition].sort((a, b) => {
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
      case "caliber":
        return a.caliber.localeCompare(b.caliber);
      default:
        return 0;
    }
  });

  const handleViewDetails = (ammo) => {
    navigate(`/ammunition-detail?id=${ammo.id}`);
  };

  const handleInquire = (ammo) => {
    navigate(
      `/contact?product=${encodeURIComponent(ammo.name)}&category=ammunition`,
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>{i < Math.floor(rating) ? "★" : "☆"}</Star>
    ));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCaliber("");
    setFilterManufacturer("");
    setFilterType("");
    setSortOption("name");
  };

  const inStockCount = ammunition.filter((a) => a.inStock).length;
  const avgRating =
    ammunition.reduce((sum, a) => sum + (a.rating || 0), 0) / ammunition.length;
  const featuredCount = ammunition.filter((a) => a.featured).length;
  const avgPrice =
    ammunition.reduce((sum, a) => sum + a.price, 0) / ammunition.length;

  const uniqueCalibers = [...new Set(ammunition.map((a) => a.caliber))].sort();
  const uniqueManufacturers = [
    ...new Set(ammunition.map((a) => a.manufacturer)),
  ].sort();
  const uniqueTypes = [...new Set(ammunition.map((a) => a.type))].sort();

  return (
    <AmmunitionContainer>
      <Container>
        <HeroSection>
          <Title>Premium Ammunition Collection</Title>
          <Subtitle>
            Professional-grade ammunition for training, hunting, and
            self-defense applications
          </Subtitle>

          <StatsGrid>
            <StatCard>
              <StatNumber>{ammunition.length}</StatNumber>
              <StatLabel>Products Available</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{inStockCount}</StatNumber>
              <StatLabel>In Stock</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{featuredCount}</StatNumber>
              <StatLabel>Featured Items</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{avgRating.toFixed(1)}</StatNumber>
              <StatLabel>Avg Rating</StatLabel>
            </StatCard>
          </StatsGrid>
        </HeroSection>
      </Container>

      <FilterSection>
        <Container>
          <FilterGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <SearchInput
                type="text"
                placeholder="Search ammunition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Sort By</FilterLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="caliber">Caliber</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Caliber</FilterLabel>
              <Select
                value={filterCaliber}
                onChange={(e) => setFilterCaliber(e.target.value)}
              >
                <option value="">All Calibers</option>
                {uniqueCalibers.map((caliber) => (
                  <option key={caliber} value={caliber}>
                    {caliber}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Manufacturer</FilterLabel>
              <Select
                value={filterManufacturer}
                onChange={(e) => setFilterManufacturer(e.target.value)}
              >
                <option value="">All Manufacturers</option>
                {uniqueManufacturers.map((manufacturer) => (
                  <option key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Type</FilterLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FilterGroup>
          </FilterGrid>
        </Container>
      </FilterSection>

      <ProductsSection>
        <Container>
          {sortedAmmunition.length === 0 ? (
            <EmptyState>
              <h3>No ammunition found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <ClearFiltersButton onClick={clearFilters}>
                Clear All Filters
              </ClearFiltersButton>
            </EmptyState>
          ) : (
            <ProductsGrid>
              {sortedAmmunition.map((ammo) => (
                <ProductCard
                  key={ammo.id}
                  onClick={() => handleViewDetails(ammo)}
                >
                  <ProductImage>
                    {ammo.images && ammo.images[0] ? (
                      <img src={ammo.images[0]} alt={ammo.name} />
                    ) : (
                      <ProductImagePlaceholder>💥</ProductImagePlaceholder>
                    )}
                    {ammo.featured && (
                      <ProductBadge $featured>Featured</ProductBadge>
                    )}
                    {ammo.onSale && !ammo.featured && (
                      <ProductBadge>On Sale</ProductBadge>
                    )}
                  </ProductImage>

                  <ProductInfo>
                    <ProductHeader>
                      <ProductName>{ammo.name}</ProductName>
                      <ProductPrice>${ammo.price}</ProductPrice>
                    </ProductHeader>

                    <ProductMeta>
                      <MetaItem>{ammo.caliber}</MetaItem>
                      <MetaItem>{ammo.type}</MetaItem>
                      <MetaItem>{ammo.quantity}</MetaItem>
                    </ProductMeta>

                    <ProductDescription>{ammo.description}</ProductDescription>

                    {ammo.features && ammo.features.length > 0 && (
                      <ProductFeatures>
                        {ammo.features.slice(0, 3).map((feature, index) => (
                          <Feature key={index}>{feature}</Feature>
                        ))}
                      </ProductFeatures>
                    )}

                    <ProductFooter>
                      <RatingContainer>
                        <Stars>{renderStars(ammo.rating || 0)}</Stars>
                        <ReviewCount>({ammo.reviews || 0})</ReviewCount>
                      </RatingContainer>

                      <ActionButtons>
                        <SecondaryButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInquire(ammo);
                          }}
                        >
                          Inquire
                        </SecondaryButton>
                        <PrimaryButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(ammo);
                          }}
                        >
                          Details
                        </PrimaryButton>
                      </ActionButtons>
                    </ProductFooter>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
          )}
        </Container>
      </ProductsSection>
    </AmmunitionContainer>
  );
}
