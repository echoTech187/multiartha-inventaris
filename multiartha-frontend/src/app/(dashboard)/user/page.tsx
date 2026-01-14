"use server";

import { userUseCase } from "@/di/modules";
import UserTable from "./user-table";
import { Roles } from "@/domain/entities/auth";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function UserPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams

    const page = Number(searchParams.page) || 1
    const limit = Number(searchParams.limit) || 10
    const query = (searchParams.q as string) || ""
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users?${new URLSearchParams({ page: page.toString(), limit: limit.toString(), search: query }).toString()}`;

    const [fetchData, fetchRoles] = await Promise.all([
        userUseCase.getData(url),
        userUseCase.getRoles()
    ]);
    if (!fetchData || !fetchRoles) return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
    )
    const data = {
        users: fetchData || [],
        role: fetchRoles.data as Roles[] || []
    }



    return (
        <>
            <UserTable data={data} />
        </>
    );
}
