import React, { createContext, useContext, useState } from 'react';

// Criando um contexto para o valor booleano
export const BooleanContext = createContext();

// Componente que contém o estado e fornece o contexto
export const BooleanProvider = ({ children }) => {
  const [booleanValue, setBooleanValue] = useState(false);

  const toggleBooleanValue = () => {
    setBooleanValue(prevValue => !prevValue);
  };
console.log(booleanValue);
  return (
    <BooleanContext.Provider value={{ booleanValue, toggleBooleanValue }}>
      {children}
    </BooleanContext.Provider>
  );
};