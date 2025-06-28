'use client';

import { Mail, MapPin, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Autoplay } from 'swiper/modules';
import { brands } from "@/data";
import { Brand } from "@/types";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import ContactForm from "@/components/ContactFrom";
import { phoneMask } from "@/utils/phoneMask";
import { motion } from "motion/react"

export default function HomePage() {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
    const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE!;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] bg-cover bg-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")'
            }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-4 h-full flex items-center relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-white max-w-2xl"
                    >
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-5xl font-bold mb-6"
                        >
                            Mais que uma representação, somos o parceiro ideal para seu negócio.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-xl mb-8"
                        >
                            Fornecendo os melhores produtos para sua empresa, atuando no estado do Ceará a mais de 15 anos.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Brands and Products Section */}
            <section id="brands" className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-5xl text-blue-950 font-bold text-center mb-16"
                    >
                        Representamos as Marcas
                    </motion.h2>
                
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
                                className={`w-full h-32 bg-white rounded-lg p-6 transition-transform hover:scale-105 ${
                                selectedBrand === brand.name ? '' : ''
                                }`}
                            >
                                <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-full h-full object-contain "
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="p-16 bg-gray-50">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-4"
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-5xl text-blue-950 font-bold text-center mb-16"
                    >
                        Entre em Contato
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-center gap-8"
                    >
                        <div className="flex flex-1 flex-col items-start gap-2 md:gap-4">
                            <p className="text-gray-600 mb-4 max-w-[300px]">Seu empreendimento precisa de produtos de alta qualidade com ótimo custo benefício?<br/>Então não hesite em entrar em contato, nossos mix vai ajudar a elevar seus resultados.</p>
                            <a href={`https://wa.me/55${contactPhone}`} className="flex items-center gap-2 hover:text-blue-950 transition" target="_blank" rel="noopener noreferrer">
                                <Phone size={18} />
                                <span className="text-sm md:text-base">{phoneMask(contactPhone)}</span>
                            </a>
                            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-blue-950 transition" target="_blank" rel="noopener noreferrer">
                                <Mail size={18} />
                                <span className="text-sm md:text-base">{contactEmail}</span>
                            </a>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="text-sm md:text-base">Rua Antonio Zeferino veras 1685, Centro, Camocim, CE</span>
                            </div>
                        </div>
                        <div className="flex flex-1">
                            <ContactForm />
                        </div>
                    </motion.div>
                </motion.div>  
            </section>

            {/* Location Section */}
            <section id="location">
                <div>
                    <div className="flex justify-center">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7006091472012!2d-40.85364592514752!3d-2.9023206395276264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ebdbdb372030b9%3A0x5dfecb807f64b67b!2sRua%20Ant%C3%B4nio%20Zeferino%20Veras%2C%201685%20-%20Centro%2C%20Camocim%20-%20CE%2C%2062400-000!5e0!3m2!1spt-PT!2sbr!4v1748185128012!5m2!1spt-PT!2sbr" 
                            width="600" 
                            height="450" 
                            style={{ border: 0, width: '100%' }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe> 
                    </div>
                </div>
            </section>
        </div>
    );
}
