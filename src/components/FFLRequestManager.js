import React, { useState } from "react";
import styled from "styled-components";

const FFLContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
`;

const FFLHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f1f1;
`;

const FFLTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusFilter = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FFLGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const FFLCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FFLInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  .label {
    font-size: 12px;
    font-weight: 700;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
  }

  .value {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
  }
`;

const FFLActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.variant === "approve"
      ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
      : props.variant === "decline"
        ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
        : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StatusBadge = styled.span`
  background: ${(props) =>
    props.status === "approved"
      ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
      : props.status === "pending"
        ? "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"
        : props.status === "declined"
          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
          : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FFLRequestManager = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const fflRequests = [
    {
      id: "FFL-001",
      customerName: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      fflDealer: "Metro Gun Shop",
      fflLicense: "1-23-456-78-9A-12345",
      fflAddress: "456 Gun Store Ave, City, ST 12345",
      requestDate: "2024-01-15",
      status: "pending",
      documents: ["FFL Copy", "ID Verification"],
    },
    {
      id: "FFL-002",
      customerName: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 987-6543",
      fflDealer: "Precision Firearms",
      fflLicense: "1-23-456-78-9B-67890",
      fflAddress: "789 Rifle Rd, Town, ST 54321",
      requestDate: "2024-01-14",
      status: "approved",
      documents: ["FFL Copy", "ID Verification", "Background Check"],
    },
    {
      id: "FFL-003",
      customerName: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "(555) 456-7890",
      fflDealer: "Liberty Arms",
      fflLicense: "1-23-456-78-9C-11111",
      fflAddress: "321 Liberty St, Village, ST 67890",
      requestDate: "2024-01-13",
      status: "declined",
      documents: ["FFL Copy"],
    },
  ];

  const filteredRequests =
    statusFilter === "all"
      ? fflRequests
      : fflRequests.filter((request) => request.status === statusFilter);

  const handleApprove = (requestId) => {
    console.log("Approving FFL request:", requestId);
    // Implement approval logic
  };

  const handleDecline = (requestId) => {
    console.log("Declining FFL request:", requestId);
    // Implement decline logic
  };

  const handleView = (requestId) => {
    console.log("Viewing FFL request:", requestId);
    // Implement view logic
  };

  return (
    <FFLContainer>
      <FFLHeader>
        <FFLTitle>
          <span>🏪</span> FFL Dealer Requests
        </FFLTitle>
        <StatusFilter
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </StatusFilter>
      </FFLHeader>

      <FFLGrid>
        {filteredRequests.map((request) => (
          <FFLCard key={request.id}>
            <FFLInfo>
              <InfoItem>
                <div className="label">Request ID</div>
                <div className="value">{request.id}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">Customer</div>
                <div className="value">{request.customerName}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">Status</div>
                <div className="value">
                  <StatusBadge status={request.status}>
                    {request.status}
                  </StatusBadge>
                </div>
              </InfoItem>

              <InfoItem>
                <div className="label">Email</div>
                <div className="value">{request.email}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">Phone</div>
                <div className="value">{request.phone}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">Request Date</div>
                <div className="value">{request.requestDate}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">FFL Dealer</div>
                <div className="value">{request.fflDealer}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">FFL License</div>
                <div className="value">{request.fflLicense}</div>
              </InfoItem>

              <InfoItem>
                <div className="label">FFL Address</div>
                <div className="value">{request.fflAddress}</div>
              </InfoItem>
            </FFLInfo>

            <FFLActions>
              <ActionButton onClick={() => handleView(request.id)}>
                👁️ View Details
              </ActionButton>

              {request.status === "pending" && (
                <>
                  <ActionButton
                    variant="approve"
                    onClick={() => handleApprove(request.id)}
                  >
                    ✅ Approve
                  </ActionButton>
                  <ActionButton
                    variant="decline"
                    onClick={() => handleDecline(request.id)}
                  >
                    ❌ Decline
                  </ActionButton>
                </>
              )}
            </FFLActions>
          </FFLCard>
        ))}
      </FFLGrid>
    </FFLContainer>
  );
};

export default FFLRequestManager;
