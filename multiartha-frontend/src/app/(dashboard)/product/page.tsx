"use server";
import { userUseCase } from "@/di/modules"
import ProductTable from "./product-table"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function ProductPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams

    const page = Number(searchParams.page) || 1
    const limit = Number(searchParams.limit) || 10
    const query = (searchParams.q as string) || ""
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${new URLSearchParams({ page: page.toString(), limit: limit.toString(), search: query }).toString()}`;

    const [fetchData] = await Promise.all([
        userUseCase.getData(url)
    ]);
    if (!fetchData) return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
    )
    const data = {
        products: fetchData || []
    }

    return (
        <>
            <ProductTable data={data} />
        </>
    );
}