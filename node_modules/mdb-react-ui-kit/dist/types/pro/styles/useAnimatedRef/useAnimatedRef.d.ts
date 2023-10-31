import { MutableRefObject } from 'react';
import { useAnimatedRefProps } from './types';
export declare const useAnimatedRef: <T extends HTMLElement>({ animation, delay, infinite, duration, repeatOnScroll, reset, start, externalElement, }: useAnimatedRefProps) => MutableRefObject<any>;
export default useAnimatedRef;
