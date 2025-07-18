import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../context/AppContext";

const InventoryContainer = styled.div`
  display: grid;
  gap: 25px;
`;

const InventoryHeader = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : props.variant === "success"
        ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
        : props.variant === "warning"
          ? "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"
          : "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color || "#667eea"} 0%,
    ${(props) => props.colorEnd || "#764ba2"} 100%
  );
  padding: 25px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 15px;
    opacity: 0.9;
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .label {
    font-size: 14px;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const InventoryTable = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f1f1;
`;

const TableTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
`;

const StatusBadge = styled.span`
  background: ${(props) =>
    props.status === "in-stock"
      ? "linear-gradient(135deg, #00b894 0%, #00a085 100%)"
      : props.status === "low-stock"
        ? "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"
        : props.status === "out-of-stock"
          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
          : "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"};
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

const StockInput = styled.input`
  width: 80px;
  padding: 5px 8px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const InventoryManager = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const getStockStatus = (stock) => {
    if (stock === 0) return "out-of-stock";
    if (stock <= 5) return "low-stock";
    return "in-stock";
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const filteredProducts = state.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalProducts = state.products.length;
  const inStockProducts = state.products.filter((p) => p.stock > 5).length;
  const lowStockProducts = state.products.filter(
    (p) => p.stock > 0 && p.stock <= 5,
  ).length;
  const outOfStockProducts = state.products.filter((p) => p.stock === 0).length;

  const updateStock = (productId, newStock) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: productId, stock: parseInt(newStock) },
    });
  };

  return (
    <InventoryContainer>
      <InventoryHeader>
        <HeaderTitle>
          <span>📦</span> Inventory Management
        </HeaderTitle>
        <QuickActions>
          <ActionButton variant="success">
            <span>📥</span> Bulk Import
          </ActionButton>
          <ActionButton variant="primary">
            <span>📊</span> Generate Report
          </ActionButton>
          <ActionButton variant="warning">
            <span>⚠️</span> Low Stock Alert
          </ActionButton>
        </QuickActions>
      </InventoryHeader>

      <StatsGrid>
        <StatCard color="#667eea" colorEnd="#764ba2">
          <div className="icon">📦</div>
          <div className="value">{totalProducts}</div>
          <div className="label">Total Products</div>
        </StatCard>

        <StatCard color="#00b894" colorEnd="#00a085">
          <div className="icon">✅</div>
          <div className="value">{inStockProducts}</div>
          <div className="label">In Stock</div>
        </StatCard>

        <StatCard color="#fdcb6e" colorEnd="#e17055">
          <div className="icon">⚠️</div>
          <div className="value">{lowStockProducts}</div>
          <div className="label">Low Stock</div>
        </StatCard>

        <StatCard color="#ff6b6b" colorEnd="#ee5a24">
          <div className="icon">❌</div>
          <div className="value">{outOfStockProducts}</div>
          <div className="label">Out of Stock</div>
        </StatCard>
      </StatsGrid>

      <InventoryTable>
        <TableHeader>
          <TableTitle>
            <span>📋</span> Product Inventory
          </TableTitle>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </TableHeader>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Manufacturer</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Current Stock</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredProducts.slice(0, 10).map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <strong>{product.name}</strong>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.manufacturer}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <StockInput
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateStock(product.id, e.target.value)}
                    min="0"
                  />
                </TableCell>
                <TableCell>
                  <StatusBadge status={getStockStatus(product.stock)}>
                    {getStockStatusText(product.stock)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <ActionButton
                      variant="primary"
                      style={{ padding: "5px 10px", fontSize: "11px" }}
                    >
                      📝 Edit
                    </ActionButton>
                    <ActionButton
                      variant="warning"
                      style={{ padding: "5px 10px", fontSize: "11px" }}
                    >
                      📈 Reorder
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </InventoryTable>
    </InventoryContainer>
  );
};

export default InventoryManager;
