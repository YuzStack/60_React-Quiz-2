import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
/* eslint-disable */

const initialState = {
  questions: [],

  // This can be either 'loading', 'errror', 'ready', 'active', or 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = function (curState, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...curState, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...curState, status: 'error' };
    case 'startQuiz':
      return { ...curState, status: 'active' };
    case 'newAnswer':
      const question = curState.questions.at(curState.index);
      const pointInc =
        action.payload === question.correctOption ? question.points : 0;

      return {
        ...curState,
        answer: action.payload,
        points: curState.points + pointInc,
      };
    case 'nextQuestion':
      return { ...curState, index: curState.index + 1, answer: null };
    case 'finishQuiz':
      const hasNewHighscore = curState.points > curState.highscore;
      return {
        ...curState,
        status: 'finished',
        highscore: hasNewHighscore ? curState.points : curState.highscore,
      };
    case 'restartQuiz':
      return {
        ...initialState,
        highscore: curState.highscore,
        status: 'ready',
        questions: curState.questions,
      };
    default:
      throw new Error('Action unkown');
  }
};

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(_ => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
