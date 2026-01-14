import { ApiResponse } from "@/domain/entities/response";
import { getCookie } from "@/lib/credentials";

export class ApiProductRepository {
    async createProduct(data: FormData): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const rawData = Object.fromEntries(data);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            method: "POST",
            body: JSON.stringify(rawData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const dataResponse = await response.json();
        return dataResponse;

    }

    async updateProduct(data: FormData, slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const rawData = Object.fromEntries(data);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`, {
            method: "PUT",
            body: JSON.stringify(rawData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const dataResponse = await response.json();
        return dataResponse;
    }

    async sellProduct(data: FormData, slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const rawData = Object.fromEntries(data);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}/sell`, {
            method: "POST",
            body: JSON.stringify(rawData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const dataResponse = await response.json();
        return dataResponse;
    }


    async deleteProduct(slug: string): Promise<ApiResponse> {
        const token = await getCookie('token');
        if (!token) {
            return { success: false, message: 'Unauthorized' };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const dataResponse = await response.json();
        return dataResponse;
    }
}