import React, {useState} from "react"

const App = () => {
  // saving buttons in own separate states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button name="good" good setValue={() => setGood(good + 1)} />
      <Button name="neutral" neutral setValue={() => setNeutral(neutral + 1)}/>
      <Button name="bad" bad setValue={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}



const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const Button = ({name, count, setValue}) => {
  return (
    <div>
      <button onClick= {setValue}>
      {name}
      </button>
      <p>{count}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  if (sum === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={sum} />
        <StatisticsLine text="average" value={(1 * good + 0 * neutral + -1 * bad) / sum} />
        <StatisticsLine text="positive" value={(good / sum)*100} sign="%"/>
      </p>
    </div>
  )
}

const StatisticsLine = ({text, value, sign}) => {
  return (
    <div>
      {text} {value} {sign}<br/>
    </div>
  )
}


export default App;
