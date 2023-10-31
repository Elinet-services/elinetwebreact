import { Dispatch, SetStateAction } from 'react';
type useAutocompleteKeydownProps = {
    isOpen: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
    length?: number;
};
declare const useAutocompleteKeydown: ({ isOpen, setOpenState, length }: useAutocompleteKeydownProps) => number;
export default useAutocompleteKeydown;
