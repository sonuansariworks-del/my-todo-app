import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));

    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = () => {
    if (!task.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: task } : todo,
        ),
      );

      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
        completed: false,
        createdAt: new Date().toLocaleString(),
      };

      setTodos([...todos, newTask]);
    }

    setTask("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase()),
  );

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const pendingTasks = todos.length - completedTasks;

  return (
    <div
      className={`min-h-screen p-5 flex justify-center items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Todo App</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-indigo-500 text-white rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border p-3 rounded text-black"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-5 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <div className="grid grid-cols-3 gap-3 mb-5 text-center">
          <div className="bg-blue-500 text-white p-3 rounded">
            Total
            <br />
            {todos.length}
          </div>

          <div className="bg-green-500 text-white p-3 rounded">
            Completed
            <br />
            {completedTasks}
          </div>

          <div className="bg-red-500 text-white p-3 rounded">
            Pending
            <br />
            {pendingTasks}
          </div>
        </div>

        {filteredTodos.length === 0 ? (
          <p className="text-center">No Tasks Found</p>
        ) : (
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`p-4 rounded flex flex-col md:flex-row md:justify-between md:items-center ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div>
                  <h3
                    onClick={() => handleToggle(todo.id)}
                    className={`cursor-pointer text-lg ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </h3>

                  <small>{todo.createdAt}</small>
                </div>

                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full mt-5 bg-red-600 text-white py-3 rounded"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
