import { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import "./styles.css";

//Components
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
// import JsonData from "./Components/JsonTasks";
import AddTask from "./Components/Addtask";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Cumpleanios",
      day: "Lunes 5 de Octubre a las 18:00",
      reminder: false
    },
    {
      id: 2,
      text: "Cumpleanios de Otto",
      day: "Martes 18 de Mayo a las 18:00",
      reminder: true
    },
    {
      id: 3,
      text: "Cumple de Morita",
      day: "Miercoles 24 de Noviembre a las 18:00",
      reminder: true
    }
  ]);

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
          "No tasks to Show"
        )}
        {/* {console.log(JsonData)} */}
      </div>
    </Fragment>
  );
}
