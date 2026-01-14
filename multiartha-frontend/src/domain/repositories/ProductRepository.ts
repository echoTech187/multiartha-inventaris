import { ApiResponse } from "../entities/response";

export interface ProductRepository {
    createProduct(data: FormData): Promise<ApiResponse>,
    updateProduct(data: FormData, slug: string): Promise<ApiResponse>,
    sellProduct(data: FormData, slug: string): Promise<ApiResponse>,
    deleteProduct(slug: string): Promise<ApiResponse>,
}