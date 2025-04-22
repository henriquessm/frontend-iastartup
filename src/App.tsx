import './App.css'
import Header from './Header'

function App() {
  return (
    <>

<Header />

  <div style={{ 
    paddingTop: '100px',
    textAlign: 'center',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // responsivo
    fontFamily: 'Poppins',
    lineHeight: '1.5',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }}>
    <p>
      Palavras legais tipo dinheiro.<br />
      <b>Uma frase de efeito mais legal.</b>
    </p>
  </div>

  <div style={{ 
    textAlign: 'center',
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
    fontFamily: 'Poppins',
    width: '90%',
    maxWidth: '500px',
    margin: '1rem auto',
    lineHeight: '1.5',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }}>
    <p>
      Uma plataforma completa de otimização de vendas para grandes empresas.
      Usar inteligência de dados, viabilizar crédito e ativar seus leads.
    </p>
  </div>
    </>
  )
}

export default App
