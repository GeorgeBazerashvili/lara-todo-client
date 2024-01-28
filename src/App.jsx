import { useEffect, useRef, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://lara-todo-rest-production.up.railway.app/api";

function App() {
  let currentTodo = localStorage.getItem("currenttodo");
  const [inputValue, setInputValue] = useState(currentTodo);
  const [tasks, setTasks] = useState([]);
  const reference = useRef(null);

  useEffect(() => {
    reference.current.focus();

    axios
      .get("/tasks")
      .then((res) => {
        setTasks([...res.data]);
      })
      .catch((err) => console.error(err));

    return () => {
      setTasks([]);
    };
  }, []);

  async function deleteAllTasks() {
    await axios
      .delete("/deletealltasks")
      .then(() => {
        axios
          .get("/tasks")
          .then(() => setTasks([]))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.trim()) {
      await axios
        .post("/tasks", {
          title: inputValue,
        })
        .then((res) => {
          setTasks((prev) => [...prev, res.data]);
          console.log(res.data);
        })
        .catch((err) => console.error(err));

      setInputValue("");
      localStorage.setItem("currenttodo", "");

      reference.current.focus();
    }
  }

  async function removeTask(id) {
    await axios
      .delete(`deleteonetask/${id}`)
      .then((res) => {
        console.log(res.data);
        axios
          .get("/tasks")
          .then((res) => {
            setTasks([...res.data]);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="w-lg-wrapper m-wrapper">
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          className="w-md-wrapper items-center px-2 pt-4 pb-6 rounded-lg flex-col bg-white mb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className="text-2xl mb-2 font-bold mr-auto">Todo App</h1>
          <div className="flex">
            <input
              className="mr-2 border-2 w-md-wrapper border-black px-2 rounded-md"
              ref={reference}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                currentTodo = localStorage.setItem(
                  "currenttodo",
                  e.target.value
                );
              }}
            />
            <button
              type="submit"
              className="bg-magenta py-1 px-3 rounded-xl text-xl text-white font-bold"
            >
              +
            </button>
          </div>

          <ul>
            {tasks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between w-11/12 m-auto mt-1"
                  style={{ overflowWrap: "break-word" }}
                >
                  <li className="w-full">{item.title}</li>
                  <i
                    className="cursor-pointer"
                    onClick={() => removeTask(item.id)}
                  >
                    X
                  </i>
                </div>
              );
            })}
          </ul>

          <div className="flex justify-between w-md-wrapper mt-2 m-wrapper items-center">
            <p className="ml-1">{tasks.length} tasks left</p>
            <button
              className="mr-1 bg-magenta text-white px-2 py-1 rounded-md font-bold text-sm"
              onClick={deleteAllTasks}
            >
              Clear All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
