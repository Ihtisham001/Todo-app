"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

import toast from "react-hot-toast";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority?: string;
  dueDate?: string;
}

export default function TodoPage() {
  const [task, setTask] = useState("");

  const [search, setSearch] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [todos, setTodos] = useState<
    Todo[]
  >([]);

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editText, setEditText] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      String(darkMode)
    );
  }, [darkMode]);

  const fetchTodos = async () => {
    try {
      const response =
        await api.get("/todos");

      setTodos(response.data);
    } catch (error: any) {
      console.error(error);

      if (
        error.response?.status === 401
      ) {
        window.location.href =
          "/login";

        return;
      }

      toast.error(
        "Failed to fetch todos"
      );
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;

    try {
      setLoading(true);

      await api.post("/todos", {
        title: task,
        priority,
        dueDate,
      });

      setTask("");

      setPriority("Medium");

      setDueDate("");

      toast.success(
        "Todo added successfully"
      );

      fetchTodos();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to add todo"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (
    id: number,
    completed: boolean
  ) => {
    try {
      await api.patch(`/todos/${id}`, {
        completed: !completed,
      });

      fetchTodos();

      toast.success("Todo updated");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update todo"
      );
    }
  };

  const updateTodo = async (
    id: number
  ) => {
    if (!editText.trim()) return;

    try {
      await api.patch(`/todos/${id}`, {
        title: editText,
      });

      toast.success(
        "Todo updated"
      );

      setEditingId(null);

      setEditText("");

      fetchTodos();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update todo"
      );
    }
  };

  const deleteTodo = async (
    id: number
  ) => {
    try {
      await api.delete(`/todos/${id}`);

      fetchTodos();

      toast.success("Todo deleted");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete todo"
      );
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      }

      if (filter === "pending") {
        return !todo.completed;
      }

      return true;
    })
    .filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const progress =
    todos.length === 0
      ? 0
      : Math.round(
          (completedTasks / todos.length) *
            100
        );

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        darkMode
          ? "bg-black"
          : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto rounded-3xl shadow-2xl p-8 ${
          darkMode
            ? "bg-gray-900 border border-gray-800"
            : "bg-white"
        }`}
      >
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className={`text-5xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Todo Dashboard
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Manage your daily tasks
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

            <button
              onClick={() => {
                document.cookie =
                  "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                window.location.href =
                  "/login";
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <p
              className={`font-semibold ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Progress
            </p>

            <p
              className={`font-semibold ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {progress}%
            </p>
          </div>

          <div
            className={`w-full h-4 rounded-full overflow-hidden ${
              darkMode
                ? "bg-gray-700"
                : "bg-gray-300"
            }`}
          >
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Add Todo */}

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            className={`flex-1 border p-4 rounded-xl ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <button
            onClick={addTodo}
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white px-8 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Adding..."
              : "Add"}
          </button>
        </div>

        {/* Priority + Date */}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className={`border p-4 rounded-xl ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className={`border p-4 rounded-xl ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        {/* Filters */}

        <div className="flex gap-3 mb-6">
          {[
            "all",
            "pending",
            "completed",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === item
                  ? "bg-black text-white"
                  : darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={`w-full border p-4 rounded-xl mb-6 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {/* Todo List */}

        <div className="space-y-4">
          {filteredTodos.length === 0 && (
            <div
              className={`text-center p-8 rounded-xl ${
                darkMode
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              No todos found
            </div>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-5 rounded-2xl flex justify-between items-center transition-all duration-300 hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleTodo(
                      todo.id,
                      todo.completed
                    )
                  }
                  className="w-5 h-5"
                />

                <div>
                  {editingId ===
                  todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) =>
                          setEditText(
                            e.target.value
                          )
                        }
                        className={`border p-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : "bg-white text-black border-gray-300"
                        }`}
                      />

                      <button
                        onClick={() =>
                          updateTodo(
                            todo.id
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <p
                        className={`text-lg font-medium ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : darkMode
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {todo.title}
                      </p>

                      <div className="flex gap-2 mt-2 flex-wrap">
                        {todo.priority && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full text-white ${
                              todo.priority ===
                              "High"
                                ? "bg-red-500"
                                : todo.priority ===
                                  "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {todo.priority}
                          </span>
                        )}

                        {todo.dueDate && (
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-500 text-white">
                            Due:{" "}
                            {new Date(
                              todo.dueDate
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(
                      todo.id
                    );

                    setEditText(
                      todo.title
                    );
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteTodo(todo.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}