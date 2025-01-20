"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSpendFromAccount } from "@/hooks/useAccounts";
import { useCategories } from "@/hooks/useCategories";
import { useAccounts } from "@/hooks/useAccounts";


const expenseSchema = z.object({
    amount: z.number().min(100, "Amount must be greater than or 100"),
    categoryId: z.string().min(1, "Category is required"),
    accountId: z.string().min(1, "Account is required"), // Add accountId to the schema
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseDrawer() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
    });


    const { data: categories, isPending: isCategoriesPending, error: categoriesError } = useCategories();

    const { data: accounts, isPending: isAccountsPending, error: accountsError } = useAccounts();

    const accountId = watch("accountId");


    const createExpenseMutation = useSpendFromAccount(accountId);

    const onSubmit = async (data: ExpenseFormData) => {
        try {
            const expenseData = {
                amount: data.amount,
                categoryId: parseInt(data.categoryId, 10),
            };

            await createExpenseMutation.mutateAsync(expenseData);
            toast.success("Expense added successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to add expense. Please try again.");
            console.error("Error adding expense:", error);
        }
    };


    if (isCategoriesPending || isAccountsPending) {
        return <div>Loading...</div>;
    }

    if (categoriesError || accountsError) {
        return <div>Error loading data: {categoriesError?.message || accountsError?.message}</div>;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="flex flex-col items-center font-medium hover:font-semibold text-red-500 hover:text-red-900">
                    <span className="">
                        <Wallet className="w-6 h-6" />
                    </span>
                    <span>Add Expense</span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add Expense</DrawerTitle>
                    <DrawerDescription>
                        Record a new expense.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">Account</label>
                            <Select
                                onValueChange={(value) => setValue("accountId", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts?.map((account) => (
                                        <SelectItem key={account.id} value={account.id.toString()}>
                                            {account.type} - ${account.balance}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.accountId && (
                                <p className="text-sm text-red-500 mt-1">{errors.accountId.message}</p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                {...register("amount", { valueAsNumber: true })}
                                type="number"
                                placeholder="e.g., 100"
                                className="w-full"
                            />
                            {errors.amount && (
                                <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <Select
                                onValueChange={(value) => setValue("categoryId", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            <span className="pe-2">{category.emoji}</span>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categoryId && (
                                <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
                            )}
                        </div>


                        <DrawerFooter>
                            <Button type="submit">Submit</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}