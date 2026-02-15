import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    if (editText.trim() !== task.text) {
      onUpdateTask(task._id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task._id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task._id, task.completed)}
          className="task-checkbox"
          id={`checkbox-${task._id}`}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
            maxLength={200}
          />
        ) : (
          <label htmlFor={`checkbox-${task._id}`} className="task-text">
            {task.text}
          </label>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn-save" title="Save">
              ✓
            </button>
            <button onClick={handleCancel} className="btn-cancel" title="Cancel">
              ✕
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="btn-edit" title="Edit">
              ✏️
            </button>
            <button onClick={handleDelete} className="btn-delete" title="Delete">
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;