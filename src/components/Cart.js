import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  animation: ${fadeIn} 0.3s ease-out;
`;

const CartPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.4s
    cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CartHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CartTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;

  .icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  p {
    font-size: 16px;
  }
`;

const CartItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  margin-bottom: 15px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  flex-shrink: 0;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
  line-height: 1.3;
`;

const ItemPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0984e3 0%, #0770cd 100%);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(135deg, #ee5a24 0%, #d63031 100%);
    transform: scale(1.05);
  }
`;

const CartFooter = styled.div`
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 25px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
`;

const TotalSection = styled.div`
  margin-bottom: 20px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  &.total {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    padding-top: 15px;
    border-top: 2px solid #e1e8ed;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #00a085 0%, #00937a 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 184, 148, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Cart = ({ isOpen, onClose, items, setItems, onCheckout }) => {
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 500 ? 0 : 29.99; // Free shipping over $500
  const total = subtotal + tax + shipping;

  return (
    <>
      <CartOverlay isOpen={isOpen} onClick={onClose} />
      <CartPanel isOpen={isOpen}>
        <CartHeader>
          <CartTitle>🛒 Shopping Cart</CartTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </CartHeader>

        <CartContent>
          {items.length === 0 ? (
            <EmptyCart>
              <div className="icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some awesome products to get started!</p>
            </EmptyCart>
          ) : (
            items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>🔫</ItemImage>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price}</ItemPrice>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </QuantityButton>
                    <RemoveButton onClick={() => removeItem(item.id)}>
                      Remove
                    </RemoveButton>
                  </QuantityControls>
                </ItemDetails>
              </CartItem>
            ))
          )}
        </CartContent>

        {items.length > 0 && (
          <CartFooter>
            <TotalSection>
              <TotalRow>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </TotalRow>
              <TotalRow>
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </TotalRow>
              <TotalRow>
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </TotalRow>
              <TotalRow className="total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </TotalRow>
            </TotalSection>
            <CheckoutButton onClick={onCheckout}>
              🔒 Secure Checkout
            </CheckoutButton>
          </CartFooter>
        )}
      </CartPanel>
    </>
  );
};

export default Cart;
