import { userUseCase } from "@/di/modules";
import { toast } from "sonner";

export async function updateRoleHandle(prevState: unknown, formData: FormData) {
    const data = formData.get("payload") as string;
    const rawData = JSON.parse(data);

    if (!rawData.slug || !rawData.role_id) {
        toast.error("Role harus diisi.");
        return null;
    }
    const newFormData = new FormData();
    newFormData.append("role", rawData.role_id);
    const response = await userUseCase.updateRole(newFormData, rawData.slug);
    if (response.success) {
        toast.success("Role berhasil ditambahkan");
        window.location.reload();
    } else {
        toast.error("Role gagal ditambahkan");
    }

}
