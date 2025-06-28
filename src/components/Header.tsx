import { Phone, Mail, MapPin } from "lucide-react";
import { phoneMask } from "../utils/phoneMask";

export default function Header() {
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
    const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE!;

  return (
    <header className="text-blue-950">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-col sm:flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
            <a href={`https://wa.me/55${contactPhone}`} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Phone size={18} />
                <span className="text-sm md:text-base">{phoneMask(contactPhone)}</span>
            </a>
            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Mail size={18} />
                <span className="text-sm md:text-base">{contactEmail}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://www.google.com/maps/place/Camocim+CE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="text-sm md:text-base">Rua Antonio Zeferino Veras 1685, Centro, Camocim, CE</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
        