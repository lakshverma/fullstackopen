import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exerciseSum={parts} />
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
      {props.parts[0].name} {props.parts[0].exercises}
      <br />
      {props.parts[1].name} {props.parts[1].exercises}
      <br />
      {props.parts[2].name} {props.parts[2].exercises}
    </p>
  </div>
)
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.exerciseSum[0].exercises + props.exerciseSum[1].exercises + props.exerciseSum[2].exercises}
      </p>
    </div>
  )
}


export default App