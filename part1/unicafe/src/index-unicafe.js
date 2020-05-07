import React,{useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <>
    <button onClick={() => {props.setGood(props.good + 1)}}>good</button>
    <button onClick={() => {props.setNeutral(props.neutral + 1)}}>neutral</button>
    <button onClick={() => {props.setBad(props.bad + 1)}}>bad</button>
    </>
  )
}
const Statistic = (props) => <tr><td>{props.text}</td><td>{props.value} {props.children}</td></tr>

const Statistics = (props) => {
  if(props.bad+props.good+props.neutral === 0)
  return (<p>No feedback given</p>)
  const all = props.bad+props.good+props.neutral
  const average = (-props.bad+props.good)/(props.bad+props.good+props.neutral)
  const positive = (props.good * 100)/(props.bad+props.good+props.neutral) || 0
  return (
    <table>
    <Statistic text={'good'} value={props.good}></Statistic>
    <Statistic text={'neutral'} value={props.neutral}></Statistic>
    <Statistic text={'bad'} value={props.bad}></Statistic>
    <Statistic text={'All'} value={all}></Statistic>
    <Statistic text={'average'} value={average}></Statistic>
    <Statistic text={'positive'} value={positive}>%</Statistic>
    </table>

  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>give feedback</h1>
    <p>
    <Button
    good={good} setGood={setGood}
    neutral={neutral} setNeutral={setNeutral}
    bad={bad} setBad={setBad}></Button>
    </p>
    <h1>Statistics</h1>
    <p>
    <Statistics
    good={good}
    neutral={neutral}
    bad={bad}></Statistics>
    </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
