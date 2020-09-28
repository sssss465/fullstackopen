import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (<h1> {props.course}</h1>);
}
const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((value) => {return <Part part={value['name']} exercise={value['exercises']}></Part>})
      }
    </div>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}
const Total = (props) => {
  return (<p>Number of exercises {props.total}</p>)
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  const [ {exercises: exercises1},{exercises: exercises2},{exercises: exercises3}] = course.parts;

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total total={exercises1 + exercises2 + exercises3}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))