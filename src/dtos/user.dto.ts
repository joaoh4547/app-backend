export interface UserCreateDTO {
    first_name: string;
    lastname?: string;
    email: string;
    password: string;
}

export interface UserUpdateDTO {
    id: string;
    first_name: string;
    lastname: string;
    email: string;
    password: string;
}
