import React, { useState } from 'react'

const Heading = ({content}) => <h1>{content}</h1>

const Button = ({handleClick, buttonText}) => <button onClick={handleClick}>{buttonText}</button>;

const Paragraph = ({content}) => <p>{content}</p>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }
  
  const randomHandler = () => {
    setSelected(getRandomInt(anecdotes.length));
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const voteHandler = () => {
    const newVotes = [...votes]
    newVotes[selected] +=1;
    setVotes(newVotes);
  }

  return (
    <div>
      <Heading content="Anecdote of the day" />
      <Paragraph content={anecdotes[selected]}/>
      <Paragraph content={'has ' + votes[selected] + ' votes'}/>
      <Button handleClick={voteHandler} buttonText="vote" />
      <Button handleClick={randomHandler} buttonText="next anecdote" />
      <Heading content="Anecdote with most votes" />
      <Paragraph content={anecdotes[indexOfMax(votes)]} />
    </div>
  )
}

export default App