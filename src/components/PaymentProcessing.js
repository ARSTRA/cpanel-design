import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const PaymentContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
`;

const PaymentCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
`;

const PaymentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e8ed;
`;

const PaymentTitle = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.3);
  }
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const CreditCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const CardNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 15px;
  font-family: "Courier New", monospace;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardHolder = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const CardExpiry = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const CardType = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
`;

const PrimaryBadge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &.secondary {
    background: #95a5a6;

    &:hover {
      background: #7f8c8d;
      box-shadow: 0 8px 25px rgba(149, 165, 166, 0.3);
    }
  }
`;

const SecurityFeatures = styled.div`
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const FinancingOption = styled.div`
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: #f8f9fa;
  }

  &.selected {
    border-color: #27ae60;
    background: #f0fdf4;
  }
`;

const PaymentProcessing = () => {
  const [activeTab, setActiveTab] = useState("cards");
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    zipCode: "",
  });

  const existingCards = [
    {
      id: 1,
      number: "**** **** **** 4567",
      holder: "JOHN DOE",
      expiry: "12/26",
      type: "Visa",
      primary: true,
    },
    {
      id: 2,
      number: "**** **** **** 8901",
      holder: "JOHN DOE",
      expiry: "08/25",
      type: "Mastercard",
      primary: false,
    },
  ];

  const bankAccounts = [
    {
      id: 1,
      name: "Primary Checking",
      account: "****1234",
      bank: "First National Bank",
      type: "Checking",
    },
  ];

  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Process new card
    setShowAddCard(false);
    setNewCard({
      number: "",
      expiry: "",
      cvv: "",
      name: "",
      zipCode: "",
    });
  };

  const renderCreditCards = () => (
    <PaymentCard>
      <PaymentHeader>
        <PaymentTitle>💳 Credit & Debit Cards</PaymentTitle>
        <AddButton onClick={() => setShowAddCard(!showAddCard)}>
          {showAddCard ? "Cancel" : "Add Card"}
        </AddButton>
      </PaymentHeader>

      {showAddCard && (
        <div
          style={{
            marginBottom: "25px",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ color: "#2c3e50", marginBottom: "20px" }}>
            Add New Payment Card
          </h4>
          <form onSubmit={handleCardSubmit}>
            <FormGroup>
              <Label>Card Number</Label>
              <Input
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </FormGroup>
            <FormGrid>
              <FormGroup>
                <Label>Expiry Date</Label>
                <Input
                  value={newCard.expiry}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expiry: e.target.value })
                  }
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </FormGroup>
              <FormGroup>
                <Label>CVV</Label>
                <Input
                  value={newCard.cvv}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvv: e.target.value })
                  }
                  placeholder="123"
                  maxLength="4"
                />
              </FormGroup>
            </FormGrid>
            <FormGroup>
              <Label>Cardholder Name</Label>
              <Input
                value={newCard.name}
                onChange={(e) =>
                  setNewCard({ ...newCard, name: e.target.value })
                }
                placeholder="John Doe"
              />
            </FormGroup>
            <FormGroup>
              <Label>Billing ZIP Code</Label>
              <Input
                value={newCard.zipCode}
                onChange={(e) =>
                  setNewCard({ ...newCard, zipCode: e.target.value })
                }
                placeholder="12345"
              />
            </FormGroup>
            <Button type="submit">Add Payment Card</Button>
          </form>
        </div>
      )}

      <PaymentMethodGrid>
        {existingCards.map((card) => (
          <CreditCard key={card.id}>
            {card.primary && <PrimaryBadge>Primary</PrimaryBadge>}
            <CardType>{card.type === "Visa" ? "💳" : "💳"}</CardType>
            <CardNumber>{card.number}</CardNumber>
            <CardDetails>
              <CardHolder>{card.holder}</CardHolder>
              <CardExpiry>{card.expiry}</CardExpiry>
            </CardDetails>
          </CreditCard>
        ))}
      </PaymentMethodGrid>

      <SecurityFeatures>
        <h4
          style={{
            color: "#2c3e50",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🔒 Security Features
        </h4>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "#7f8c8d" }}>
          <li>256-bit SSL encryption</li>
          <li>PCI DSS Level 1 compliance</li>
          <li>Fraud detection and monitoring</li>
          <li>Secure tokenization technology</li>
        </ul>
      </SecurityFeatures>
    </PaymentCard>
  );

  const renderBankAccounts = () => (
    <PaymentCard>
      <PaymentHeader>
        <PaymentTitle>🏦 Bank Accounts</PaymentTitle>
        <AddButton>Add Account</AddButton>
      </PaymentHeader>

      {bankAccounts.map((account) => (
        <div
          key={account.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            border: "1px solid #e1e8ed",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <div>
            <div style={{ fontWeight: "600", color: "#2c3e50" }}>
              {account.name}
            </div>
            <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
              {account.bank} • {account.type} • {account.account}
            </div>
          </div>
          <div>
            <Button
              className="secondary"
              style={{
                padding: "8px 15px",
                fontSize: "12px",
                marginRight: "10px",
              }}
            >
              Edit
            </Button>
            <Button
              className="secondary"
              style={{ padding: "8px 15px", fontSize: "12px" }}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#e8f4fd",
          borderRadius: "10px",
        }}
      >
        <h4 style={{ color: "#2c3e50", marginBottom: "10px" }}>
          ACH Payment Benefits
        </h4>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "#7f8c8d" }}>
          <li>Lower processing fees</li>
          <li>Direct bank-to-bank transfer</li>
          <li>Ideal for large purchases</li>
          <li>1-3 business day processing</li>
        </ul>
      </div>
    </PaymentCard>
  );

  const renderFinancing = () => (
    <PaymentCard>
      <PaymentHeader>
        <PaymentTitle>💰 Financing Options</PaymentTitle>
      </PaymentHeader>

      <div style={{ marginBottom: "25px" }}>
        <FinancingOption className="selected">
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎯</div>
          <h4 style={{ color: "#2c3e50", margin: "0 0 10px" }}>
            0% APR for 12 Months
          </h4>
          <p style={{ color: "#7f8c8d", margin: 0, fontSize: "14px" }}>
            No interest if paid in full within 12 months. Minimum purchase $500.
          </p>
          <div style={{ marginTop: "15px" }}>
            <span
              style={{
                background: "#27ae60",
                color: "white",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Pre-Approved
            </span>
          </div>
        </FinancingOption>
      </div>

      <FormGrid>
        <FinancingOption>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>📊</div>
          <h4 style={{ color: "#2c3e50", margin: "0 0 10px" }}>
            Extended Terms
          </h4>
          <p style={{ color: "#7f8c8d", margin: 0, fontSize: "14px" }}>
            24-60 month terms available. Rates starting at 5.99% APR.
          </p>
        </FinancingOption>

        <FinancingOption>
          <div style={{ fontSize: "20px", marginBottom: "10px" }}>⚡</div>
          <h4 style={{ color: "#2c3e50", margin: "0 0 10px" }}>
            Instant Approval
          </h4>
          <p style={{ color: "#7f8c8d", margin: 0, fontSize: "14px" }}>
            Get approved in minutes with our quick application process.
          </p>
        </FinancingOption>
      </FormGrid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button style={{ padding: "15px 30px", fontSize: "16px" }}>
          Apply for Financing
        </Button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff3cd",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        <strong>📋 What you'll need:</strong>
        <ul style={{ margin: "10px 0 0", paddingLeft: "20px" }}>
          <li>Valid government-issued ID</li>
          <li>Proof of income (pay stubs, tax returns)</li>
          <li>Bank account information</li>
          <li>Social Security Number</li>
        </ul>
      </div>
    </PaymentCard>
  );

  const tabButtons = [
    { id: "cards", label: "💳 Cards", component: renderCreditCards },
    { id: "banks", label: "🏦 Bank Accounts", component: renderBankAccounts },
    { id: "financing", label: "💰 Financing", component: renderFinancing },
  ];

  return (
    <PaymentContainer>
      <div style={{ marginBottom: "25px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {tabButtons.map((tab) => (
            <Button
              key={tab.id}
              className={activeTab === tab.id ? "" : "secondary"}
              onClick={() => setActiveTab(tab.id)}
              style={{ padding: "10px 20px" }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {tabButtons.find((tab) => tab.id === activeTab)?.component()}
    </PaymentContainer>
  );
};

export default PaymentProcessing;
