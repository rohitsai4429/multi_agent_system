import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// Configure axios instance with timeout
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 300000, // 5 minutes timeout for long-running tasks
});

export const testBackend = async () => {
  try {
    console.log("Testing backend connection...");
    const res = await axiosInstance.get("/test");
    console.log("Backend test response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Backend test failed:", error);
    throw error;
  }
};

export const runTask = async (message, fileData = null, summaryMode = "executive", chatHistory = []) => {
  try {
    console.log("Sending message to backend:", message);
    
    const payload = {
      message: message,
      summary_mode: summaryMode,
      chat_history: chatHistory
    };
    
    // If file data is provided, add it to the payload
    if (fileData) {
      payload.file_data = fileData;
      console.log("Including file data in request:", fileData.filename);
    }
    
    console.log("Payload being sent:", payload);
    const res = await axiosInstance.post("/chat", payload);
    console.log("Received response from backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - the AI is taking longer than expected. Please try again.");
    }
    
    if (error.response) {
      // Server responded with error status
      console.error("Server error response:", error.response.data);
      throw new Error(`Server error (${error.response.status}): ${error.response.data?.detail || error.response.data?.message || 'Unknown error'}`);
    }
    
    if (error.request && !error.response) {
      // Request was made but no response received
      throw new Error("Cannot connect to backend. Make sure the backend server is running on http://127.0.0.1:8000");
    }
    
    if (error.message.includes("Network")) {
      throw new Error("Network error - Cannot connect to backend");
    }
    
    throw new Error(error.message || "Unknown error occurred");
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const res = await axios.get(`${API_BASE}/health`);
    return res.data;
  } catch (error) {
    console.error("Health Check Error:", error);
    return { status: "error", agents: [] };
  }
};
