import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { requestLogin } from '../services/request';

export default function RegisterForm() {
  const {
    handleChange, formsInfo,
    isRegisterDisabled, setFormsInfo,
  } = useContext(MyContext);

  const [failedRequest, setFailedRequest] = useState(false);

  const history = useHistory();

  const dataUser = {
    name: formsInfo.registerNameInput,
    email: formsInfo.registerEmailInput,
    password: formsInfo.registerPasswordInput,
  };

  const sendRegisterRequest = async (event) => {
    event.preventDefault();
    try {
      await requestLogin('register', dataUser);
      history.push('/customer/products');
    } catch (error) {
      setFailedRequest(true);
    }
  };

  useEffect(() => {
    setFormsInfo({
      loginEmailInput: '',
      loginPasswordInput: '',
      registerNameInput: '',
      registerEmailInput: '',
      registerPasswordInput: '',
      role: '',
    });
  }, []);

  return (
    <form>
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
        onClick={ sendRegisterRequest }
      >
        CADASTRAR
      </button>

      {failedRequest && (
        <span data-testid="common_register__element-invalid_register">
          Erro ao realizar cadastro!
        </span>
      )}
    </form>
  );
}
