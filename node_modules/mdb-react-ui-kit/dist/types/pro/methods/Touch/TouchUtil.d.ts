declare const getCoordinates: (e: any) => {
    x: any;
    y: any;
};
declare const getDirection: ({ x, y }: {
    x: number;
    y: number;
}) => {
    x: {
        direction: string;
        value: number;
    };
    y: {
        direction: string;
        value: number;
    };
};
declare const getOrigin: ({ x, y }: {
    x: any;
    y: any;
}, { x: x2, y: y2 }: {
    x: any;
    y: any;
}) => {
    x: number;
    y: number;
};
declare const getMidPoint: ({ x1, x2, y1, y2 }: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}) => {
    x: number;
    y: number;
};
declare const getRightMostTouch: (touches: any) => any;
declare const getAngle: (x1: number, y1: number, x2: number, y2: number) => number;
declare const getAngularDistance: (start: number, end: number) => number;
declare const getPinchTouchOrigin: (touches: any) => (number | {
    x: number;
    y: number;
})[];
declare const isNumber: (startTouch: any, touch: any) => boolean;
export { getCoordinates, getDirection, getOrigin, getPinchTouchOrigin, isNumber, getAngle, getAngularDistance, getMidPoint, getRightMostTouch, };
