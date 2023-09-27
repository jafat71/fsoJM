import { useState } from 'react'

const Button = ({onclick,text})=> {
  return (
    <div>
      <button onClick={onclick}>{text}</button>
    </div>
  )
}

const Statistics = (props) => {
    return (
      <>
        <td>
          {props.text} :
        </td>
        <td>
          {props.value} {props.symbol}
        </td>
      </>
    )
}

const Condition = ({all,good,neutral,bad,avg,pos}) => {
  const isEmpty = all === 0;
  if (isEmpty){
    return(
      <div>
        <h3>NO FEEDBACK GIVEN</h3>
      </div>
    )
  }
  return(
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Statistics value={good} text={'Good'}/>
          </tr>
          <tr>
            <Statistics value={neutral} text={'Neutral'}/>
          </tr>
          <tr>
            <Statistics value={bad} text={'Bad'}/>
          </tr>
          <tr>
            <Statistics value={all} text={'All'}/>
          </tr>
          <tr>
            <Statistics value={avg} text={'Average'}/>
          </tr>
          <tr>
            <Statistics value={pos} text={'Positive'} symbol={'%'}/>
          </tr>
        </tbody>
      </table>

  )
}

function App() {
  
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [all, setAll] = useState(good+bad+neutral);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0.0);
  const voteGood = () => {
    const newGood = good + 1;
    setGood(newGood)
    const newAll = newGood+bad+neutral
    setAll(newAll)
    const newAvg = (newGood-bad)/newAll ;
    setAvg(newAvg)
    const newPos = (newGood)/newAll
    setPositive(newPos)
  }

  const voteBad = () => {
    const newBad = bad + 1;
    setBad(newBad)
    const newAll = good+newBad+neutral
    setAll(newAll)
    const newAvg = (good-newBad)/newAll ;
    setAvg(newAvg)
    const newPos = (good)/newAll
    setPositive(newPos)
  }

  const voteNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral)
    const newAll = good+bad+newNeutral
    setAll(newAll)
    const newAvg = (good-bad)/newAll ;
    setAvg(newAvg)
    const newPos = (good)/newAll
    setPositive(newPos)
  }

  return (
    <>
      <h1>GIVE FEEDBACK</h1>
      <Button onclick={voteGood} text={'good'} />
      <Button onclick={voteNeutral} text={'neutral'} />
      <Button onclick={voteBad} text={'bad'} />
      <h1>STATISTICS</h1>
      <Condition all={all} good={good} neutral={neutral} bad={bad} avg={avg} pos={positive*100}/>
    </>
  )
}

export default App
