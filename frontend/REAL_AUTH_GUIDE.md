# Transitioning to Real Authentication

This guide explains how to replace the **Mock Login** system with a real backend (Node.js, Python, etc.).

## 1. Backend Changes
Your server should expose an endpoint, for example `POST /api/auth/login`, which:
1.  Validates credentials against a database.
2.  Generates a **JWT Token**.
3.  Returns the token and user data.

## 2. Frontend Changes (`AuthContext.jsx`)
Modify the `login` function in `src/context/AuthContext.jsx`:

```javascript
// BEFORE (Mock)
const login = (email, password) => {
  if (email && password) {
    localStorage.setItem('zakazpro_token', 'mock-token');
    setIsAuthenticated(true);
    return true;
  }
};

// AFTER (Real)
const login = async (email, password) => {
  try {
    const response = await fetch('https://your-api.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem('zakazpro_token', token); // Store real JWT
      setUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};
```

## 3. Persistent Sessions
Instead of manually checking `localStorage` in `useEffect`, you should call a "Verify Token" endpoint (`GET /api/auth/me`) on app load to ensure the token is still valid.

## 4. API Requests
When making requests to protected data (e.g., fetching real loyalty sales), include the token in headers:

```javascript
const response = await fetch('/api/stats', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('zakazpro_token')}`
  }
});
```

---

> [!TIP]
> **Security Best Practice:** In production, consider using **HttpOnly Cookies** instead of `localStorage` to store tokens to prevent XSS attacks.
