const BASE_URL = 'https://your-backend-url.com/api'; // TODO: replace

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Login API failed', err);
    return null;
  }
};
