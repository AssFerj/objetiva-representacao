export default function Navigation() {
  return (
    <nav className="bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-yellow-500">Home</a>
            <a href="#brands" className="hover:text-yellow-500">Representadas</a>
            <a href="#contact" className="hover:text-yellow-500">Contato</a>
          </div>
        </div>
      </div>
    </nav>
  );
}