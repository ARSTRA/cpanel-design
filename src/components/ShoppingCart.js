import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext.optimized";
import { navigate } from "gatsby";

const CartContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const CartHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }

  .cart-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
  }
`;

const CartContent = styled.div`
  padding: 30px;
  max-height: 600px;
  overflow-y: auto;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;

  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
  }

  h3 {
    margin: 0 0 10px;
    color: #2c3e50;
    font-size: 24px;
  }

  p {
    margin: 0 0 30px;
    font-size: 16px;
    line-height: 1.6;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  .product-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .product-details {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0 0 12px;
  }

  .product-price {
    font-size: 20px;
    font-weight: 700;
    color: #27ae60;
    margin: 0;
  }

  @media (max-width: 768px) {
    .product-name {
      font-size: 16px;
    }
    
    .product-price {
      font-size: 18px;
    }
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 8px;

  button {
    background: #fff;
    border: 1px solid #e1e8ed;
    border-radius: 6px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    color: #2c3e50;

    &:hover {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    font-weight: 600;
    color: #2c3e50;
    min-width: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: 10px;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 20px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #e74c3c;
    color: white;
  }

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: end;
    align-self: start;
  }
`;

const CartSummary = styled.div`
  background: #f8f9fa;
  padding: 25px 30px;
  border-top: 1px solid #e1e8ed;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 15px;
    border-top: 2px solid #e1e8ed;
    font-weight: 700;
    font-size: 18px;
    color: #2c3e50;
  }

  .label {
    color: #7f8c8d;
    font-weight: 500;
  }

  .value {
    font-weight: 600;
    color: #2c3e50;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    background: #95a5a6;
  }

  &.loading {
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
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: loading-shine 1.5s infinite;
    }
  }

  @keyframes loading-shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const ContinueShoppingButton = styled.button`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const MobileItemDetails = styled.div`
  @media (max-width: 768px) {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    align-items: start;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export default function ShoppingCart() {
  const { state, dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  // Get cart items from context
  const cartItems = state.cartItems || [];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: productId, quantity: newQuantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      // Add order to history
      const order = {
        id: Date.now().toString(),
        items: cartItems,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      dispatch({
        type: "ADD_ORDER",
        payload: order
      });

      // Clear cart
      clearCart();
      
      setIsLoading(false);
      
      // Navigate to payment processing
      navigate('/user-dashboard?tab=payments');
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartHeader>
          <h2>🛒 Shopping Cart</h2>
          <div className="cart-count">0 items</div>
        </CartHeader>
        <EmptyCart>
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>
            Browse our extensive collection of firearms, accessories, and ammunition
            to find the perfect products for your needs.
          </p>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            Continue Shopping
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <h2>🛒 Shopping Cart</h2>
        <div className="cart-count">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
        </div>
      </CartHeader>

      <CartContent>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <ProductImage>
              <img
                src={item.images?.[0] || "https://images.pexels.com/photos/6091856/pexels-photo-6091856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://images.pexels.com/photos/6091856/pexels-photo-6091856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop";
                }}
              />
            </ProductImage>

            <ProductInfo>
              <h3 className="product-name">{item.name}</h3>
              <p className="product-details">
                {item.manufacturer} • {item.caliber || item.type} • SKU: {item.id}
              </p>
              <p className="product-price">${item.price}</p>
            </ProductInfo>

            <QuantityControls>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </QuantityControls>

            <RemoveButton onClick={() => removeFromCart(item.id)}>
              🗑️
            </RemoveButton>

            <MobileItemDetails>
              <QuantityControls>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </QuantityControls>
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                🗑️
              </RemoveButton>
            </MobileItemDetails>
          </CartItem>
        ))}
      </CartContent>

      <CartSummary>
        <SummaryRow>
          <span className="label">Subtotal:</span>
          <span className="value">${subtotal.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span className="label">Tax (8%):</span>
          <span className="value">${tax.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span className="label">Total:</span>
          <span className="value">${total.toFixed(2)}</span>
        </SummaryRow>

        <CheckoutButton
          onClick={handleCheckout}
          disabled={isLoading || cartItems.length === 0}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </CheckoutButton>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            Continue Shopping
          </ContinueShoppingButton>
        </div>
      </CartSummary>
    </CartContainer>
  );
}
