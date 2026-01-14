"use client";

import AppProvider, { ColumnDef } from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import { userUseCase } from "@/di/modules";
import { Roles, User } from "@/domain/entities/auth";
import { DataTableResponse } from "@/domain/entities/response";
import { Edit, LockOpen, Trash2, UserPlus2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { startTransition, useActionState, useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formRoleSchema, useTable } from "@/components/table/use-table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateRoleHandle } from "./_actions/userAction";
import z from "zod";

interface UserTableProps {
    data: {
        users: DataTableResponse,
        role: Roles[]
    };
}

export default function UserTable({ data }: UserTableProps) {
    const { form } = useTable();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState<User | undefined>(undefined);
    const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);



    async function handleAddUser() {
        setIsOpen(true);
        form.reset({
            slug: "",
            fullname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        });
        setIsEditing(false);
    }
    function handleEditUser(slug: string) {
        setIsEditing(true);
        setIsOpen(true);
        const filterData: User | undefined = data.users?.data?.find((user: User) => user.slug === slug);

        setEditUser(filterData);
    }

    async function handleDeleteUser(slug: string) {

        try {
            await userUseCase.deleteUser(slug);
            toast.success("Pengguna berhasil dihapus");
            window.location.reload();
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Pengguna gagal dihapus karena" + error?.message);
                return;
            }
            toast.error("Pengguna gagal dihapus");
        }
    };
    async function handleUpdateRole(slug: string) {
        setIsChangeRoleOpen(true);
        const filterData: User | undefined = data.users?.data?.find((user: User) => user.slug === slug);
        setEditUser(filterData);
    }



    const columns: ColumnDef<User>[] = [
        {
            header: 'Fullname',
            accessorKey: 'fullname',
        },
        {
            header: 'Username',
            accessorKey: 'username',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Jenis Akses',
            accessorKey: 'role',
        },
        {
            header: 'Aksi',
            accessorKey: 'actions',
            className: 'text-center w-12',
            cell: (row) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button onClick={() => handleEditUser(row.slug)} variant="link" title="Edit" className="cursor-pointer"><Edit className="text-amber-500" /></Button>
                        <Button onClick={() => handleUpdateRole(row.slug)} variant="link" title="Ganti Jenis Akses" className="cursor-pointer"><LockOpen className="text-gray-900" /></Button>

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
                                    <AlertDialogAction onClick={() => handleDeleteUser(row.slug)}>Lanjutkan</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-extrabold mb-0">Daftar Pengguna</CardTitle>
                            <CardDescription>Daftar pengguna yang terdaftar di aplikasi ini.</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button onClick={handleAddUser} variant="outline" className="px-2 cursor-pointer"><UserPlus2 />Tambah Pengguna</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <AppProvider data={data.users as DataTableResponse} colums={columns} />
                </CardContent>
            </Card>
            <UserDrawer isOpen={isOpen} setIsOpen={setIsOpen} editUser={editUser} isEditing={isEditing} roles={data.role} />
            <RoleDrawer isChangeRoleOpen={isChangeRoleOpen} setIsChangeRoleOpen={setIsChangeRoleOpen} editUser={editUser} roles={data.role} />
        </>
    );
}


const UserDrawer = ({ isOpen, setIsOpen, editUser, isEditing, roles }: { isOpen: boolean, setIsOpen: (open: boolean) => void, editUser: User | undefined, isEditing: boolean, roles: Roles[] }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Edit pengguna" : "Tambah pengguna"}
                    </DialogDescription>
                </DialogHeader>
                <UserForm isEditing={isEditing} editUser={editUser} roles={roles} />
            </DialogContent>
        </Dialog>
    );
}

const RoleDrawer = ({ isChangeRoleOpen, setIsChangeRoleOpen, editUser, roles }: { isChangeRoleOpen: boolean, setIsChangeRoleOpen: (open: boolean) => void, editUser: User | undefined, roles: Roles[] }) => {
    return (
        <Dialog open={isChangeRoleOpen} onOpenChange={setIsChangeRoleOpen}>

            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Ganti Jenis Akses</DialogTitle>
                    <DialogDescription>
                        Ubah akses untuk pengguna ini
                    </DialogDescription>
                </DialogHeader>
                <RoleUpdateForm editUser={editUser} roles={roles} />
            </DialogContent>
        </Dialog>
    );
}

const UserForm = ({ isEditing, editUser, roles }: { isEditing: boolean, editUser: User | undefined | null, roles: Roles[] }) => {
    const { form, onSubmit } = useTable();

    useEffect(() => {
        if (isEditing && editUser) {
            form.reset({
                slug: editUser.slug,
                fullname: editUser.fullname,
                username: editUser.username,
                email: editUser.email,
                password: "",
                confirmPassword: "",
                role: editUser.role_id?.toString() || ""
            });
        } else if (!isEditing) {
            form.reset({
                slug: "",
                fullname: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: ""
            });
        }
    }, [isEditing, editUser, form]);

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem className="mb-2 w-full hidden">
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input type="text" defaultValue={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem className="mb-2 w-full">
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="mb-2 w-full">
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={isEditing ? editUser?.role_id?.toString() : field.value || ""} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={field.value ? roles.find((role) => role.id.toString() === field.value)?.role_name : "Pilih role"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            roles.map((role) => (
                                                <SelectItem key={role.id} value={role.id.toString()}>{role.role_name}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-8 cursor-pointer">{
                    isEditing ? "Perbaharui" : "Tambahkan"
                }</Button>
            </form>
        </Form>
    </>
}

const RoleUpdateForm = ({ editUser, roles }: { editUser: User | undefined, roles: Roles[] }) => {
    const [state, formActionRole, isPending] = useActionState(updateRoleHandle, null);
    const { formAccess } = useTable();

    useEffect(() => {
        if (editUser) {
            formAccess.setValue("slug", editUser.slug);
            formAccess.setValue("role", editUser.role_id?.toString() || "");
        }
    }, [editUser, formAccess]);

    function onSubmitRole(data: z.infer<typeof formRoleSchema>) {
        const formData = new FormData();

        formData.append("payload", JSON.stringify({
            slug: data.slug,
            role_id: data.role
        }));

        startTransition(() => {
            formActionRole(formData);
        })


    }
    return <Form {...formAccess}>
        <form onSubmit={formAccess.handleSubmit(onSubmitRole)}>
            <FormField
                control={formAccess.control}
                name="slug"
                render={({ field }) => (
                    <input type="hidden" {...field} />
                )}
            />
            <FormField
                control={formAccess.control}
                name="role"
                render={({ field }) => (
                    <FormItem className="mb-2 w-full">
                        <FormLabel>Pilih Jenis Akses</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value || ""} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={field.value ? roles.find((role) => role.id.toString() === field.value)?.role_name : "Pilih Jenis Akses"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            roles.map((role) => (
                                                <SelectItem key={role.id} value={role.id.toString()}>{role.role_name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isPending} className="mt-8 cursor-pointer">
                {isPending ? "Loading..." : "Konfirmasi"}
            </Button>
        </form>

    </Form>
}