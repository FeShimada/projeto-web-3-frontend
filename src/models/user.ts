

export enum UserRole {
    MASTER = "Master",
    CREATOR = "Creator",
    ASSIGNER = "Assigner"
}

type User = {
    id?: number;
    name?: string;
    email: string;
    role?: UserRole;
    password: string;
};

export default User;
