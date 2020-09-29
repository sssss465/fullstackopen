import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, state, handler }) => (
  <button onClick={() => handler(state + 1)}> {text}</button>
);

const FeedBack = ({ goodState, neutralState, badState }) => {
  const [good, setGood] = goodState;
  const [neutral, setNeutral] = neutralState;
  const [bad, setBad] = badState;

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" state={good} handler={setGood}></Button>
      <Button text="neutral" state={neutral} handler={setNeutral}></Button>
      <Button text="bad" state={bad} handler={setBad}></Button>
    </div>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  const [good, neutral, bad] = stats;
  if (good + neutral + bad <= 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={good + bad + neutral}></Statistic>
          <Statistic
            text="average"
            value={(good - bad) / (good + bad + neutral)}
          ></Statistic>
          <Statistic
            text="positive"
            value={(good * 100) / (good + bad + neutral) + "%"}
          ></Statistic>
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <FeedBack
        goodState={[good, setGood]}
        neutralState={[neutral, setNeutral]}
        badState={[bad, setBad]}
      ></FeedBack>
      <h2>statistics</h2>
      <Statistics stats={[good, neutral, bad]}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
