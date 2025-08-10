import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Force rebuild for environment variable update - v2
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Environment Variables:', {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      API_URL: API_URL,
      allEnvVars: import.meta.env
    });
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/todos`, newTodo);
      setTodos([response.data, ...todos]);
      setNewTodo({ title: '', description: '' });
      setError(null);
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Failed to create todo.');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setEditingTodo(null);
      setError(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo.');
    }
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <main className="main-content">
        <form onSubmit={createTodo} className="todo-form">
          <h2>Add New Todo</h2>
          <input
            type="text"
            placeholder="Todo title..."
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="todo-input"
            required
          />
          <textarea
            placeholder="Description (optional)..."
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="todo-textarea"
            rows="3"
          />
          <button type="submit" className="add-btn">Add Todo</button>
        </form>

        <section className="todos-section">
          <h2>Your Todos ({todos.length})</h2>
          {todos.length === 0 ? (
            <p className="no-todos">No todos yet. Add one above!</p>
          ) : (
            <div className="todos-grid">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={toggleComplete}
                  onEdit={setEditingTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                  isEditing={editingTodo?.id === todo.id}
                  onCancelEdit={() => setEditingTodo(null)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function TodoItem({ todo, onToggleComplete, onEdit, onDelete, onUpdate, isEditing, onCancelEdit }) {
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description || '',
    completed: todo.completed
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(todo.id, editForm);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="edit-input"
            required
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="edit-textarea"
            rows="2"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={editForm.completed}
              onChange={(e) => setEditForm({ ...editForm, completed: e.target.checked })}
            />
            Completed
          </label>
          <div className="edit-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onCancelEdit} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-description">{todo.description}</p>}
        <div className="todo-meta">
          <span className="todo-status">
            {todo.completed ? '✅ Completed' : '⏳ Pending'}
          </span>
          <span className="todo-date">
            {new Date(todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onToggleComplete(todo)}
          className={`toggle-btn ${todo.completed ? 'mark-pending' : 'mark-complete'}`}
        >
          {todo.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button onClick={() => onEdit(todo)} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default App;
