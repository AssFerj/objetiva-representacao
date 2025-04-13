import { ChevronRight, Truck, BadgeCheck, Users } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Autoplay } from 'swiper/modules';
import { brands, products } from "../data";
import { Brand, Product } from "../types";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const filteredProducts: Product[] = selectedBrand
        ? products.filter((product: Product) => product.brand === selectedBrand)
        : products;

    return (
        <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-cover bg-center" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")'
        }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="container mx-auto px-4 h-full flex items-center relative">
            <div className="text-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">Excelência em Distribuição de Materiais de Limpeza</h1>
                <p className="text-xl mb-8">Fornecendo as melhores soluções em produtos de limpeza para sua empresa</p>
                <button className="bg-blue-950 text-white px-8 py-3 rounded-full flex items-center hover:bg-blue-900 transition">
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
                modules={[SwiperNavigation, Autoplay]}
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
                        className={`w-full h-32 bg-white rounded-lg p-4 transition-transform hover:scale-105 ${
                        selectedBrand === brand.name ? 'ring-2 ring-blue-950' : ''
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
        </div>
    );
}