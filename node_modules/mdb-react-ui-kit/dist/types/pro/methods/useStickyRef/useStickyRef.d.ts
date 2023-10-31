import { MutableRefObject } from 'react';
import { useStickyRefProps } from './types';
export declare const useStickyRef: <Type extends HTMLElement>({ animationSticky, animationUnsticky, boundary, delay, direction, offset, position, }: useStickyRefProps) => MutableRefObject<any>;
export default useStickyRef;
