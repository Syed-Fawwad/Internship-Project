const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Normalize URL: remove trailing slash, and ensure it ends with /api
let normalizedUrl = rawApiUrl.replace(/\/$/, '');
if (!normalizedUrl.endsWith('/api')) {
  normalizedUrl += '/api';
}
const API_URL = normalizedUrl;

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;
  
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    // Handle non-json responses (like 404 HTML pages from Railway)
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }
    data = await response.text();
    return data;
  }

  if (!response.ok) {
    // Check for both 'error' (custom) and 'message' (standard error middleware)
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  return data;
};

export const api = {
  // Image URL helper
  getImageUrl: (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Fix common migration paths
    return path.replace('/src/assets/', '/assets/');
  },

  // Products
  getProducts: async (params = '') => {
    const response = await fetch(`${API_URL}/products?${params}`);
    return handleResponse(response);
  },
  getProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
  },
  createProduct: async (productData, token) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },
  updateProduct: async (id, productData, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },
  deleteProduct: async (id, token) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
  getMe: async (token) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // Admin User Management
  getUsers: async (token) => {
    const response = await fetch(`${API_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
  deleteUser: async (id, token) => {
    const response = await fetch(`${API_URL}/auth/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};
