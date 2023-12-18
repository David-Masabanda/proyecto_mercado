const API_URL = "http://localhost:8080/API/v1.0/Mercado";

export function getApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
  }
  