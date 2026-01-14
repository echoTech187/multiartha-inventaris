import { ApiResponse, DataTableResponse } from "@/domain/entities/response";
import { getCookie } from "@/lib/credentials";

export class ApiUserRepository {
    async getData(url: string): Promise<DataTableResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        return data;
    }
    async createUser(data: FormData): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const rawData = Object.fromEntries(data);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(rawData),
            }
        );
        const dataResponse = await response.json();
        return dataResponse;
    }

    async updateUser(data: FormData, slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const rawData = Object.fromEntries(data);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${slug}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(rawData),
            }
        );
        const dataResponse = await response.json();
        return dataResponse;
    }

    async getRoles(): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        return data;
    }

    async updateRole(data: FormData, slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }

        const rawData = Object.fromEntries(data);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${slug}/change-role`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(rawData),
            }
        );
        const dataResponse = await response.json();
        return dataResponse;

    }
    async deleteUser(slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${slug}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        return data;
    }
}