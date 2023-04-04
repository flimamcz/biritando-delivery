import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { requestOrders, setToken, requestGet, requestPost }
  from '../services/request';
import MyContext from './MyContext';

function Provider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [productsData, setProductsData] = useState([{}]);
  const [isLoginDisabled, toggleLoginButton] = useState(true);
  const [isRegisterDisabled, toggleRegisterButton] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [failedTryRegister, setFailedTryRegister] = useState(false);
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

  const getProducts = useCallback(async () => {
    try {
      const productsList = await requestGet('/customer/products');
      setProductsData(productsList);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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
      const user = await requestPost('/login', info);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(user.token);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
    }
  }, []);

  const register = useCallback(
    async (event, info) => {
      event.preventDefault();
      try {
        await requestPost('/register', info);
        login(event, info);
      } catch (error) {
        setFailedTryRegister(true);
      }
    },
    [login],
  );

  const logOut = useCallback(async (event) => {
    event.preventDefault();
    try {
      localStorage.clear();

      setToken(null);
      setIsLogged(false);
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

  const getOrders = useCallback(async (event) => {
    event.preventDefault();
    const orders = await requestOrders('/seller/orders');
    return orders;
    // localStorage.setItem('orders', JSON.stringify(orders));
  }, []);

  useEffect(() => {
    validateLoginInputs();
  }, [validateLoginInputs]);

  useEffect(() => {
    validateRegisterInputs();
  }, [validateRegisterInputs]);

  const verifyToken = useCallback(() => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      if (token) {
        setIsLogged(true);
      }
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

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
      getOrders,
      productsData,
      getProducts,
      setIsLogged,
      verifyToken,
      register,
      failedTryRegister,
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
      getOrders,
      productsData,
      getProducts,
      setIsLogged,
      verifyToken,
      register,
      failedTryRegister,
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
