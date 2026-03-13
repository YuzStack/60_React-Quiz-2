function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const scorePerc = (points / maxPossiblePoints) * 100;

  let emoji;
  if (scorePerc === 100) emoji = '🥇';
  if (scorePerc >= 80 && scorePerc < 100) emoji = '🎉';
  if (scorePerc >= 50 && scorePerc < 80) emoji = '😊';
  if (scorePerc > 0 && scorePerc < 50) emoji = '🤨';
  if (scorePerc === 0) emoji = '🤦';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.round(scorePerc)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restartQuiz' })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
