const AUTH_TOKEN_KEY = 'token';

export function isAuthenticated() {
  try {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (e) {
    return false;
  }
}

export function setAuthToken(token) {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {}

  window.dispatchEvent(new Event('authchange'));
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {}

  window.dispatchEvent(new Event('authchange'));
}

export function logout() {
  clearAuthToken();
  window.location.href = '/';
}

export default { isAuthenticated, setAuthToken, clearAuthToken, logout };
