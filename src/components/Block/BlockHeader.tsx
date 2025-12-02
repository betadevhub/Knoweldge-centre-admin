import { MdAdd, MdDragIndicator } from 'react-icons/md';
import classes from './Block.module.css';
import type { BLOCK_HEADER } from './types';



export default function BlockHeader(params:BLOCK_HEADER) {
    return (
      <div className={`${classes.blockActions} ${params.isVisible ? classes.visible : ''}`}>
          <button 
            className={classes.actionButton}
            onClick={params.onAddBlock}
            title="Add block"
            type="button"
          >
            <MdAdd size={16} />
          </button>
          <button 
            className={classes.actionButton}
            onMouseDown={(e: React.MouseEvent) => {
              e.preventDefault(); // Prevent textarea focus loss
              // Add drag-and-drop logic here
            }}
            title="Drag to reorder"
            type="button"
          >
            <MdDragIndicator size={16} />
          </button>
        </div>
      );
}


