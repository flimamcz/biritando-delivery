import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { requestLogin, setToken } from '../services/request';
import MyContext from './MyContext';

function Provider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginDisabled, toggleLoginButton] = useState(true);
  const [isRegisterDisabled, toggleRegisterButton] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [formsInfo, setFormsInfo] = useState({
    loginEmailInput: '',
    loginPasswordInput: '',
    registerNameInput: '',
    registerEmailInput: '',
    registerPasswordInput: '',
    role: '',
  });

  const validateLoginInputs = useCallback(() => {
    const { loginEmailInput, loginPasswordInput } = formsInfo;
    const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const verifyEmail = Regex.test(loginEmailInput);
    const number = 6;
    const verifyUser = loginPasswordInput.length >= number;
    toggleLoginButton(!(verifyEmail && verifyUser));
  }, [formsInfo]);

  const validateRegisterInputs = useCallback(() => {
    const { registerEmailInput, registerPasswordInput, registerNameInput } = formsInfo;
    const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const verifyEmail = Regex.test(registerEmailInput);
    const minPassword = 6;
    const minName = 12;
    const verifyUser = registerPasswordInput.length >= minPassword;
    const verifyName = registerNameInput.length >= minName;
    toggleRegisterButton(!(verifyEmail && verifyUser && verifyName));
  }, [formsInfo]);

  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...formsInfo };
      auxValues[target.name] = target.value;
      setFormsInfo(auxValues);
    },
    [formsInfo],
  );

  const login = useCallback(async (event, info) => {
    event.preventDefault();
    try {
      const user = await requestLogin('/login', info);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(user.token);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  }, []);

  const logOut = useCallback(async (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem('user');

      setToken(null);
      setIsLogged(false);
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

  useEffect(() => {
    validateLoginInputs();
  }, [validateLoginInputs]);

  useEffect(() => {
    validateRegisterInputs();
  }, [validateRegisterInputs]);

  const contextValue = useMemo(
    () => ({
      handleChange,
      formsInfo,
      setFormsInfo,
      login,
      logOut,
      isLogged,
      failedTryLogin,
      isLoginDisabled,
      isRegisterDisabled,
      toggleLoginButton,
      toggleRegisterButton,
    }),
    [
      handleChange,
      formsInfo,
      setFormsInfo,
      login,
      logOut,
      isLogged,
      failedTryLogin,
      isLoginDisabled,
      isRegisterDisabled,
    ],
  );

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default Provider;
