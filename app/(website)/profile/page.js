"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import supabase from "@/app/lib/supabase";
import {
  FiUser, FiMail, FiPhone, FiMapPin,
  FiShoppingBag, FiClock, FiCheckCircle,
  FiXCircle, FiPackage, FiLogOut
} from "react-icons/fi";
import { logout } from "@/app/auth/apiAuth";
import toast from "react-hot-toast";

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 4rem 2rem 8rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem 6rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

// ─── Profile Card ─────────────────────────────────────────────────────────────

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 3rem;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.6rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.4rem;
`;

const ProfileMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  margin-top: 1.2rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.35rem;
  color: #64748b;

  svg { color: #4f46e5; flex-shrink: 0; }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #fee2e2;
    transform: translateY(-1px);
  }
`;

// ─── Orders Section ───────────────────────────────────────────────────────────

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg { color: #4f46e5; }
`;

const OrdersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  animation: ${fadeUp} 0.4s ease 0.1s both;
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  padding: 2.4rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 8px 28px rgba(79,70,229,0.1);
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderId = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1.3rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 700;
  background: ${({ $status }) =>
    $status === "paid" ? "#dcfce7" :
    $status === "pending" ? "#fef9c3" :
    $status === "delivered" ? "#e0e7ff" : "#fee2e2"};
  color: ${({ $status }) =>
    $status === "paid" ? "#15803d" :
    $status === "pending" ? "#a16207" :
    $status === "delivered" ? "#4338ca" : "#dc2626"};
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.4rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  span:first-child {
    font-size: 1.15rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span:last-child {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
  }
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonLine = styled.div`
  height: ${({ h }) => h || "16px"};
  width: ${({ w }) => w || "100%"};
  border-radius: 100px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  background: #fff;
  border-radius: 20px;
  border: 1px dashed #e2e8f0;
  color: #94a3b8;

  svg { font-size: 4rem; margin-bottom: 1.5rem; color: #cbd5e1; }
  h3 { font-size: 1.8rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem; }
  p  { font-size: 1.4rem; }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoadingData(true);
      try {
        // جيب بيانات البروفايل
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // جيب الأوردرات الخاصة بالمستخدم
        const { data: ordersData } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setProfile(profileData);
        setOrders(ordersData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [user]);

  async function handleLogout() {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  }

  if (loading || !user) return null;

  const initials = profile?.full_name
    ? profile.full_name.charAt(0).toUpperCase()
    : user.email?.charAt(0).toUpperCase();

  return (
    <PageWrapper>
      <Container>

        {/* ── Profile Card ── */}
        <ProfileCard>
          <Avatar>{initials}</Avatar>

          <ProfileInfo>
            {loadingData ? (
              <>
                <SkeletonLine h="24px" w="200px" />
                <div style={{ marginTop: "1.2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <SkeletonLine h="16px" w="160px" />
                  <SkeletonLine h="16px" w="120px" />
                </div>
              </>
            ) : (
              <>
                <ProfileName>{profile?.full_name || "User"}</ProfileName>
                <ProfileMeta>
                  <MetaItem><FiMail /> {profile?.email || user.email}</MetaItem>
                  {profile?.phone && <MetaItem><FiPhone /> {profile.phone}</MetaItem>}
                  {profile?.address && <MetaItem><FiMapPin /> {profile.address}</MetaItem>}
                </ProfileMeta>
              </>
            )}
          </ProfileInfo>

          <LogoutBtn onClick={handleLogout}>
            <FiLogOut /> Logout
          </LogoutBtn>
        </ProfileCard>

        {/* ── Orders Section ── */}
        <div>
          <SectionTitle>
            <FiShoppingBag /> My Orders
            {!loadingData && orders.length > 0 && (
              <span style={{ fontSize: "1.4rem", color: "#94a3b8", fontWeight: 500 }}>
                ({orders.length})
              </span>
            )}
          </SectionTitle>

          {loadingData ? (
            <OrdersGrid>
              {[1, 2, 3].map(i => (
                <OrderCard key={i}>
                  <SkeletonLine h="20px" w="120px" style={{ marginBottom: "1.6rem" }} />
                  <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap" }}>
                    <SkeletonLine h="14px" w="100px" />
                    <SkeletonLine h="14px" w="80px" />
                    <SkeletonLine h="14px" w="120px" />
                  </div>
                </OrderCard>
              ))}
            </OrdersGrid>
          ) : orders.length === 0 ? (
            <EmptyOrders>
              <FiPackage />
              <h3>No orders yet</h3>
              <p>Once you place an order, it will appear here.</p>
            </EmptyOrders>
          ) : (
            <OrdersGrid>
              {orders.map(order => (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <OrderId>Order #{order.id}</OrderId>
                    <StatusBadge $status={order.status}>{order.status}</StatusBadge>
                  </OrderHeader>

                  <OrderDetails>
                    <DetailItem>
                      <span>Total</span>
                      <span>{order.total_amount} EGP</span>
                    </DetailItem>
                    <DetailItem>
                      <span>Final</span>
                      <span style={{ color: "#4f46e5" }}>{order.final_amount} EGP</span>
                    </DetailItem>
                    <DetailItem>
                      <span>City</span>
                      <span>{order.city || "—"}</span>
                    </DetailItem>
                    <DetailItem>
                      <span>Phone</span>
                      <span>{order.phone || "—"}</span>
                    </DetailItem>
                    <DetailItem>
                      <span>Payment</span>
                      <span>{order.payment_status ? "Paid" : "Cash on Delivery"}</span>
                    </DetailItem>
                    {order.shipping_address && (
                      <DetailItem>
                        <span>Address</span>
                        <span>{order.shipping_address}</span>
                      </DetailItem>
                    )}
                    {order.notes && (
                      <DetailItem>
                        <span>Notes</span>
                        <span>{order.notes}</span>
                      </DetailItem>
                    )}
                  </OrderDetails>
                </OrderCard>
              ))}
            </OrdersGrid>
          )}
        </div>

      </Container>
    </PageWrapper>
  );
}