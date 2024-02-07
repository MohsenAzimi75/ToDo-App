const url = "http://localhost:3001/tasks";

export const getTodos = async () => {
  const res = await fetch(url, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo) => {
  const res = await fetch(`${url}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id) => {
  await fetch(`${url}/tasks/${id}`, {
    method: "DELETE",
  });
};
