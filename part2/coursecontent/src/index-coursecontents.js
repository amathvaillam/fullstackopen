import React from 'react'
import ReactDOM from 'react-dom'
import Course from './course'

const Header = ({course}) => <h1>{course}</h1>
const Part = ({name,exercise}) => <p>{name} {exercise}</p>
const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}></Part>)
const Total = ({parts}) => <p><b>Number of exercises {parts.reduce((a, b)=> a + b.exercises,0)}</b></p>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}></Course>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
