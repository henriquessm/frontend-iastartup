import { useEffect, useState } from 'react';
import Logo from '../assets/img/siel.png';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 h-[90px] flex items-center px-6`}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={Logo} alt="Company Logo" className="h-30" />
      </div>

      {/* Spacer central */}
      <div className="flex-grow" />

      {/* Navegação */}
      <nav>
        <ul className="flex space-x-8 items-center">
            <>
              <style>{`
                html {
                  scroll-behavior: smooth;
                }
              `}</style>

              <li>
                <a href="#inteligencia" className="text-black font-semibold text-lg">
                  Inteligência
                </a>
              </li>
            </>
            <>
              <style>{`
                html {
                  scroll-behavior: smooth;
                }
              `}</style>

              <li>
                <a href="#credito" className="text-black font-semibold text-lg">
                  Crédito
                </a>
              </li>
            </>
            <>
              <style>{`
                html {
                  scroll-behavior: smooth;
                }
              `}</style>

              <li>
                <a href="#ativacao" className="text-black font-semibold text-lg">
                  Ativação
                </a>
              </li>
            </>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
