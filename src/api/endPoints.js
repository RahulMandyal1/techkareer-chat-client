const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * API endpoints
 */

const Endpoints = {
  /**
   * AUTH
   */
  LOGIN: `${API_BASE_URL}api/v1/auth/login`,
  REGISTER: `${API_BASE_URL}api/v1/auth/register`,
  LOGOUT: `${API_BASE_URL}api/v1/auth/logout`,
}

/**
 * API request methods
 */
const Methods = {
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
  GET: "GET",
}

export { Endpoints, Methods }
