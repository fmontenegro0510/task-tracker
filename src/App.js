import { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";

import "./styles.css";

//Components
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
// import JsonData from "./Components/JsonTasks";
import AddTask from "./Components/Addtask";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      //prettier-ignore
      const res = await fetch('https://60b111971f26610017fffc9f.mockapi.io/Tasks');
      const data = await res.json();
      console.log(data);
    };
    fetchTasks();
  }, []);

  const [showAddTask, setShowAddtask] = useState(true);

  //Add task
  const addTask = (task) => {
    const id = nanoid();
    const newTask = { id, ...task };
    console.log("newTask " + JSON.stringify(newTask));
    setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle Reminder

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <Fragment>
      <div className="container">
        <Header
          onAdd={() => setShowAddtask(!showAddTask)}
          showAdd={showAddTask}
        />
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
      </div>
    </Fragment>
  );
}
