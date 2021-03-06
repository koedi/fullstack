import React, { useState } from 'react'

const App = () => {
 
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    updateMostVotes()
  }
  
  const getNewAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const updateMostVotes = () => {
    const idx = votes.indexOf(Math.max(...votes))
    setMostVotes(idx)
  }

  return (
    <div>
        <h1>Päivän kasku</h1>
        <p>
        {anecdotes[selected]} <br />
        has {votes[selected]} votes. <br />

        <Button action={addVote} text="Anna +1" />
        <Button action={getNewAnecdote} text="Uusi kasku" />
        </p>

        <h1>Eniten ääniä saanut kasku</h1>
        <p>
        {anecdotes[mostVotes]} <br />
        has {votes[mostVotes]} votes.
        </p>
    </div>
  )
}

const Button = ({action, text}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}



export default App;
