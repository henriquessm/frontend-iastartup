import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import bg3 from '../assets/img/bg9.png';
import work from '../assets/img/work.png';

import { Button } from '@/components/ui/button';

function App() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Header />

      {/* SEÇÃO PRINCIPAL COM FUNDO */}
      <div
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="pt-[100px] pb-40 relative overflow-hidden"
      >
        <div className="text-center text-[clamp(1.5rem,4vw,3rem)] poppins-regular leading-[1.5] px-4 pb-10 pt-15">
          <p>
            Reforma sem dor de cabeça.<br />
            <b>Crédito justo para transformar o seu lar.</b>
          </p>
        </div>

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

        <div className="flex justify-center items-center gap-15 flex-wrap pt-20">
          {[1, 2, 3].map((_, i) => (
            <img
              key={i}
              src={work}
              alt={`work-${i}`}
              className="w-[400px] h-[450px] object-cover rounded-2xl shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* SEÇÃO DE CONTEÚDO */}
      <div className="w-full px-8 py-24 flex flex-col gap-16 items-center bg-white">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row justify-between items-start gap-8 -mt-15">
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
        </div>

        {/* CARROSSEL DEPOIMENTOS COM EFEITO CONTÍNUO */}
        <div className="w-full overflow-hidden max-w-[1100px]" ref={carouselRef}>
          <p className="text-[#2797ff] text-xl font-bold mb-10 poppins-regular text-center">
            Quem já reformou com a gente:
          </p>

          <div
            className="flex gap-4 whitespace-nowrap animate-scroll"
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
                className="bg-[#1a1a1a] text-white rounded-xl p-5 shadow-lg min-w-[280px] max-w-[300px] flex-shrink-0"
              >
                <img
                  src={work}
                  alt="cliente"
                  className="w-full h-[180px] object-cover rounded-lg mb-4"
                />
                <p className="text-sm italic mb-2">“{d.quote}”</p>
                <p className="text-xs text-[#888] text-right">— {d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animação personalizada */}
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
