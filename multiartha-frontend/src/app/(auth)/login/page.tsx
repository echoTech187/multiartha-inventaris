"use client";
import { Container } from "@/components/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginHandle } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function LoginPage() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const [state, formAction, isPending] = useActionState(loginHandle, null);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message, { description: state.description });
            router.replace("/", { scroll: false });
        } else {
            toast.error(state?.message);
        }
    }, [state, router]);


    return (
        <Container className="flex justify-center items-center">
            <Card title="Login" className="max-w-xl m-auto">
                <CardHeader title="Login" >
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="mb-6">Silahkan masukan username dan password untuk melanjutkan</CardDescription>
                    <Form {...form}>
                        <form action={formAction}>
                            <FormField name="username" control={form.control} render={({ field }) => (
                                <FormItem className="mb-6" >
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="your_username"
                                            required
                                            aria-required
                                            className="mt-2"
                                            {...field}
                                        />

                                    </FormControl>
                                    <FormMessage className="mt-2" />
                                </FormItem>
                            )} />
                            <FormField name="password" control={form.control} render={({ field }) => (
                                <FormItem className="mb-6" >
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            aria-required
                                            className="mt-2"
                                            {...field}
                                        />

                                    </FormControl>
                                    <FormMessage className="mt-2" />
                                </FormItem>
                            )} />
                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? "Mengirim..." : "Masuk"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
}