import { ApiResponse } from "../entities/response";

export interface AuthRepository {
    login(username: string, password: string): Promise<ApiResponse>;
    getAuthStatus(): Promise<boolean>;
    getUserInfo(): Promise<ApiResponse>;

}