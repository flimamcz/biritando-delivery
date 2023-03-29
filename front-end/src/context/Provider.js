import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [state, setState] = useState([]);

  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default Provider;
