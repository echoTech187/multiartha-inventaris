"use client"
import { useUser } from "@/components/providers/user-provider";

export default function UserPage() {
    const { user } = useUser();

    return (
        <div>
            <h1>user {user?.fullname}</h1>
        </div>
    );
}