import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskText.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    onAddTask(taskText);
    setTaskText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
          maxLength={200}
        />
        <button type="submit" className="add-btn">
          <span className="btn-icon">+</span>
          <span className="btn-text">Add Task</span>
        </button>
      </div>
    </form>
  );
}

export default TaskForm;