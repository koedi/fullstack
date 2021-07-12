import React from 'react'

const Course = ({ course }) => {
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
            {course.parts.map(p => <Part key={p.id} part={p} />)}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Summary = ({ course }) => {
    return (
        <p><b>total of {course.parts.reduce((s, p) => s + p.exercises, 0)} exercises</b></p>
    )
}


export default Course