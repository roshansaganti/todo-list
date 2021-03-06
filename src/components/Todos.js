import React from 'react'
import Moment from 'react-moment'

const Todos = ({ tasks, updateTask }) => {
  return (
    <div className="Todos">
      <h3>Todos</h3>
        <hr />
        {tasks.map((task, index) => (
          /* Show incomplete tasks */
          (task.fields.isCompleted === 'false') ? (
            <button key={task.id} onClick={() => updateTask(index)} className="btn btn-outline-primary btn-block">
              <div className="card-body">
                <h4 className="card-title">{task.fields.todo}</h4>
                <div className="card-text">
                  <em>Due Date: </em><strong><Moment format="dddd MMMM Do, YYYY" local>{task.fields.date}</Moment> at <Moment local format="h:mm a">{task.fields.date}</Moment></strong>
                </div>
              </div>
            </button>
          ) : (
            ""
          )
        ))}
    </div>
  )
}

export default Todos
