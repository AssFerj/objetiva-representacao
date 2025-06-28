import { Phone, Mail, MapPin } from "lucide-react";
import { phoneMask } from "../utils/phoneMask";
import { motion } from "motion/react"

export default function Footer() {
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
    const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE!;

  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            transition={{ duration: 1, delay: 0.6 }} 
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img src="/assets/objetiva-logo.svg" alt="Objetiva Representações" className="w-40" />
            </div>
            <p className="text-gray-400">Mais que uma representação, somos o parceiro idéal para seu negócio. Fornecemos os melhores produtos para sua empresa, atuando no estado do Ceará a mais de 15 anos.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            transition={{ duration: 1, delay: 0.6 }} 
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <a href={`https://wa.me/55${contactPhone}`} className="flex items-center gap-2 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                  <Phone size={18} />
                  <span className="text-sm md:text-base">{phoneMask(contactPhone)}</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-yellow-500 transition" target="_blank" rel="noopener noreferrer">
                  <Mail size={18} />
                  <span className="text-sm md:text-base">{contactEmail}</span>
              </a>
              <p className="flex items-center"> 
                <MapPin size={18} className="mr-2" />
                Rua Antonio Zeferino Veras 1685, Centro, Camocim, CE
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            transition={{ duration: 1, delay: 0.6 }} 
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Horário de Atendimento</h4>
            <p className="text-gray-400">Segunda a Sexta: 8h às 18h</p>
            <p className="text-gray-400">Sábado: 8h às 12h</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          transition={{ duration: 1, delay: 0.8 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} <span className="text-yellow-500">Objetiva Representações</span>. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}