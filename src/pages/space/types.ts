import type { CATEGORIES } from "../../components/SidePane/types";
import type { PAGINATION } from "../../types";

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
  placeholder?: string;
  color?: string
  sub?: BLOCK_TYPE_OPTION[]
}



export interface MENU_STATE {
  isOpen: boolean;
  position: { top: number; left: number };
  filter: string;
}

export interface POSTS {
  _id: string;
  name: string;
  views: number;
  postCount: number;
  videoDuration: number;
  readDuration: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category: CATEGORIES;
}


export interface POSTS_RESULT {
  posts: POSTS[];
  pagination: PAGINATION;
}