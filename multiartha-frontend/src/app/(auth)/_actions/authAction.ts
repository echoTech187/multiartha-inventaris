"use server";
import { authUseCase } from "@/di/modules";
import { deleteCookie, setCookie } from "@/lib/credentials";
import { toast } from "sonner";

export async function loginHandle(prevState: unknown, formData: FormData) {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) {
        toast.error("Username/Password harus diisi.");
        return null;
    }
    const response = await authUseCase.login(username, password);
    if (response.success) {
        await setCookie("token", response.token as string);
        return response;
    } else {
        return response;
    }
}

export async function logoutHandle() {
    const deleteCookies = await deleteCookie("token");
    return deleteCookies;

}