"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
  border-radius: 0 0 20px 20px;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const Info = styled.p`
  font-size: 1.3rem;
  color: #64748b;

  span {
    font-weight: 600;
    color: #0f172a;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const PageBtn = styled.button`
  min-width: 3.6rem;
  height: 3.6rem;
  padding: 0 1rem;
  border-radius: 10px;
  border: 1px solid ${(p) => (p.$active ? "#4f46e5" : "#e2e8f0")};
  background: ${(p) => (p.$active ? "#4f46e5" : "#ffffff")};
  color: ${(p) => (p.$active ? "#ffffff" : "#475569")};
  font-size: 1.3rem;
  font-weight: ${(p) => (p.$active ? "700" : "500")};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
  transition: all 0.18s;

  &:hover:not(:disabled):not([data-active="true"]) {
    border-color: #4f46e5;
    color: #4f46e5;
  }
`;

const Dots = styled.span`
  font-size: 1.4rem;
  color: #94a3b8;
  padding: 0 0.4rem;
  user-select: none;
`;

// ─── helpers ─────────────────────────────────────────────────────────────────

function buildPages(current, total) {
  // عمل دايما: [1] ... [current-1][current][current+1] ... [total]
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);

  // حط dots
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Props:
//   totalCount  — إجمالي العناصر (مش عدد الصفحات)
//   pageSize    — عدد العناصر في الصفحة الواحدة  (default 10)
//   paramKey    — اسم الـ query param  (default "page")  — مهم للـ reusability

export default function Pagination({
  totalCount = 0,
  pageSize = 10,
  paramKey = "page",
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get(paramKey)) || 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const from = Math.min((currentPage - 1) * pageSize + 1, totalCount);
  const to   = Math.min(currentPage * pageSize, totalCount);

  function goTo(page) {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    page === 1 ? params.delete(paramKey) : params.set(paramKey, page);
    router.push(`?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  return (
    <Wrapper>
      <Info>
        Showing <span>{from}–{to}</span> of <span>{totalCount}</span> results
      </Info>

      <Buttons>
        {/* Prev */}
        <PageBtn
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </PageBtn>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <Dots key={`dots-${i}`}>…</Dots>
          ) : (
            <PageBtn
              key={p}
              $active={p === currentPage}
              data-active={p === currentPage}
              onClick={() => goTo(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </PageBtn>
          )
        )}

        {/* Next */}
        <PageBtn
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </PageBtn>
      </Buttons>
    </Wrapper>
  );
}