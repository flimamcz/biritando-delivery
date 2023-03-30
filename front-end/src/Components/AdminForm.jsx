import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { requestLogin } from '../services/request';

export default function AdminForm() {
  const {
    handleChange, formsInfo,
    isRegisterDisabled, setFormsInfo,
    logOut,
  } = useContext(MyContext);

  const [failedRequest, setFailedRequest] = useState(false);

  const history = useHistory();
  const user = localStorage.getItem('user');

  const dataUser = {
    name: formsInfo.registerNameInput,
    email: formsInfo.registerEmailInput,
    password: formsInfo.registerPasswordInput,
    role: formsInfo.registerRoleInput,
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
      registerRoleInput: '',
    });
  }, []);

  return (
    <>
      <div>
        <li data-testid="customer_products__element-navbar-link-orders">
          <Link to="/seller/orders">GERENCIAR USUÁRIOS</Link>
        </li>
        <li data-testid="customer_products__element-navbar-user-full-name">
          {user.name}
        </li>
        <button
          type="button"
          onClick={ logOut }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="registerNameInput"
            placeholder="Nome e sobrenome"
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
            // defaultValue={ customer }
          >
            <option value="customer" selected>Consumidor</option>
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

        {failedRequest && (
          <span data-testid="common_register__element-invalid_register">
            Erro ao realizar cadastro!
          </span>
        )}
      </form>
    </>
  );
}
