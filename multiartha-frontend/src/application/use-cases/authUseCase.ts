import { ApiResponse } from "@/domain/entities/response";
import { AuthRepository } from "@/domain/repositories/AuthRepository";

export class AuthUseCase {
    constructor(private authRepository: AuthRepository) { }

    async login(username: string, password: string): Promise<ApiResponse> {
        return this.authRepository.login(username, password);
    }

    async getAuthStatus(): Promise<boolean> {
        return this.authRepository.getAuthStatus();
    }
    async getUserInfo(): Promise<ApiResponse> {
        return this.authRepository.getUserInfo();
    }

}