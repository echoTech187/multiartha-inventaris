/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserInfo = {
    slug: string;
    fullname: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
};

export type User = {
    id: number;
    slug: string;
    fullname: string;
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    role_id: number;
    role: string;
    actions: (row: any) => React.ReactNode;
};

export type Roles = {
    id: number;
    role_name: string;
};