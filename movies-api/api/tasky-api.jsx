
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/api/tasks`);
  return res.json();
};

/**

 * @param {Object} data 
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

 * @param {string} id 
 */
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  return res;
};

/**
 
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
