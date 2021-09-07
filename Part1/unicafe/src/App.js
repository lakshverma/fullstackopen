import React, { useState } from "react";

// Component to generate Section headers
const Header = ({ text }) => <h1>{text}</h1>;

// Component to generate feedback buttons with click eventhandlers attached
const Button = ({ handleClick, buttonText }) => {
  return <button onClick={handleClick}> {buttonText} </button>;
};

// Component that prints the aggregate statistics
const StatisticLine = ({ text, value }) => {
  // const [good, neutral, bad] = count;
  // const total = good + neutral + bad

  if (value === 0 || value === "NaN%") {
    return (
      <tr>
        <td>{text} No feedback given</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>
          {text} {value}{" "}
        </td>
      </tr>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Function to execute when a feedback button is clicked. Also updates the state for clicks of each button.
  const clickHandler = (button) => () => {
    if (button === "good") {
      setGood(good + 1);
    } else if (button === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  const total = good + neutral + bad;

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={clickHandler("good")} buttonText="good" />
      <Button handleClick={clickHandler("neutral")} buttonText="neutral" />
      <Button handleClick={clickHandler("bad")} buttonText="bad" />
      <Header text="statistics" />

      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={total / 3} />
          <StatisticLine text="positive" value={(good / total) * 100 + "%"} />
        </tbody>
      </table>
    </div>
  );
};

export default App;
