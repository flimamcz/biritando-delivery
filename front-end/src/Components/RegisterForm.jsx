import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

export default function RegisterForm() {
  const {
    handleChange, formsInfo,
    isRegisterDisabled, setFormsInfo,
    register, failedTryRegister, isLogged,
  } = useContext(MyContext);

  const dataUser = {
    name: formsInfo.registerNameInput,
    email: formsInfo.registerEmailInput,
    password: formsInfo.registerPasswordInput,
  };

  useEffect(() => {
    setFormsInfo({
      loginEmailInput: '',
      loginPasswordInput: '',
      registerNameInput: '',
      registerEmailInput: '',
      registerPasswordInput: '',
    });
  }, [setFormsInfo]);

  if (isLogged) {
    return <Redirect to="/customer/products" />;
  }

  return (
    <form>
      <span>{`${isLogged}`}</span>
      <label htmlFor="name">
        nome
        <input
          type="text"
          name="registerNameInput"
          placeholder="Informe seu nome"
          data-testid="common_register__input-name"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          name="registerEmailInput"
          placeholder="Informe seu melhor email"
          data-testid="common_register__input-email"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="registerPasswordInput"
          placeholder="Insira sua senha"
          data-testid="common_register__input-password"
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        disabled={ isRegisterDisabled }
        data-testid="common_register__button-register"
        onClick={ (event) => register(event, dataUser) }
      >
        CADASTRAR
      </button>

      {failedTryRegister && (
        <span data-testid="common_register__element-invalid_register">
          Erro ao realizar cadastro!
        </span>
      )}
    </form>
  );
}
