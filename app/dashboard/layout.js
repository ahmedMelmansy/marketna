
import styled from "styled-components";
import Header from "../components/layouts/Header";
import MainNav from "../components/layouts/MainNav";
import AdminGuard from "./AdminGuard";


const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;

  height: 100vh;
  overflow: hidden; /* ← منع الصفحة كلها من الـ scroll */
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  /* ← الـ main content هو اللي بيعمل scroll */
  overflow-y: auto;
  height: 100vh;
`;

export default function DashboardLayout({ children }) {
  return (
    <GridLayout>
      
      <AdminGuard>
      <MainNav />

      <MainContent>
        <Header />
        {children}
      </MainContent>
      </AdminGuard>
    </GridLayout>
  );
}