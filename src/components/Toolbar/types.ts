import type { BLOCK } from "../../pages/space/types";

// types/block.ts
export interface TEXT_FORMAT {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    color?: string;
    backgroundColor?: string;
    highlightColor?: string;
    link?: string;
  }
  
  export interface TEXT_SEGMENT {
    text: string;
    format?: TEXT_FORMAT;
  }
  
  export interface RICH_TEXT_BLOCK extends BLOCK {
    segments?: TEXT_SEGMENT[];
  }


  export interface RICH_TEXT_TOOL_BAR {
    onFormatChange: (format: TEXT_FORMAT) => void;
    onClearFormat: () => void;
    selection?: Range;
    position: { x: number; y: number };
    visible: boolean;
    currentFormat?: TEXT_FORMAT;
  }