import { SetStateAction } from 'react';
interface DatatableContextProps {
    isLoading?: boolean;
    activePage: number;
    setActivePage: SetStateAction<any>;
    sort: {
        column: string;
        option: 'asc' | 'desc' | '';
    };
    fixedHeader?: boolean;
    handleSort: any;
}
declare const DatatableContext: import("react").Context<DatatableContextProps>;
export { DatatableContext };
