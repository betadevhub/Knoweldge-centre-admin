// types/block.ts
export type BLOCK_TYPE = string
  | 'text'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bullet'
  | 'todo'
  | 'quote'
  | 'code'
  | 'image'
  | 'link';

export interface BLOCK {
  // format: any;
  id: string;
  type: string;
  content: string;
  placeholder?: string;
  checked?: boolean;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BLOCK_TYPE_OPTION {
  type: BLOCK_TYPE;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  placeholder: string;
}

export interface MENU_STATE {
  isOpen: boolean;
  position: { top: number; left: number };
  filter: string;
}