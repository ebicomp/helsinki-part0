import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  //const votes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
  //const [maxVoteIndex, setMaxVoteIndex] = useState(0);

  let maxVoteIndex = 0;

  console.log("app", votes);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const nextAnecdoteHandler = () => {
    const randomNumber = getRandomInt(7);
    setSelected(randomNumber);
  };
  const voteHandler = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log("handler", votes);
  };

  const setMaxVote = () => {
    let maxvote = 0;
    let maxIndex = 0;
    votes.forEach((vote, index) => {
      if (vote > maxvote) {
        maxvote = vote;
        maxIndex = index;
      }
    });
    maxVoteIndex = maxIndex;
    //setMaxVoteIndex(maxIndex);
  };
  setMaxVote();
  return (
    <div>
      <h1>Anecode of the day </h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>

      <button onClick={voteHandler}>vote</button>
      <button onClick={nextAnecdoteHandler}>next anecdote</button>
      <h1>Anecdoe with most votes</h1>
      <div>{anecdotes[maxVoteIndex]}</div>
      <div>has {votes[maxVoteIndex]} votes</div>
    </div>
  );
};

export default App;
