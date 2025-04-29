import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

export const loginUser = (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const registerUser = (name: string, email: string, password: string) => {
    return axios.post('http://localhost:5001/api/auth/register', {
        name, email, password
    });
};
