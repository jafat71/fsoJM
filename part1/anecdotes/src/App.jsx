import { useState } from 'react'

const App = () => {
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votation, setPoints] = useState(points);

  const randomNum = () => {
    let random = Math.floor(Math.random()*8)
    setSelected(random)
  }

  const vote = () => {
    const copy = {...votation}
    copy[selected]++;
    setPoints(copy)
    console.log(votation[selected] )
  }

  return (
    <div>
      <h1>ANECDOTE OF THE DAY</h1>
      {anecdotes[selected]}

      {votation[selected]}

      <button onClick={randomNum}>
        NEXT ANECDOTE
      </button>
      <button onClick={vote}>
        VOTE
      </button>
      <h1>ANECDOTE WITH MOST VOTES</h1>
      {Math.max(...Object.values(votation))===0
      ? (<p>NO VOTES REGISTERED</p>)
      : (anecdotes[Object.keys(votation).find(k=>votation[k]===Math.max(...Object.values(votation)))])}
    </div>
  )
}

export default App