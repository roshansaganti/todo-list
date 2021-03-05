import React from 'react'

const Completed = ({ tasks, toggleTask }) => {
  return (
    <div className="Completed">
      <h3>Completed</h3>
        <hr />
        <div className="card">
          {tasks.map((task, index) => (
            task.isCompleted ? (
              <button key={task.id} onClick={() => toggleTask(index)} className={task.isCompleted ? ("btn-outline-danger card todo-text todo-completed ") : ("todo-text card btn-outline-danger")}>
                <div className="card-body text-left">
                  <h5 className="card-title">{task.todo}</h5>
                  <p className="card-text">{task.date}</p>
                </div>
              </button>
            ) : (
              ""
            )
          ))}
        </div>
    </div>
  )
}

export default Completed
