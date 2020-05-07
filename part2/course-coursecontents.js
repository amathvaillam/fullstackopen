import React from 'react'

const Header = ({course}) => <h1>{course}</h1>
const Part = ({name,exercise}) => <p>{name} {exercise}</p>
const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}></Part>)
const Total = ({parts}) => <p><b>Number of exercises {parts.reduce((a, b)=> a + b.exercises,0)}</b></p>

const Course = ({course}) => {

  return (
      <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
      </>
    )
}

export default Course
