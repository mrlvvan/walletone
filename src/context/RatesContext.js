import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Курсы обмена между парами (from -> to).
 * Ключ: "TON_USDT" = сколько USDT за 1 TON.
 */
const DEFAULT_RATES = {
  TON_USDT: 1.32,
  USDT_TON: 1 / 1.32,
};

const RatesContext = createContext(null);

export function RatesProvider({ children }) {
  const [rates, setRates] = useState(DEFAULT_RATES);

  const updateRates = useCallback((newRates) => {
    setRates((prev) => ({ ...prev, ...newRates }));
  }, []);

  const getRate = useCallback(
    (from, to) => {
      const key = `${from}_${to}`;
      if (rates[key] != null) return rates[key];
      const reverseKey = `${to}_${from}`;
      if (rates[reverseKey] != null) return 1 / rates[reverseKey];
      return null;
    },
    [rates]
  );

  const formatConverted = (value) => {
    if (value >= 1000) return value.toFixed(2);
    if (value >= 1) return value.toFixed(2);
    if (value >= 0.01) return value.toFixed(4);
    if (value >= 0.0001) return value.toFixed(6);
    if (value > 0) return value.toFixed(8);
    return '0';
  };

  const convert = useCallback(
    (amount, fromCur, toCur) => {
      const num = parseFloat(String(amount).replace(',', '.')) || 0;
      if (num <= 0) return '';
      const rate = getRate(fromCur, toCur);
      if (rate == null) return '';
      const result = num * rate;
      return formatConverted(result).replace(/\.?0+$/, '') || '0';
    },
    [getRate]
  );

  const value = {
    rates,
    updateRates,
    getRate,
    convert,
  };

  return (
    <RatesContext.Provider value={value}>
      {children}
    </RatesContext.Provider>
  );
}

export function useRates() {
  const ctx = useContext(RatesContext);
  if (!ctx) throw new Error('useRates must be used within RatesProvider');
  return ctx;
}
