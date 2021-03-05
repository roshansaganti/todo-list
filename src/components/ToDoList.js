import { useState, useEffect } from 'react'

import Tabs from './Tabs'
import Todos from './Todos'
import Completed from './Completed'
import AddTaskForm from './AddTaskForm'

const ToDoList = ({ todosIsActive, completedIsActive, formIsActive }) => {
  const [tasks, setTasks] = useState([])
    
  // This function will be called whenever the "tasks" state variable changes.
  useEffect(() => {    
    fetch("https://api.airtable.com/v0/appYaYDkv0oSXzVH3/todos?api_key=keycNy8V5ZmYi0ocP")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        data.records.map(record => {
          setTasks([record.fields])
          console.log(record)
        })
        // setTasks(data.records);
        // console.log(data);
        // console.log(data.records[1].fields);
        // console.log("Tasks:", tasks)
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
    console.log(`The number of tasks is ${tasks.length}`)
    console.log("Tasks:", tasks)
    
    // This is a function to add a new tasks to the tasks array.
    const addTask = text => { 
      setTasks([...tasks, {
          todo: text,
          isCompleted: false
        }
      ])
    }

    // This is a function to remove the task at this index from the tasks array, because the user clicked a trash can icon.
    const removeTask = index => {      
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    };
    
    // This is a function that strikes-through tasks when we click on them.
    const toggleTask = index => {
      const newTasks = [...tasks];
      newTasks[index].isCompleted = !newTasks[index].isCompleted;
      setTasks(newTasks);
    };

    // The JSX we use to render the ToDo List.
    //
    // Notice how "tasks.map" is used below - we map over all the tasks in our list, and we write out <span> elements that have the name of the each task. The "onClick" of each span calls another React function we write in part 2 above.
    // Having a declarative UI makes writing alot of interactive elements at once easy!
    // And remember - every time we change "tasks" with "setTasks" = the below JSX gets written again.
    //
    // Notice also how the "addTask" arrow function we wrote above is passed as a prop to the "AddTaskForm" component. That component uses the function to add a task to the array.
    //    
    return (
      <div className="ToDoList">
        <br />
        <Tabs todosIsActive={todosIsActive} completedIsActive={completedIsActive} />
        <br />
        <div className="card">
          <div className="card-body">   
            {formIsActive && <AddTaskForm addTask={addTask} />}
            {todosIsActive && <Todos tasks={tasks} toggleTask={toggleTask} />}
            {completedIsActive && <Completed tasks={tasks} toggleTask={toggleTask} />}
          </div>
        </div>
      </div>
    );
}

export default ToDoList
