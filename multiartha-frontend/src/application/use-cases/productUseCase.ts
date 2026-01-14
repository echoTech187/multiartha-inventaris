import { ApiResponse } from "@/domain/entities/response";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export class ProductUseCase {
    constructor(private productRepository: ProductRepository) { }

    async createProduct(data: FormData): Promise<ApiResponse> {
        return this.productRepository.createProduct(data)
    }

    async updateProduct(data: FormData, slug: string): Promise<ApiResponse> {
        return this.productRepository.updateProduct(data, slug)
    }

    async sellProduct(data: FormData, slug: string): Promise<ApiResponse> {
        return this.productRepository.sellProduct(data, slug)
    }


    async deleteProduct(slug: string): Promise<ApiResponse> {
        return this.productRepository.deleteProduct(slug)
    }
}