import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setToken, requestGet, requestPost }
  from '../services/request';
import MyContext from './MyContext';

function Provider({ children }) {
  const [productsData, setProductsData] = useState([{}]);
  const [ordersLists, setOrdersLists] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);

  const [isLogged, setIsLogged] = useState(false);
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
  const history = useHistory();

  // --------- inputs ----------- //
  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...formsInfo };
      auxValues[target.name] = target.value;
      setFormsInfo(auxValues);
    },
    [formsInfo],
  );

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

  const resetInputs = useCallback(() => {
    setFormsInfo({
      loginEmailInput: '',
      loginPasswordInput: '',
      registerNameInput: '',
      registerEmailInput: '',
      registerPasswordInput: '',
      registerRoleInput: 'customer',
    });
  }, []);

  // --------- login, cadastro e logout ----------- //
  const login = useCallback(async (event, info) => {
    event.preventDefault();
    try {
      const user = await requestPost('/login', info);
      const { id, ...userInfo } = user;
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('userId', JSON.stringify({ userId: id }));
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

  const logOut = useCallback(async () => {
    try {
      localStorage.clear();
      setToken(null);
      setIsLogged(false);
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

  // --------- request ----------- //
  const getProducts = useCallback(async () => {
    try {
      const productsList = await requestGet('/customer/products');
      setProductsData(productsList);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const getOrders = useCallback(async (role, userId) => {
    try {
      const orders = await requestGet(`/${role}/orders/user/${userId}`);
      setOrdersLists(orders);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const users = await requestGet('/user');
      setUsersList(users);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const getSellers = useCallback(async () => {
    try {
      const seller = await requestGet('/seller');
      setSellers(seller);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // --------- validação ----------- //
  const verifyLogin = useCallback(() => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      if (token) {
        setToken(token);
        setIsLogged(true);
      } else {
        setIsLogged(false);
        history.push('/login');
      }
    } catch (error) {
      setIsLogged(false);
    }
  }, [history]);

  // --------- useEffects ----------- //
  useEffect(() => {
    validateLoginInputs();
    validateRegisterInputs();
  }, [validateLoginInputs, validateRegisterInputs]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const contextValue = useMemo(
    () => ({
      handleChange,
      setFormsInfo,
      setSaleInfo,
      resetInputs,
      getProducts,
      getOrders,
      getUsers,
      getSellers,
      setCartItems,
      login,
      setIsLogged,
      register,
      verifyLogin,
      logOut,
      formsInfo,
      saleInfo,
      isLogged,
      productsData,
      ordersLists,
      usersList,
      sellers,
      cartItems,
      isLoginDisabled,
      isRegisterDisabled,
      failedTryLogin,
      failedTryRegister,
    }),
    [
      handleChange,
      setFormsInfo,
      setSaleInfo,
      resetInputs,
      getProducts,
      getOrders,
      getUsers,
      getSellers,
      setCartItems,
      login,
      setIsLogged,
      register,
      verifyLogin,
      logOut,
      formsInfo,
      saleInfo,
      isLogged,
      productsData,
      ordersLists,
      usersList,
      sellers,
      cartItems,
      isLoginDisabled,
      isRegisterDisabled,
      failedTryLogin,
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
