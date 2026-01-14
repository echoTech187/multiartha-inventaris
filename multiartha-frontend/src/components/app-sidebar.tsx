"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Box, FileBox, LayoutDashboardIcon, LogOut, User2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import { useUser } from "./providers/user-provider";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logoutHandle } from "@/app/(auth)/_actions/authAction";
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Laporan Penjualan",
        url: "/reports",
        icon: FileBox,
    },
    {
        title: "Daftar Barang",
        url: "/product",
        icon: Box,
    },
    {
        title: "Daftar Penguna",
        url: "/user",
        icon: User2,
    }
]
export function AppSidebar() {
    const { user } = useUser();


    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row justify-start items-center p-4" >
                <Image alt="" loading="eager" width={0} height={0} className="h-5 w-auto" src={`${process.env.NEXT_PUBLIC_BASE_URL}/globe.png`} />
                <span className="font-bold">MultiArtha</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <Card className="shadow-none  border-0 py-4">
                        <CardContent className="px-4">
                            <div className="flex items-center gap-4">
                                <Image alt="" loading="eager" width={0} height={0} className="size-10 rounded-full bg-gray-100" src={`${process.env.NEXT_PUBLIC_BASE_URL}/avatar-1.png`} />
                                <div>
                                    <CardTitle>{user?.fullname}</CardTitle>
                                    <CardDescription>{user?.role}</CardDescription>
                                </div>
                                <div className="ml-auto">
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <LogOut className="cursor-pointer" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Apakah Anda yakin ingin keluar?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Klik konfirmasi untuk keluar dari aplikasi.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={logoutHandle} >Konfirmasi</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </SidebarGroup>
                <SidebarGroup >
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title} >
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className="size-6">
                                        <item.icon />
                                        <span className="text-sm">{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar