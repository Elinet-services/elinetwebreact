import { AdvancedHeader, AdvancedRecord, ColumnsType, RecordsType, RowsType } from '../types';
export declare const searchFilter: (rows: RowsType, search: string, column?: string[] | string) => RowsType;
export declare const sortData: (data: RowsType, field: number | string, order: string) => RowsType;
export declare const isSimpleColumn: (columns: ColumnsType) => columns is string[];
export declare const isAdvancedColumn: (columns: ColumnsType) => columns is AdvancedHeader[];
export declare const isSimpleRow: (row: RecordsType) => row is unknown[];
export declare const isAdvancedRow: (row: RecordsType) => row is AdvancedRecord;
