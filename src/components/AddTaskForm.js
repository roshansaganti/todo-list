import { useState } from 'react'
import DatePicker from 'react-datepicker'
require('react-popper')

const AddTaskForm = ({ addTask }) => {
  // This is how we get values from the input field - we use a state variable to store the value typed in.
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(new Date());
  
  const BootstrapInput = ({ value, onClick }) => (
    <input type="text" className="form-control" onClick={onClick} value={value} width="100%" onChange={e => setDate(e.target.value)} />
  )

  const handleSubmit = e => {
    e.preventDefault();
    (todo, date) && addTask(todo, date)
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Add a new task" value={todo} onChange={e => setTodo(e.target.value)} required />
        </div>
        <div className="col">
          <DatePicker onChange={date => setDate(date)} selected={date} value={date} customInput={<BootstrapInput />} />
        </div>
      </div>
      <br />
      <button className="btn btn-block btn-success" type="submit">Add Task <i className="fas fa-plus"></i></button>
      <br />
    </form>
  );
}

export default AddTaskForm