import { useMemo, useEffect, useRef, useState } from 'react';
import classes from './Block.module.css';
import type { BLOCK_TYPE_MENU } from './types';
import { scale } from '../../helpers/space';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function BlockTypeMenu(params: BLOCK_TYPE_MENU) {

  if (!params.isOpen) return;

  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState(params.position);
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);


  const filteredTypes = useMemo(() =>
    params.typeList.filter(bt =>
      bt.label.toLowerCase().includes(params.filter.toLowerCase())
    ), [params.filter]
  );


  // Calculate optimal position with actual DOM measurements
  useEffect(() => {
    const calculatePosition = () => {
      if (!menuRef.current) return;

      const VIEWPORT_PADDING = scale(10);
      const VERTICAL_OFFSET = scale(5);
      const HORIZONTAL_OFFSET = scale(5);

      // Get actual menu dimensions
      const menuRect = menuRef.current.getBoundingClientRect();
      const menuHeight = menuRect.height;
      const menuWidth = menuRect.width;

      let top = params.position.top;
      let left = params.position.left;

      // VERTICAL POSITIONING (your existing logic)
      const spaceBelow = window.innerHeight - top - VERTICAL_OFFSET;
      const spaceAbove = top - VERTICAL_OFFSET;

      if (spaceBelow < menuHeight && spaceAbove >= menuHeight) {
        // Not enough space below, but enough above - position above
        top = top - menuHeight - scale(48);
      } else if (spaceBelow >= menuHeight) {
        // Enough space below - position below (default)
        top = top + VERTICAL_OFFSET;
      } else {
        // Not enough space either way, choose the better option
        if (spaceAbove > spaceBelow) {
          // More space above
          top = Math.max(VIEWPORT_PADDING, top - menuHeight - VERTICAL_OFFSET);
        } else {
          // More space below or equal
          top = Math.min(window.innerHeight - menuHeight - VIEWPORT_PADDING, top + VERTICAL_OFFSET);
        }
      }

      // HORIZONTAL POSITIONING (new logic - same principle as vertical)
      const spaceRight = window.innerWidth - left - HORIZONTAL_OFFSET;
      const spaceLeft = left - HORIZONTAL_OFFSET;

      if (spaceRight < menuWidth && spaceLeft >= menuWidth) {
        // Not enough space to the right, but enough to the left - position to the left
        left = left - menuWidth + scale(25);
      } else if (spaceRight >= menuWidth) {
        // Enough space to the right - position to the right (default)
        left = left + HORIZONTAL_OFFSET;
      } else {
        // Not enough space either way, choose the better option
        if (spaceLeft > spaceRight) {
          // More space to the left
          left = Math.max(VIEWPORT_PADDING, left - menuWidth - HORIZONTAL_OFFSET);
        } else {
          // More space to the right or equal
          left = Math.min(window.innerWidth - menuWidth - VIEWPORT_PADDING, left + HORIZONTAL_OFFSET);
        }
      }

      setMenuPosition({ top, left });
      setIsPositionCalculated(true);
    };

    // Initial calculation
    calculatePosition();

    // Recalculate on window resize
    const handleResize = () => {
      calculatePosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [params.position, filteredTypes.length]); // Re-run when filteredTypes changes (affects height)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        params.onClose();
      }
    };

    if (isPositionCalculated) {
      // Small delay to avoid immediate closing
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [params.onClose, isPositionCalculated]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        params.onClose();
      }
    };

    if (isPositionCalculated) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [params.onClose, isPositionCalculated]);

  return (
    <div
      ref={menuRef}
      className={classes.menu}
      style={{
        // Initial position (will be adjusted)
        top: `calc(${menuPosition.top} / 1440 * 100vw)`,
        left: `calc(${menuPosition.left} / 1440 * 100vw)`,
        // Hide initially, show after calculation
        visibility: isPositionCalculated ? 'visible' : 'hidden',
        opacity: isPositionCalculated ? 1 : 0,
        transition: 'opacity 0.15s ease',
        // Ensure menu has a minimum width for consistent layout
        minWidth: 'calc(200 / 1440 * 100vw)',
        maxHeight: 'calc(400 / 1440 * 100vw)',
        overflowY: 'auto'
      }}
    >
      {filteredTypes.length > 0 ? (
        <div className={classes.menuContent}>
          {filteredTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <button
                name={blockType.type}
                style={{ color: blockType.color }}
                key={blockType.type}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling

                  if (blockType.sub) {
                    // Has submenu - trigger submenu handler
                    params.forSubClick?.(e);
                  } else {
                    // No submenu - close and change block type
                    params.onClose();
                    params.onChangeBlockType(params.activeBlockId, blockType.type);
                  }
                }}
                className={classes.menuItem}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
              >
                <Icon size={18} />
                <span>{blockType.label}</span>
                {blockType.sub && <MdKeyboardArrowRight className={classes.rightAnchor} />}
              </button>
            );
          })}
        </div>
      ) : (
        <div className={classes.noResults}>
          No block types found
        </div>
      )
      }
    </div >
  );
}