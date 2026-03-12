import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

const reducer = function (curState, action) {
  console.log(curState, action);

  switch (action.type) {
    case 'inc':
      return { ...curState, count: curState.count + curState.step };
    case 'dec':
      return { ...curState, count: curState.count - curState.step };
    case 'setCount':
      return { ...curState, count: action.payload };
    case 'setStep':
      return { ...curState, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unkown action');
  }
};

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const inc = function () {
    dispatch({ type: 'inc' });
  };

  const dec = function () {
    dispatch({ type: 'dec' });
  };

  const defineCount = function (e) {
    const value = Number(e.target.value);
    dispatch({ type: 'setCount', payload: value ? value : 0 });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
          style={{ textAlign: 'center' }}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
