import { Phone, Mail, MapPin } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span className="text-sm md:text-base">(88) 99265-6171</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span className="text-sm md:text-base">contato@objetivarepresentacoes.com.br</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span className="text-sm md:text-base">Camocim, CE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
        