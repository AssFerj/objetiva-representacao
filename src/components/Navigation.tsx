import { Building2 } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Building2 size={32} className="text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-blue-600">Objetiva</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            {/* <a href="#about" className="text-gray-700 hover:text-blue-600">Sobre</a> */}
            <a href="#products" className="text-gray-700 hover:text-blue-600">Produtos</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contato</a>
          </div>
        </div>
      </div>
    </nav>
  );
}