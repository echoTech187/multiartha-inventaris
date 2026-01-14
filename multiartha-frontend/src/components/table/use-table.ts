import { userUseCase } from "@/di/modules";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const formSchema = z.object({
    slug: z.string().optional(),
    fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
    username: z.string().min(1, { message: "Username harus diisi" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    role: z.string().min(1, { message: "Role harus diisi" }),
}).refine((data) => {
    if (!data.slug && !data.password) return false;
    return true;
}, {
    message: "Password harus diisi untuk pengguna baru",
    path: ["password"],
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
});

export const formRoleSchema = z.object({
    slug: z.string().min(32, { message: "ID harus diisi" }),
    role: z.string()
})

export function useTable() {

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        },
        resolver: zodResolver(formSchema),
    });

    const formAccess = useForm<z.infer<typeof formRoleSchema>>({
        defaultValues: {
            slug: "",
            role: ""
        },
        resolver: zodResolver(formRoleSchema),
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("slug", data.slug || "");
        formData.append("fullname", data.fullname);
        formData.append("username", data.username);
        formData.append("email", data.email);
        if (data.password) {
            formData.append("password", data.password);
            formData.append("confirmPassword", data.confirmPassword || "");
        }
        formData.append("role", data.role);

        try {
            if (!data.slug) {
                const response = await userUseCase.createUser(formData);
                if (response.success) {
                    toast.success("Pengguna berhasil ditambahkan");
                    window.location.reload();
                } else {
                    toast.error("Pengguna gagal ditambahkan");
                }
            } else {
                const response = await userUseCase.updateUser(formData, data.slug);
                if (response.success) {
                    toast.success("Pengguna berhasil diperbarui");
                    window.location.reload();
                } else {
                    toast.error("Pengguna gagal diperbarui");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan");
        }
    }


    return { form, formAccess, onSubmit };

}
