import { useEffect } from 'react';

const formatTime = function (timeInSecs) {
  const mins = Math.floor(timeInSecs / 60);
  const secs = timeInSecs % 60;

  return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
};

function Timer({ secsRemaining, dispatch }) {
  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: 'reduceTime' });
      }, 1000);

      return () => clearInterval(intervalId);
    },
    [dispatch, secsRemaining],
  );

  return <p className='timer'>{formatTime(secsRemaining)}</p>;
}

export default Timer;
