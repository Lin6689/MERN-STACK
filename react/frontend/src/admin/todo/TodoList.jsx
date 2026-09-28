import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { Pen, Trash, Check, X } from "lucide-react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      setTodos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create Todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axiosInstance.post("/todos", { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // Start Editing
  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
  };

  // Update Todo
  const handleUpdate = async (id) => {
    if (!editTitle.trim()) return;

    try {
      await axiosInstance.put(`/todos/${id}`, { title: editTitle });
      setEditId(null);
      setEditTitle("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          className="border rounded-xl px-3 py-2 flex-1 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl">
          Create
        </button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between border border-gray-300 my-2 p-3 bg-blue-50 rounded-lg"
          >
            {editId === todo._id ? (
              // Edit Mode
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border rounded-lg px-2 py-1 flex-1 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleUpdate(todo._id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // Normal Mode
              <>
                <li className="flex-1">{todo.title}</li>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;