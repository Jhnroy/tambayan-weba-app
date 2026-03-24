
export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type User = {
    name: string;
    email: string;
    role: string;
};

export type Token = {
    token: string;
};

export type Auth = {
    user: User;
    token: Token;
};

export type RegisterResponse = {
    jwt: string;
    user: User;
};

export type LoginResponse = {
    jwt: string;
    user: User;
};