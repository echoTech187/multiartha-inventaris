import { productUseCase } from "@/di/modules";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addProductHandle(prevState: any, formData: FormData) {
    const data = formData.get("payload") as string;
    const rawData = JSON.parse(data);
    if (!rawData.name || !rawData.price || !rawData.stock) {
        toast.error("Semua field harus diisi.");
        return null;
    }
    const newFormData = new FormData();
    newFormData.append("name", rawData.name);
    newFormData.append("price", rawData.price);
    newFormData.append("stock", rawData.stock);
    newFormData.append("description", rawData.description || "");

    if (!rawData.id) {
        const response = await productUseCase.createProduct(newFormData);
        if (response.success) {
            toast.success("Produk berhasil ditambahkan");
            window.location.reload();
        } else {
            toast.error("Produk gagal ditambahkan");
        }
    } else {
        const response = await productUseCase.updateProduct(newFormData, rawData.id);
        if (response.success) {
            toast.success("Produk berhasil diperbarui");
            window.location.reload();
        } else {
            toast.error("Produk gagal diperbarui");
        }

    }

}

export async function sellProductHandle(prevState: any, formData: FormData) {
    const data = formData.get("payload") as string;
    const rawData = JSON.parse(data);
    if (!rawData.id || !rawData.amount) {
        toast.error("Semua field harus diisi.");
        return null;
    }
    const newFormData = new FormData();
    newFormData.append("amount", rawData.amount);
    const response = await productUseCase.sellProduct(newFormData, rawData.id);
    if (response.success) {
        toast.success("Produk berhasil dijual", { description: response.message });
        window.location.reload();
    } else {
        toast.error("Produk gagal dijual", { description: response.message });
    }
}