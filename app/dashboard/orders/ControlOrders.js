import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
const Controls = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StyledSelect = styled.select`
  padding: 1rem 1.6rem;
  font-size: 1.35rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #1e2937;
  cursor: pointer;
  min-width: 180px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const DateBtns = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;
 
const DateBtn = styled.button`
  padding: 0.9rem 1.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid ${(p) => (p.$active ? "#4f46e5" : "#e2e8f0")};
  background: ${(p) => (p.$active ? "#4f46e5" : "#ffffff")};
  color: ${(p) => (p.$active ? "#ffffff" : "#475569")};
  cursor: pointer;
  transition: all 0.2s;
 
  &:hover {
    border-color: #4f46e5;
    color: ${(p) => (p.$active ? "#ffffff" : "#4f46e5")};
  }
`;
export default function ControlOrders({status, sortBy , dateRange}) {
    const searchParams = useSearchParams();
  const router = useRouter();
  function setParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    value === "all" ? params.delete(key) : params.set(key, value);
    router.push(`?${params.toString()}`);
  }

  const DATE_OPTIONS = [
    { label: "All time", value: "all" },
    { label: "Today",    value: "1d"  },
    { label: "7 days",   value: "7d"  },
    { label: "30 days",  value: "30d" },
  ];
 
  return (
      <Controls>
        <DateBtns>
          {DATE_OPTIONS.map((opt) => (
            <DateBtn
              key={opt.value}
              $active={dateRange === opt.value}
              onClick={() => setParam("dateRange", opt.value)}
            >
              {opt.label}
            </DateBtn>
          ))}
        </DateBtns>

        {/* Status filter */}
        <StyledSelect
          onChange={(e) => setParam("status", e.target.value)}
          value={status || "all"}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
        </StyledSelect>

        {/* Sort */}
        <StyledSelect
          onChange={(e) => setParam("sortBy", e.target.value)}
          value={sortBy || "all"}
        >
          <option value="all">Default order</option>
          <option value="total_amount-desc">Amount: high to low</option>
          <option value="total_amount-asc">Amount: low to high</option>
        </StyledSelect>
      </Controls>
  )
}
