import { Phone, Mail, MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="text-blue-950">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
            <a href="https://wa.me/5588992545339" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Phone size={18} />
                <span className="text-sm md:text-base">(88) 99254-5339</span>
            </a>
            <a href="mailto:objetivarepresentacoescam@gmail.com" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Mail size={18} />
                <span className="text-sm md:text-base">objetivarepresentacoescam@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://www.google.com/maps/place/Camocim+CE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="text-sm md:text-base">Camocim, CE</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
        