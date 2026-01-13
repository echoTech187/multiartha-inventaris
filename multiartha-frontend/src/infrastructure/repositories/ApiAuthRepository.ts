import { ApiResponse } from '@/domain/entities/response';
import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { getCookie } from '@/lib/credentials';

export class ApiAuthRepository implements AuthRepository {
    async login(username: string, password: string): Promise<ApiResponse> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        return data;

    }

    async getAuthStatus(): Promise<boolean> {
        const token = await getCookie('token');
        if (!token) {
            return false;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth-status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.responseText === 'OK') {
            return true;
        } else {
            return false;
        }

    }

    async getUserInfo(): Promise<ApiResponse> {
        const cookiesStore = await getCookie('token');
        if (!cookiesStore) {
            return { success: false, message: 'Unauthorized 1' };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookiesStore}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: 'Unauthorized 2' };
        }

        return data;
    }

}
