import React, { useState } from "react";
import ReactDOM from "react-dom";
const Button = ({ text, clickHandler }) => {
  const genrandandclick = () => clickHandler(Math.floor(Math.random() * 6));
  return (
    <>
      <button onClick={genrandandclick}>{text}</button>
    </>
  );
};
const VoteButton = ({ text, votes, setVotes, selected, setMax }) => {
  const addVotes = () => {
    const copy = [...votes];
    copy[selected]++;
    const maxelement = copy.reduce((a, b) => Math.max(a, b));
    const index = copy.findIndex((element) => element === maxelement);
    setMax(index);
    setVotes(copy);
  };
  return (
    <>
      <button onClick={addVotes}>Vote</button>
    </>
  );
};
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
  const [max, setMax] = useState(0);

  return (
    <div>
      <h2>Anecdote of the dayk</h2>
      <div>{props.anecdotes[selected]}</div>
      <VoteButton
        text="vote"
        votes={votes}
        setVotes={setVotes}
        selected={selected}
        setMax={setMax}
      ></VoteButton>
      <Button text="next anecdote" clickHandler={setSelected}></Button>
      <h2>Anecdote with most votes</h2>
      <div>
        {props.anecdotes[max]} has the most votes with {votes[max]} votes
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
