import SecureStorage from "@react-native-community/secure-storage";

const TOKEN_KEY = "AUTH_TOKEN";

export const saveToken = async (token) => {
  try {
    await SecureStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token", error);
  }
};
