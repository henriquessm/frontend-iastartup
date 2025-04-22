import './Header.css';
import { useEffect, useState } from 'react';
import Logo from './assets/porta_tile.png';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY  > lastScrollY) {
        setShowHeader(false); // descendo, esconde
      } else {
        setShowHeader(true);  // subindo, mostra
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${showHeader ? '' : 'hidden'}`}>
      <img src={Logo} alt="Company Logo" className="logo" />
      <nav>
        <ul>
          <li><a href="/about">Inteligência</a></li>
          <li><a href="/services">Crédito</a></li>
          <li><a href="/contact">Ativação</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
