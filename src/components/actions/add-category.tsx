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
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useCreateCategory} from "@/hooks/useCategories";

interface CategoryFormData {
    emoji: string;
    name: string;
}

export default function AddCategoryDrawer() {
    const { register, handleSubmit, reset } = useForm<CategoryFormData>();
    const createCategoryMutation = useCreateCategory();

    const onSubmit = async (data: CategoryFormData) => {
        try {
            await createCategoryMutation.mutateAsync({
                emoji: data.emoji,
                name: data.name,
            });
            toast.success("Category created successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to create category. Please try again.");
            console.error("Error creating category:", error);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="flex flex-col items-center justify-center space-y-2 bg-blue-200 p-2 rounded-md">
                    <span className="font-bold">
                        <Tag className="w-6 h-6" />
                    </span>
                    <span>Add category</span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add Category</DrawerTitle>
                    <DrawerDescription>
                        Add a new category to categorize your expenses.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category Emoji</label>
                            <Input
                                {...register("emoji", { required: true })}
                                placeholder="e.g., 🍔"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category Name</label>
                            <Input
                                {...register("name", { required: true })}
                                placeholder="e.g., Groceries"
                                className="w-full"
                            />
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