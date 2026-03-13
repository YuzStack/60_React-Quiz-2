function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${answer === idx ? 'answer' : ''} ${hasAnswered ? (idx === question.correctOption ? 'correct' : 'wrong') : ''}`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: idx })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
