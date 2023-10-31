type animationList = 'slide-in-left' | 'slide-in-right' | 'slide-out-right' | 'slide-out-left' | '';
type CustomValidation = (input: HTMLInputElement) => boolean;
export declare const getAnimation: (hiding: boolean, prev: number, active: number) => animationList;
export declare const checkValidStep: (stepElement: HTMLLIElement, customValidation?: CustomValidation) => boolean;
export {};
