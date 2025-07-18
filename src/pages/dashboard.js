import React, { useState } from "react";
import styled from "styled-components";
import { AppProvider, useApp } from "../context/AppContext";
import Layout from "../components/Layout";
import CartIcon from "../components/CartIcon";
import Cart from "../components/Cart";
import SupportChat from "../components/SupportChat";
import PaymentModal from "../components/PaymentModal";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 100px;
`;

const DashboardHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin: 0 20px 30px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WelcomeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const UserInfo = styled.div`
  h1 {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 8px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.variant === "support"
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
      : props.variant === "profile"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  margin: 0 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(135deg, #fdcb6e 0%, #fd79a8 100%);
    transform: scale(1.02);
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuickStats = styled(Section)`
  padding: 20px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #7f8c8d;
  font-size: 14px;
`;

const StatValue = styled.span`
  color: #2c3e50;
  font-weight: 700;
  font-size: 16px;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.8)"};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 1px solid ${(props) => (props.active ? "transparent" : "#e1e8ed")};
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

function DashboardContent() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: "all", name: "All Products", icon: "🔥" },
    { id: "handguns", name: "Handguns", icon: "🔫" },
    { id: "rifles", name: "Rifles", icon: "🔫" },
    { id: "shotguns", name: "Shotguns", icon: "🔫" },
    { id: "accessories", name: "Ammo", icon: "🔴" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? state.products.filter((product) => product.featured)
      : state.products.filter(
          (product) => product.category === selectedCategory,
        );

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <DashboardContainer>
        <DashboardHeader>
          <WelcomeSection>
            <UserInfo>
              <h1>👋 Welcome back, John!</h1>
              <p>
                Discover amazing firearms and ammo from our premium collection
              </p>
            </UserInfo>
            <ActionButtons>
              <ActionButton
                variant="support"
                onClick={() => setIsSupportOpen(true)}
              >
                💬 Support
              </ActionButton>
              <ActionButton
                variant="profile"
                onClick={() =>
                  alert(
                    "Profile page coming soon! This feature is under development.",
                  )
                }
              >
                👤 Profile
              </ActionButton>
              <CartIcon
                itemCount={totalItems}
                onClick={() => setIsCartOpen(true)}
              />
            </ActionButtons>
          </WelcomeSection>
        </DashboardHeader>

        <DashboardGrid>
          <MainContent>
            <Section>
              <SectionTitle>🛍️ Shop Our Collection</SectionTitle>

              <CategoryFilter>
                {categories.map((category) => (
                  <FilterButton
                    key={category.id}
                    active={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.icon} {category.name}
                  </FilterButton>
                ))}
              </CategoryFilter>

              <ProductGrid>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductImage>🔫</ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductPrice>${product.price}</ProductPrice>
                      <ProductDescription>
                        {product.description}
                      </ProductDescription>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <AddToCartButton
                          onClick={() => addToCart(product)}
                          style={{ flex: 1 }}
                        >
                          🛒 Add to Cart
                        </AddToCartButton>
                        <AddToCartButton
                          onClick={() => handleBuyNow(product)}
                          style={{
                            flex: 1,
                            background:
                              "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
                          }}
                        >
                          💳 Buy Now
                        </AddToCartButton>
                      </div>
                      <AddToCartButton
                        onClick={() =>
                          (window.location.href = `/product?id=${product.id}`)
                        }
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        🔍 View Details
                      </AddToCartButton>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
            </Section>
          </MainContent>

          <Sidebar>
            <QuickStats>
              <SectionTitle style={{ fontSize: "18px", marginBottom: "15px" }}>
                📊 Quick Stats
              </SectionTitle>
              <StatItem>
                <StatLabel>Cart Items</StatLabel>
                <StatValue>{totalItems}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Cart Value</StatLabel>
                <StatValue>${totalValue.toFixed(2)}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Available Products</StatLabel>
                <StatValue>{filteredProducts.length}</StatValue>
              </StatItem>
            </QuickStats>

            <Section style={{ padding: "20px" }}>
              <SectionTitle style={{ fontSize: "18px", marginBottom: "15px" }}>
                🔫 Premium Ammunition
              </SectionTitle>
              <div
                style={{
                  fontSize: "14px",
                  color: "#7f8c8d",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/8247029/pexels-photo-8247029.jpeg"
                    alt="Premium 9mm Ammunition"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <strong>Federal HST 9mm</strong>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    $42.99
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", opacity: "0.9" }}>
                    50 rounds - Law enforcement grade
                  </span>
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/9170200/pexels-photo-9170200.jpeg"
                    alt="Match Grade 308 Ammunition"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <strong>Hornady .308 ELD</strong>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    $38.99
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", opacity: "0.9" }}>
                    20 rounds - Match grade precision
                  </span>
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #00b894 0%, #00a085 100%)",
                    color: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/30871145/pexels-photo-30871145.jpeg"
                    alt="12 Gauge Buckshot"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <strong>Winchester 00 Buck</strong>
                  <br />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    $24.99
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", opacity: "0.9" }}>
                    25 shells - Home defense
                  </span>
                </div>
              </div>

              <SectionTitle style={{ fontSize: "18px", marginBottom: "15px" }}>
                🎯 Featured Deals
              </SectionTitle>
              <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
                <p>• 15% off all Glock handguns</p>
                <p>• Free shipping on orders over $500</p>
                <p>• Trade-in program available</p>
              </div>
            </Section>
          </Sidebar>
        </DashboardGrid>
      </DashboardContainer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setShowPayment(true);
          setSelectedProduct(null);
        }}
      />

      <SupportChat
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        product={selectedProduct}
        cartItems={selectedProduct ? null : cartItems}
        onSuccess={() => {
          setShowPayment(false);
          if (!selectedProduct) {
            setCartItems([]);
          }
        }}
      />
    </>
  );
}

const DashboardPage = () => {
  return (
    <AppProvider>
      <Layout>
        <DashboardContent />
      </Layout>
    </AppProvider>
  );
};

export default DashboardPage;

export const Head = () => <title>Dashboard | Gun-k Pro</title>;
