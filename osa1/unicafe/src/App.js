import React, {useState} from "react"

const App = () => {
  // saving buttons in own separate states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <table>
        <tbody>
        <tr>
          <td>
            <Button name="good" good setValue={() => setGood(good + 1)} />
          </td>
          <td>
            <Button name="neutral" neutral setValue={() => setNeutral(neutral + 1)} />
          </td>
          <td>
            <Button name="bad" bad setValue={() => setBad(bad + 1)} />
          </td>
        </tr>
        </tbody>
      </table>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



const Button = ({ name, count, setValue }) => {
  return (
    <button onClick={setValue}>
      {name}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  if (sum === 0) {
    return (
        <p>No feedback given</p>
    )
  } else {
    return (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={sum} />
            <StatisticsLine text="average" value={((1 * good + 0 * neutral + -1 * bad) / sum).toFixed(2)} />
            <StatisticsLine text="positive" value={((good / sum) * 100).toFixed(2)} sign="%" />
          </tbody>
        </table>
    )
  }
}

const StatisticsLine = ({ text, value, sign }) => {
  return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value} {sign}
        </td>
      </tr>
  )
}


export default App;
