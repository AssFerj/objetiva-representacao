export default function Navigation() {
  return (
    <nav className="bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-600">Home</a>
            {/* <a href="#about" className="text-gray-700 hover:text-blue-600">Sobre</a> */}
            <a href="#products" className="hover:text-blue-600">Produtos</a>
            <a href="#contact" className="hover:text-blue-600">Contato</a>
          </div>
        </div>
      </div>
    </nav>
  );
}