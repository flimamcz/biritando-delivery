import React from 'react';
import logo from '../images/logo.svg';
import '../styles/NotFound.css';
import image404 from '../images/404.svg';

export default function NotFound() {
  const backToPageLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <header className="header">
        <img src={ logo } alt="logo imagem" width="100px" />
      </header>

      <div className="content-404">
        <h1>PÁGINA NÃO ENCONTRADA</h1>
        <img src={ image404 } alt="drunkMan in page 404" width={ 400 } />
        <button
          type="button"
          onClick={ () => backToPageLogin() }
        >
          Voltar para página inicial
        </button>
      </div>
    </>
  );
}
