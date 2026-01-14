import AppSidebar from "@/components/app-sidebar";
import { UserProvider } from "@/components/providers/user-provider";
import { SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authUseCase } from "@/di/modules";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAuthenticated, fetchUser] = await Promise.all([
        authUseCase.getAuthStatus(),
        authUseCase.getUserInfo()
    ]);

    return (
        <UserProvider user={fetchUser?.user} isAuthenticated={isAuthenticated}>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full min-h-screen">
                    <SidebarInset className="w-full p-6 border-b-card-foreground" >
                        <SidebarTrigger />
                    </SidebarInset>
                    <DynamicBreadcrumb />
                    <SidebarContent className="w-full px-6" >
                        {children}
                    </SidebarContent>

                </main>
            </SidebarProvider>
        </UserProvider>
    );
}
