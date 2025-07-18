import React from "react";
import styled from "styled-components";

const AnalyticsContainer = styled.div`
  display: grid;
  gap: 25px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MetricTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => props.color || "#667eea"};
  margin-bottom: 10px;
`;

const MetricChange = styled.div`
  font-size: 14px;
  color: ${(props) => (props.positive ? "#00b894" : "#ff6b6b")};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
  font-weight: 600;
  border: 2px dashed #dee2e6;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TableTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
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

const TableHeader = styled.th`
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
`;

const AnalyticsDashboard = () => {
  const topProducts = [
    { name: "Glock 19 Gen 5", sales: 45, revenue: "$24,750" },
    { name: "Smith & Wesson M&P9", sales: 38, revenue: "$18,240" },
    { name: "Sig Sauer P320", sales: 32, revenue: "$20,160" },
    { name: "AR-15 Sport II", sales: 28, revenue: "$25,200" },
    { name: "Ruger 10/22", sales: 25, revenue: "$8,750" },
  ];

  const recentActivity = [
    {
      type: "Sale",
      description: "Glock 19 Gen 5 sold",
      time: "2 mins ago",
      amount: "$549.99",
    },
    {
      type: "Order",
      description: "New order from John D.",
      time: "5 mins ago",
      amount: "$899.99",
    },
    {
      type: "Return",
      description: "Scope returned",
      time: "15 mins ago",
      amount: "-$199.99",
    },
    {
      type: "Sale",
      description: "Ammunition bulk order",
      time: "23 mins ago",
      amount: "$345.50",
    },
    {
      type: "Sale",
      description: "Holster accessories",
      time: "1 hour ago",
      amount: "$89.99",
    },
  ];

  return (
    <AnalyticsContainer>
      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricTitle>
              <span>💰</span> Total Revenue
            </MetricTitle>
          </MetricHeader>
          <MetricValue color="#00b894">$94,350</MetricValue>
          <MetricChange positive>
            <span>📈</span> +12.5% from last month
          </MetricChange>
          <ChartPlaceholder style={{ marginTop: "20px" }}>
            Revenue Chart (Integration needed)
          </ChartPlaceholder>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>
              <span>📦</span> Sales Volume
            </MetricTitle>
          </MetricHeader>
          <MetricValue color="#667eea">2,847</MetricValue>
          <MetricChange positive>
            <span>📈</span> +8.3% from last month
          </MetricChange>
          <ChartPlaceholder style={{ marginTop: "20px" }}>
            Sales Chart (Integration needed)
          </ChartPlaceholder>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>
              <span>👥</span> Customer Growth
            </MetricTitle>
          </MetricHeader>
          <MetricValue color="#fdcb6e">1,234</MetricValue>
          <MetricChange positive>
            <span>📈</span> +15.7% from last month
          </MetricChange>
          <ChartPlaceholder style={{ marginTop: "20px" }}>
            Customer Chart (Integration needed)
          </ChartPlaceholder>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>
              <span>📊</span> Conversion Rate
            </MetricTitle>
          </MetricHeader>
          <MetricValue color="#ff6b6b">3.4%</MetricValue>
          <MetricChange positive={false}>
            <span>📉</span> -1.2% from last month
          </MetricChange>
          <ChartPlaceholder style={{ marginTop: "20px" }}>
            Conversion Chart (Integration needed)
          </ChartPlaceholder>
        </MetricCard>
      </MetricsGrid>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}
      >
        <TableContainer>
          <TableTitle>
            <span>🏆</span> Top Selling Products
          </TableTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Product</TableHeader>
                <TableHeader>Sales</TableHeader>
                <TableHeader>Revenue</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell style={{ color: "#00b894", fontWeight: "700" }}>
                    {product.revenue}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <TableContainer>
          <TableTitle>
            <span>⚡</span> Recent Activity
          </TableTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Type</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Amount</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span
                      style={{
                        background:
                          activity.type === "Sale"
                            ? "#00b894"
                            : activity.type === "Order"
                              ? "#667eea"
                              : "#ff6b6b",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {activity.type}
                    </span>
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell style={{ color: "#7f8c8d", fontSize: "12px" }}>
                    {activity.time}
                  </TableCell>
                  <TableCell
                    style={{
                      color: activity.amount.startsWith("-")
                        ? "#ff6b6b"
                        : "#00b894",
                      fontWeight: "700",
                    }}
                  >
                    {activity.amount}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </AnalyticsContainer>
  );
};

export default AnalyticsDashboard;
