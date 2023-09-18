// authentication.service.js

export const login = async (username, password) => {
  try {
    const response = await fetch(
      "https://interview-server.cyclic.cloud/api/v1/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );
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
    const response = await fetch(
      "https://interview-server.cyclic.cloud/api/v1/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await fetch(
      "https://interview-server.cyclic.cloud/api/v1/users/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};
