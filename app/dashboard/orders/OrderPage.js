"use client";  

import styled from "styled-components";
import EditModal from "@/app/features/orders/EditModal";
import ContainerOrderDetails from "@/app/features/orders/ContainerOrderDetails";

const Page = styled.div`
  padding: 2.5rem 3rem;
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 1.6rem 1.5rem;
  font-size: 1.35rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 1.6rem 1.5rem;
  font-size: 1.4rem;
  border-top: 1px solid #e2e8f0;
  color: #1e2937;
`;

const Badge = styled.span`
  padding: 0.45rem 1.1rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  background: ${(p) =>
    p.status === "paid" ? "#10b981" : p.status === "pending" ? "#f59e0b" : "#ef4444"};
`;

const Card = styled.div`
  display: none;
  background: white;
  padding: 1.8rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    display: block;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.45rem;
`;

const Label = styled.span`
  color: #64748b;
  font-weight: 500;
`;

export default function OrdersPage({ orders }) {
  return (
    <Page>
      <Title>Orders</Title>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Total Amount</Th>
            <Th>Final Amount</Th>
            <Th>Status</Th>
            <Th>City</Th>
            <Th>Phone</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <Td><strong>#{order.id}</strong></Td>
              <Td>{order.total_amount} EGP</Td>
              <Td>{order.final_amount} EGP</Td>
              <Td>
                <Badge status={order.status}>{order.status}</Badge>
              </Td>
              <Td>{order.city}</Td>
              <Td>{order.phone}</Td>
              <Td>
                <EditModal>
                  <ContainerOrderDetails orderId={order.id} />
                </EditModal>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Mobile Cards */}
      {orders.map((order) => (
        <Card key={order.id}>
          <Row>
            <Label>Actions:</Label>
            <div>
              <EditModal>
                  <ContainerOrderDetails orderId={order.id} />
                
              </EditModal>
            </div>
          </Row>
        </Card>
      ))}
    </Page>
  );
}