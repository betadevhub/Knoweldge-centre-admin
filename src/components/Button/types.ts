export interface BUTTON {
    loading?: boolean;
    disabled?: boolean
    name?: string;
    title: string;
    func?: (e: React.FormEvent) => void
}