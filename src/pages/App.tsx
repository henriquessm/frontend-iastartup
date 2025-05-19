import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import bg3 from '../assets/img/bg9.png';
import work from '../assets/img/work.png';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const cards = [
  { img: work, label: "Ativação", href: "#ativacao" },
  { img: work, label: "Inteligência para Vendas", href: "#inteligencia" },
  { img: work, label: "Crédito", href: "#credito" },
];

const AnimatedSection = ({ children, delay = 0, className = "" }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* secao com background */}
      <div
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="pt-[100px] pb-40 relative overflow-hidden"
      >
        <AnimatedSection>
          <div className="text-center text-[clamp(1.5rem,4vw,3rem)] poppins-regular leading-[1.5] px-4 pb-10 pt-15">
            <p>
              Reforma sem dor de cabeça.<br />
              <b>Crédito justo para transformar o seu lar.</b>
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="text-center text-[clamp(0.9rem,2vw,1.2rem)] poppins-light w-[90%] max-w-[800px] mx-auto leading-[1.5] px-4">
            <p>
              A gente acredita que seu lar merece mais. Por isso, oferecemos crédito consignado facilitado,
              com parcelas que cabem no bolso e sem burocracia.
            </p>

            <div className="flex justify-center mt-10 mb-16">
              <Button
                className="relative text-black bg-white hover:bg-[#2797ff] hover:text-white text-lg font-bold px-12 py-8 rounded-xl
                        transition-all duration-300 ease-in-out hover:scale-105 group overflow-hidden"
              >
                Comece sua reforma com a gente

                <div
                  className="absolute top-1/2 right-4 transform -translate-y-12 opacity-0
                          group-hover:translate-y-[-50%] group-hover:opacity-100
                          transition-all duration-300 w-6 h-6 rounded-full bg-[#ffffff]"
                />
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>


          <div className="flex gap-4 flex-wrap justify-center">
            {cards.map((card, i) => (
              <div key={i} className="relative w-[400px] h-[450px]">
                <motion.img
                  src={card.img}
                  alt={`work-${i}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                />
                <a
                  href={card.href}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                  bg-gray-300 text-black px-7 py-3 rounded-full font-medium
                  whitespace-nowrap text-m hover:bg-gray-400 transition"
                >
                  {card.label}
                </a>
              </div>
            ))}
          </div>

        </AnimatedSection>
      </div>

      <div className="w-full px-8 py-24 flex flex-col gap-16 items-center bg-white">
        <AnimatedSection className="max-w-[1200px] w-full flex flex-col md:flex-row justify-between items-start gap-8 -mt-15">
          <div className="text-[#2797ff] text-4xl font-bold leading-snug poppins-regular">
            Tudo o que você precisa<br />
            para reformar sua casa.
          </div>
          <div className="text-[#121212] max-w-[500px] poppins-light">
            <p className="font-bold mb-2">
              Reformar agora ficou mais fácil com o crédito consignado da nossa plataforma.
            </p>
            <p>
              Com aprovação rápida, juros acessíveis e parcelas que cabem no bolso,
              ajudamos você a dar vida nova ao seu lar, do jeitinho que sempre sonhou.
            </p>
          </div>
        </AnimatedSection>

        {/* carousel */}
        <AnimatedSection className="w-full overflow-hidden max-w-[1100px]" delay={0.2}>
          <div ref={carouselRef}>
            <p className="text-[#2797ff] text-xl font-bold mb-10 poppins-regular text-center">
              Quem já reformou com a gente:
            </p>

            <div
              className="flex gap-4 animate-scroll"
              style={{
                animation: 'scroll 45s linear infinite',
                width: 'fit-content',
              }}
            >
              {[
                {
                  name: 'Joana M.',
                  quote: 'Troquei todo o piso da cozinha com o crédito em menos de 48h!',
                },
                {
                  name: 'Carlos T.',
                  quote: 'A parcela cabe certinho no meu salário. Valeu muito a pena!',
                },
                {
                  name: 'Luciane R.',
                  quote: 'Nunca achei que fosse tão fácil reformar com crédito consignado.',
                },
                {
                  name: 'Marcos V.',
                  quote: 'Agora minha casa tá do jeitinho que eu sempre quis.',
                },
                {
                  name: 'Fernanda D.',
                  quote: 'Consegui reformar o banheiro sem apertar o orçamento.',
                },
                {
                  name: 'Joana M.',
                  quote: 'Troquei todo o piso da cozinha com o crédito em menos de 48h!',
                },
                {
                  name: 'Carlos T.',
                  quote: 'A parcela cabe certinho no meu salário. Valeu muito a pena!',
                },
                {
                  name: 'Luciane R.',
                  quote: 'Nunca achei que fosse tão fácil reformar com crédito consignado.',
                },
                {
                  name: 'Marcos V.',
                  quote: 'Agora minha casa tá do jeitinho que eu sempre quis.',
                },
                {
                  name: 'Fernanda D.',
                  quote: 'Consegui reformar o banheiro sem apertar o orçamento.',
                },
              ].map((d, idx) => (
                <div
                  key={idx}
                  className="bg-[#1a1a1a] text-white rounded-xl p-5 shadow-lg min-w-[280px] max-w-[360px] flex-shrink-0"
                >
                  <img
                    src={work || "/placeholder.svg"}
                    alt="cliente"
                    className="w-full h-[180px] object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm italic mb-2 break-words">“{d.quote}”</p>
                  <p className="text-xs text-[#888] text-right">— {d.name}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/*  aquela parte */}

      <AnimatedSection className="w-full px-8 py-24 bg-white flex flex-col items-center">
        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-12" id="inteligencia">
          <div className="flex-1">
            <p className="text-[#2797ff] font-semibold text-sm uppercase mb-2">Crédito Consignado</p>
            <h2 className="text-4xl font-bold text-[#121212] mb-6 leading-tight poppins-regular" >
              Crédito facilitado para<br />reformar sua casa
            </h2>
            <p className="text-[#444] text-lg poppins-light mb-8">
              Oferecemos crédito consignado com taxas acessíveis e contratação simplificada,
              ideal para quem deseja transformar sua casa com tranquilidade e segurança.
            </p>

            <p className="text-[#121212] text-xl font-semibold mb-4">Benefícios que fazem a diferença</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🏡', text: 'Financiamento para reforma' },
                { icon: '💰', text: 'Taxas competitivas' },
                { icon: '📄', text: 'Processo 100% digital' },
                { icon: '⏱️', text: 'Aprovação rápida' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3 bg-[#f9f9f9] p-4 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl text-[#2797ff]">{item.icon}</div>
                  <span className="text-[#121212] font-medium text-base poppins-regular">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-[40px] overflow-hidden shadow-lg relative">
              <img
                src={work || "/placeholder.svg"}
                alt="homem feliz"
                className="w-144 h-122 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="w-full px-8 py-24 bg-white flex flex-col items-center">
        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row-reverse items-center gap-12" id= "credito">
          <div className="flex-1">
            <p className="text-[#2797ff] font-semibold text-sm uppercase mb-2">Financiamento Descomplicado</p>
            <h2 className="text-4xl font-bold text-[#121212] mb-6 leading-tight poppins-regular" >
              Sua reforma começa com<br />um clique
            </h2>
            <p className="text-[#444] text-lg poppins-light mb-8">
              Com nosso crédito consignado, você consegue transformar seu espaço com rapidez e praticidade.
              Tudo sem sair de casa e com condições que fazem sentido para o seu bolso.
            </p>

            <p className="text-[#121212] text-xl font-semibold mb-4">Vantagens exclusivas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🧾', text: 'Sem taxas escondidas' },
                { icon: '📱', text: 'Simulação online fácil' },
                { icon: '💳', text: 'Desconto direto na folha' },
                { icon: '🏠', text: 'Ideal para qualquer ambiente' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3 bg-[#f9f9f9] p-4 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl text-[#2797ff]">{item.icon}</div>
                  <span className="text-[#121212] font-medium text-base poppins-regular">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-[40px] overflow-hidden shadow-lg relative">
              <img
                src={work || "/placeholder.svg"}
                alt="família reformando"
                className="w-144 h-122 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="w-full px-8 py-24 bg-white flex flex-col items-center">
        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-12" id = "ativacao">
          <div className="flex-1" id ="credito">
            <p className="text-[#2797ff] font-semibold text-sm uppercase mb-2">Facilidade e Transparência</p>
            <h2 className="text-4xl font-bold text-[#121212] mb-6 leading-tight poppins-regular" >
              Reforma planejada,<br />orçamento sob controle
            </h2>
            <p className="text-[#444] text-lg poppins-light mb-8">
              Tenha controle total sobre sua reforma. Com nosso crédito consignado,
              você sabe exatamente quanto vai pagar, sem sustos no final do mês.
            </p>

            <p className="text-[#121212] text-xl font-semibold mb-4">O que oferecemos:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🛠️', text: 'Use o crédito como quiser' },
                { icon: '🔒', text: 'Segurança em todo o processo' },
                { icon: '👷', text: 'Apoio em cada etapa da reforma' },
                { icon: '💼', text: 'Ideal para servidores e aposentados' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3 bg-[#f9f9f9] p-4 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl text-[#2797ff]">{item.icon}</div>
                  <span className="text-[#121212] font-medium text-base poppins-regular">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-[40px] overflow-hidden shadow-lg relative">
              <img
                src={work || "/placeholder.svg"}
                alt="obra em casa"
                className="w-144 h-122 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
      {/*  acabou aqui aquela parte */}

      <AnimatedSection className="w-full px-8 py-24 bg-white flex flex-col items-center">
        <div className="bg-black text-white rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto mt-16 mb-30">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2797ff]">
              Transforme seu lar com o crédito ideal!
            </h2>
            <p className="mt-3 text-[#6ec1ff]">Fale agora com um de nossos especialistas.</p>
          </div>

          <motion.button
            // Redireciona para a rota /simulacao ao clicar
            onClick={() => navigate('/simulacao')}
            className="relative text-black bg-white hover:bg-[#2797ff] hover:text-white text-lg font-bold px-12 py-6 rounded-xl
                       transition-all duration-300 ease-in-out hover:scale-105 group overflow-hidden" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Simule seu crédito
            <div
              className="absolute top-1/2 right-4 transform -translate-y-12 opacity-0
                         group-hover:translate-y-[-50%] group-hover:opacity-100
                         transition-all duration-300 w-6 h-6 rounded-full bg-[#ffffff]"
            />
          </motion.button>
        </div>
      </AnimatedSection>

      <Footer />

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }


          }
        `}
      </style>
    </>
  );
}

export default App;
