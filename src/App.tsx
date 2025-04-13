import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, ChevronRight, Truck, Users, BadgeCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { brands, products } from './data';
import type { Brand, Product } from './types';
import 'swiper/css';
import 'swiper/css/navigation';

function App(): JSX.Element {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts: Product[] = selectedBrand
    ? products.filter((product: Product) => product.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>(88) 99265-6171</span>
              <Mail size={18} />
              <span>contato@objetivarepresentacoes.com.br</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>Camocim, CE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Building2 size={32} className="text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">Objetiva</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">Sobre</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600">Produtos</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Excelência em Distribuição de Materiais de Limpeza</h1>
            <p className="text-xl mb-8">Fornecendo as melhores soluções em produtos de limpeza para sua empresa</p>
            <button className="bg-blue-950 text-white px-8 py-3 rounded-full flex items-center hover:bg-blue-950 transition">
              Saiba mais
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Entrega Rápida</h3>
              <p className="text-gray-600">Logística eficiente para atender suas necessidades com agilidade</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos de alta qualidade das melhores marcas do mercado</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Atendimento Personalizado</h3>
              <p className="text-gray-600">Equipe especializada para melhor atender sua empresa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands and Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Representadas</h2>
          
          {/* Brands Slider */}
          <div className="mb-16">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 3000 }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30
                }
              }}
              className="brand-slider"
            >
              {brands.map((brand: Brand) => (
                <SwiperSlide key={brand.id}>
                  <button
                    onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
                    className={`w-full h-32 bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 ${
                      selectedBrand === brand.name ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Products Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">
              {selectedBrand ? `Produtos ${selectedBrand}` : 'Todos os Produtos'}
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product: Product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold">{product.name}</h3>
                    <p className="text-white/80 text-sm">{product.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Building2 size={24} className="mr-2" />
                <span className="text-xl font-bold">Objetiva Representações</span>
              </div>
              <p className="text-gray-400">Sua parceira em soluções de limpeza profissional</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  (88) 99265-6171
                </p>
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  contato@objetivarepresentacoes.com.br
                </p>
                <p className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Camocim, CE
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Horário de Atendimento</h4>
              <p className="text-gray-400">Segunda a Sexta: 8h às 18h</p>
              <p className="text-gray-400">Sábado: 8h às 12h</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Objetiva Representações. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;