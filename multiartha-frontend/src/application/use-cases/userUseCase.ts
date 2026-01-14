import { ApiResponse, DataTableResponse } from "@/domain/entities/response";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class UserUseCase {
    constructor(private userRepository: UserRepository) { }

    async getData(url: string): Promise<DataTableResponse> {
        return this.userRepository.getData(url);
    }

    async createUser(data: FormData): Promise<ApiResponse> {
        return this.userRepository.createUser(data)
    }

    async updateUser(data: FormData, slug: string): Promise<ApiResponse> {
        return this.userRepository.updateUser(data, slug)
    }
    async getRoles(): Promise<ApiResponse> {
        return this.userRepository.getRoles()
    }
    async updateRole(data: FormData, slug: string): Promise<ApiResponse> {
        return this.userRepository.updateRole(data, slug)
    }

    async deleteUser(slug: string): Promise<ApiResponse> {
        return this.userRepository.deleteUser(slug)
    }
}