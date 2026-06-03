import CartProvider from "./contexts/CartContext";
import FavoriteProvider from "./contexts/FavoriteContext";
import Footer from "./websiteComponent/Footer";
import Header from "./websiteComponent/Header";

export default function WebsiteLayout({ children }) {
  return (
    <FavoriteProvider>
      <CartProvider>
      <Header />
      {children}
      <Footer/>
      </CartProvider>
    </FavoriteProvider>
  );
}