import AppSidebar from "@/components/app-sidebar";
import { UserProvider } from "@/components/providers/user-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authUseCase } from "@/di/modules";

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
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </UserProvider>
    );
}
