import {Category, CategoryDto} from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import API from "@/lib/axios";

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response: AxiosResponse<Category[]> = await API.get("/categories");
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to fetch categories.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const createCategory = async (categoryDto: CategoryDto): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await API.post("/categories", categoryDto);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to create category.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
    try {
        await API.delete(`/categories/${categoryId}`);
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to delete category.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const updateCategory = async (categoryId: number, categoryDto: CategoryDto): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await API.put(`/categories/${categoryId}`, categoryDto);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Failed to update category.";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};