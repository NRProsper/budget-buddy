"use client";

import {useCategories} from "@/hooks/useCategories";

export default function CategoriesPage() {
    const { data: categories, isPending, error } = useCategories();

    if (isPending) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>Error loading categories: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories?.map((category) => (
                    <div
                        key={category.id}
                        className="p-4 border rounded-lg cursor-pointer transition-all bg-white hover:bg-gray-50"
                    >
                        <div className="text-2xl mb-2">{category.emoji}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}