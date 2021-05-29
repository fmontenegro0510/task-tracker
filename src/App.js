import { useState, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { nanoid, customAlphabet } from "nanoid";
import About from "./Components/About";
import Footer from "./Components/Footer";

import "./styles.css";

//Components
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
// import JsonData from "./Components/JsonTasks";
import AddTask from "./Components/Addtask";

export default function App() {
  const nanoid = customAlphabet("1234567890", 5);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    //prettier-ignore
    const res = await fetch('https://60b111971f26610017fffc9f.mockapi.io/Tasks');
    const data = await res.json();
    return data;
  };

  //fetch single tasks
  const fetchSingleTask = async (id) => {
    //prettier-ignore
    const res = await fetch(`https://60b111971f26610017fffc9f.mockapi.io/Tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const [showAddTask, setShowAddtask] = useState(true);

  //Add task
  const addTask = async (task) => {
    const res = await fetch(
      "https://60b111971f26610017fffc9f.mockapi.io/Tasks",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(task)
      }
    );

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://60b111971f26610017fffc9f.mockapi.io/Tasks/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle Reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id);
    const updtTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(
      `https://60b111971f26610017fffc9f.mockapi.io/Tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updtTask)
      }
    );

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddtask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {/* Otra forma de expresar un operador ternario, 
            solo si es true hace algo en caso contrario naranja */}
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to Show - for now"
              )}
              {/* {console.log(JsonData)} */}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}
