// authentication.service.js

export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

export const logout = async (token) => {};
