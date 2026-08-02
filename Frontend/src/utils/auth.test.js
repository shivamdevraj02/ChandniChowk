import test from 'node:test';
import assert from 'node:assert/strict';
import { isAuthenticated, setAuthToken, clearAuthToken } from './auth.js';

const createStorage = () => {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
};

test('setAuthToken stores a token that is later detected as authenticated', () => {
  global.localStorage = createStorage();
  global.window = { location: { href: '' } };

  clearAuthToken();
  assert.equal(isAuthenticated(), false);

  setAuthToken('abc123');
  assert.equal(isAuthenticated(), true);
});
