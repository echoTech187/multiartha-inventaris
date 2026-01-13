import { UserInfo } from "./auth"

export type ApiResponse = {
    success: boolean,
    message?: string,
    description?: string | null,
    data?: unknown | null,
    responseText?: string,
    error?: string,
    token?: string | null,
    user?: UserInfo
}