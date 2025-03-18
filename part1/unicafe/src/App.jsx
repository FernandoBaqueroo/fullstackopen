import { useEffect, useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(() => {
    const total = good + neutral + bad
    setAll(total)

    if(total > 0) {
      setAverage((good - bad) / total)
      setPositive((good / total)*100)
    }
  }, [good, neutral, bad])

  if(all > 0) {
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticsLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticsLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticsLine text="bad" value={bad} />
            </tr>
            <tr>
              <StatisticsLine text="all" value={all} />
            </tr>
            <tr>
              <StatisticsLine text="average" value={average} />
            </tr>
            <tr>
              <StatisticsLine text="positive" value={`${positive}%`} />
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  return(
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
