"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function DynamicBreadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");

    // If we are at root or /dashboard, just show Dashboard as page
    const isDashboardRoot = segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard");

    return (
        <Breadcrumb className="w-full px-6 border-b-card-foreground mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    {isDashboardRoot ? (
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {!isDashboardRoot && segments.map((segment, index) => {
                    // Skip 'dashboard' if it's the first segment to avoid redundancy
                    if (segment === "dashboard" && index === 0) return null;

                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const title = segment.charAt(0).toUpperCase() + segment.slice(1);

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
