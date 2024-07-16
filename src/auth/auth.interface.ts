export interface AuthInputProps {
    value: string;
    valid: boolean;
}

export interface AuthFormProps {
    [key: string]: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export interface SigninFormProps {
    [key: string]: string;
    email: string;
    password: string;
}

export interface SignupFormProps extends SigninFormProps {
    confirmPassword: string;
    name: string;
}




