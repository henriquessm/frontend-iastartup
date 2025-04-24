import { useEffect, useState } from 'react';
import Logo from '../assets/tung.png';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // descendo, esconde
      } else {
        setShowHeader(true); // subindo, mostra
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 left-0 bg-[#DBF9F0] shadow-md z-1000 flex items-center justify-center h-[70px] w-full rounded-b-lg transition-transform duration-300 mb-[100px]`}
    >
      <img src={Logo} alt="Company Logo" className="w-[min(90%,50px)] mr-5" />
      <nav>
        <ul className="flex flex-wrap list-none m-0 p-0">
          <li className="ml-5">
            <a
              href="/about"
              className="text-[#435e4b] no-underline font-bold text-sm"
            >
              Inteligência
            </a>
          </li>
          <li className="ml-5">
            <a
              href="/services"
              className="text-[#435e4b] no-underline font-bold text-sm"
            >
              Crédito
            </a>
          </li>
          <li className="ml-5">
            <a
              href="/contact"
              className="text-[#435e4b] no-underline font-bold text-sm"
            >
              Ativação
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;