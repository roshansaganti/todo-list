import React from 'react'

const Todos = ({ tasks, toggleTask }) => {
  const formatDate = (date) => {
    return date.format('mm dd yyyy');
  }

  return (
    <div className="Todos">
      <h3>Todos</h3>
        <hr />
        <div className="card">
          {tasks.map((task, index) => (
            task.isCompleted ? (
              ""
            ) : (
                <button key={task.id} onClick={() => toggleTask(index)} className={task.isCompleted ? ("btn-outline-primary card todo-text todo-completed ") : ("todo-text card btn-outline-primary")}>
                  <div className="card-body text-left">
                    <h5 className="card-title">{task.todo}</h5>
                    <p className="card-text">{() => { formatDate(task.date) }}</p>
                  </div>
                </button>
            )
          ))}
        </div>
    </div>
  )
}

export default Todos
