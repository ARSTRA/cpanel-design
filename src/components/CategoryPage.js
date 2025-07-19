import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext.optimized";

const CategoryContainer = styled.div`
  padding: 40px 20px;
  min-height: 60vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const CategoryTitle = styled.h1`
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

const CategoryDescription = styled.p`
  font-size: 18px;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FiltersSection = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
  }
`;

const Select = styled.select`
  padding: 10px 15px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 250px;
  background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: #7f8c8d;
  position: relative;
  overflow: hidden;

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

const StockBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${(props) => (props.$inStock ? "#27ae60" : "#e74c3c")};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const ProductInfo = styled.div`
  padding: 25px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 15px;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 12px;
  color: #7f8c8d;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &.primary {
    background: #3498db;
    color: white;
  }

  &.secondary {
    background: #ecf0f1;
    color: #2c3e50;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #7f8c8d;

  h3 {
    margin: 0 0 15px 0;
    font-size: 24px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;

const ResultsCount = styled.div`
  margin-bottom: 20px;
  color: #7f8c8d;
  font-size: 14px;
`;

const categoryDescriptions = {
  handguns:
    "Explore our selection of quality handguns perfect for personal protection, sport shooting, and collecting.",
  rifles:
    "Discover precision rifles for hunting, target shooting, and tactical applications from trusted manufacturers.",
  shotguns:
    "Browse our range of shotguns ideal for hunting, home defense, and clay shooting sports.",
  accessories:
    "Find the perfect accessories to complement your firearms - from optics to holsters and more.",
  ammunition:
    "Quality ammunition for all your shooting needs, available in various calibers and configurations.",
};

export default function CategoryPage({ category = "handguns" }) {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products by category and search term
  const filteredProducts = state.products.filter((product) => {
    const matchesCategory = product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "in-stock" && product.stock > 0) ||
      (filterBy === "featured" && product.featured);

    return matchesCategory && matchesSearch && matchesFilter;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleInquiry = (product) => {
    // Create mailto link for inquiry
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in learning more about the ${product.name} (Price: $${product.price}).\n\nPlease provide more details.\n\nThank you!`;
    const mailtoLink = `mailto:${state.siteSettings.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <CategoryContainer>
      <Container>
        <Header>
          <CategoryTitle>{category}</CategoryTitle>
          <CategoryDescription>
            {categoryDescriptions[category] ||
              `Browse our ${category} collection.`}
          </CategoryDescription>
        </Header>

        <FiltersSection>
          <FilterGroup>
            <label htmlFor="category-search">Search</label>
            <SearchInput
              id="category-search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <label htmlFor="category-filter">Filter</label>
            <Select
              id="category-filter"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option key="all" value="all">
                All Products
              </option>
              <option key="in-stock" value="in-stock">
                In Stock
              </option>
              <option key="featured" value="featured">
                Featured
              </option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label htmlFor="category-sort">Sort By</label>
            <Select
              id="category-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Select>
          </FilterGroup>
        </FiltersSection>

        {sortedProducts.length > 0 && (
          <ResultsCount>
            Showing {sortedProducts.length} of{" "}
            {state.products.filter((p) => p.category === category).length}{" "}
            products
          </ResultsCount>
        )}

        {sortedProducts.length === 0 ? (
          <EmptyState>
            <h3>No Products Found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </EmptyState>
        ) : (
          <ProductsGrid>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage>
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1544717684-4b0c7db5b03a?w=600&h=400&fit=crop&auto=format&q=80)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                  <StockBadge $inStock={product.stock > 0}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </StockBadge>
                </ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductMeta>
                    <span>Stock: {product.stock}</span>
                    <span>{product.featured ? "Featured" : ""}</span>
                  </ProductMeta>
                  <ActionButtons>
                    <ActionButton
                      className="primary"
                      onClick={() => handleInquiry(product)}
                    >
                      Inquire
                    </ActionButton>
                    <ActionButton className="secondary">Details</ActionButton>
                  </ActionButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        )}
      </Container>
    </CategoryContainer>
  );
}
