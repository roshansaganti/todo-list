import { useState, useEffect } from 'react'
import Airtable from 'airtable'

import Tabs from './Tabs'
import Todos from './Todos'
import Completed from './Completed'
import AddTaskForm from './AddTaskForm'

const base = new Airtable({apiKey: `${process.env.REACT_APP_API_KEY}`}).base(`${process.env.REACT_APP_BASE}`);
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_BASE}/todos?api_key=${process.env.REACT_APP_API_KEY}`;

const ToDoList = ({ todosIsActive, completedIsActive, formIsActive }) => {
  const [tasks, setTasks] = useState([])
    
  // This function will be called whenever the "tasks" state variable changes.
  useEffect(() => {    
    fetchDataFromAirtable();
  }, []);

  const fetchDataFromAirtable = async () => {
    // Fetch
    console.log("Fetching...")
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setTasks(data.records);
      // console.log("Function:", data.records);
    })
    .catch((error) => {
      console.log(error);
    });
  }
    
  console.log(`The number of tasks is ${tasks.length}`)
  console.log("Tasks:", tasks)
  
  // Add a task
  const addTask = (todo, date) => {    
    // Works
    base('todos').create({
      "todo": `${todo}`,
      "isCompleted": "false",
      "date": `${date}`
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }

      setTasks([ ...tasks, {
        "id": record.getId(),
        "fields":
        {
          "todo": record.get('todo'),
          "isCompleted": record.get('isCompleted'),
          "date": record.get('date')
        }
      }])
    });
  }

  // Delete a task
  const deleteTask = index => {      
    // const newTasks = [...tasks];
    // newTasks.splice(index, 1);
    // setTasks(newTasks);

    base('todos').destroy(index.id, (err, deletedRecords) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', deletedRecords.length, 'records');
      });
  };
  
  // This is a function that strikes-through tasks when we click on them.
  const updateTask = (index) => {
    // Check if task is completed
    if (tasks[index].fields.isCompleted === "true")
    // If task is completed, set to false (incomplete)
      tasks[index].fields.isCompleted = "false"
    else
    // If task not completed, set to true (complete)
      tasks[index].fields.isCompleted = "true"

    console.log("Updated task:", tasks[index])

    base('todos').update([
      {
        "id": tasks[index].id,
        "fields":
        {
          "todo": tasks[index].fields.todo,
          "isCompleted": tasks[index].fields.isCompleted,
          "date": tasks[index].fields.date
        }
      }
    ], function (err) {
      if (err) {
        console.error(err);
        return;
      }
    });

    setTasks([ ...tasks ])

    console.log(tasks)
  };

  // Deletes all tasks in setTasks() and in Airtable
  const clearAllTasks = () => {
    base('todos').destroy(tasks, (err, deletedRecords) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', deletedRecords.length, 'records');
      });
  };

  // Render
  return (
    <div className="ToDoList">
      <br />
      <Tabs todosIsActive={todosIsActive} completedIsActive={completedIsActive} />
      <br />
      <div className="card">
        <div className="card-body">
          {formIsActive && <AddTaskForm addTask={addTask} />}
          {todosIsActive && <Todos tasks={tasks} updateTask={updateTask} />}
          {completedIsActive && <Completed tasks={tasks} updateTask={updateTask} clearAllTasks={clearAllTasks} />}
        </div>
      </div>
    </div>
  );
}

export default ToDoList
