import React from 'react';

const CurrencyContext = React.createContext(null);
const useCurrency = () => React.useContext(CurrencyContext);

export { CurrencyContext, useCurrency };
