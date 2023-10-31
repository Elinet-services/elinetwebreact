export declare const generateIcon: (customIcon: string | undefined, customIconSize: string | undefined, btnIcon: boolean | undefined) => {
    div: HTMLDivElement;
    selector: HTMLElement;
};
export declare const getDatesArray: (activeDate: Date, selectedDate: Date | undefined, min: Date, max: Date, filter: any, startDay: number) => {
    date: Date;
    currentMonth: boolean;
    isSelected: boolean | undefined;
    isToday: boolean;
    dayNumber: number;
    disabled: boolean;
}[][];
export declare const getYearsArray: (yearScope: Array<number>) => Array<Array<number>>;
export declare const getMonthsArray: (monthsShort: Array<string>) => Array<Array<string>>;
