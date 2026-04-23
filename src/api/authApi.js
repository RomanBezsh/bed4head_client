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

    async register(email, password, country, city, travelReason, travellingWithPet) {
        try {
            const response = await api.post('/auth/register', { email, password, country, city, travelReason, travellingWithPet });
            return response.data;
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

}









