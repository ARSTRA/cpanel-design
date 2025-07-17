import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const success = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const PaymentOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const PaymentModal = styled.div`
  background: white;
  border-radius: 25px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  padding: 30px;
  border-radius: 25px 25px 0 0;
  text-align: center;
  position: relative;

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  p {
    margin: 8px 0 0 0;
    opacity: 0.9;
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
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
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  padding: 30px;
`;

const OrderSummary = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
`;

const SummaryTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 18px;
    color: #00b894;
    padding-top: 15px;
    border-top: 2px solid #e9ecef;
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormSection = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid #e9ecef;
`;

const SectionTitle = styled.h4`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00b894;
    box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
`;

const PaymentMethod = styled.button`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
      : "white"};
  color: ${(props) => (props.active ? "white" : "#2c3e50")};
  border: 2px solid ${(props) => (props.active ? "transparent" : "#e1e8ed")};
  padding: 15px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  &:hover {
    border-color: #00b894;
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #00a085 0%, #00937a 100%)"
        : "#f8f9fa"};
  }
`;

const PayButton = styled.button`
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

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

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px;

  .icon {
    font-size: 80px;
    animation: ${success} 0.6s ease-out;
    margin-bottom: 20px;
  }

  h3 {
    color: #00b894;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
  }
`;

const SecurityBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 12px;
  color: #7f8c8d;

  .badge {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const PaymentModalComponent = ({
  isOpen,
  onClose,
  product,
  cartItems,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (product) {
      return product.price;
    }
    if (cartItems) {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const tax = subtotal * 0.08;
      const shipping = subtotal > 500 ? 0 : 29.99;
      return subtotal + tax + shipping;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onSuccess();
        setSuccess(false);
        setFormData({
          cardNumber: "",
          expiry: "",
          cvv: "",
          cardName: "",
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          zip: "",
        });
      }, 3000);
    }, 3000);
  };

  const total = calculateTotal();

  if (!isOpen) return null;

  return (
    <PaymentOverlay isOpen={isOpen} onClick={onClose}>
      <PaymentModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>✕</CloseButton>
          <h2>🔒 Secure Checkout</h2>
          <p>Complete your purchase safely and securely</p>
        </ModalHeader>

        <ModalContent>
          {success ? (
            <SuccessMessage>
              <div className="icon">✅</div>
              <h3>Payment Successful!</h3>
              <p>
                Thank you for your purchase. You'll receive a confirmation email
                shortly.
              </p>
            </SuccessMessage>
          ) : (
            <>
              <OrderSummary>
                <SummaryTitle>📋 Order Summary</SummaryTitle>
                {product && (
                  <SummaryItem>
                    <span>{product.name}</span>
                    <span>${product.price}</span>
                  </SummaryItem>
                )}
                {cartItems &&
                  cartItems.map((item) => (
                    <SummaryItem key={item.id}>
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </SummaryItem>
                  ))}
                <SummaryItem>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </SummaryItem>
              </OrderSummary>

              <PaymentForm onSubmit={handleSubmit}>
                <FormSection>
                  <SectionTitle>💳 Payment Method</SectionTitle>
                  <PaymentMethods>
                    <PaymentMethod
                      type="button"
                      active={paymentMethod === "card"}
                      onClick={() => setPaymentMethod("card")}
                    >
                      💳
                      <span>Credit Card</span>
                    </PaymentMethod>
                    <PaymentMethod
                      type="button"
                      active={paymentMethod === "paypal"}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      🅿️
                      <span>PayPal</span>
                    </PaymentMethod>
                    <PaymentMethod
                      type="button"
                      active={paymentMethod === "apple"}
                      onClick={() => setPaymentMethod("apple")}
                    >
                      🍎
                      <span>Apple Pay</span>
                    </PaymentMethod>
                  </PaymentMethods>

                  {paymentMethod === "card" && (
                    <FormRow columns="1fr 1fr">
                      <FormGroup>
                        <Label>Card Number</Label>
                        <Input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Cardholder Name</Label>
                        <Input
                          type="text"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Expiry Date</Label>
                        <Input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>CVV</Label>
                        <Input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                  )}
                </FormSection>

                <FormSection>
                  <SectionTitle>📧 Contact Information</SectionTitle>
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormSection>

                <FormSection>
                  <SectionTitle>🏠 Billing Address</SectionTitle>
                  <FormRow columns="1fr 1fr">
                    <FormGroup>
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormRow columns="1fr 1fr 1fr">
                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="text"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>State</Label>
                      <Input
                        type="text"
                        name="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>ZIP Code</Label>
                      <Input
                        type="text"
                        name="zip"
                        placeholder="10001"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                </FormSection>

                <PayButton type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      Processing Payment...
                    </>
                  ) : (
                    <>🔒 Complete Purchase - ${total.toFixed(2)}</>
                  )}
                </PayButton>

                <SecurityBadges>
                  <div className="badge">🔒 SSL Encrypted</div>
                  <div className="badge">🛡️ PCI Compliant</div>
                  <div className="badge">✅ Secure Payment</div>
                </SecurityBadges>
              </PaymentForm>
            </>
          )}
        </ModalContent>
      </PaymentModal>
    </PaymentOverlay>
  );
};

export default PaymentModalComponent;
