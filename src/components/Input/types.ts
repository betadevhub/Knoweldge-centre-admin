
export interface CHECKBOX {
    color?: string;
}

export interface INPUT {
    label: string;
    placeholder: string;
    type: 'text' | 'password' | 'email';
    size: 'large' | 'small' | 'medium' | 'flex';
    name: string;
    required?: boolean;
    disabled?: boolean;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}