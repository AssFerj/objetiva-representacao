import { Building2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
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
        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Objetiva Representações. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}