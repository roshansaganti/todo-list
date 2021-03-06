import { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Moment from 'react-moment'

Moment.globalFormat = "dddd MMMM D, YYYY"
Moment.globalLocal = true;

const Completed = ({ tasks, updateTask, clearAllTasks }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clearTasksAndClose = () => {
    clearAllTasks();
    handleClose();
  }
  
  // Render
  return (
    <div className="Completed">
      <p className="d-flex justify-content-between">
        <h3>Completed</h3>
        {/* Button Trigger Modal */}
          <Button variant="outline-danger" onClick={handleShow}>Clear</Button>
        {/* End Button Trigger Modal */}
      </p>
        <hr />
        {tasks.map((task, index) => (
          (task.fields.isCompleted === 'true') ? (
            <button key={task.id} onClick={() => updateTask(index)} className="btn btn-outline-danger btn-block">
              <div className="card-body">
                <h4 className="card-title">{task.fields.todo}</h4>
                <div className="card-text">
                  {/* Due Date: {formatDate(task.fields.date)} */}
                  <em>Due Date:</em> <strong><Moment>{task.fields.date}</Moment></strong>
                </div>
              </div>
            </button>
          ) : (
            ""
          )
        ))}

        {/* Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to clear all completed tasks? This cannot be undone.</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleClose}>Cancel</Button>
              <Button variant="danger" onClick={clearTasksAndClose}>Clear</Button>
            </Modal.Footer>
          </Modal>
        {/* End Modal */}
    </div>
  )
}

export default Completed
