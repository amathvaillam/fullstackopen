import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>
const Content = ({datas}) => datas.map((item, i) => <p key={i}>{item.part} {item.exercise}</p>)	
const Total = ({datas}) => <p>Number of exercises {datas.reduce((a, b)=> a + b.exercise,0)}</p>	

const App = () => {
  const course = 'Half Stack application development'
  const datas = [
	{part: 'Fundamentals of React', exercise:10},
	{part: 'Using props to pass data', exercise:7},
	{part: 'State of a component', exercise:14}
  ]

  return (
    <div>
		<Header course={course}></Header>
		<Content datas={datas}></Content>
		<Total datas={datas}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))