import React, { useState } from 'react'
import ReactDOM from 'react-dom'

let random = (min, max) => Math.round(Math.random() * (max - min) + min);

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const pickOne = () => {
    setSelected(random(0, anecdotes.length - 1))
  }
  const vote = () => {
    const copy = [...points]
    copy[selected]++;
    setPoints(copy)
    setMostVotes(copy.reduce((acc, curr, index, tab) => curr <= tab[acc] ? acc : index, 0))
  }
  console.log(mostVotes,selected,points)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p><button onClick={vote}>vote</button><button onClick={pickOne}>next anecdote</button></p>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}
      <p>has {points[mostVotes]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
