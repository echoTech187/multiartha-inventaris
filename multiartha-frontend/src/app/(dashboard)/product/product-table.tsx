/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AppTable, { ColumnDef } from "@/components/table/app-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DataTableResponse } from "@/domain/entities/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, ShoppingBasket, Trash2, UserPlus2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { addProductHandle, sellProductHandle } from "./_actions/productActions";
import { toast } from "sonner";
import { productUseCase } from "@/di/modules";

interface ProductTableProps {
    data: {
        products: DataTableResponse,
    };
}
const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Nama harus diisi" }),
    stock: z.string().min(1, { message: "Stok harus diisi" }),
    price: z.string().min(1, { message: "Harga harus diisi" }),
    description: z.string().optional(),

})
export type Product = {
    name: string,
    stock: string,
    price: string,
    description: string,
    is_active: boolean,
    id?: number,
    actions: (row: Product) => React.ReactNode
}

export default function ProductTable({ data }: ProductTableProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isEdited, setIsEditing] = useState(false);
    const [productEdited, setProductEdited] = useState<Product | undefined>(undefined);
    const [isSellOpen, setIsSellOpen] = useState(false);
    function handleEditProduct(id: number) {
        setIsEditing(true);
        setIsOpen(true);
        const filterData: Product | undefined = data.products?.data?.find((product: Product) => product.id === id);
        setProductEdited(filterData);
    }

    async function handleDeleteProduct(id: number) {
        try {
            const response = await productUseCase.deleteProduct(id.toString());
            if (!response.success) {
                toast.error(response.message);
                return;
            } else {
                toast.success(response.message);
                window.location.reload();
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Pengguna gagal dihapus karena" + error?.message);
                return;
            } else {
                toast.error("Pengguna gagal dihapus");
            }
        }
    }

    function handleSellProduct(id: number) {
        setIsSellOpen(true);
        const filterData: Product | undefined = data.products?.data?.find((product: Product) => product.id === id);
        setProductEdited(filterData);
    }
    function handleAddProduct() {
        setIsOpen(true);
        setIsEditing(false);
    }


    const columns: ColumnDef<Product>[] = [
        {
            header: 'Nama',
            accessorKey: 'name',
            className: 'whitespace-normal'
        },
        {
            header: 'Stok',
            accessorKey: 'stock',
        },
        {
            header: 'Harga',
            accessorKey: 'price',
        },
        {
            header: 'Deskripsi',
            accessorKey: 'description',
            className: 'whitespace-normal'
        },
        {
            header: 'Aktif',
            accessorKey: 'is_active',
            cell: (row) => {
                return row.is_active ? 'Ya' : 'Tidak';
            }
        }, {
            header: 'Aksi',
            accessorKey: 'actions',
            className: 'text-center w-12',
            cell: (row: Product) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button onClick={() => handleEditProduct(row.id as number)} variant="link" title="Edit" className="cursor-pointer"><Edit className="text-amber-500" /></Button>
                        <Button onClick={() => handleSellProduct(row.id as number)} variant="link" title="Jual" className="cursor-pointer"><ShoppingBasket className="text-gray-900" /></Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="link" title="Hapus" className="cursor-pointer"><Trash2 className="text-red-500" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Apakah Anda yakin ingin menghapus pengguna ini?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Pengguna yang telah dihapus tidak dapat dikembalikan.
                                        Apakah Anda yakin tetap ingin menghapus pengguna ini?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteProduct(row.id as number)}>Lanjutkan</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                );
            }
        }
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-extrabold mb-0">Daftar Barang</CardTitle>
                            <CardDescription>Daftar barang yang terdaftar di aplikasi ini.</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button onClick={handleAddProduct} variant="outline" className="px-2 cursor-pointer"><UserPlus2 />Tambah Barang</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent><AppTable data={data.products} colums={columns} /></CardContent>
            </Card>
            <ModalProduct isOpen={isOpen} setIsOpen={setIsOpen} isEdited={isEdited} productEdited={productEdited} />
            <ModalSell isOpen={isSellOpen} setIsOpen={setIsSellOpen} productEdited={productEdited} />
        </>
    );
}

const ModalProduct = ({ isOpen, setIsOpen, isEdited, productEdited }: { isOpen: boolean, setIsOpen: (open: boolean) => void, isEdited: boolean, productEdited: Product | undefined }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>{isEdited ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
                    <DialogDescription>
                        {
                            isEdited ? "Edit Produk" : "Tambah Produk"
                        }
                    </DialogDescription>
                </DialogHeader>
                <ProductForm isEdited={isEdited} productEdited={productEdited} />
            </DialogContent>

        </Dialog>

    );
}
const ModalSell = ({ isOpen, setIsOpen, productEdited }: { isOpen: boolean, setIsOpen: (open: boolean) => void, productEdited: Product | undefined }) => {
    const [state, formActionSell, isPending] = useActionState(sellProductHandle, null);
    const sellForm = useForm({
        defaultValues: {
            id: productEdited?.id?.toString() ?? "",
            amount: ""
        },
        resolver: zodResolver(z.object({
            id: z.string().min(1, { message: "Id harus diisi" }),
            amount: z.string().min(1, { message: "Jumlah harus diisi" })
        }))
    });
    useEffect(() => {
        if (productEdited) {
            sellForm.setValue("id", productEdited.id?.toString() ?? "");
            sellForm.setValue("amount", "");
        }
    }, [productEdited, sellForm]);
    function onSellSubmit(data: any) {
        const formData = new FormData();
        formData.append("payload", JSON.stringify({
            id: data.id.toString(),
            amount: data.amount.toString()
        }));
        startTransition(() => {
            formActionSell(formData);
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Jual Produk</DialogTitle>
                    <DialogDescription className="flex flex-col">
                        <span>
                            {
                                productEdited?.name
                            }
                        </span>
                        <span>
                            {
                                "Harga : " + parseInt(productEdited?.price as string).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
                            }
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...sellForm}>
                    <form onSubmit={sellForm.handleSubmit(onSellSubmit)}>
                        <FormField
                            control={sellForm.control}
                            name="id"
                            render={({ field }) => (
                                <input type="hidden" {...field} />
                            )}
                        />
                        <FormField
                            control={sellForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jumlah Jual</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Jumlah" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending} className="mt-8 cursor-pointer">
                                {
                                    isPending ? "Loading..." : "Jual"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
const ProductForm = ({ isEdited, productEdited }: { isEdited: boolean, productEdited: Product | undefined }) => {
    const [state, formAction, isPending] = useActionState(addProductHandle, null);
    const form = useForm({
        defaultValues: {
            name: isEdited ? productEdited?.name : "",
            stock: isEdited ? productEdited?.stock.toString() : "",
            price: isEdited ? productEdited?.price : "",
            description: isEdited ? productEdited?.description : "",
            id: isEdited ? productEdited?.id?.toString() : ""
        },
        resolver: zodResolver(productSchema),
    });

    function onSubmit(data: any) {
        const formData = new FormData();
        formData.append("payload", JSON.stringify({
            name: data.name,
            stock: data.stock,
            price: data.price,
            description: data.description,
            id: data.id
        }));

        startTransition(() => {
            formAction(formData);
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <input type="hidden" {...field} />
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Produk</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stok</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Harga</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-8 cursor-pointer" disabled={isPending}>
                    {isPending ? "Loading..." : isEdited ? "Perbaharui" : "Tambahkan"}
                </Button>
            </form>
        </Form>
    );
}   