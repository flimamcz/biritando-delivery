// import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

function LoginForm() {
  const {
    handleChange, login,
    formsInfo, failedTryLogin,
    isLogged, isLoginDisabled,
    setFormsInfo,
  } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    setFormsInfo({
      loginEmailInput: '',
      loginPasswordInput: '',
      registerNameInput: '',
      registerEmailInput: '',
      registerPasswordInput: '',
    });
  }, []);

  const { loginEmailInput, loginPasswordInput } = formsInfo;

  if (isLogged) {
    const { role } = JSON.parse(localStorage.getItem('user'));
    switch (role) {
    case 'administrator': return <Redirect to={ `/${role}/manage` } />;
    case 'customer': return <Redirect to={ `/${role}/products` } />;
    case 'seller': return <Redirect to={ `/${role}/orders` } />;
    default: return <Redirect to="/" />;
    }
  }

  return (
    <form>
      <label htmlFor="email-input">
        Login
        <input
          type="email"
          name="loginEmailInput"
          id="email-input"
          onChange={ handleChange }
          data-testid="common_login__input-email"
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          type="password"
          name="loginPasswordInput"
          id="password-input"
          onChange={ handleChange }
          data-testid="common_login__input-password"
        />
      </label>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
              Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
      <button
        type="submit"
        disabled={ isLoginDisabled }
        onClick={ (event) => login(event, {
          email: loginEmailInput,
          password: loginPasswordInput,
        }) }
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>
      <button
        type="button"
        id="register-btn"
        onClick={ () => history.push('/register') }
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}

export default LoginForm;
