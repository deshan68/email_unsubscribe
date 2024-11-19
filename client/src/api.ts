import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchLinks = async (param = 1) => {
  try {
    const response = await axios.get(`${API_URL}/links`, {
      params: { param }, 
    });
    return response.data.links;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};
