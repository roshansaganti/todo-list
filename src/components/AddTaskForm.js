import { useState } from 'react'
import DatePicker from 'react-datepicker'

const AddTaskForm = ({ addTask }) => {
  // This is how we get values from the input field - we use a state variable to store the value typed in.
  const [value, setValue] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  
  const BootstrapInput = ({ value, onClick }) => (
    <input type="text" className="form-control" onClick={onClick} value={value} width="100%" />
  )

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value)
    value && addTask(value)
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Add a new task" value={value} onChange={e => setValue(e.target.value)} />
        <div className="input-group-append">
          <button className="btn btn-outline-success" type="submit"><i className="fas fa-plus"></i></button>
        </div>
      </div>
      
      <div className="input-group">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} customInput={<BootstrapInput />} />
      </div>
      <br />
    </form>
  );
}

export default AddTaskForm