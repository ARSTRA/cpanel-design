import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(-5px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 107, 107, 0.8), 0 0 40px rgba(116, 185, 255, 0.6);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const CartIconContainer = styled.button`
  position: relative;
  background: linear-gradient(
    135deg,
    #ff6b6b 0%,
    #ff8e8e 25%,
    #74b9ff 50%,
    #fd79a8 75%,
    #fdcb6e 100%
  );
  background-size: 300% 300%;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 25px rgba(255, 107, 107, 0.3),
    0 0 0 3px rgba(255, 255, 255, 0.2);
  animation: ${glow} 3s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    animation:
      ${pulse} 0.6s ease-in-out infinite,
      ${glow} 2s ease-in-out infinite;
    background-position: 100% 100%;
    box-shadow:
      0 15px 35px rgba(255, 107, 107, 0.5),
      0 0 0 5px rgba(255, 255, 255, 0.3),
      0 0 30px rgba(116, 185, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const CartSVG = styled.svg`
  width: 28px;
  height: 28px;
  fill: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;

  ${CartIconContainer}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const ItemCount = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  border: 2px solid white;
  animation: ${bounce} 2s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);

  ${CartIconContainer}:hover & {
    animation: ${pulse} 0.8s ease-in-out infinite;
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
    top: -6px;
    right: -6px;
  }
`;

const CartIcon = ({ itemCount = 0, onClick }) => {
  return (
    <CartIconContainer onClick={onClick} title={`Cart (${itemCount} items)`}>
      <CartSVG viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </CartSVG>
      {itemCount > 0 && (
        <ItemCount>{itemCount > 99 ? "99+" : itemCount}</ItemCount>
      )}
    </CartIconContainer>
  );
};

export default CartIcon;
