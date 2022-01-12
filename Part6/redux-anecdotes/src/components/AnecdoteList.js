import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter !== "INPUT") {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
    return state.anecdotes;
  });
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    // first parameter takes the anecdote to show in notification, second parameter is the notification duration (in seconds)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
    dispatch(addVotes(anecdote));
  };
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
