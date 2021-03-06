import { BrowserRouter as Router, Route } from 'react-router-dom'
import ToDoList from './components/ToDoList';

function App() {
  return (
    <Router>
      <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-lg-3 col-xl-3"></div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
            <h1 className="text-center">Todo List App</h1>
            <Route path="/" exact render={(props) => <ToDoList todosIsActive={true} completedIsActive={false} formIsActive={true} />} />
            <Route path="/completed" exact render={(props) => <ToDoList todosIsActive={false} completedIsActive={true} formIsActive={false} />}/>
          </div>
          <div className="col-md-2 col-lg-3 col-xl-3"></div>
        </div>
        <footer className="text-center pt-5 pb-5">
          &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
    </Router>
  );
}

export default App;
