import Header from '../components/Header';
import bg3 from '../assets/img/bg9.png';
import work from '../assets/img/work.png'; // mesma imagem temporariamente
import { Button } from '@/components/ui/button';

function App() {
  return (
    <>
      <Header />

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
            Estratégia. Inteligência. Credito.<br />
            <b>Vender mais e melhor é SIEL.</b>
          </p>
        </div>

        <div className="text-center text-[clamp(0.9rem,2vw,1.2rem)] poppins-regular w-[90%] max-w-[800px] mx-auto leading-[1.5] px-4">
          <p>
            Uma plataforma completa de otimização de vendas para grandes empresas.
            Usar inteligência de dados, viabilizar crédito e ativar seus leads.
          </p>

          {/* Botão */}
          <div className="flex justify-center mt-10 mb-16">
            <Button
              className="relative text-black bg-white hover:bg-[#2797ff] hover:text-white text-lg font-bold px-12 py-8 rounded-xl
                        transition-all duration-300 ease-in-out hover:scale-105 group overflow-hidden"
            >
              Dê um SIEL no seu negócio

              <div
                className="absolute top-1/2 right-4 transform -translate-y-12 opacity-0
                          group-hover:translate-y-[-50%] group-hover:opacity-100
                          transition-all duration-300 w-6 h-6 rounded-full bg-[#ffffff]"
              />
            </Button>
          </div>
        </div>

        {/* Três imagens abaixo do botão */}
        <div className="flex justify-center items-center gap-15 flex-wrap pt-20">
          {[1, 2, 3].map((_, i) => (
            <img
              key={i}
              src={work}
              alt={`work-${i}`}
              className="w-[400px] h-[500px] object-cover rounded-2xl shadow-lg"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
