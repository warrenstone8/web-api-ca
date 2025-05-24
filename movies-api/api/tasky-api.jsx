// Use VITE_API_URL from .env if available, or fallback to localhost:3000
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Fetch all tasks from the backend
 */
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/api/tasks`);
  return res.json();
};

/**
 * Add a new task
 * @param {Object} data - The task data to add
 */
export const addTask = async (data) => {
  const res = await fetch(`${BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * Delete a task by ID
 * @param {string} id - Task ID to delete
 */
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  return res;
};

/**
 * Update a task by ID
 * @param {Object} data - The task object with updated fields
 */
export const updateTask = async (data) => {
  const res = await fetch(`${BASE_URL}/api/tasks/${data._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
