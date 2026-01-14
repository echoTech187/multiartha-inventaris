import { ApiResponse, DataTableResponse } from "../entities/response";

export interface UserRepository {
    getData(url: string): Promise<DataTableResponse>;
    createUser(data: FormData): Promise<ApiResponse>;
    updateUser(data: FormData, slug: string): Promise<ApiResponse>;
    getRoles(): Promise<ApiResponse>;
    updateRole(data: FormData, slug: string): Promise<ApiResponse>;
    deleteUser(slug: string): Promise<ApiResponse>;




}