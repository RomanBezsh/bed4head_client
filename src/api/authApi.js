import api from './client';


export class AuthService {

    async login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password });
            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    };


}









