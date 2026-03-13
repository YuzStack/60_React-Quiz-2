import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
/* eslint-disable */

const initialState = {
  questions: [],

  // This can be either 'loading', 'errror', 'ready', 'active', or 'finished'
  status: 'loading',
};

const reducer = function (curState, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...curState, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...curState, status: 'error' };
    default:
      throw new Error('Action unkown');
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(_ => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className='app'>
      <Header />

      <Main></Main>
    </div>
  );
}

export default App;
