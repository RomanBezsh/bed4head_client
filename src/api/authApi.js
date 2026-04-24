import api from './client';


export class AuthService {

    async login({ email, password }) {
        try {
            const response = await api.post('/auth/login', { email, password });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ??
                error?.response?.data ??
                error?.message ??
                'Unknown error';

            throw new Error(`Login failed: ${message}`);
        }
    }

    async register({ email, password, isTravellingWithPet }) {
        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                country,
                city,
                travelPurpose,
                isTravellingWithPet
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message ?? error?.message ?? 'Unknown error';
            throw new Error('Registration failed: ' + message);
        }
    };
    async confirmEmail({ email, code }) {
        const response = await api.post('/auth/confirm-email', { email, code });
        return response.data;
    }

    async updateProfile({ email, name, country, city, travelPurpose }) {
        const response = await api.post('/auth/update-profile', {
            email, name, country, city, travelPurpose
        });
        return response.data;
    }
}









