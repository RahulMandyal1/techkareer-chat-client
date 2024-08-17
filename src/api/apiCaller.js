import axios from "axios"
import { getTokens } from "src/utils/tokenUtils"

const { accessToken } = getTokens()
const apiCaller = async ({ url, method = "GET", data = {}, params = {}, customHeaders = {} }) => {
  const headersData = {
    Authorization: `Bearer ${accessToken}`,
    ...customHeaders,
  }

  const config = {
    url,
    method,
    headers: headersData,
    data, // Data is included for POST, PUT, PATCH requests
    params, // Params are included for GET requests
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    if (error.response) {
      // Server-side error (response received with an error status code)
      return {
        success: error.response.data.status,
        message: error.response.data.message || "Server error occurred.",
        ...error.response.data,
      }
    } else if (error.request) {
      // Network error (no response received)
      return {
        success: false,
        message: "Network error. Please check your connection.",
        error: error.request,
      }
    } else {
      // Other errors (e.g., code-related issues)
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        error: error.message,
      }
    }
  }
}

export default apiCaller
