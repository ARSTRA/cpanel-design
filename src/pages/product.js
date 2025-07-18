import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { AppProvider, useApp } from "../context/AppContext";
import Layout from "../components/Layout";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import PaymentModal from "../components/PaymentModal";

const ProductContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding-top: 100px;
  padding-bottom: 50px;
`;

const ProductContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-5px);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);

  .icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h2 {
    color: #2c3e50;
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const BrowseButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

function ProductPage() {
  const { state } = useApp();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get("id");

    if (productId) {
      const foundProduct = state.products.find(
        (p) => p.id === parseInt(productId),
      );
      setProduct(foundProduct);
    }
  }, [location.search, state.products]);

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
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const browseCatalog = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/search";
    }
  };

  return (
    <>
      <ProductContainer>
        <ProductContent>
          <BackButton onClick={goBack}>← Back to Previous Page</BackButton>

          {product ? (
            <ProductDetail
              product={product}
              onAddToCart={addToCart}
              onBuyNow={handleBuyNow}
            />
          ) : (
            <NotFound>
              <div className="icon">🔍</div>
              <h2>Product Not Found</h2>
              <p>Sorry, we couldn't find the product you're looking for.</p>
              <BrowseButton onClick={browseCatalog}>
                Browse Our Catalog
              </BrowseButton>
            </NotFound>
          )}
        </ProductContent>
      </ProductContainer>

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

const ProductPageWrapper = () => {
  return (
    <AppProvider>
      <Layout>
        <ProductPage />
      </Layout>
    </AppProvider>
  );
};

export default ProductPageWrapper;

export const Head = () => <title>Product Details | Gun-k Pro</title>;
