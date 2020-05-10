import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.name}</h1>
const Part = (props) => <p>{props.part} {props.exercise}</p>
const Content = (props) => <Part part={props.content.part} exercise={props.content.exercise}></Part>
const Total = (props) => <p>Number of exercises {
  props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise
}</p>

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {part: 'Fundamentals of React', exercise:10},
      {part: 'Using props to pass data', exercise:7},
      {part: 'State of a component', exercise:14}
    ]
  }
  return (
    <div>
      <Header name={course.name}></Header>
      <Content content={course.parts[0]}></Content>
      <Content content={course.parts[1]}></Content>
      <Content content={course.parts[2]}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
