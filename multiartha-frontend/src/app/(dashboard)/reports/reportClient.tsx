"use client"
import AppTable, { ColumnDef } from "@/components/table/app-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTableResponse } from "@/domain/entities/response"

type Report = {
    id: number,
    product_name: string,
    amount: number,
    user_entry_name: number,
    createdAt: string,
}

interface ReportProps {
    data: {
        reports: DataTableResponse
    }
}
export default function ReportClient({ data }: ReportProps) {
    const columns: ColumnDef<Report>[] = [
        {
            accessorKey: "product_name",
            header: "Nama Produk",
        },
        {
            accessorKey: "amount",
            header: "Jumlah",
        },
        {
            accessorKey: "user_entry_name",
            header: "Dibuat Oleh",
        },
        {
            accessorKey: "createdAt",
            header: "Dibuat pada",
            className: "text-center w-40",
            cell: (item) => new Date(item.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
        },
    ]
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-extrabold mb-0">Laporan Penjualan</CardTitle>
                        <CardDescription>Laporan barang yang telah terjual.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <AppTable data={data.reports} colums={columns} />
            </CardContent>
        </Card>
    )

}