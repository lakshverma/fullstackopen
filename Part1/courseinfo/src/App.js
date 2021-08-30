import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content partTitle={part1.name} exerciseNum={part1.exercises} />
      <Content partTitle={part2.name} exerciseNum={part2.exercises} />
      <Content partTitle={part3.name} exerciseNum={part3.exercises} />
      <Total exerciseSum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}


const Header = (props) => {
return (
  <div>
    <h1>
      {props.course}
    </h1>
  </div>
)
}

const Content = (props) => {
return (
  <div>
    <p>
      {props.partTitle} {props.exerciseNum}
    </p>
  </div>
)
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.exerciseSum}
      </p>
    </div>
  )
}


export default App