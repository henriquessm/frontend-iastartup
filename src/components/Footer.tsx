import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#d0ecff] text-black relative">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2797ff]">SIEL</h1>
          <p className="mt-4">
            Soluções de crédito para reformas residenciais, com tecnologia e inteligência para transformar lares e realizar sonhos.
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Soluções</h2>
          <ul className="space-y-1">
            <li>Simulação de Crédito</li>
            <li>Reformas Planejadas</li>
            <li>Consultoria Financeira</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Contato</h2>
          <p>Fale com um especialista</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Nossas redes</h2>
          <div className="flex items-center gap-4 text-xl">
            <FaLinkedin />
            <FaWhatsapp />
          </div>
        </div>
      </div>

      <div className="bg-black text-[#6ec1ff] text-sm flex flex-col md:flex-row justify-between items-center px-6 py-4">
        <p>©SIEL 2025 | Todos os direitos reservados</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#">Política de Privacidade</a>
          <a href="#">Cookies</a>
          <span>Desenvolvido por: <strong>SeuNomeDev</strong></span>
        </div>
      </div>
    </footer>
  );
}
