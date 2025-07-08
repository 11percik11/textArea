export interface Cell {
    id: number;
    type: string; //text, text&media, media, table
    timelineFlag?: boolean; //maybe wont appear
    isTitleHidden?: boolean;
    title?: string; //can be undefined in timeline
    value?: string; //only in timeline, must be defined
    media?: string[]; //array of links, support videos and images
    text?: string;
    files?: string[]; //maybe will be blob[];
    tableId?: number;
}

export interface Table {
    id: number;
    rows: {
        id: number;
        color: string;
        timelineFlag: boolean; //mb type
        content: Cell[];
    };
    parentId?: number; //undefined on main table
}