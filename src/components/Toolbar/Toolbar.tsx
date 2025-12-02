import { useState, useRef, useEffect } from 'react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough, MdCode, MdFormatColorText, MdFormatColorFill, MdLink, MdFormatClear } from 'react-icons/md';
import classes from './Toolbar.module.css';
import type { RICH_TEXT_TOOL_BAR, TEXT_FORMAT } from './types';
import { colors, highlightColors } from './constants';



export default function RichTextToolbar(params: RICH_TEXT_TOOL_BAR) {
    const [activeFormats, setActiveFormats] = useState<TEXT_FORMAT>({});
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (params.currentFormat) {
            setActiveFormats(params.currentFormat);
        }
    }, [params.currentFormat]);


    const handleFormatClick = (formatKey: keyof TEXT_FORMAT) => {
        const newFormat = { ...activeFormats, [formatKey]: !activeFormats[formatKey] };
        setActiveFormats(newFormat);
        params.onFormatChange(newFormat);
    };

    const handleColorSelect = (color: string) => {
        const newFormat = { ...activeFormats, color };
        setActiveFormats(newFormat);
        params.onFormatChange(newFormat);
        setShowColorPicker(false);
    };

    const handleHighlightSelect = (color: string) => {
        const newFormat = { ...activeFormats, highlightColor: color };
        setActiveFormats(newFormat);
        params.onFormatChange(newFormat);
        setShowHighlightPicker(false);
    };

    if (!params.visible) return null;

    return (
        <div
            ref={toolbarRef}
            className={classes.toolbar}
            style={{
                left: `${params.position.x}px`,
                top: `${params.position.y}px`,
                opacity: params.visible ? 1 : 0,
                transform: `translate(-50%, -100%)`
            }}
        >
            <div className={classes.toolbarContent}>
                <button
                    type="button"
                    onClick={() => handleFormatClick('bold')}
                    className={`${classes.toolbarButton} ${activeFormats.bold ? classes.active : ''}`}
                    title="Bold"
                >
                    <MdFormatBold size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => handleFormatClick('italic')}
                    className={`${classes.toolbarButton} ${activeFormats.italic ? classes.active : ''}`}
                    title="Italic"
                >
                    <MdFormatItalic size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => handleFormatClick('underline')}
                    className={`${classes.toolbarButton} ${activeFormats.underline ? classes.active : ''}`}
                    title="Underline"
                >
                    <MdFormatUnderlined size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => handleFormatClick('strikethrough')}
                    className={`${classes.toolbarButton} ${activeFormats.strikethrough ? classes.active : ''}`}
                    title="Strikethrough"
                >
                    <MdFormatStrikethrough size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => handleFormatClick('code')}
                    className={`${classes.toolbarButton} ${activeFormats.code ? classes.active : ''}`}
                    title="Code"
                >
                    <MdCode size={18} />
                </button>

                <div className={classes.colorPickerContainer}>
                    <button
                        type="button"
                        onClick={() => {
                            setShowColorPicker(!showColorPicker);
                            setShowHighlightPicker(false);
                        }}
                        className={classes.toolbarButton}
                        title="Text Color"
                    >
                        <MdFormatColorText size={18} />
                        {activeFormats.color && (
                            <span
                                className={classes.colorIndicator}
                                style={{ backgroundColor: activeFormats.color }}
                            />
                        )}
                    </button>

                    {showColorPicker && (
                        <div className={classes.colorPicker}>
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={classes.colorOption}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorSelect(color)}
                                    title={color}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className={classes.colorPickerContainer}>
                    <button
                        type="button"
                        onClick={() => {
                            setShowHighlightPicker(!showHighlightPicker);
                            setShowColorPicker(false);
                        }}
                        className={classes.toolbarButton}
                        title="Highlight Color"
                    >
                        <MdFormatColorFill size={18} />
                        {activeFormats.highlightColor && (
                            <span
                                className={classes.colorIndicator}
                                style={{ backgroundColor: activeFormats.highlightColor }}
                            />
                        )}
                    </button>

                    {showHighlightPicker && (
                        <div className={classes.colorPicker}>
                            {highlightColors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={classes.colorOption}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleHighlightSelect(color)}
                                    title={color}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter URL:');
                        if (url) {
                            const newFormat = { ...activeFormats, link: url };
                            setActiveFormats(newFormat);
                            params.onFormatChange(newFormat);
                        }
                    }}
                    className={classes.toolbarButton}
                    title="Add Link"
                >
                    <MdLink size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setActiveFormats({});
                        params.onClearFormat();
                    }}
                    className={classes.toolbarButton}
                    title="Clear Formatting"
                >
                    <MdFormatClear size={18} />
                </button>
            </div>
        </div>
    );
}

