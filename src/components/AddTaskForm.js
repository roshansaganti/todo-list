import { useState } from 'react'
import DatePicker from 'react-datepicker'

const AddTaskForm = ({ addTask }) => {
  // This is how we get values from the input field - we use a state variable to store the value typed in.
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(new Date());
  
  const BootstrapInput = ({ value, onClick }) => (
    <input type="text" className="form-control" onClick={onClick} width="100%" value={value} onChange={e => setDate(e.target.value)} />
  )

  // Submit form
  const handleSubmit = e => {
    e.preventDefault();
    // Send data to addTask() in parent component
    (todo, date) && addTask(todo, date)
    setTodo("");
  };
  
  // Render
  return (
    <div className="AddTaskForm">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Add a new task" value={todo} onChange={e => setTodo(e.target.value)} required />
          </div>
          <div className="col">
            <DatePicker onChange={date => setDate(date)} selected={date} value={date} customInput={<BootstrapInput />} showTimeInput required />
          </div>
        </div>
        <br />
        <button className="btn btn-block btn-success" type="submit">Add Task <i className="fas fa-plus"></i></button>
        <br />
      </form>
    </div>
  );
}

export default AddTaskForm