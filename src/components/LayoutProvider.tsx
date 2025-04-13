import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Navigation />
      {children}
      <Footer />    
    </div>
  );
}