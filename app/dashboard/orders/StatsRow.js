import styled from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.8rem 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const StatLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.6rem;
`;

const StatValue = styled.p`
  font-size: 2.4rem;
  font-weight: 800;
  color: ${(p) => p.$color || "#0f172a"};
`;

export default function StatsRow({ordersAfterDate,orders}) {
    
    const totalRevenue  = orders.reduce((acc, o) => acc + (o.final_amount || 0), 0);
    const pendingCount  = ordersAfterDate.filter((o) => o.status === "pending").length;
    const completedCount = ordersAfterDate.filter((o) => o.status === "completed").length;


    
return(
      <Row>
        <StatCard>
          <StatLabel>Total orders</StatLabel>
          <StatValue>{ordersAfterDate.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Pending</StatLabel>
          <StatValue $color="#d97706">{pendingCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Completed</StatLabel>
          <StatValue $color="#059669">{completedCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Revenue</StatLabel>
          <StatValue $color="#4f46e5">{totalRevenue.toLocaleString()} EGP</StatValue>
        </StatCard>
      </Row>

  )
}
