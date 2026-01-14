"use server";
import { userUseCase } from "@/di/modules";
import ReportClient from "./reportClient";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function ReportsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams

    const page = Number(searchParams.page) || 1
    const limit = Number(searchParams.limit) || 10
    const query = (searchParams.q as string) || "";

    const url = `${process.env.NEXT_PUBLIC_API_URL}/product-sell-report?${new URLSearchParams({ page: page.toString(), limit: limit.toString(), search: query }).toString()}`;
    const [fetchReportData] = await Promise.all([
        userUseCase.getData(url),
    ]);

    const data = {
        reports: fetchReportData || [],

    }
    
    return (
        <ReportClient data={data} />
    );
}
