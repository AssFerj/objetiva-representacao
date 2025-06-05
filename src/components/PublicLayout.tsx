import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps): JSX.Element {
  return (
    <div>
      <Header />
      <Navigation />
      {children}
      <Footer />    
    </div>
  );
}

export default PublicLayout;