import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Category, CategoryDto} from "@/types";
import {createCategory, deleteCategory, getAllCategories, updateCategory} from "@/api/category";

export const useCategories = () => {
    return useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Category, Error, CategoryDto>({
        mutationFn: (categoryData) => createCategory(categoryData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};


export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (categoryId) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};


export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Category, Error, { categoryId: number; categoryDto: CategoryDto }>({
        mutationFn: ({ categoryId, categoryDto }) =>
            updateCategory(categoryId, categoryDto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    })
};
