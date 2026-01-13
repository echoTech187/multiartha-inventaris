import { cn } from "@/lib/utils";

export const Container = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return <div className="container mx-auto h-screen">
        <div className={cn("h-full w-full", className)}>
            {children}
        </div>
    </div>;
};