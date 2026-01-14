"use client"
import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, User2 } from "lucide-react";

export default function DashboardView() {
    const { user } = useUser();

    return (<>
        <Card className="bg-teal-700/70 text-white border-0 shadow-2xl backdrop-blur-2xl mb-12">
            <CardContent>
                <h1 className="text-2xl font-bold mb-4">Selamat Datang, {user?.fullname}</h1>
                <CardDescription className="text-white/80 text-lg">Kamu sedang berada di aplikasi MultiArtha Inventory Management System. <br />Aplikasi ini dibangun dengan menggunakan Next.js 16.1.1, Shadcn/ui, dan Tailwind CSS</CardDescription>
                <div className="flex items-center gap-4 mt-6">
                    <Button onClick={() => window.location.href = '/product'} variant="secondary" className="w-fit cursor-pointer" ><Search className="mr-0" />Telusuri Barang</Button>
                    <Button onClick={() => window.location.href = '/user'} variant="secondary" className="w-fit cursor-pointer" ><User2 className="mr-0" />Telusuri Pengguna</Button>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm">© 2025 echoTech187. All rights reserved.</p>
            </CardFooter>

        </Card>
        <p>&nbsp;</p>
    </>
    );
}