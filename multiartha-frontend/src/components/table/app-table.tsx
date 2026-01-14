"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { DataTableResponse } from "@/domain/entities/response";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



interface AppTableProps {
    data: DataTableResponse;
    colums: ColumnDef<any>[];
    filterOptions?: [string, string][];
};
interface TableToolbarProps {
    filterOptions?: [string, string][];
    pageLength: number;
    setPageLength: (pageLength: number) => void;
    search: string;
    handleSearch: (search: string) => void;
};

interface ToolbarLeftProps {
    pageLength: number;
    setPageLength: (pageLength: number) => void;
};

interface ToolbarRightProps {
    search: string;
    handleSearch: (e: string) => void;
    filterOptions?: [string, string][];
};

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
    total: number;
    pageItems: any[];
    filtered?: any[];
};

export interface ColumnDef<T> {
    header: string
    accessorKey: keyof T
    className?: string
    cell?: (item: T) => React.ReactNode
    render?: (item: T) => React.ReactNode
}

export default function TableProvider({ data, colums, filterOptions }: AppTableProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [pageLength, setPageLength] = useState(Number(searchParams.get("limit")) || 5);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const pageCount = Math.ceil((data?.total || 0) / pageLength);
    const pageItems = data.data ?? [];
    const total = data.total;
    const [debouncedSearch] = useDebounce(search, 500)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (debouncedSearch) {
            params.set("q", debouncedSearch)
        } else {
            params.delete("q")
        }
        params.set("page", page.toString())
        params.set("limit", pageLength.toString())

        const newSearchString = params.toString();
        const currentSearchString = searchParams.toString();

        if (newSearchString !== currentSearchString) {
            router.push(`${pathname}?${newSearchString}`)
        }
    }, [debouncedSearch, router, pathname, pageLength, page, searchParams]);

    return <>
        <TableToolbar
            filterOptions={filterOptions}
            pageLength={pageLength}
            setPageLength={(val) => {
                setPageLength(val);
                setPage(1);
            }}
            search={search}
            handleSearch={(val) => {
                setSearch(val);
                setPage(1);
            }}
        />
        <TableContainer data={pageItems as []} colums={colums} />
        <TablePagination page={page} setPage={setPage} pageCount={pageCount} pageItems={pageItems} total={total || 0} />

    </>;
}

const TableToolbar = ({ filterOptions, pageLength, setPageLength, search, handleSearch }: TableToolbarProps) => {

    return <div className="flex items-center justify-between w-full mb-6">
        <ToolbarLeft pageLength={pageLength} setPageLength={setPageLength} />
        <ToolbarRight filterOptions={filterOptions} search={search} handleSearch={handleSearch} />
    </div>;
};

const ToolbarLeft = ({ pageLength, setPageLength }: ToolbarLeftProps) => {
    return <div className="flex items-center gap-2">
        <Select name="filter_page_length" defaultValue={pageLength.toString()} onValueChange={(value) => setPageLength(parseInt(value))}>
            <SelectTrigger className="w-fit">
                <SelectValue placeholder={pageLength.toString()} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Baris per halaman</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>;
};

const ToolbarRight = ({ search, handleSearch, filterOptions }: ToolbarRightProps) => {

    return <div className="flex items-center justify-end gap-2">

        {
            filterOptions?.map((option) => (
                <Button key={option[0]}>{option[1]}</Button>
            ))
        }
        <Input type="search" placeholder="Cari..." onChange={(e) => handleSearch(e.target.value)} value={search} />

    </div>;
};


const TableContainer = ({ data, colums }: { data: [], colums: ColumnDef<any>[] }) => {

    return <Table>
        <TableHeader>
            <TableRow>
                {colums.map((column) => (
                    <TableHead className={column.className} key={column.accessorKey as string}>{column.header.toUpperCase()}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                !data.length ? (
                    <TableRow>
                        <TableCell colSpan={colums.length}>
                            <EmptyDataRow >
                                <div className="flex flex-col justify-center items-center">
                                    <UserPlus2 className="size-20 text-black/50" />
                                    <p className="text-lg font-semibold text-black/50 mb-0">Belum ada data</p>
                                    <span className="text-sm text-black/50">Silahkan tambahkan data terlebih dahulu.</span>
                                </div>
                                <Button><UserPlus2 />Tambah Pengguna</Button>
                            </EmptyDataRow>
                        </TableCell>
                    </TableRow>) :
                    data.map((row: any) => (
                        <TableRow key={row.slug | row.id}>
                            {colums.map((column) => (
                                <TableCell key={`${row.id}-${String(column.accessorKey)}`} className={column.className}>
                                    {column.cell
                                        ? column.cell(row)
                                        : (row[column.accessorKey] as React.ReactNode)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
            }
        </TableBody>
    </Table>;
};

const TablePagination = ({ page, setPage, pageCount, pageItems, total }: PaginationProps) => {
    return <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing {pageItems.length} of {total} products</div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</Button>
            <div className="px-3">Page {page} / {pageCount}</div>
            <Button variant="ghost" size="sm" onClick={() => setPage(Math.min(pageCount, page + 1))} disabled={page >= pageCount}>Next</Button>
        </div>
    </div>;
};

const EmptyDataRow = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col justify-center items-center gap-8 w-full p-6">
        {children}
    </div>;
};



