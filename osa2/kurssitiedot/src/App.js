import React from "react"

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Summary course={course} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
    { course.parts.map(p => <Part key={p.id} part={p} />) }
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Summary = ({course}) => {
  return (
    <p><b>total of {course.parts.reduce((s, p) => s + p.exercises, 0)} exercises</b></p>
  )
}

export default App;
