import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../styles/login.css';
import logo from '../images/logoTexto.svg';

function LoginForm() {
  const {
    handleChange, login,
    formsInfo, failedTryLogin,
    isLogged, isLoginDisabled,
    resetInputs,
  } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    resetInputs();
  }, [resetInputs]);

  const { loginEmailInput, loginPasswordInput } = formsInfo;

  if (isLogged) {
    const { role } = JSON.parse(localStorage.getItem('user'));
    switch (role) {
    case 'administrator': return <Redirect to="/admin/manage" />;
    case 'customer': return <Redirect to={ `/${role}/products` } />;
    case 'seller': return <Redirect to={ `/${role}/orders` } />;
    default: return <Redirect to="/" />;
    }
  }

  return (
    <main className="main-login">
      <section className="right-login">
        <div className="login_logo">
          <img src={ logo } alt="logo imagem" />
        </div>
        <form className="card-login">
          <h1>Login</h1>
          <label htmlFor="email-input" className="text-field">
            <h4>Email:</h4>
            <input
              placeholder="exemplo@email.com"
              type="email"
              name="loginEmailInput"
              id="email-input"
              onChange={ handleChange }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="password-input" className="text-field">
            <h4>Senha:</h4>
            <input
              placeholder="sua senha"
              type="password"
              name="loginPasswordInput"
              id="password-input"
              onChange={ handleChange }
              data-testid="common_login__input-password"
            />
          </label>
          {
            failedTryLogin
              && (
                <p data-testid="common_login__element-invalid-email">
                  e-mail ou a senha incorretos.
                </p>
              )
          }
          <button
            type="submit"
            disabled={ isLoginDisabled }
            onClick={ (event) => login(event, {
              email: loginEmailInput,
              password: loginPasswordInput,
            }) }
            data-testid="common_login__button-login"
            className="btn-login"
          >
            LOGIN
          </button>
          <button
            type="button"
            id="register-btn"
            onClick={ () => history.push('/register') }
            data-testid="common_login__button-register"
            className="btn-register"
          >
            Ainda não tenho cadastro
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginForm;
