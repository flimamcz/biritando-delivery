// import PropTypes from 'prop-types'
import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';

function LoginForm() {
  const {
    handleChange, login,
    formsInfo, failedTryLogin,
    isLogged, isLoginDisabled,
  } = useContext(MyContext);

  const history = useHistory();

  const { emailInput, passwordInput } = formsInfo;

  if (isLogged) return <Redirect to="/matches" />;

  return (
    <form>
      <label htmlFor="email-input">
        Login
        <input
          type="text"
          name="emailInput"
          id="email-input"
          onChange={ handleChange }
          data-testid="common_login__input-email"
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          type="text"
          name="passwordInput"
          id="password-input"
          onChange={ handleChange }
          data-testid="common_login__input-password"
        />
      </label>
      {
        (failedTryLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">
              {
                `O endereço de e-mail ou a senha não estão corretos.
              Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
      <input
        type="submit"
        value="LOGIN"
        disabled={ isLoginDisabled }
        onClick={ (event) => login(event, {
          email: emailInput,
          password: passwordInput,
        }) }
      />
      <input
        type="button"
        value="Ainda não tenho conta"
        onClick={ () => history.push('/register') }
      />
    </form>
  );
}

export default LoginForm;
