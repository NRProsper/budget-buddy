"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useLogin} from "@/hooks/useAuthApi";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {

    const {mutate, isPending} = useLogin();
    const navigate = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full">
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Login</h1>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Login to have access to your account.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full">
                            Login
                        </Button>

                        <Link href="/sign-up" className="block text-sm text-center hover:underline text-gray-500 mt-4">Don't have account? Sign up</Link>
                    </form>
                </Form>
            </div>
        </div>
    );
}