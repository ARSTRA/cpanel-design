import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { AppProvider, useApp } from "../context/AppContext";
import Layout from "../components/Layout";

const SearchContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f093fb 0%,
    #f5576c 25%,
    #667eea 50%,
    #764ba2 100%
  );
  padding-top: 100px;
  padding-bottom: 50px;
`;

const SearchContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SearchHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const SearchTitle = styled.h1`
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SearchQuery = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ResultsCount = styled.div`
  color: #00b894;
  font-size: 16px;
  font-weight: 600;
`;

const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.8)"};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid ${(props) => (props.active ? "transparent" : "#e1e8ed")};
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

const SortSelect = styled.select`
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 15px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.div`
  height: 250px;
  background: ${(props) =>
    props.image
      ? `url(${props.image}) center/cover`
      : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  }
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${(props) =>
    props.type === "sale"
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
      : props.type === "new"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 25px;
`;

const ProductCategory = styled.div`
  color: #667eea;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductSpecs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 12px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #f1f1f1;

  .label {
    color: #7f8c8d;
    font-weight: 600;
  }

  .value {
    color: #2c3e50;
    font-weight: 700;
  }
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CurrentPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #00b894;
`;

const OriginalPrice = styled.div`
  font-size: 16px;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #f39c12;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #00b894 0%, #00a085 100%)"};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
  }
`;

function SearchResults() {
  const { state } = useApp();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");

  const performSearch = useCallback(
    (query) => {
      const searchTerm = query.toLowerCase();
      let results = state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.manufacturer.toLowerCase().includes(searchTerm) ||
          product.caliber?.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      );

      // Apply category filter
      if (selectedCategory !== "all") {
        results = results.filter(
          (product) => product.category === selectedCategory,
        );
      }

      // Apply sorting
      switch (sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          results.sort((a, b) => b.price - a.price);
          break;
        case "name":
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "rating":
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default: // relevance
          break;
      }

      setFilteredProducts(results);
    },
    [state.products, selectedCategory, sortBy],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("search") || "";
      setSearchQuery(query);

      if (query) {
        performSearch(query);
      }
    }
  }, [performSearch]);

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);

  const categories = [
    { id: "all", name: "All Categories", icon: "🔥" },
    { id: "handguns", name: "Handguns", icon: "🔫" },
    { id: "rifles", name: "Rifles", icon: "🔫" },
    { id: "shotguns", name: "Shotguns", icon: "🔫" },
    { id: "accessories", name: "Ammo", icon: "🔧" },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("⭐");
    }
    if (hasHalfStar) {
      stars.push("✨");
    }
    return stars.join("");
  };

  return (
    <SearchContainer>
      <SearchContent>
        <SearchHeader>
          <SearchTitle>🔍 Search Results</SearchTitle>
          {searchQuery && (
            <>
              <SearchQuery>
                Showing results for: <strong>"{searchQuery}"</strong>
              </SearchQuery>
              <ResultsCount>
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </ResultsCount>
            </>
          )}
        </SearchHeader>

        {searchQuery && (
          <FilterSection>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </FilterButton>
            ))}
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="rating">Rating</option>
            </SortSelect>
          </FilterSection>
        )}

        {filteredProducts.length > 0 ? (
          <ProductsGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage image={product.images?.[0]}>
                  {product.onSale && (
                    <ProductBadge type="sale">Sale</ProductBadge>
                  )}
                  {product.featured && (
                    <ProductBadge type="featured">Featured</ProductBadge>
                  )}
                </ProductImage>

                <ProductInfo>
                  <ProductCategory>
                    {product.category.replace(/([A-Z])/g, " $1").trim()}
                  </ProductCategory>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>

                  <ProductSpecs>
                    {product.caliber && (
                      <SpecItem>
                        <span className="label">Caliber:</span>
                        <span className="value">{product.caliber}</span>
                      </SpecItem>
                    )}
                    {product.manufacturer && (
                      <SpecItem>
                        <span className="label">Manufacturer:</span>
                        <span className="value">{product.manufacturer}</span>
                      </SpecItem>
                    )}
                    {product.barrelLength && (
                      <SpecItem>
                        <span className="label">Barrel:</span>
                        <span className="value">{product.barrelLength}</span>
                      </SpecItem>
                    )}
                    {product.capacity && (
                      <SpecItem>
                        <span className="label">Capacity:</span>
                        <span className="value">{product.capacity}</span>
                      </SpecItem>
                    )}
                  </ProductSpecs>

                  <PriceSection>
                    <PriceContainer>
                      <CurrentPrice>${product.price}</CurrentPrice>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <OriginalPrice>
                            ${product.originalPrice}
                          </OriginalPrice>
                        )}
                    </PriceContainer>
                    {product.rating && (
                      <Rating>
                        {renderStars(product.rating)} {product.rating}
                      </Rating>
                    )}
                  </PriceSection>

                  <ActionButtons>
                    <ActionButton
                      variant="primary"
                      onClick={() =>
                        (window.location.href = `/product?id=${product.id}`)
                      }
                    >
                      View Details
                    </ActionButton>
                    <ActionButton>Add to Cart</ActionButton>
                  </ActionButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        ) : searchQuery ? (
          <NoResults>
            <div className="icon">🔍</div>
            <h3>No results found</h3>
            <p>Try adjusting your search terms or browse our categories</p>
          </NoResults>
        ) : (
          <NoResults>
            <div className="icon">🔫</div>
            <h3>Start your search</h3>
            <p>Enter keywords to find firearms, accessories, and ammunition</p>
          </NoResults>
        )}
      </SearchContent>
    </SearchContainer>
  );
}

const SearchPage = () => {
  return (
    <AppProvider>
      <Layout>
        <SearchResults />
      </Layout>
    </AppProvider>
  );
};

export default SearchPage;

export const Head = () => <title>Search Results | Gun-k Pro</title>;
