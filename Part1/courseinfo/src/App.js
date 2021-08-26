import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content partNum={part1} exerciseNum={exercises1} />
      <Content partNum={part2} exerciseNum={exercises2} />
      <Content partNum={part3} exerciseNum={exercises3} />
      <Total exerciseSum={exercises1 + exercises2 + exercises3} />
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
      {props.partNum} {props.exerciseNum}
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