import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../styles/login.css';
import logo from '../images/logoTexto.svg';

export default function RegisterForm() {
  const {
    handleChange, formsInfo,
    isRegisterDisabled, resetInputs,
    register, failedTryRegister, isLogged,
  } = useContext(MyContext);

  const history = useHistory();

  const dataUser = {
    name: formsInfo.registerNameInput,
    email: formsInfo.registerEmailInput,
    password: formsInfo.registerPasswordInput,
  };

  useEffect(() => {
    resetInputs();
  }, [resetInputs]);

  if (isLogged) {
    return <Redirect to="/customer/products" />;
  }

  return (
    <main className="main-login">
      <section className="right-login">
        <img src={ logo } alt="logo imagem" />
        <form className="card-login">
          <label htmlFor="name" className="text-field">
            <h4>Nome:</h4>
            <input
              type="text"
              name="registerNameInput"
              placeholder="Informe seu nome"
              data-testid="common_register__input-name"
              onChange={ handleChange }
            />
          </label>

          <label htmlFor="email" className="text-field">
            <h4>email:</h4>
            <input
              type="text"
              name="registerEmailInput"
              placeholder="Informe seu melhor email"
              data-testid="common_register__input-email"
              onChange={ handleChange }
            />
          </label>

          <label htmlFor="password" className="text-field">
            <h4>senha:</h4>
            <input
              type="password"
              name="registerPasswordInput"
              placeholder="Insira sua senha"
              data-testid="common_register__input-password"
              onChange={ handleChange }
            />
          </label>

          {
            failedTryRegister && (
              <p data-testid="common_register__element-invalid_register">
                Erro ao realizar cadastro!
              </p>
            )
          }

          <button
            className="btn-login"
            type="submit"
            disabled={ isRegisterDisabled }
            data-testid="common_register__button-register"
            onClick={ (event) => register(event, dataUser) }
          >
            CADASTRAR
          </button>

          <button
            className="btn-register"
            type="submit"
            data-testid="common_register__button-register"
            onClick={ () => history.push('/login') }
          >
            já possuo cadastro
          </button>

        </form>
      </section>
    </main>
  );
}
