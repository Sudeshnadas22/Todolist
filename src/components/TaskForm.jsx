import React, { useState } from 'react';
import './TaskForm.css';
import Tag from './Tag';

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: []  // Ensure tags is an array
  });

  const selectTag = (tag) => {
    setTaskData(prev => ({ ...prev, tags: [tag] })); // Ensure only one tag is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.task.trim() === "") {
      alert("Task cannot be empty");
      return;
    }
    console.log('Adding Task:', taskData); // Debug log
    setTasks(prev => [...prev, taskData]);
    setTaskData({
      task: "",
      status: "todo",
      tags: []  // Reset tags to array
    });
  };

  return (
    <header className='app_header'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        <div className="task_form_button">
          <div>
            <Tag tagName="HOMEWORK" selectTag={selectTag} selected={taskData.tags.includes("HOMEWORK")} />
            <Tag tagName="OFFICEWORK" selectTag={selectTag} selected={taskData.tags.includes("OFFICEWORK")} />
            <Tag tagName="OTHERS" selectTag={selectTag} selected={taskData.tags.includes("OTHERS")} />
          </div>
          <select
            name="status"
            value={taskData.status}
            className="task_status"
            onChange={handleChange}
          >
            <option value="todo">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="task_submit">Add Task</button>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;