import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { requestPost } from '../services/request';

export default function AdminForm() {
  const {
    handleChange, formsInfo,
    isRegisterDisabled, setFormsInfo,
    isLogged,
  } = useContext(MyContext);

  const [failedRequest, setFailedRequest] = useState(false);
  const [sucessRequest, setSucessRequest] = useState(false);

  const dataUser = {
    name: formsInfo.registerNameInput,
    email: formsInfo.registerEmailInput,
    password: formsInfo.registerPasswordInput,
    role: formsInfo.registerRoleInput,
  };

  const sendRegisterRequest = async (event) => {
    event.preventDefault();
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      await requestPost('/admin/manage', dataUser, headers);
      setFormsInfo({
        loginEmailInput: '',
        loginPasswordInput: '',
        registerNameInput: '',
        registerEmailInput: '',
        registerPasswordInput: '',
        registerRoleInput: 'customer',
      });
      setFailedRequest(false);
      setSucessRequest(true);
    } catch (error) {
      setFormsInfo({
        loginEmailInput: '',
        loginPasswordInput: '',
        registerNameInput: '',
        registerEmailInput: '',
        registerPasswordInput: '',
        registerRoleInput: 'customer',
      });
      setSucessRequest(false);
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
      registerRoleInput: 'customer',
    });
  }, []);

  try {
    const { role } = JSON.parse(localStorage.getItem('user'));
    if (!isLogged || role !== 'administrator') {
      return <Redirect to="/login" />;
    }
  } catch (error) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="registerNameInput"
            placeholder="Nome e sobrenome"
            value={ formsInfo.registerNameInput }
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="text"
            name="registerEmailInput"
            placeholder="seu-email@site.com.br"
            value={ formsInfo.registerEmailInput }
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="registerPasswordInput"
            placeholder="********"
            value={ formsInfo.registerPasswordInput }
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="role">
          Tipo
          <select
            name="registerRoleInput"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
            defaultValue="customer"
          >
            <option value="customer">Consumidor</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={ isRegisterDisabled }
          data-testid="admin_manage__button-register"
          onClick={ sendRegisterRequest }
        >
          CADASTRAR
        </button>
        <br />
        {failedRequest && (
          <span data-testid="admin_manage__element-invalid_register">
            Erro ao realizar cadastro!
          </span>
        )}
        {
          sucessRequest && (
            <span data-testid="common_register__element-invalid_register">
              Usuário cadastro com sucesso!
            </span>
          )
        }
      </form>
      <h2>Lista de usuários</h2>
    </>
  );
}
