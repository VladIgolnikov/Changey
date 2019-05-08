import React from 'react';

const Saved = props => {
  return (
    <div>
      <ul>
        {props.saved.map((currency, index) => {
          return (
            <li key={index}>
              <button onClick={() => props.removeSave(currency.Currency)}>
                -
              </button>
              <h3>{currency.Currency}</h3>
              <h3>
                {(
                  (props.price / props.rates[props.from]) *
                  props.rates[currency.Currency]
                ).toLocaleString(undefined, {
                  style: 'currency',
                  currency: currency.Currency
                })}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Saved;
