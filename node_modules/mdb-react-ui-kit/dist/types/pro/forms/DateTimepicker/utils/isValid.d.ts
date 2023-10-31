declare const isValidTime: (time: string) => RegExpMatchArray | null;
declare const isValidDate: (date: Date | '' | null | undefined) => boolean | "" | null | undefined;
export { isValidDate, isValidTime };
