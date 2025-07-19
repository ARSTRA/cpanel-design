import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../../context/AppContext.optimized";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 25px 30px;
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  padding: 30px;
`;

const UserTable = styled.table`
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

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  margin-right: 8px;

  &.edit {
    background: #f39c12;
    color: white;
  }

  &.delete {
    background: #e74c3c;
    color: white;
  }

  &.orders {
    background: #3498db;
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export default function UserManagement() {
  const { state, dispatch } = useApp();

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch({ type: "DELETE_USER", payload: userId });
    }
  };

  const getUserOrderCount = (userId) => {
    return state.orders.filter((order) => order.customerId === userId).length;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
      </Header>

      <Content>
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>User ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Registration Date</TableHeader>
              <TableHeader>Orders</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {state.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>#{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{formatDate(user.registrationDate)}</TableCell>
                <TableCell>{getUserOrderCount(user.id)}</TableCell>
                <TableCell>
                  <ActionButton className="orders">View Orders</ActionButton>
                  <ActionButton className="edit">Edit</ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </UserTable>

        {state.users.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}
          >
            No users found
          </div>
        )}
      </Content>
    </Container>
  );
}
