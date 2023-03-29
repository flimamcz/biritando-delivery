import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { requestLogin, setToken } from '../services/request';
import MyContext from './MyContext';

function Provider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginDisabled, toggleLoginButton] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [formsInfo, setFormsInfo] = useState({
    emailInput: '',
    passwordInput: '',
  });

  const validateInputs = useCallback(() => {
    const { emailInput, passwordInput } = formsInfo;
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(emailInput);
    const number = 6;
    const verifyUser = passwordInput.length >= number;
    toggleLoginButton(!(verifyEmail && verifyUser));
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

  useEffect(() => {
    validateInputs();
  }, [validateInputs]);

  const contextValue = useMemo(
    () => ({
      handleChange,
      formsInfo,
      setFormsInfo,
      login,
      isLogged,
      failedTryLogin,
      validateInputs,
      isLoginDisabled,
    }),
    [
      handleChange,
      formsInfo,
      setFormsInfo,
      login,
      isLogged,
      failedTryLogin,
      validateInputs,
      isLoginDisabled,
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
