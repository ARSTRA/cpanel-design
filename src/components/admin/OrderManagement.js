import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 25px 30px;
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  padding: 30px;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background: #f8f9fa;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e1e8ed;

  &:hover {
    background: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e1e8ed;
`;

const TableCell = styled.td`
  padding: 15px;
  vertical-align: top;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.shipped {
    background: #d4edda;
    color: #155724;
  }

  &.delivered {
    background: #cce5ff;
    color: #004085;
  }

  &.cancelled {
    background: #f8d7da;
    color: #721c24;
  }
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ViewButton = styled.button`
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background: #2980b9;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e8ed;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;

  &:hover {
    color: #2c3e50;
  }
`;

const OrderDetails = styled.div`
  display: grid;
  gap: 20px;
`;

const DetailSection = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 18px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #7f8c8d;
`;

const Value = styled.span`
  color: #2c3e50;
`;

export default function OrderManagement() {
  const { state, dispatch } = useApp();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { id: orderId, status: newStatus },
    });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const getProductName = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container>
      <Header>
        <Title>Order Management</Title>
      </Header>

      <Content>
        <OrderTable>
          <TableHead>
            <TableRow>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {state.orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <div>{order.customerName}</div>
                  <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                    {order.customerEmail}
                  </div>
                </TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <StatusSelect
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </StatusSelect>
                </TableCell>
                <TableCell>
                  <ViewButton onClick={() => handleViewOrder(order)}>
                    View Details
                  </ViewButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </OrderTable>

        {state.orders.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}
          >
            No orders found
          </div>
        )}
      </Content>

      {selectedOrder && (
        <Modal
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedOrder(null)
          }
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Order Details - #{selectedOrder.id}</ModalTitle>
              <CloseButton onClick={() => setSelectedOrder(null)}>
                ×
              </CloseButton>
            </ModalHeader>

            <OrderDetails>
              <DetailSection>
                <SectionTitle>Customer Information</SectionTitle>
                <DetailRow>
                  <Label>Name:</Label>
                  <Value>{selectedOrder.customerName}</Value>
                </DetailRow>
                <DetailRow>
                  <Label>Email:</Label>
                  <Value>{selectedOrder.customerEmail}</Value>
                </DetailRow>
                <DetailRow>
                  <Label>Order Date:</Label>
                  <Value>{formatDate(selectedOrder.date)}</Value>
                </DetailRow>
                <DetailRow>
                  <Label>Status:</Label>
                  <Value>
                    <StatusBadge className={selectedOrder.status}>
                      {selectedOrder.status}
                    </StatusBadge>
                  </Value>
                </DetailRow>
              </DetailSection>

              <DetailSection>
                <SectionTitle>Order Items</SectionTitle>
                {selectedOrder.items.map((item, index) => (
                  <DetailRow key={index}>
                    <Label>
                      {getProductName(item.productId)} (x{item.quantity}):
                    </Label>
                    <Value>${(item.price * item.quantity).toFixed(2)}</Value>
                  </DetailRow>
                ))}
                <hr
                  style={{
                    margin: "15px 0",
                    border: "none",
                    borderTop: "1px solid #e1e8ed",
                  }}
                />
                <DetailRow>
                  <Label>
                    <strong>Total:</strong>
                  </Label>
                  <Value>
                    <strong>${selectedOrder.total.toFixed(2)}</strong>
                  </Value>
                </DetailRow>
              </DetailSection>
            </OrderDetails>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
