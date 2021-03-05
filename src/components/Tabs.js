import { useState } from 'react'
import { Link } from 'react-router-dom'

const Tabs = ({ todosIsActive, completedIsActive }) => {
  // console.log(tabs)
  return (
    <div className="Tabs">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          {todosIsActive ? <Link className="nav-link active" to="/">Todos</Link> : <Link className="nav-link" to="/">Todos</Link>}
        </li>
        <li className="nav-item">
        {completedIsActive ? <Link className="nav-link active" to="/">Completed</Link> : <Link className="nav-link" to="/completed">Completed</Link>}
        </li>
      </ul>
    </div>
  )
}

export default Tabs
