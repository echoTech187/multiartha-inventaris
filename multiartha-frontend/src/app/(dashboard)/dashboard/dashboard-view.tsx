"use client"
import { useUser } from "@/components/providers/user-provider";

export default function DashboardView() {
    const { user } = useUser();

    return (
        <div>
            <h1>Dashboard {user?.fullname}</h1>
        </div>
    );
}