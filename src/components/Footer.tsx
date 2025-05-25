import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
            </div>
            <p className="text-gray-400">Mais que uma representação, somos o parceiro idéal para seu negócio. Fornecemos os melhores produtos para sua empresa, atuando no estado do Ceará a mais de 15 anos.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <a href="https://wa.me/5588992545339" className="flex items-center gap-2 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                  <Phone size={18} />
                  <span className="text-sm md:text-base">(88) 99254-5339</span>
              </a>
              <a href="mailto:objetivarepresentacoescam@gmail.com" className="flex items-center gap-2 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                  <Mail size={18} />
                  <span className="text-sm md:text-base">objetivarepresentacoescam@gmail.com</span>
              </a>
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
        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} <span className="text-yellow-500">Objetiva Representações</span>. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}