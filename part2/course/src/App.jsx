import { useState } from 'react'
import {Course} from './Course'
export const Header = (props) => {
  
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

export const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}

export const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part)=>{
        return <Part key={part.id} name={part.name} exercises={part.exercises}/>
      })}
    </div>
  )
}

export const Total = ({parts}) => {
  const getTotal = () => {
    const total = parts.reduce((accum,p)=>{
      return accum + p.exercises
    },0)
    return (
      <strong>{total}</strong>
    )
  }
  return (
    <div>
      <p style={{fontWeight: 'bold'}}>Total of {getTotal()} exercises</p>
    </div>
  )
}



export const App = () => {
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
          {courses.map((course)=><Course key={course.id} course={course} />)}
    </div>

  )
}


