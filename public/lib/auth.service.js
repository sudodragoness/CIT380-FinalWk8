const BASE_API_URL = 'http://localhost:3000/api';
const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user
const USERS_API = `${BASE_API_URL}/users`; // http://localhost:3000/api/users

const register = (formData) => _post(`${AUTH_API}/register`, formData);

const login = (formData) => _post(`${AUTH_API}/login`, formData);

const logout = () => _post(`${AUTH_API}/logout`);