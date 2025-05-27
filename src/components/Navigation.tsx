import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Se tiver uma seção no state, faz o scroll após um pequeno delay
    if (location.state?.section) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Limpa o state após o scroll
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100); // Pequeno delay para garantir que o componente Home montou

      return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <nav className="bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-yellow-500">Home</Link>
            <Link 
              to="/" 
              className="hover:text-yellow-500"
              state={{ section: 'brands' }}
            >
              Representadas
            </Link>
            <Link 
              to="/" 
              className="hover:text-yellow-500"
              state={{ section: 'contact' }}
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}