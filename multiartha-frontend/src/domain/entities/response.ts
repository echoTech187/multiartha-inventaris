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

export type DataTableResponse = {
    success: boolean,
    data?: [],
    responseText?: string,
    total?: number,
    pageLength?: number,
    currentPage?: number,
    totalPage?: number,
    message?: string,
    error?: string,
    description?: string | null,

}