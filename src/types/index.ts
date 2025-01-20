import {util} from "zod";
import Omit = util.Omit;

export type User = {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


export type RegisterRequest = Omit<User, 'id'>

export type SafeUser = Omit<User, 'password'>

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    message: string,
    accessToken: string,
    expiresIn: string,
    user: SafeUser
}


export type Account = {
    id: string,
    type: string,
    balance: string,
    createAt: string,
    updatedAt: string
}

export type CreateAccount = {
    type: string,
    balance: number
}

export interface TopupRequest {
    amount: number;
}

export interface ExpenseRequest {
    amount: number;
    categoryId: number;
}

export type Category = {
    id: number,
    name: string,
    emoji: string
}

export type CategoryDto = Omit<Category, 'id'>;

export interface Transaction {
    id: string;
    type: "IN" | "OUT";
    amount: number;
    account: Account;
    category: Category | null;
    createdAt: string;
    updatedAt: string;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface TransactionsResponse {
    content: Transaction[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type AccountStatistics = {
    totalExpenses: number,
    totalIncomes: number,
    account: Account
}